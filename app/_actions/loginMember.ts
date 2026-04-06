"use server";

import { cookies } from "next/headers";
import connectToDb from "../_lib/connectToDb"
import createToken from "../_lib/createToken";
import houseModel from "../_models/house.model";
import membersModel from "../_models/members.model";

type LoginMemberResponse =
  | { success: true; message: string; memberId: string; houseId: string }
  | { success: false; message: string };

const loginMember = async (houseName: string, name: string): Promise<LoginMemberResponse> => {
await connectToDb();
try {
     const house = await houseModel.findOne({houseName});
     if(!house){
        return { success: false, message: "House does not exist" };
     }
        const member = await membersModel.findOne({ houseId: house._id, name });
        if(!member){
            return { success: false, message: "Member does not exist" };
        }
        const token = await createToken("house", {houseId:house._id.toString(),memberId:member._id.toString()});
        if (!token) {
          return { success: false, message: "Could not create login session" };
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
          message: "Login Successful",
          memberId: member._id.toString(),
          houseId: house._id.toString(),
        };
} catch (error:any) {
    console.log("there is an error while loginMember",error.message);
    return { success: false, message: "Unable to login right now" };
}
}

export default loginMember;