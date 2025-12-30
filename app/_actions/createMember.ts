"use server";

import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";
import createToken from "../_lib/createToken";
import { babelIncludeRegexes } from "next/dist/build/webpack-config";

const createMember = async (formData: FormData) => {
  const { cookies } = await import("next/headers");
  await connectToDb();
  const houseId = formData.get("houseId") as string;
  const name = formData.get("name") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  const isMemberExist = await membersModel.findOne({ name, houseId });
  if (isMemberExist) {
    return { message: "Member already exists" };
  }

  const member = new membersModel({
    houseId,
    name,
    avatarUrl,
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
};


export default createMember;
