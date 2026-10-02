import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import type { Transaction } from "../App";
import { NoSpendingYet } from "../components/NoSpendingYet";
import { BarChart } from "../components/BarChart";
import dayjs from "dayjs";
import { Link } from "react-router";
import "./OverviewPage.css";

interface OverviewPageProps {
  transactions: Transaction[];
  setIsAddTransactionOpen: (isOpen: boolean) => void;
  sortByDateAscending: Transaction[];
}
export function OverviewPage({
  transactions,
  setIsAddTransactionOpen,
  sortByDateAscending,
}: OverviewPageProps) {
  let availableBalance = 0;
  let totalIncome = 0;
  let totalExpenses = 0;
  transactions.forEach((transaction) => {
    totalIncome += transaction.amount.income;
    totalExpenses += transaction.amount.expense;
    availableBalance = totalIncome - totalExpenses;
  });
  return (
    <main className="App">
      <Sidebar />

      <section className="main-content">
        <Header title="Overview" />

        <div className="overview-content">
          <section className="welcome-row">
            <div>
              <p className="welcome-eyebrow">Good morning, Maya</p>
              <h1>
                A clearer month
                <br />
                <span>starts here.</span>
              </h1>
            </div>
            <div className="overview-actions">
              <button
                className="add-button"
                type="button"
                onClick={() => setIsAddTransactionOpen(true)}
              >
                <span aria-hidden="true">+</span> Add
              </button>
            </div>
          </section>

          <section className="balance-banner">
            <div className="balance-copy">
              <span className="panel-kicker">Available balance</span>
              <strong>
                $
                {availableBalance >= 1000
                  ? `${(availableBalance / 1000).toFixed(1)}K`
                  : `${availableBalance.toFixed(2)}`}
              </strong>
              <p>
                <span className="status-pill">On track</span> for your {dayjs().format("MMMM")} budget
              </p>
            </div>
            <div className="balance-stats">
              <div>
                <span>Income</span>
                <strong>
                  $
                  {totalIncome >= 1000
                    ? `${(totalIncome / 1000).toFixed(1)}K`
                    : `${totalIncome.toFixed(2)}`}
                </strong>
              </div>
              <div>
                <span>Spent</span>
                <strong>
                  $
                  {totalExpenses >= 1000
                    ? `${(totalExpenses / 1000).toFixed(1)}K`
                    : `${totalExpenses.toFixed(2)}`}
                </strong>
              </div>
              <div>
                <span>Savings rate</span>
                <strong>
                  {totalIncome > 0
                    ? (
                        ((totalIncome - totalExpenses) / totalIncome) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </strong>
              </div>
              <div>
                <span>Transactions</span>
                <strong>{transactions.length}</strong>
              </div>
            </div>
          </section>

          <div className="overview-grid overview-grid--top">
            <BarChart transactions={transactions} />

            <section className="dashboard-panel category-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">By category</span>
                  <h2>Where it goes</h2>
                </div>
                <Link to="/transactions" className="panel-note">
                  View all
                </Link>
              </div>
              <div className="category-list">
                {totalExpenses === 0 && <NoSpendingYet />}

                {(() => {
                  // Group expenses by category
                  const byCategory: Record<
                    string,
                    { amount: number; tone: string }
                  > = {};
                  transactions
                    .filter((t) => t.amount.expense > 0)
                    .forEach((t) => {
                      if (!byCategory[t.category]) {
                        byCategory[t.category] = { amount: 0, tone: t.tone };
                      }
                      byCategory[t.category].amount += t.amount.expense;
                    });

                  // Converts your object into an array of [key, value] pairs:
                  return (
                    Object.entries(byCategory)
                      //ignore the key and just sort by the value (total expense) in descending order
                      .sort(([, a], [, b]) => b.amount - a.amount) // Sort by highest spending
                      .map(([category, data]) => {
                        const percentage = (
                          (data.amount / totalExpenses) *
                          100
                        ).toFixed(1);
                        return (
                          <div className="category-row" key={category}>
                            <div>
                              <span
                                className={`category-dot category-dot--${data.tone}`}
                              />
                              <strong>{category}</strong>
                              <small>${data.amount.toFixed(2)}</small>
                            </div>
                            <span
                              className={`category-bar category-bar--${data.tone}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        );
                      })
                  );
                })()}
              </div>
            </section>
          </div>

          <div className="overview-grid overview-grid--bottom">
            <section className="dashboard-panel budget-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">A gentle check-in</span>
                  <h2>Budget pulse</h2>
                </div>
                <Link to="/budget" className="panel-note">
                  <span className="panel-note">Manage</span>
                </Link>
              </div>
              <div className="budget-list">
                {[
                  ["Housing", "$1,420.00", "$2K", "78%", "coral"],
                  ["Food", "$165.72", "$540.00", "32%", "gold"],
                  ["Transport", "$72.00", "$180.00", "40%", "coral"],
                  ["Shopping", "$128.00", "$300.00", "43%", "blue"],
                ].map(([name, spent, total, width, color]) => (
                  <div className="budget-row" key={name}>
                    <div>
                      <strong>{name}</strong>
                      <span>
                        <b className={`text--${color}`}>{spent}</b> / {total}
                      </span>
                    </div>
                    <div className="budget-track">
                      <i
                        className={`budget-fill budget-fill--${color}`}
                        style={{ width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-panel activity-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">Latest moves</span>
                  <h2>Recent activity</h2>
                </div>
                <Link to="/transactions" className="panel-note">
                  <span className="panel-note">See all</span>
                </Link>
              </div>
              <div className="activity-list">
                {transactions.length === 0 ? (
                  <div className="activity-empty">
                    <span className="activity-empty-icon" aria-hidden="true">
                      <i className="fa-solid fa-arrow-right-arrow-left" />
                    </span>
                    <strong>No activity yet</strong>
                    <p>Your recent transactions will show up here.</p>
                    <button
                      className="activity-empty-action"
                      type="button"
                      onClick={() => setIsAddTransactionOpen(true)}
                    >
                      <i className="fa-solid fa-plus" aria-hidden="true" />
                      Add transaction
                    </button>
                  </div>
                ) : (
                  sortByDateAscending.slice(0, 5).map((transaction) => (
                    <div className="activity-row" key={transaction.id}>
                      <span
                        className={`activity-icon activity-icon--${transaction.tone}`}
                      >
                        <i
                          className={`fa-solid ${transaction.type === "Income" ? "fa-arrow-up" : "fa-arrow-down"}`}
                        />
                      </span>
                      <div>
                        <strong>{transaction.title}</strong>
                        <small>{transaction.note}</small>
                      </div>
                      <div className="activity-amount">
                        <strong
                          className={
                            transaction.amount.income > 0 ? "income" : "expense"
                          }
                        >
                          {transaction.amount.expense > 0
                            ? `-$${transaction.amount.expense.toFixed(2)}`
                            : `+$${transaction.amount.income.toFixed(2)}`}
                        </strong>
                        <small>{dayjs(transaction.date).format("MMM D")}</small>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
