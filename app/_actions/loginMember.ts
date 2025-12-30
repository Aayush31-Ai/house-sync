"use server";

import { cookies } from "next/headers";
import connectToDb from "../_lib/connectToDb"
import createToken from "../_lib/createToken";
import houseModel from "../_models/house.model";

const loginMember =async(houseName:string,name:string)=>{
await connectToDb();
try {
     const house = await houseModel.findOne({houseName});
     if(!house){
        return {message:"House does not exist"};
     }
        const member = await houseModel.findOne({houseId:house._id,name});
        if(!member){
            return {message:"Member does not exist"};
        }
        const token = await createToken("house", {houseId:house._id.toString(),memberId:member._id.toString()});
          (await cookies()).set({
            name: "house",
            value: token || "",
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60*24*30,
          })
        return {message:"Login Successful",memberId:member._id,houseId:house._id};
} catch (error:any) {
    console.log("there is an error while loginMember",error.message);
}
}

export default loginMember;