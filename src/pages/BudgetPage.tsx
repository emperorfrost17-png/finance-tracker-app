import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import type { Transaction } from "../App";
import { useEffect, useState } from "react";
import "./BudgetPage.css";

interface Budget {
  id: string;
  name: string;
  icon: string;
  limit: number;
  remaining: string;
  tone: string;
}

export function BudgetPage({ transactions }: { transactions: Transaction[] }) {
  const createdDefaultBudgets = () => {
    return [
    {
      id: crypto.randomUUID(),
      name: "Housing",
      icon: "◎",
      limit: 2000,
      remaining: "100% of room left",
      tone: "coral",
    },
    {
      id: crypto.randomUUID(),
      name: "Food",
      icon: "▣",
      limit: 540,
      remaining: "100% of room left",
      tone: "gold",
    },
    {
      id: crypto.randomUUID(),
      name: "Transportation",
      icon: "✦",
      limit: 180,
      remaining: "100% of room left",
      tone: "coral",
    },

    {
      id: crypto.randomUUID(),
      name: "Personal Spending",
      icon: "●",
      limit: 300,
      remaining: "100% of room left",
      tone: "blue",
    },
    {
      id: crypto.randomUUID(),
      name: "Savings & Investments",
      icon: "●",
      limit: 300,
      remaining: "100% of room left",
      tone: "blue",
    },
    {
      id: crypto.randomUUID(),
      name: "Healthcare",
      icon: "●",
      limit: 300,
      remaining: "100% of room left",
      tone: "blue",
    },
    {
      id: crypto.randomUUID(),
      name: "Other",
      icon: "●",
      limit: 300,
      remaining: "100% of room left",
      tone: "blue",
    },
    {
      id: crypto.randomUUID(),
      name: "Wellness",
      icon: "✦",
      limit: 160,
      remaining: "100% of room left",
      tone: "olive",
    },
    {
      id: crypto.randomUUID(),
      name: "Entertainment",
      icon: "●",
      limit: 100,
      remaining: "100% of room left",
      tone: "plum",
    },
    ];
  };

  const handleBudgetLimitChange = (budgetId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseFloat(event.target.value);
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === budgetId
          ? { ...budget, limit: newLimit }
          : budget,
      ),
    );
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

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const totalBudgetLimitForMonth = budgets.reduce(
    (sum, budget) => sum + budget.limit,
    0,
  );

  const spentBudgetForMonth = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount.expense, 0);
   

  return (
    <main className="App budgets-page">
      <Sidebar />

      <section className="main-content">
        <Header title="Budgets" />
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
              <strong>${totalBudgetLimitForMonth.toFixed(2)} </strong>
            </div>
            <div className="summary-card">
              <i>▣</i>
              <span>Spent so far</span>
              <strong>${spentBudgetForMonth.toFixed(2)}</strong>
            </div>
            <div className="summary-card">
              <i>✦</i>
              <span>Categories</span>
              <strong>{budgets.length}</strong>
            </div>
          </section>

          <section className="budget-grid">
            {budgets.map((budget) => {
              const spent = transactions
                .filter(
                  (transaction) =>
                    transaction.category === budget.name &&
                    transaction.type === "Expense",
                )
                .reduce(
                  (total, transaction) => total + transaction.amount.expense,
                  0,
                );

              return (
                <article className="budget-card" key={budget.id}>
                  <div className="budget-card__heading">
                    <div>
                      <i className={`budget-dot budget-dot--${budget.tone}`}>
                        {budget.icon}
                      </i>
                      <h3>{budget.name}</h3>
                    </div>
                    <span className="budget-limit">
                      USD
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
                  <p>{budget.remaining}</p>
                  <strong className="budget-amount">${spent.toFixed(2)}</strong>
                  <div className="budget-card__meta">
                    <span>of ${budget.limit.toFixed(2)} used</span>
                    <b className="budget-percent">0%</b>
                  </div>
                  <div className="budget-progress">
                    <i className="budget-progress__fill" />
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
