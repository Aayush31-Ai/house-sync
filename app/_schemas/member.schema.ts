
import {z} from "zod";
import { objectSchema } from "./house.schema";

export const memberSchema = z.object({
    name:z.string().min(1).max(100),
    houseId:objectSchema,
    email:z.string().email().optional(),
    phone:z.number().optional(),
    avatarUrl:z.string().url(),
    joinedAt:z.date()
})  

