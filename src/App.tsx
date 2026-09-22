import { OverviewPage } from "./pages/OverviewPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { BudgetPage } from "./pages/BudgetPage";
import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

export interface Transaction {
  readonly id: string;
  icon: string;
  title: string;
  detail: string;
  amount: { expense: number; income: number };
  merchant?: string;
  note?: string;
  category: "Housing" | "Transportation" | "Food" | "Wellness" | "Insurance" | "Healthcare" | "Savings & Investments" | "Personal Spending" | "Entertainment" | "Other";
  date: string;
  tone: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: crypto.randomUUID(),
      icon: "↗",
      title: "Coffee catch-up",
      detail: "Kindred Coffee  ·  Food",
      amount: { expense: 4.5, income: 0 },
      date: "Sep 18",
      tone: "peach",
      merchant: "Kindred Coffee",
      note: "Met with Alex to discuss the new project.",
      category: "Food",
    },
    {
      id: crypto.randomUUID(),
      icon: "↗",
      title: "Streaming bundle",
      detail: "Peach+ Play  ·  Entertainment",
      amount: { expense: 19.99, income: 0 },
      date: "Sep 16",
      tone: "pink",
      merchant: "Peach+ Play",
      note: "Subscribed to the streaming bundle.",
      category: "Entertainment",
    },
    {
      id: crypto.randomUUID(),
      icon: "↗",
      title: "Yoga studio",
      detail: "Moss Movement  ·  Wellness",
      amount: { expense: 0, income: 38.0 },
      date: "Sep 14",
      tone: "olive",
      merchant: "Moss Movement",
      note: "Attended a yoga class.",
      category: "Wellness",
    },
  ]);
  return (
    <>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route
          path="/transactions"
          element={<TransactionsPage transactions={transactions} />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </>
  );
}

export default App;
