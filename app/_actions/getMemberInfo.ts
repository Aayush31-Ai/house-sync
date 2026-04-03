"use server"

import connectToDb from "../_lib/connectToDb"
import membersModel from "../_models/members.model";

const getMemberInfo = async (memberId: string) => {
    await connectToDb();
    try {
        const member = await membersModel.findById(memberId).lean();
        if (!member) {
            return { error: true, message: "Member not found" };
        }
        // return {
        //     _id: String(member._id),
        //     houseId: String(member.houseId),
        //     name: member.name,
        //     avatar: member.avatar,
        //     email: member.email ?? null,
        //     phone: member.phone ?? null,
        //     joindedAt: member.joindedAt ? new Date(member.joindedAt).toISOString() : null,
        // };
        return JSON.parse(JSON.stringify(member));
    } catch (error: any) {
        console.log(
            "there is an error while getting the memeber information",
            error?.message || error
        );
        return { error: true, message: "Failed to fetch member info" };
    }
}

export default getMemberInfo;