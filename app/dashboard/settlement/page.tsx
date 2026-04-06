import type { Metadata } from "next";
import SettlementPageShell from "../../_components/Settlement/SettlementPageShell";
import getAuthContext from "@/app/_lib/getAuthContext";
import getAllMembers from "@/app/_actions/getAllmembers";
import getPendingApprovals from "@/app/_actions/getPendingApprovals";
import getMemberInfo from "@/app/_actions/getMemberInfo";

export const metadata: Metadata = {
  title: "Confirm Payment | Evenly",
  description: "Upload transaction proof and settle dues securely.",
};

export default async function SettlementPage({
  searchParams,
}: {
  searchParams: Promise<{ to?: string; amount?: string; houseId?: string; memberId?: string }>;
}) {
  const params = await searchParams;
  const auth = await getAuthContext();
  const queryHouseId = params?.houseId?.trim();
  const queryMemberId = params?.memberId?.trim();

  let effectiveHouseId = auth.success ? auth.houseId : "";
  let effectiveMemberId = auth.success ? auth.memberId : "";

  if (queryHouseId && queryMemberId) {
    const memberFromQuery = await getMemberInfo(queryMemberId);
    if (!("error" in memberFromQuery) && String((memberFromQuery as any).houseId) === queryHouseId) {
      effectiveHouseId = queryHouseId;
      effectiveMemberId = queryMemberId;
    }
  }

  if (!effectiveHouseId || !effectiveMemberId) {
    return (
      <div className="mx-auto max-w-2xl p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-red-700">
          <h2 className="text-xl font-semibold">Cannot open settlement</h2>
          <p className="mt-2 text-sm">Unable to resolve user context for this page.</p>
        </div>
      </div>
    );
  }

  const [membersRes, pendingRes] = await Promise.all([
    getAllMembers(effectiveHouseId, effectiveMemberId),
    getPendingApprovals(effectiveMemberId),
  ]);

  return (
    <SettlementPageShell
      currentMemberId={effectiveMemberId}
      houseId={effectiveHouseId}
      members={membersRes.success ? membersRes.data : []}
      pendingApprovals={pendingRes.success ? pendingRes.data : []}
      initialAmount={params?.amount ?? ""}
      initialToMemberId={params?.to ?? ""}
    />
  );
}
