"use server";

import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";
import settlementModel from "../_models/settlement.model";
import mongoose from "mongoose";

type VerifyStatusInput = {
  isAccepted: boolean;
  settlementId: string;
  currentMemberId: string;
};

type VerifyStatusResponse =
  | { success: true; message: string }
  | { success: false; message: string };

const verifyStatus = async ({
  isAccepted,
  settlementId,
  currentMemberId,
}: VerifyStatusInput): Promise<VerifyStatusResponse> => {
  await connectToDb();

  if (!mongoose.Types.ObjectId.isValid(settlementId)) {
    return { success: false, message: "Invalid settlement id" };
  }

  if (!mongoose.Types.ObjectId.isValid(currentMemberId)) {
    return { success: false, message: "Invalid approver context" };
  }

  try {
    const settlement = await settlementModel.findById(settlementId);
    if (!settlement) {
      return { success: false, message: "Settlement not found" };
    }

    if (settlement.to.toString() !== currentMemberId) {
      return { success: false, message: "You are not allowed to verify this settlement" };
    }

    if (settlement.status !== "pending") {
      return { success: false, message: `Settlement is already ${settlement.status}` };
    }

    if (isAccepted) {
      await settlementModel.findByIdAndUpdate(settlementId, {
        status: "approved",
        verifiedAt: new Date(),
      });

      await membersModel.findByIdAndUpdate(settlement.from, {
        $inc: { balance: settlement.amount },
      });

      await membersModel.findByIdAndUpdate(settlement.to, {
        $inc: { balance: -settlement.amount },
      });

      return { success: true, message: "Settlement approved successfully" };
    }

    await settlementModel.findByIdAndUpdate(settlementId, {
      status: "rejected",
      verifiedAt: new Date(),
    });

    return { success: true, message: "Settlement rejected" };
  } catch (error: any) {
    console.log("there is an error while verifying the status", error.message);
    return { success: false, message: "Unable to verify settlement" };
  }
};

export default verifyStatus;
