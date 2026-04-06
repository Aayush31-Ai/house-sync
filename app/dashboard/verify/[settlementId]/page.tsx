import { redirect } from "next/navigation";
import getSettlementInfo from "../../../_actions/getSettlementInfo";
import VerifyPaymentClient from "./VerifyPaymentClient";
import getAuthContext from "../../../_lib/getAuthContext";

export default async function VerifyPaymentPage(props: {
  params: Promise<{ settlementId: string }>;
  searchParams: Promise<{ houseId?: string; memberId?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const auth = await getAuthContext();
  const queryHouseId = searchParams?.houseId?.trim();
  const queryMemberId = searchParams?.memberId?.trim();

  let effectiveHouseId = auth.success ? auth.houseId : "";
  let effectiveMemberId = auth.success ? auth.memberId : "";

  if (queryHouseId && queryMemberId) {
    effectiveHouseId = queryHouseId;
    effectiveMemberId = queryMemberId;
  }

  if (!effectiveHouseId || !effectiveMemberId) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-700">
          <h2 className="text-xl font-semibold">Verification unavailable</h2>
          <p className="mt-2 text-sm">Unable to resolve user context.</p>
        </div>
      </div>
    );
  }

  const { settlementId } = params;
  const res = await getSettlementInfo(settlementId);
  
  if (!res.success || !res.data) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-700">
          <h2 className="text-xl font-semibold">Payment Not Found</h2>
          <p className="mt-2 text-sm">{res.message}</p>
        </div>
      </div>
    );
  }

  const settlement = res.data;

  // We should make sure the current user is really the one receiving it
  if (settlement.to.toString() !== effectiveMemberId) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-700">
          <h2 className="text-xl font-semibold">Unauthorized</h2>
          <p className="mt-2 text-sm">You are not authorized to verify this payment.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <VerifyPaymentClient 
        settlement={settlement} 
        houseId={effectiveHouseId} 
        memberId={effectiveMemberId} 
      />
    </main>
  );
}
