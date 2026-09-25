import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import type { Transaction } from "../App";
import { useState } from "react";
import dayjs from "dayjs";
import "./TransactionsPage.css";

interface TransactionsPageProps {
  transactions: Transaction[];
  setIsAddTransactionOpen: (isAddTransactionOpen: boolean) => void;
  setTransactions: (
    transactions:
      | Transaction[]
      | ((currentTransactions: Transaction[]) => Transaction[]),
  ) => void;
  handleEditTransaction: (transaction: Transaction) => void;
}
export function TransactionsPage({
  transactions,
  setTransactions,
  setIsAddTransactionOpen,
  handleEditTransaction,
}: TransactionsPageProps) {
  const [typeFilter, setTypeFilter] = useState<
    "All types" | "Expense" | "Income"
  >("All types");
  const [categoryFilter, setCategoryFilter] = useState("All categories");

  const handleTypeFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTypeFilter(event.target.value as "All types" | "Expense" | "Income");
  };
  const handleCategoryFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategoryFilter(event.target.value);
  };
  // Keep transactions that match the selected type and category filters.
  const filteredTransactions = () => {
    return transactions.filter((transaction) => {
      const typeMatches =
        typeFilter === "All types" || transaction.type === typeFilter;

      const categoryMatches =
        categoryFilter === "All categories" ||
        transaction.category === categoryFilter;

      return typeMatches && categoryMatches;
    });
  };
  // Function to handle the deletion of a transaction by its ID
  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((currentTransactions: Transaction[]) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== transactionId,
      ),
    );
  };

  return (
    <main className="App transactions-page">
      <Sidebar />
      <section className="main-content">
        <Header title="Transactions" />
        <div className="transactions-content">
          <div className="transactions-intro">
            <div>
              <p>{filteredTransactions().length} entries in your space</p>
              <h2>Transactions</h2>
            </div>
            <button
              type="button"
              className="transaction-add"
              onClick={() => setIsAddTransactionOpen(true)}
            >
              <span aria-hidden="true">+</span> Add transaction
            </button>
          </div>

          <section
            className="transactions-card"
            aria-label="Transactions overview"
          >
            <div
              className="transaction-toolbar"
              role="toolbar"
              aria-label="Transactions controls"
            >
              <label
                className="transaction-search"
                htmlFor="transaction-search-input"
              >
                <span aria-hidden="true">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  id="transaction-search-input"
                  type="search"
                  placeholder="Search transactions..."
                  aria-label="Search transactions"
                />
              </label>

              <div className="transaction-filter-wrap">
                <span className="transaction-filter-icon" aria-hidden="true">
                  <i className="fa-solid fa-sliders"></i>
                </span>
                <select
                  className="transaction-filter-select"
                  defaultValue="All types"
                  aria-label="Filter by type"
                  id="all-types"
                  value={typeFilter}
                  onChange={handleTypeFilterChange}
                >
                  <option>All types</option>
                  <option>Expense</option>
                  <option>Income</option>
                </select>
              </div>

              <div className="transaction-filter-wrap">
                <span className="transaction-filter-icon" aria-hidden="true">
                  <i className="fa-solid fa-sliders"></i>
                </span>
                <select
                  className="transaction-filter-select"
                  defaultValue="All categories"
                  aria-label="Filter by category"
                  id="all-categories"
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                >
                  <option>All categories</option>
                  <option>Housing</option>
                  <option>Transportation</option>
                  <option>Food</option>
                  <option>Wellness</option>
                  <option>Salary</option>
                  <option>Healthcare</option>
                  <option>Savings & Investments</option>
                  <option>Personal Spending</option>
                  <option>Entertainment</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <ul className="transaction-list" aria-label="Transaction list">
              {filteredTransactions().map((transaction) => (
                <li className="transaction-row" key={transaction.id}>
                  <span
                    className={`transaction-icon transaction-icon--${transaction.tone}`}
                    aria-hidden="true"
                  >
                    <i
                      className={`fa-solid ${transaction.type === "Income" ? "fa-arrow-up" : "fa-arrow-down"}`}
                    />
                  </span>
                  <div className="transaction-info">
                    <strong>{transaction.title}</strong>
                    <small>
                      <span>{transaction.merchant}</span>
                      <span className="transaction-meta-separator">•</span>
                      <span>{transaction.category}</span>
                    </small>
                    <p>{transaction.note}</p>
                  </div>
                  <div className="transaction-amount">
                    <div className="transaction-amount-values">
                      <strong
                        className={
                          transaction.amount.income > 0 ? "income" : "expense"
                        }
                      >
                        {transaction.amount.income > 0
                          ? `+$${transaction.amount.income.toFixed(2)}`
                          : `-$${transaction.amount.expense.toFixed(2)}`}
                      </strong>
                      <small>{dayjs(transaction.date).format("MMM D")}</small>
                    </div>
                    <button
                      type="button"
                      className="transaction-delete"
                      aria-label={`Delete ${transaction.title}`}
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                    <button
                      type="button"
                      className="transaction-edit"
                      aria-label={`Edit ${transaction.title}`}
                      onClick={() => handleEditTransaction(transaction)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
