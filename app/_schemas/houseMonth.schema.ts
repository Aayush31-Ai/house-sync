import {z} from "zod";
import { objectSchema } from "./house.schema";

export const houseMonthSchema = z.object({
    houseId:objectSchema,
    month:z.date(),
    isClosed:z.boolean(),
    closedAt:z.date(),
})