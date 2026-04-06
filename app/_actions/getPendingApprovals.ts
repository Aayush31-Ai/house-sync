"use server";

import connectToDb from "../_lib/connectToDb";
import settlementModel from "../_models/settlement.model";

const getPendingApprovals = async (memberId: string) => {
  await connectToDb();
  try {
    const pendingApprovals = await settlementModel
      .find({ to: memberId, status: "pending" })
      .populate("from", "name")
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(pendingApprovals)),
    };
  } catch (error: any) {
    console.log(
      "there is an error while getting an pending approvals",
      error.message
    );
    return {
      success: false,
      message: "Unable to fetch pending approvals",
      data: [],
    };
  }
};
export default getPendingApprovals;
