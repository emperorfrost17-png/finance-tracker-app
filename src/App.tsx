import { OverviewPage } from "./pages/OverviewPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { BudgetPage } from "./pages/BudgetPage";
import { AddTransaction } from "./components/AddTransaction";
import { EditTransaction } from "./components/EditTransaction";
import { createdDefaultBudgets } from "./components/defaultBudgets";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import dayjs from "dayjs";
import "./App.css";

export interface Transaction {
  readonly id: string;
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
  createdAt: string; // ISO string representation of the date and time when the transaction was created
}
export interface Budget {
  id: string;
  name: string;
  icon: string;
  limit: number;
  remaining: number;
  tone: string;
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
  const [accountName, setAccountName] = useState(() => {
    try {
      const storedAccountName = localStorage.getItem("accountName");
      return storedAccountName ? JSON.parse(storedAccountName) : "Nathan";
    } catch {
      return "Nathan";
    }
  });
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [TransactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const [
    showAddedTransactionNotification,
    setShowAddedTransactionNotification,
  ] = useState(false);
  const [showEditTransactionNotification, setShowEditTransactionNotification] =
    useState(false);
  const [
    showDeleteTransactionNotification,
    setShowDeleteTransactionNotification,
  ] = useState(false);
  const [typeFilter, setTypeFilter] = useState<
    "All types" | "Expense" | "Income"
  >("All types");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState(() => {
    try {
      const storedCurrency = localStorage.getItem("currency");
      return storedCurrency ? JSON.parse(storedCurrency) : "USD";
    } catch {
      return "USD";
    }
  });

  const [focusMonth, setFocusMonth] = useState<string>(() => {
    const fallback = dayjs().format("YYYY-MM");
    try {
      const stored = localStorage.getItem("focusMonth");
      const parsed = stored ? JSON.parse(stored) : fallback;
      // Check if the parsed value is in the correct format (YYYY-MM)
      // If not, return the fallback value
      return /^\d{4}-\d{2}$/.test(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  });
  const handleFocusMonthChange = (newMonth: string) => {
    setFocusMonth(newMonth);
  };
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    try {
      const savedBudgets = localStorage.getItem("budgets");
      if (savedBudgets) {
        return JSON.parse(savedBudgets) as Budget[];
      }
    } catch (error) {
      console.error("Failed to load saved budgets.", error);
      return createdDefaultBudgets();
    }

    return createdDefaultBudgets();
  });

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsEditTransactionOpen(true);
  };
  const byNewestFirst = (a: Transaction, b: Transaction) =>
    dayjs(b.date).diff(dayjs(a.date)) ||
    dayjs(b.createdAt).diff(dayjs(a.createdAt));

  const filteredTransactions = () => {
    return transactions.filter((transaction) => {
      const typeMatches =
        typeFilter === "All types" || transaction.type === typeFilter;

      const categoryMatches =
        categoryFilter === "All categories" ||
        transaction.category === categoryFilter;
      const searchMatches =
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (transaction.merchant &&
          transaction.merchant
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      return typeMatches && categoryMatches && searchMatches;
    });
  };

  const sortedTransactions = [...transactions].sort(byNewestFirst);
  const filteredSortedTransactions = [...filteredTransactions()].sort(
    byNewestFirst,
  );
  useEffect(() => {
    const isActive =
      showAddedTransactionNotification ||
      showEditTransactionNotification ||
      showDeleteTransactionNotification;
    if (!isActive) return;
    const timer = setTimeout(() => {
      setShowAddedTransactionNotification(false);
      setShowEditTransactionNotification(false);
      setShowDeleteTransactionNotification(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [
    showAddedTransactionNotification,
    showEditTransactionNotification,
    showDeleteTransactionNotification,
  ]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("accountName", JSON.stringify(accountName));
    localStorage.setItem("currency", JSON.stringify(currency));
    localStorage.setItem("budgets", JSON.stringify(budgets));
    localStorage.setItem("focusMonth", JSON.stringify(focusMonth));
  }, [transactions, accountName, currency, budgets, focusMonth]);

  return (
    <>
      {isAddTransactionOpen && (
        <AddTransaction
          setAddTransaction={setIsAddTransactionOpen}
          setTransactions={setTransactions}
          setShowAddedTransactionNotification={
            setShowAddedTransactionNotification
          }
          currency={currency}
        />
      )}
      {isEditTransactionOpen && (
        <EditTransaction
          setEditTransaction={setIsEditTransactionOpen}
          transactionToEdit={TransactionToEdit}
          setTransactions={setTransactions}
          setShowEditTransactionNotification={
            setShowEditTransactionNotification
          }
          currency={currency}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <OverviewPage
              transactions={transactions}
              sortedTransactions={sortedTransactions}
              setIsAddTransactionOpen={setIsAddTransactionOpen}
              accountName={accountName}
              currency={currency}
              budgets={budgets}
            />
          }
        />
        <Route
          path="/transactions"
          element={
            <TransactionsPage
              transactions={transactions}
              setTransactions={setTransactions}
              setIsAddTransactionOpen={setIsAddTransactionOpen}
              handleEditTransaction={handleEditTransaction}
              setShowDeleteTransactionNotification={
                setShowDeleteTransactionNotification
              }
              typeFilter={typeFilter}
              categoryFilter={categoryFilter}
              filteredSortedTransactions={filteredSortedTransactions}
              searchQuery={searchQuery}
              setTypeFilter={setTypeFilter}
              setCategoryFilter={setCategoryFilter}
              setSearchQuery={setSearchQuery}
              accountName={accountName}
              currency={currency}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              accountName={accountName}
              setAccountName={setAccountName}
              currency={currency}
              setCurrency={setCurrency}
              focusMonth={focusMonth}
              handleFocusMonthChange={handleFocusMonthChange}
              transactions={transactions}
            />
          }
        />
        <Route
          path="/budget"
          element={
            <BudgetPage
              transactions={transactions}
              accountName={accountName}
              currency={currency}
              budgets={budgets}
              setBudgets={setBudgets}
            />
          }
        />
      </Routes>
      {showAddedTransactionNotification && (
        <div className="notification" role="status" aria-live="polite">
          <i className="fa-solid fa-check" aria-hidden="true"></i>
          <p>Transaction added</p>
        </div>
      )}
      {showEditTransactionNotification && (
        <div className="notification" role="status" aria-live="polite">
          <i className="fa-solid fa-check" aria-hidden="true"></i>
          <p>Transaction updated</p>
        </div>
      )}
      {showDeleteTransactionNotification && (
        <div className="notification" role="status" aria-live="polite">
          <i className="fa-solid fa-check" aria-hidden="true"></i>
          <p>Transaction deleted</p>
        </div>
      )}
    </>
  );
}

export default App;
