import { OverviewPage } from "./pages/OverviewPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { BudgetPage } from "./pages/BudgetPage";
import { AddTransaction } from "./components/AddTransaction";
import { useState, type JSX } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

export interface Transaction {
  readonly id: string;
  icon: JSX.Element;
  title: string;
  amount: { expense: number; income: number };
  merchant?: string;
  note?: string;
  category:
    | "Housing"
    | "Transportation"
    | "Food"
    | "Wellness"
    | "Salary"
    | "Healthcare"
    | "Savings & Investments"
    | "Personal Spending"
    | "Entertainment"
    | "Other";
  date: string;
  tone: string;
  type: "Expense" | "Income";
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: crypto.randomUUID(),
      icon: (
        <i
          className="fa-solid fa-arrow-down" />
      ),
      title: "Coffee catch-up",
      amount: { expense: 4.5, income: 0 },
      date: "Sep 18",
      tone: "peach",
      merchant: "Kindred Coffee",
      note: "Met with Alex to discuss the new project.",
      category: "Food",
      type: "Expense",
    },
    {
      id: crypto.randomUUID(),
      icon: (
        <i
          className="fa-solid fa-arrow-down" />
      ),
      title: "Streaming bundle",
      amount: { expense: 19.99, income: 0 },
      date: "Sep 16",
      tone: "pink",
      merchant: "Peach+ Play",
      note: "Subscribed to the streaming bundle.",
      category: "Entertainment",
      type: "Expense",
    },
    {
      id: crypto.randomUUID(),
      icon: (
        <i
          className="fa-solid fa-arrow-up" />
      ),
      title: "Yoga studio",
      amount: { expense: 0, income: 38.0 },
      date: "Sep 14",
      tone: "olive",
      merchant: "Moss Movement",
      note: "Attended a yoga class.",
      category: "Wellness",
      type: "Income",
    },
  ]);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  return (
    <>
      {isAddTransactionOpen && (
        <AddTransaction
          setAddTransaction={setIsAddTransactionOpen}
          setTransactions={setTransactions}
        />
      )}
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route
          path="/transactions"
          element={
            <TransactionsPage
              transactions={transactions}
              setIsAddTransactionOpen={setIsAddTransactionOpen}
            />
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </>
  );
}

export default App;
