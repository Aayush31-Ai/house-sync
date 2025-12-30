import mongoose from "mongoose";
import {z} from "zod";

export const houseSchema = z.object({
    houseName:z.string().min(1).max(100),
})
export const objectSchema = z.string().refine((val)=>mongoose.Types.ObjectId.isValid(val),{
    message:"Invalid ObjectId"
})