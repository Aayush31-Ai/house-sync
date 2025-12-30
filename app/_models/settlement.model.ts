 import mongoose, { Document,Schema } from "mongoose";

 
 interface settlement extends Document {
houseId:Schema.Types.ObjectId,
from :Schema.Types.ObjectId,
to:Schema.Types.ObjectId,
amount:number,
proofUrl:string,
status:"pending" | "approved" | "rejected",
verifiedAt:Date,
createdAt:Date,
month:Date
 }

 const settlementSchema = new Schema<settlement>({
    houseId:{
        type:Schema.Types.ObjectId,
        ref:"house",
        required:true
    },
    from:{
        type:Schema.Types.ObjectId,
        ref:"member",
        required:true
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:"member",
        required:true
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    proofUrl:{
        type:String
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        required:true
    },
    verifiedAt:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    month:{
        type:Date,
        required:true
    }
 })

 export default mongoose.models.settlement || mongoose.model("settlement",settlementSchema);                    