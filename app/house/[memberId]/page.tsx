"use client";
import { Link } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import getMemberInfo from "../../_actions/getMemberInfo";
import TotalBalance from "@/app/_components/house/TotalBalance";

const page = ({
  params,
}: {
  params: Promise<{ memberId?: string }>;
}) => {
  const [memberData, setMemberData] = useState<any>(null);

  const resolvedParams = use(params);
  const memberId = resolvedParams?.memberId as string | undefined;

  useEffect(() => {
    if (memberId) {
      console.log(memberId);

      const gettingUserInfo = async () => {
        try {
          const data = await getMemberInfo(memberId);
          setMemberData(data);
          console.log(data);
        } catch (error) {
          console.log("Error fetching member data:", error);
        }
      };

      gettingUserInfo();
    }
  }, [memberId]);

  if (!memberId) {
    return (
      <div className="bg-bg-primary page-mobile-padding min-h-screen flex-center">
        <h1 className="text-2xl font-semibold">Please join House Again</h1>
        <Link href={"/create-member"} className="button">
          Join House
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-primary page-mobile-padding min-h-screen flex-center">
      <TotalBalance/>
    </div>
  );
};

export default page;
