"use server";

import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";
import expensesModel from "../_models/expenses.model";
import uploadToImagekit from "../_lib/uploadToimagekit";


const addExpenses = async (formData: FormData,currentMemberId:string) => {
  await connectToDb();

  const amount = parseFloat(formData.get("amount") as string);
  const paidByIdRaw = currentMemberId
  const sharedWithIdRaw = formData.getAll("sharedWith") as string[];
  const note = formData.get("note") as string;
  const file = formData.get("proof") as File | null;
  let proofUrl = "";
  try {
    const payer = await membersModel.findById(paidByIdRaw);
    if (!payer) {
      return { message: "Payer not found" };
    }
    const houseId = payer?.houseId;

    // const sharedWithIds = sharedWithIdRaw.map(
    //   (id) => new mongoose.Types.ObjectId(id)
    // );

    const today = new Date();
    const month = new Date(today.getFullYear(), today.getMonth(), 1);

if(file && file.size>0){
  proofUrl=await uploadToImagekit(file) as string;
}

    const newExpenses = new expensesModel({
      houseId,
      paidBy: paidByIdRaw,
      shareWith: sharedWithIdRaw,
      amount,
      note,
      month,
      proofUrl,
    });
    await newExpenses.save();

    console.log("expenses added");
    
    await addBalance(amount, paidByIdRaw, sharedWithIdRaw);

    console.log("balance updated");
  } catch (error: any) {
    console.error("Error adding expenses:", error.message);
  }
};
async function addBalance(
  amount: number,
  paidBy: string,
  sharedWithIds: string[]
) {
  const share = amount / (sharedWithIds.length + 1);
  try {
     await membersModel.findByIdAndUpdate(paidBy, {
    $inc: { balance: amount - share },
  });

  await membersModel.updateMany(
    {
      _id: { $in: sharedWithIds, $ne: paidBy },
    },
    {
      $inc: { balance: -share },
    }
  );
  } catch (error:any) {
    console.log("there is error while updating the balance",error.message);
    
  }

 
}

export default addExpenses;


