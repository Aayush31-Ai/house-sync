import {z} from "zod";
import { objectSchema } from "./house.schema";

export const settlementSchema=z.object({
    houseId:objectSchema,
    from :objectSchema,
    to:objectSchema,
    amount:z.number().min(0),
    proofUrl:z.string().url().optional(),
    status:z.enum(["pending","approved","rejected"]),
    verifiedAt:z.date(),
    createdAt:z.date().default(()=>new Date()),
    month:z.date()
})