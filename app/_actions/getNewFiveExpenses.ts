"use server";

import connectToDb from "../_lib/connectToDb";
import expensesModel from "../_models/expenses.model";

const getNewFiveExpenses = async (houseId: string) => {
  try {
    await connectToDb();

    const expenses = await expensesModel
      .find({ houseId, isDeleted: false })
      .populate("paidBy", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(expenses)),
    };
  } catch (error: any) {
    console.log(
      "There is an error while getting top 5 expenses",
      error.message
    );

    return {
      success: false,
      message: "Unable to fetch recent expenses",
      data: [],
    };
  }
};

export default getNewFiveExpenses;
