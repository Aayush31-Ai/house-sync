import mongoose, {Document, Schema} from 'mongoose';

interface member extends Document{
    houseId:Schema.Types.ObjectId;
    name:string;
    avatarUrl:string;
    email?:string;
    phone?:number;
    joindedAt:Date;
    balance:number;
}

const memberSchema = new Schema<member>({
    houseId:{
        type:Schema.Types.ObjectId,
        ref:"house",
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    avatarUrl:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:false
    },
    joindedAt:{
        type:Date,
        default:Date.now
    },
    balance:{
        type:Number,
        default:0
    }
})

export default mongoose.models.member || mongoose.model("member",memberSchema)