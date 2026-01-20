"use server";

import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";
import houseModel from "../_models/house.model";
import createToken from "../_lib/createToken";
import { babelIncludeRegexes } from "next/dist/build/webpack-config";

const createMember = async (formData: FormData) => {
  const { cookies } = await import("next/headers");
  await connectToDb();
  let houseId = formData.get("houseId") as string | null;
  const name = formData.get("name") as string | null;
  const avatar = formData.get("avatar") as string | null;
  const houseName = formData.get("houseName") as string | null;
console.log({ houseId, name, avatar, houseName });

try {
  // If houseId is missing but houseName is provided, look it up from houses collection
  if (!houseId && houseName) {
    const house = await houseModel.findOne({ houseName }).select("_id").lean();
    if (!house) {
      return { message: "House not found" };
    }
    houseId = house._id.toString();
  }
  
    const isMemberExist = await membersModel.findOne({ name, houseId });
    if (isMemberExist) {
      return { message: "Member already exists" };
    }
  
    const member = new membersModel({
      houseId,
      name,
      avatar,
      balance:0
    });
    await member.save();
  
  const token = await createToken("house", {houseId,memberId:member._id.toString()});
    (await cookies()).set({
      name: "house",
      value: token || "",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60*24*30,
    })
  
  
    return { message: "Member is Created Successfully", memberId: member._id.toString() };
} catch (error) {
  return { message: "An error occurred", error };
}
};


export default createMember;
