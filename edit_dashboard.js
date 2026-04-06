const fs = require('fs');
let code = fs.readFileSync('app/dashboard/page.tsx', 'utf-8');

if (!code.includes('import getPendingApprovals')) {
  code = code.replace(
    'import getHouseInfo from "../_actions/getHouseInfo";',
    'import getHouseInfo from "../_actions/getHouseInfo";\nimport getPendingApprovals from "../_actions/getPendingApprovals";\nimport PendingApprovals from "../_components/Dashboard/PendingApprovals";'
  );
  
  code = code.replace(
    'const [toPayRes, owedRes, expensesRes, memberInfoRes, houseInfoRes] = await Promise.all([',
    'const [toPayRes, owedRes, expensesRes, memberInfoRes, houseInfoRes, pendingApprovalsRes] = await Promise.all(['
  );
  
  code = code.replace(
    'getHouseInfo(effectiveHouseId),',
    'getHouseInfo(effectiveHouseId),\n    getPendingApprovals(effectiveMemberId),'
  );
  
  code = code.replace(
    'const recentExpenses: ExpenseItem[]',
    'const pendingApprovalsData = pendingApprovalsRes?.success ? pendingApprovalsRes.data : [];\n  const recentExpenses: ExpenseItem[]'
  );

  code = code.replace(
    '<div className="col-span-12 md:col-span-8 flex flex-col gap-6 w-full">',
    '<div className="col-span-12 md:col-span-8 flex flex-col gap-6 w-full">\n        <PendingApprovals approvals={pendingApprovalsData} houseId={effectiveHouseId} memberId={effectiveMemberId} />'
  );

  fs.writeFileSync('app/dashboard/page.tsx', code);
  console.log('Patched dashboard page');
} else {
  console.log('Already patched dashboard page');
}
