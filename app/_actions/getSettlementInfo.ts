"use server";
import connectToDb from "../_lib/connectToDb";
import settlementModel from "../_models/settlement.model";
import mongoose from "mongoose";

export default async function getSettlementInfo(settlementId: string) {
  await connectToDb();
  try {
    if (!mongoose.Types.ObjectId.isValid(settlementId)) {
      return { success: false, message: "Invalid settlement id" };
    }
    const settlement = await settlementModel.findById(settlementId).populate("from", "name").lean();
    if (!settlement) {
      return { success: false, message: "Settlement not found" };
    }
    return { success: true, data: JSON.parse(JSON.stringify(settlement)) };
  } catch (error: any) {
    console.log("Error getting settlement info", error.message);
    return { success: false, message: "Failed to get settlement info" };
  }
}
