"use server";

import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";

const getTakenAvatars = async (houseId: string) => {
  await connectToDb();

  try {
    if (!houseId) {
      return { success: false, message: "Missing house id", data: [] as string[] };
    }

    const members = await membersModel.find({ houseId }).select("avatar").lean();

    const avatars = members
      .map((member: any) => member.avatar)
      .filter((avatar: unknown): avatar is string => typeof avatar === "string");

    return { success: true, data: avatars };
  } catch (error: any) {
    console.log("error while fetching taken avatars", error.message);
    return { success: false, message: "Unable to fetch taken avatars", data: [] as string[] };
  }
};

export default getTakenAvatars;
