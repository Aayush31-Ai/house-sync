"use server";


import { log } from "console";
import connectToDb from "../_lib/connectToDb";

import houseModel from "../_models/house.model";

const createHouse = async (houseData: FormData) => {
  await connectToDb();
  const houseName = houseData.get("houseName") as string;
  if (houseName.trim() == "") {
    return console.log("please Enter houseName");
  }

  const ishouseExist = await houseModel.findOne({ houseName });
  if (ishouseExist) {
    return { message: "House already exists" };
  }
  const house = new houseModel({
    houseName
  });
  await house.save();

  console.log(house._id.toString());
  
  return { message: "House created successfully", houseId: house._id.toString()};
};

export default createHouse;
