"use server";
import connectToDb from "../_lib/connectToDb";
import performTransactionCalculation from "../_lib/performTransactionCalculation";

const findPersonToPay = async (houseId: string, currentUserId: string) => {
  await connectToDb();
  try {
    const allTransactions = await performTransactionCalculation(houseId);

    if (!allTransactions) {
      return { message: "No transactions found" };
    }

    const myPayments = allTransactions
      .filter((t) => t.from === currentUserId)
      .map((t) => ({
        to: t.toName,
        amount: t.amount,
        avatar: t.toAvatar,

      
      }));
    if (myPayments.length === 0) {
      return { message: "No payments found" };
    }
    return myPayments;
  } catch (error: any) {
    console.log("Error in findPersonToPay:", error.message);
    return [];
  }
};

export default findPersonToPay;
