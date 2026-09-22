import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import type { Transaction } from "../App";
import "./TransactionsPage.css";

export function TransactionsPage({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <main className="App transactions-page">
      <Sidebar />
      <section className="main-content">
        <Header title="Transactions" />
        <div className="transactions-content">
          <div className="transactions-intro">
            <div>
              <p>10 entries in your space</p>
              <h2>Transactions</h2>
            </div>
            <button type="button" className="transaction-add">
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
                <span aria-hidden="true">⌕</span>
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
                    {transaction.icon}
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
                    <strong
                      className={transaction.amount.income > 0 ? "income" : ""}
                    >
                      {transaction.amount.income > 0
                        ? `+$${transaction.amount.income.toFixed(2)}`
                        : `-$${transaction.amount.expense.toFixed(2)}`}
                    </strong>
                    <small>{transaction.date}</small>
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
