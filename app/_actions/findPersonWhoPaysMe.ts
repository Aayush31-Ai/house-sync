"use server";

import connectToDb from "../_lib/connectToDb";
import performTransactionCalculation from "../_lib/performTransactionCalculation";

const findPersonWhoPaysMe = async (houseId: string, currentUserId: string) => {
  await connectToDb();
  try {
   const allTransactions= await performTransactionCalculation(houseId);
   if (!allTransactions) {
      return { success: true, data: [] };
    }
const myPayments = allTransactions
    .filter((t) => t.to === currentUserId)
    .map((t)=>({
          fromId: t.from,
  from: t.fromName,
      amount: t.amount,
      avatar: t.fromAvatar
    }))

    return { success: true, data: myPayments };

  } catch (error:any) {
 console.log("there is an error while finding person who pays me",error.message);
    return { success: false, message: "Unable to fetch receivables", data: [] }
  }
};

export default findPersonWhoPaysMe;
