"use server";

import connectToDb from "../_lib/connectToDb";
import membersModel from "../_models/members.model";
import expensesModel from "../_models/expenses.model";
import uploadToImagekit from "../_lib/uploadToimagekit";
import mongoose from "mongoose";

type AddExpensesResponse =
  | { success: true; message: string; expenseId: string }
  | { success: false; message: string };

const addExpenses = async (
  formData: FormData,
  currentMemberId: string
): Promise<AddExpensesResponse> => {
  await connectToDb();

  const amount = parseFloat(formData.get("amount") as string);
  const paidByIdRaw = currentMemberId;
  const sharedWithIdRaw = formData.getAll("sharedWith") as string[];
  const note = (formData.get("note") as string) || "";
  const file = formData.get("proof") as File | null;
  let proofUrl = "";

  if (!mongoose.Types.ObjectId.isValid(paidByIdRaw)) {
    return { success: false, message: "Invalid member context" };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, message: "Amount must be greater than 0" };
  }

  if (!sharedWithIdRaw.length) {
    return { success: false, message: "Select at least one member to share with" };
  }

  try {
    const payer = await membersModel.findById(paidByIdRaw);
    if (!payer) {
      return { success: false, message: "Payer not found" };
    }
    const houseId = payer.houseId;

    const uniqueSharedWith = [...new Set(sharedWithIdRaw)].filter(
      (id) => mongoose.Types.ObjectId.isValid(id) && id !== paidByIdRaw
    );

    if (!uniqueSharedWith.length) {
      return { success: false, message: "No valid members selected for split" };
    }

    const validMembers = await membersModel
      .find({
        _id: { $in: uniqueSharedWith },
        houseId,
      })
      .select("_id")
      .lean();

    if (validMembers.length !== uniqueSharedWith.length) {
      return { success: false, message: "Some selected members are invalid" };
    }

    const today = new Date();
    const month = new Date(today.getFullYear(), today.getMonth(), 1);

    if (file && file.size > 0) {
      proofUrl = (await uploadToImagekit(file)) as string;
    }

    const newExpenses = new expensesModel({
      houseId,
      paidBy: paidByIdRaw,
      shareWith: uniqueSharedWith,
      amount,
      note,
      month,
      proofUrl,
    });
    await newExpenses.save();

    await addBalance(amount, paidByIdRaw, uniqueSharedWith);

    return {
      success: true,
      message: "Expense added successfully",
      expenseId: newExpenses._id.toString(),
    };
  } catch (error: any) {
    console.error("Error adding expenses:", error.message);
    return { success: false, message: "Failed to add expense" };
  }
};

async function addBalance(
  amount: number,
  paidBy: string,
  sharedWithIds: string[]
) {
  const totalParticipants = sharedWithIds.length + 1;
  const share = amount / totalParticipants;

  try {
    await membersModel.findByIdAndUpdate(paidBy, {
      $inc: { balance: amount - share },
    });

    await membersModel.updateMany(
      {
        _id: { $in: sharedWithIds },
      },
      {
        $inc: { balance: -share },
      }
    );
  } catch (error: any) {
    console.log("there is error while updating the balance", error.message);
  }
}

export default addExpenses;


