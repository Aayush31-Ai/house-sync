"use server";

import connectToDb from "../_lib/connectToDb";
import expensesModel from "../_models/expenses.model";

const getMonthlyExpenses = async (houseId: string, month: string) => {
  await connectToDb();
  try {
    const expenses = await expensesModel
      .find({
        houseId,
        month: new Date(month),
        isDeleted: false,
      })
      .sort({ createdAt: -1 })
      .lean();

    return expenses;
  } catch (error: any) {
    return console.log(
      "there is an error while getting monthly expenses",
      error.message
    );
  }
};

export default getMonthlyExpenses;
