import type { Metadata } from "next";
import AddExpensePageShell from "@/app/_components/AddExpenses/AddExpensePageShell";
import getAuthContext from "@/app/_lib/getAuthContext";
import getAllMembers from "@/app/_actions/getAllmembers";
import getMemberInfo from "@/app/_actions/getMemberInfo";

export const metadata: Metadata = {
  title: "Add Expense | Evenly",
  description: "Create and split a new house expense.",
};

export default async function AddExpensePage({
  searchParams,
}: {
  searchParams: Promise<{ houseId?: string; memberId?: string }>;
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
          <h2 className="text-xl font-semibold">Cannot add expense</h2>
          <p className="mt-2 text-sm">Unable to resolve user context for this page.</p>
        </div>
      </div>
    );
  }

  const membersRes = await getAllMembers(effectiveHouseId, effectiveMemberId);

  return (
    <AddExpensePageShell
      currentMemberId={effectiveMemberId}
      currentHouseId={effectiveHouseId}
      members={membersRes.success ? membersRes.data : []}
    />
  );
}
