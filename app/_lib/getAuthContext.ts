import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type HouseTokenPayload = {
  house?: {
    houseId?: string;
    memberId?: string;
  };
};

export type AuthContextResult =
  | {
      success: true;
      houseId: string;
      memberId: string;
    }
  | {
      success: false;
      message: string;
    };

const getAuthContext = async (): Promise<AuthContextResult> => {
  try {
    const token = (await cookies()).get("house")?.value;

    if (!token) {
      return { success: false, message: "Authentication required" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as HouseTokenPayload;
    const houseId = decoded?.house?.houseId;
    const memberId = decoded?.house?.memberId;

    if (!houseId || !memberId) {
      return { success: false, message: "Invalid session token" };
    }

    return {
      success: true,
      houseId,
      memberId,
    };
  } catch {
    return { success: false, message: "Session expired. Please login again" };
  }
};

export default getAuthContext;
