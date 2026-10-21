import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import type { Transaction } from "../App";
import { NoSpendingYet } from "../components/NoSpendingYet";
import { BarChart } from "../components/BarChart";
import dayjs from "dayjs";
import { Link } from "react-router";
import { formatMoney } from "../components/formatMoney";
import type { Budget } from "../App";
import "./OverviewPage.css";

interface OverviewPageProps {
  transactions: Transaction[];
  setIsAddTransactionOpen: (isOpen: boolean) => void;
  accountName: string;
  sortedTransactions: Transaction[];
  currency: string;
  budgets: Budget[];
}
export function OverviewPage({
  transactions,
  setIsAddTransactionOpen,
  accountName,
  sortedTransactions,
  currency,
  budgets,
}: OverviewPageProps) {
  let availableBalance = 0;
  let totalIncome = 0;
  let totalExpenses = 0;
  transactions.forEach((transaction) => {
    totalIncome += transaction.amount.income;
    totalExpenses += transaction.amount.expense;
    availableBalance = totalIncome - totalExpenses;
  });
  const budgetsWithSpent = budgets
    .map((budget) => {
      const spent = transactions
        .filter((t) => t.category === budget.name && t.type === "Expense")
        .reduce((total, t) => total + t.amount.expense, 0);
      return { ...budget, spent };
    })
    .sort((a, b) => b.spent - a.spent) // highest spent first
    .slice(0, 4);
  return (
    <main className="App overview-page">
      <Sidebar />

      <section className="main-content">
        <Header title="Overview" name={accountName} />

        <div className="overview-content">
          <section className="welcome-row">
            <div>
              <p className="welcome-eyebrow">Good morning, {accountName}</p>
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
              <strong>{formatMoney(availableBalance, currency)}</strong>
              <p>
                <span className="status-pill">On track</span> for your{" "}
                {dayjs().format("MMMM")} budget
              </p>
            </div>
            <div className="balance-stats">
              <div>
                <span>Income</span>
                <strong>{formatMoney(totalIncome, currency)}</strong>
              </div>
              <div>
                <span>Spent</span>
                <strong>{formatMoney(totalExpenses, currency)}</strong>
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
            <BarChart transactions={transactions} currency={currency} />

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
                      .map(([category, data], index) => {
                        const budget = budgets.find((b) => b.name === category);
                        const progressPercent =
                          budget && budget.limit > 0
                            ? Math.min((data.amount / budget.limit) * 100, 100)
                            : 0;

                        return (
                          <div
                            className="category-row"
                            key={category}
                            style={{
                              animationDelay: `${Math.min(index * 35, 280)}ms`,
                            }}
                          >
                            <div>
                              <span
                                className={`category-dot category-dot--${data.tone}`}
                              />
                              <strong>{category}</strong>
                              <small>
                                {formatMoney(data.amount, currency)}
                              </small>
                            </div>
                            <span
                              className={`category-bar category-bar--${data.tone}`}
                              style={{ width: `${progressPercent}%` }}
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
                {budgetsWithSpent.map(({ name, limit, tone, spent }, index) => {
                  const usedPercent = limit > 0 ? (spent / limit) * 100 : 0;

                  const progressPercent = Math.min(
                    // this ensures that the progress bar does not go below 0% or above 100%
                    Math.max(usedPercent, 0),
                    100,
                  );

                  return (
                    <div
                      className="budget-row"
                      key={name}
                      style={{
                        animationDelay: `${Math.min(index * 35, 280)}ms`,
                      }}
                    >
                      <div>
                        <strong>{name}</strong>
                        <span>
                          <b
                            className={
                              spent >= limit ? `text--coral` : `text--${tone}`
                            }
                          >
                            {formatMoney(spent, currency)}
                          </b>{" "}
                          / {formatMoney(limit, currency)}
                        </span>
                      </div>
                      <div className="budget-track">
                        <i
                          className={
                            spent >= limit
                              ? `budget-fill budget-fill--coral`
                              : `budget-fill budget-fill--${tone}`
                          }
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
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
                  sortedTransactions.slice(0, 5).map((transaction, index) => (
                    <div
                      className="activity-row"
                      key={transaction.id}
                      style={{
                        animationDelay: `${Math.min(index * 35, 280)}ms`,
                      }}
                    >
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
                            ? `-${formatMoney(transaction.amount.expense, currency)}`
                            : `+${formatMoney(transaction.amount.income, currency)}`}
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
