import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import type { Transaction } from "../App";
import dayjs from "dayjs";
import { formatMoney } from "../components/formatMoney";
import type { Budget } from "../App";
import "./BudgetPage.css";

interface BudgetProps {
  transactions: Transaction[];
  accountName: string;
  currency: string;
  budgets: Budget[];
  setBudgets: (prevBudgets: Budget[] | ((prev: Budget[]) => Budget[])) => void;
  focusMonth: string;
}

export function BudgetPage({
  transactions,
  accountName,
  currency,
  budgets,
  setBudgets,
  focusMonth,
}: BudgetProps) {
  const handleBudgetLimitChange = (
    budgetId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const parsed = parseFloat(event.target.value);
    const newLimit = Number.isNaN(parsed) ? 0 : Math.max(0, parsed); // Ensure the limit is not negative
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === budgetId ? { ...budget, limit: newLimit } : budget,
      ),
    );
  };
  const isThisMonth = (t: Transaction) =>
    dayjs(t.date).isSame(dayjs(focusMonth), "month");

  const totalBudgetLimitForMonth = budgets.reduce(
    (sum, budget) => sum + budget.limit,
    0,
  );

  const spentBudgetForMonth = transactions
    .filter((transaction) => transaction.type === "Expense" && isThisMonth(transaction))
    .reduce((sum, transaction) => sum + transaction.amount.expense, 0);
    
  const toneByCategory: Record<string, string> = {
    Housing: "#75a1ae",
    Transportation: "#75a1ae",
    Food: "#d97b5e",
    Wellness: "#a5ae79",
    Salary: "#5f9b8e",
    Healthcare: "#bd92a2",
    "Savings & Investments": "#d79c57",
    "Personal Spending": "#8299c4",
    Entertainment: "#d97b5e",
    Other: "#75a1ae",
  };

  return (
    <main className="App budgets-page">
      <Sidebar />

      <section className="main-content">
        <Header title="Budgets" name={accountName} />
        <div className="budgets-content">
          <section className="budgets-intro">
            <p>A plan that flexes with real life</p>
            <h2>Budgets</h2>
            <span>
              Set a comfortable ceiling for the things you care about. You can
              edit any limit online — no
              <br /> spreadsheets, no guilt.
            </span>
          </section>

          <section className="budget-summary">
            <div className="summary-card">
              <i>◎</i>
              <span>Planned this month</span>
              <strong>{formatMoney(totalBudgetLimitForMonth, currency)}</strong>
            </div>
            <div className="summary-card">
              <i>▣</i>
              <span>Spent so far</span>
              <strong>{formatMoney(spentBudgetForMonth, currency)}</strong>
            </div>
            <div className="summary-card">
              <i>✦</i>
              <span>Categories</span>
              <strong>{budgets.length}</strong>
            </div>
          </section>

          <section className="budget-grid">
            {budgets.map((budget, index) => {
              const spent = transactions
                .filter(
                  (transaction) =>
                    transaction.category === budget.name &&
                    transaction.type === "Expense" &&
                    isThisMonth(transaction),
                )
                .reduce(
                  (total, transaction) => total + transaction.amount.expense,
                  0,
                );
              const usedPercent =
                budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
              const remainingPercent =
                100 - usedPercent < 0 ? 0 : 100 - usedPercent;
              const progressPercent = Math.min(
                // this ensures that the progress bar does not go below 0% or above 100%
                Math.max(usedPercent, 0),
                100,
              );

              return (
                <article
                  className="budget-card"
                  key={budget.id}
                  style={{ animationDelay: `${Math.min(index * 35, 280)}ms` }}
                >
                  <div className="budget-card__heading">
                    <div>
                      <i className={`budget-dot budget-dot--${budget.tone}`}>
                        {budget.icon}
                      </i>
                      <h3>{budget.name}</h3>
                    </div>
                    <span className="budget-limit">
                      {currency}{" "}
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        value={budget.limit}
                        onChange={(event) =>
                          handleBudgetLimitChange(budget.id, event)
                        }
                        aria-label={`${budget.name} budget limit`}
                      />
                      <i className="fa-solid fa-pen" aria-hidden="true"></i>
                    </span>
                  </div>
                  <p>{remainingPercent.toFixed(1)} % of room left</p>
                  <strong className="budget-amount">
                    {formatMoney(spent, currency)}
                  </strong>
                  <div className="budget-card__meta">
                    <span>of {formatMoney(budget.limit, currency)} used</span>
                    <b
                      className="budget-percent"
                      style={{
                        color:
                          spent >= budget.limit
                            ? "#d97b5e"
                            : (toneByCategory[budget.name] ?? "#75a1ae"),
                      }}
                    >
                      {progressPercent.toFixed(1)}%
                    </b>
                  </div>
                  <div
                    className="budget-progress"
                    role="progressbar"
                    aria-label={`${budget.name} budget used`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progressPercent}
                  >
                    <i
                      className="budget-progress__fill"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor:
                          spent >= budget.limit
                            ? "#d97b5e"
                            : (toneByCategory[budget.name] ?? "#75a1ae"),
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
