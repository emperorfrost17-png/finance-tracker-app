import { OverviewPage } from "./pages/OverviewPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { BudgetPage } from "./pages/BudgetPage";
import { AddTransaction } from "./components/AddTransaction";
import { useState, type JSX, useEffect } from "react";
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
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const storedTransactions = localStorage.getItem("transactions");
      return storedTransactions ? JSON.parse(storedTransactions) : [];
    } catch {
      return [];
    }
  });
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
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
              setTransactions={setTransactions}
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
