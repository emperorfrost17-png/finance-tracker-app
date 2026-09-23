import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import type { Transaction } from "../App";
import dayjs from "dayjs";
import "./TransactionsPage.css";

interface TransactionsPageProps {
  transactions: Transaction[];
  setIsAddTransactionOpen: (isAddTransactionOpen: boolean) => void;
  setTransactions: (
    transactions:
      | Transaction[]
      | ((newTransactions: Transaction[]) => Transaction[]),
  ) => void;
}
export function TransactionsPage({
  transactions,
  setTransactions,
  setIsAddTransactionOpen,
}: TransactionsPageProps) {

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
              <p>{transactions.length} entries in your space</p>
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
                <span aria-hidden="true"><i className="fa-solid fa-magnifying-glass"></i></span>
                <input
                  id="transaction-search-input"
                  type="search"
                  placeholder="Search transactions..."
                  aria-label="Search transactions"
                />
              </label>
              <button
                type="button"
                className="transaction-filter"
                aria-label="Filter by type"
              >
                ☷ &nbsp; All types &nbsp;⌄
              </button>
              <button
                type="button"
                className="transaction-filter"
                aria-label="Filter by category"
              >
                ☷ &nbsp; All categories &nbsp;⌄
              </button>
            </div>
            <ul className="transaction-list" aria-label="Transaction list">
              {transactions.map((transaction) => (
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
