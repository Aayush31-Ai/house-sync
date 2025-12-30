"use server";
import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";
import settlementModel from "../_models/settlement.model";

const verifyStatus = async ({
  isAccepted,
  settlementId,
}: {
  isAccepted: boolean;
  settlementId: string;
}) => {
  await connectToDb();

  try {
    const settlement = await settlementModel.findById(settlementId);
    if (!settlement) {
      return console.log("settlement not found");
    }

    if (isAccepted) {
      await settlementModel.findByIdAndUpdate(settlementId, {
        status: "approved",
        verifiedAt: new Date(),
      });
      console.log("settleMent is accpeted and updated");

      await membersModel.findByIdAndUpdate(settlement.from, {
        $inc: { balance: -settlement.amount },
      });
      console.log("from member balance updated");
      await membersModel.findByIdAndUpdate(settlement.to, {
        $inc: { balance: settlement.amount },
      });
      console.log("to member balance updated");
    } else {
      await settlementModel.findByIdAndUpdate(settlementId, {
        status: "rejected",
        verifiedAt: new Date(),
      });
      console.log("settlement is rejected");
    }
  } catch (error: any) {
    console.log("there is an error while verifying the status", error.message);
  }
};

export default verifyStatus;
