"use server"

import connectToDb from "../_lib/connectToDb"
import uploadToImagekit from "../_lib/uploadToimagekit"
import settlementModel from "../_models/settlement.model"

type createSettlementProps={
amount:number,
from:string,
to:string,
houseId:string,
file?: File,
}

const createSettlement = async({amount, from, to, houseId, file}: createSettlementProps) => {
await connectToDb()
try {
let proofUrl=""
if(file && file.size>0){
  proofUrl=await uploadToImagekit(file) as string;
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

    console.log("settlement created successfully",settlement);
} catch (error:any) {
    console.log("there is an error while creating the Settlement",error.message);
    
}

}

export default createSettlement