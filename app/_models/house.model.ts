import mongoose, {Document,Schema} from "mongoose";

interface house extends Document{
    houseName:string;
    createdAt:Date;
}

const houseSchema = new Schema<house>({
    houseName:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.models.house|| mongoose.model("house",houseSchema)