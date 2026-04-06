import mongoose, {Document, Schema} from 'mongoose';

interface member extends Document{
    houseId:Schema.Types.ObjectId;
    name:string;
    avatar:string;
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
    },
    avatar:{
        type:String,
        required:true 
    },
    email:{
        type:String,
    },
    phone:{
        type:Number,
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

memberSchema.index({ houseId: 1, name: 1 });

export default mongoose.models.member || mongoose.model("member",memberSchema)