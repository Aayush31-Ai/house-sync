"use server";
import connectToDb from "../_lib/connectToDb";
import performTransactionCalculation from "../_lib/performTransactionCalculation";

const findPersonToPay = async (houseId: string, currentUserId: string) => {
  await connectToDb();
  try {
    const allTransactions = await performTransactionCalculation(houseId);

    if (!allTransactions) {
      return { success: true, data: [] };
    }

    const myPayments = allTransactions
      .filter((t) => t.from === currentUserId)
      .map((t) => ({
        toId: t.to,
        to: t.toName,
        amount: t.amount,
        avatar: t.toAvatar,

      
      }));
    return { success: true, data: myPayments };
  } catch (error: any) {
    console.log("Error in findPersonToPay:", error.message);
    return { success: false, message: "Unable to fetch payable people", data: [] };
  }
};

export default findPersonToPay;
