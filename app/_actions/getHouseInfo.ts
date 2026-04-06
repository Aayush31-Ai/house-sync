"use server";

import connectToDb from "../_lib/connectToDb";
import houseModel from "../_models/house.model";

const getHouseInfo = async (houseId: string) => {
  await connectToDb();

  try {
    const house = await houseModel.findById(houseId).select("houseName").lean();

    if (!house) {
      return { success: false, message: "House not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(house)),
    };
  } catch (error: any) {
    console.log("error fetching house info", error.message);
    return {
      success: false,
      message: "Unable to fetch house info",
    };
  }
};

export default getHouseInfo;
