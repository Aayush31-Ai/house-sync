"use server";

import connectToDb from "../_lib/connectToDb";
import expensesModel from "../_models/expenses.model";

const getNewFiveExpenses = async (houseId: string) => {
  try {
    await connectToDb();

    const expenses = await expensesModel
      .find({ houseId, isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return expenses;
  } catch (error: any) {
    console.log(
      "There is an error while getting top 5 expenses",
      error.message
    );

    return [];
  }
};

export default getNewFiveExpenses;
