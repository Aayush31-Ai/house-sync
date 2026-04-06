"use server";

import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";
import houseModel from "../_models/house.model";
import createToken from "../_lib/createToken";

type CreateMemberResponse =
  | { success: true; message: string; memberId: string; houseId: string }
  | { success: false; message: string };

let isMemberNameIndexChecked = false;

const ensureMemberNameIndexAllowsDuplicates = async () => {
  if (isMemberNameIndexChecked) {
    return;
  }

  try {
    await membersModel.collection.dropIndex("houseId_1_name_1");
    console.log("Dropped legacy unique index on members.houseId+name");
  } catch {
    // Index may not exist or already be non-unique.
  } finally {
    isMemberNameIndexChecked = true;
  }
};

const createMember = async (formData: FormData): Promise<CreateMemberResponse> => {
  const { cookies } = await import("next/headers");
  await connectToDb();
  let houseId = formData.get("houseId") as string | null;
  const name = formData.get("name") as string | null;
  const avatar = formData.get("avatar") as string | null;
  const houseName = formData.get("houseName") as string | null;
console.log({ houseId, name, avatar, houseName });

try {
  await ensureMemberNameIndexAllowsDuplicates();

  // If houseId is missing but houseName is provided, look it up from houses collection
  if (!houseId && houseName) {
    const house = await houseModel.findOne({ houseName }).select("_id").lean();
    if (!house) {
      return { success: false, message: "House not found" };
    }
    houseId = house._id.toString();
  }

    if (!houseId || !name || !avatar) {
      return { success: false, message: "Missing required profile fields" };
    }

    const isAvatarTaken = await membersModel.findOne({ houseId, avatar }).select("_id").lean();
    if (isAvatarTaken) {
      return { success: false, message: "This avatar is already taken in this house" };
    }
  
    let member;
    try {
      member = new membersModel({
        houseId,
        name,
        avatar,
        balance: 0,
      });
      await member.save();
    } catch (error: any) {
      if (error?.code === 11000) {
        await ensureMemberNameIndexAllowsDuplicates();
        member = new membersModel({
          houseId,
          name,
          avatar,
          balance: 0,
        });
        await member.save();
      } else {
        throw error;
      }
    }
  
  const token = await createToken("house", {houseId,memberId:member._id.toString()});
    if (!token) {
      return { success: false, message: "Could not create session" };
    }
    (await cookies()).set({
      name: "house",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60*24*30,
    })
  
  
    return {
      success: true,
      message: "Member is Created Successfully",
      memberId: member._id.toString(),
      houseId,
    };
} catch (error: any) {
  console.log("createMember error", error?.message || error);
  return { success: false, message: "An error occurred" };
}
};


export default createMember;
