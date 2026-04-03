import type { Metadata } from "next";
import AddExpensePageShell from "@/app/_components/AddExpenses/AddExpensePageShell";

export const metadata: Metadata = {
  title: "Add Expense | HouseSync",
  description: "Create and split a new house expense.",
};

export default function AddExpensePage() {
  return <AddExpensePageShell />;
}
