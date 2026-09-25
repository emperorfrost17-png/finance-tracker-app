import { OverviewPage } from "./pages/OverviewPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { BudgetPage } from "./pages/BudgetPage";
import { AddTransaction } from "./components/AddTransaction";
import { EditTransaction } from "./components/EditTransaction";
import { useState, type JSX, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

export interface Transaction {
  readonly id: string;
  icon: JSX.Element;
  title: string;
  amount: { expense: number; income: number };
  merchant: string | null;
  note: string | null;
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
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [TaskToEdit, setTaskToEdit] = useState<Transaction | null>(null);
  const [showAddedTaskNotification, setShowAddedTaskNotification] =
    useState(false);
  const [showEditTaskNotification, setShowEditTaskNotification] =
    useState(false);
  const [showDeleteTaskNotification, setShowDeleteTaskNotification] =
    useState(false);

  const handleEditTransaction = (transaction: Transaction) => {
    setTaskToEdit(transaction);
    setIsEditTransactionOpen(true);
  };
  useEffect(() => {
    const isActive =
      showAddedTaskNotification ||
      showEditTaskNotification ||
      showDeleteTaskNotification;
    if (!isActive) return;
    const timer = setTimeout(() => {
      setShowAddedTaskNotification(false);
      setShowEditTaskNotification(false);
      setShowDeleteTaskNotification(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [
    showAddedTaskNotification,
    showEditTaskNotification,
    showDeleteTaskNotification,
  ]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  return (
    <>
      {isAddTransactionOpen && (
        <AddTransaction
          setAddTransaction={setIsAddTransactionOpen}
          setTransactions={setTransactions}
          setShowAddedTaskNotification={setShowAddedTaskNotification}
        />
      )}
      {isEditTransactionOpen && (
        <EditTransaction
          setEditTransaction={setIsEditTransactionOpen}
          taskToEdit={TaskToEdit}
          setTransactions={setTransactions}
          setShowEditTaskNotification={setShowEditTaskNotification}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<OverviewPage transactions={transactions} setIsAddTransactionOpen={setIsAddTransactionOpen} />}
        />
        <Route
          path="/transactions"
          element={
            <TransactionsPage
              transactions={transactions}
              setTransactions={setTransactions}
              setIsAddTransactionOpen={setIsAddTransactionOpen}
              handleEditTransaction={handleEditTransaction}
              setShowDeleteTaskNotification={setShowDeleteTaskNotification}
            />
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
      {showAddedTaskNotification && (
        <div className="notification" role="status" aria-live="polite">
          <i className="fa-solid fa-check" aria-hidden="true"></i>
          <p>Transaction added</p>
        </div>
      )}
      {showEditTaskNotification && (
        <div className="notification" role="status" aria-live="polite">
          <i className="fa-solid fa-check" aria-hidden="true"></i>
          <p>Transaction updated</p>
        </div>
      )}
      {showDeleteTaskNotification && (
        <div className="notification" role="status" aria-live="polite">
          <i className="fa-solid fa-check" aria-hidden="true"></i>
          <p>Transaction deleted</p>
        </div>
      )}
    </>
  );
}

export default App;
