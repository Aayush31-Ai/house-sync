import {z} from "zod";
import { objectSchema } from "./house.schema";

export const expensesSchema = z.object({
    houseId:objectSchema,
    paidBy:objectSchema,
    shareWith:z.array(objectSchema),
    amount:z.number().min(0),
    proofUrl:z.string().url().optional(),
    note:z.string().optional(),
    month:z.date(),
    createdAt:z.date(),
    isDeleted:z.boolean()
})