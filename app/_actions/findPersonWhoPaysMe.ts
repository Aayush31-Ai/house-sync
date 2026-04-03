"use server";

import connectToDb from "../_lib/connectToDb";
import performTransactionCalculation from "../_lib/performTransactionCalculation";

const findPersonWhoPaysMe = async (houseId: string, currentUserId: string) => {
  await connectToDb();
  try {
   const allTransactions= await performTransactionCalculation(houseId);
   if (!allTransactions) {
      return { message: "No transactions found" };
    }
const myPayments = allTransactions
    .filter((t) => t.to === currentUserId)
    .map((t)=>({
      from: t.fromName,
      amount: t.amount,
      avatar: t.fromAvatar
    }))

    return myPayments;

  } catch (error:any) {
 console.log("there is an error while finding person who pays me",error.message);
    return []
  }
};

export default findPersonWhoPaysMe;
