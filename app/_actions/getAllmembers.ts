"use server"

import connectToDb from "../_lib/connectToDb";


import membersModel from "../_models/members.model";

const getAllMembers = async(houseId:string,currentMemberId:string)=>{
  await connectToDb();
  try {
    const members = await membersModel.find({houseId, _id: { $ne: currentMemberId }}).lean();
    return JSON.parse(JSON.stringify(members));
  } catch (error: any) {
    console.log("there is an error while getting all members",error.message);
    return [];
  }

}
export default getAllMembers;