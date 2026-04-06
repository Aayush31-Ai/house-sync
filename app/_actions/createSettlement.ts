"use server"

import connectToDb from "../_lib/connectToDb"
import uploadToImagekit from "../_lib/uploadToimagekit"
import settlementModel from "../_models/settlement.model"
import membersModel from "../_models/members.model"
import mongoose from "mongoose"

type createSettlementProps={
amount:number,
from:string,
to:string,
houseId:string,
file?: File,
}

type CreateSettlementResponse =
    | { success: true; message: string; settlementId: string }
    | { success: false; message: string };

const createSettlement = async ({ amount, from, to, houseId, file }: createSettlementProps): Promise<CreateSettlementResponse> => {
await connectToDb()

if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, message: "Amount must be greater than 0" };
}

if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to) || !mongoose.Types.ObjectId.isValid(houseId)) {
    return { success: false, message: "Invalid settlement request" };
}

if (from === to) {
    return { success: false, message: "Payer and receiver cannot be the same member" };
}

try {
let proofUrl=""
if(file && file.size>0){
  proofUrl=await uploadToImagekit(file) as string;
}

        const members = await membersModel
            .find({ _id: { $in: [from, to] }, houseId })
            .select("_id")
            .lean();

        if (members.length !== 2) {
            return { success: false, message: "Members are not part of this house" };
        }


    const settlement = new settlementModel({
amount,
from,
to,
houseId,
proofUrl,
status:"pending",
month:new Date(new Date().getFullYear(),new Date().getMonth(),1)
    })
    await settlement.save()

    return {
      success: true,
      message: "Settlement created successfully",
      settlementId: settlement._id.toString(),
    };
} catch (error:any) {
    console.log("there is an error while creating the Settlement",error.message);
    return { success: false, message: "Unable to create settlement" };
}

}

export default createSettlement