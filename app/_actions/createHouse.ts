"use server";


import connectToDb from "../_lib/connectToDb";

import houseModel from "../_models/house.model";

type CreateHouseResponse =
  | { success: true; message: string; houseId: string }
  | { success: false; message: string };

const createHouse = async (houseData: FormData) => {
  await connectToDb();
  const houseName = ((houseData.get("houseName") as string) || "").trim();

  if (!houseName) {
    return { success: false, message: "Please enter house name" };
  }

try {
    const ishouseExist = await houseModel.findOne({
      houseName: { $regex: `^${houseName}$`, $options: "i" },
    });

    if (ishouseExist) {
      return { success: false, message: "This house already exists" };
    }

    const house = new houseModel({
      houseName
    });
    await house.save();
  
    console.log(house._id.toString());
    
    return {
      success: true,
      message: "House created successfully",
      houseId: house._id.toString(),
    };
} catch (error:any) {
    console.log("Error creating house:", error.message);
    return { success: false, message: "Error creating house" }
}
};

export default createHouse;
