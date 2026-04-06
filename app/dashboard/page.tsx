import TotalBalanceCard from "../_components/Dashboard/TotalBalanceCard";
import NeedToPay from "../_components/Dashboard/NeedToPay";
import PeopleOweYou from "../_components/Dashboard/PeopleOweYou";
import RecentExpenses from "../_components/Dashboard/RecentExpenses";
import findPersonToPay from "../_actions/findPersonToPay";
import findPersonWhoPaysMe from "../_actions/findPersonWhoPaysMe";
import getNewFiveExpenses from "../_actions/getNewFiveExpenses";
import getMemberInfo from "../_actions/getMemberInfo";
import getHouseInfo from "../_actions/getHouseInfo";
import getPendingApprovals from "../_actions/getPendingApprovals";
import PendingApprovals from "../_components/Dashboard/PendingApprovals";
import getAuthContext from "../_lib/getAuthContext";

type OweItem = {
  fromId: string;
  from: string;
  amount: number;
  avatar?: string;
};

type NeedToPayItem = {
  toId: string;
  to: string;
  amount: number;
  avatar?: string;
};

type ExpenseItem = {
  id: string;
  name: string;
  payer: string;
  payerId: string;
  date: string;
  amount: number;
};

function formatShortDate(value: string | Date) {
  const date = new Date(value);
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "2-digit",
  });
}

export default async function DashboardPage({
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
          <h2 className="text-xl font-semibold">Dashboard unavailable</h2>
          <p className="mt-2 text-sm">Unable to resolve user context for this dashboard.</p>
        </div>
      </div>
    );
  }

  const [toPayRes, owedRes, expensesRes, memberInfoRes, houseInfoRes, pendingApprovalsRes] = await Promise.all([
    findPersonToPay(effectiveHouseId, effectiveMemberId),
    findPersonWhoPaysMe(effectiveHouseId, effectiveMemberId),
    getNewFiveExpenses(effectiveHouseId),
    getMemberInfo(effectiveMemberId),
    getHouseInfo(effectiveHouseId),
    getPendingApprovals(effectiveMemberId),
  ]);

  const toPay: NeedToPayItem[] = toPayRes.success ? toPayRes.data : [];
  const owedBy: OweItem[] = owedRes.success ? owedRes.data : [];

  const pendingApprovalsData = pendingApprovalsRes?.success ? pendingApprovalsRes.data : [];
  const recentExpenses: ExpenseItem[] = expensesRes.success
    ? expensesRes.data.map((item: any) => ({
        id: item._id?.toString() ?? crypto.randomUUID(),
        name: item.note?.trim() ? item.note : "Untitled Expense",
        payer: item.paidBy?.name ?? "Unknown",
        payerId: item.paidBy?._id?.toString() ?? "",
        date: formatShortDate(item.createdAt),
        amount: Number(item.amount ?? 0),
      }))
    : [];

  const totalReceivable = owedBy.reduce((sum, item) => sum + item.amount, 0);
  const totalPayable = toPay.reduce((sum, item) => sum + item.amount, 0);
  const myName = !("error" in memberInfoRes) ? (memberInfoRes as any)?.name ?? "Member" : "Member";
  const invitePath = `/create-member?houseId=${encodeURIComponent(effectiveHouseId)}&memberId=${encodeURIComponent(effectiveMemberId)}`;
  const houseName = houseInfoRes.success ? houseInfoRes.data.houseName : "your house";

  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-12 max-w-7xl mx-auto p-4 md:p-8">
      <div className="col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div className="flex flex-row justify-between items-center w-full md:w-auto">
          <div className="md:hidden">
            <p className="text-gray-500 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold flex items-center gap-2">{myName} 👋</h1>
            <p className="text-xs text-gray-500 mt-1">{houseName}</p>
          </div>
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold">Overview</h1>
            <p className="text-sm text-gray-500 mt-1">{houseName}</p>
          </div>
          <button className="md:hidden bg-white p-2 rounded-full shadow-sm relative">       
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <button className="hidden md:block bg-white p-2.5 text-gray-700 rounded-full shadow-sm relative ml-auto">
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col gap-6 w-full">
        <PendingApprovals approvals={pendingApprovalsData} houseId={effectiveHouseId} memberId={effectiveMemberId} />
        <TotalBalanceCard
          totalReceivable={totalReceivable}
          totalPayable={totalPayable}
          invitePath={invitePath}
          houseName={houseName}
        />
        <PeopleOweYou items={owedBy} />
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col gap-6 w-full">
        <NeedToPay items={toPay} houseId={effectiveHouseId} memberId={effectiveMemberId} />
        <RecentExpenses expenses={recentExpenses} currentMemberId={effectiveMemberId} />
      </div>
    </div>
  );
}
