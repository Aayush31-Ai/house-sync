import mongoose, { Document,Schema } from "mongoose";

interface houseMonth extends Document{
    houseId:Schema.Types.ObjectId,
    isClosed?:boolean,
    closedAt:Date,
    month:Date
}

const houseMonthSchema = new Schema<houseMonth>({
    houseId:{
        type:Schema.Types.ObjectId, 
        required:true,
        ref:"house"},
    isClosed:{
        type:Boolean,
        default:false
        
    },

    closedAt:{
        type:Date
    },
    month:{
        type:Date,
        required:true
    }

})

export default mongoose.models.houseMonth || mongoose.model("houseMonth",houseMonthSchema);