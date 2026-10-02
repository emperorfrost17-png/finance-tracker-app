import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import type { Transaction } from "../App";
import { useState } from "react";
import "./BudgetPage.css";

interface Budget {
  id: string;
  name: string;
  icon: string;
  spent: string;
  limit: number;
  remaining: string;
  tone: string;
};

export function BudgetPage({ transactions }: { transactions: Transaction[] }) {
  const handleBudgetLimitChange = (
    budgetId: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) =>
        budget.id === budgetId ? { ...budget, limit: parseFloat(event.target.value) } : budget
      )
    );
    
    // Here you can also update the budget limit in your state or context if needed
  };
  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: crypto.randomUUID(),
      name: "Housing",
      icon: "◎",
      spent: "$1,420.00",
      limit:  2000,
      remaining: "100% of room left",
      tone: "coral",
    },
    {
      id: crypto.randomUUID(),
      name: "Food",
      icon: "▣",
      spent: "$165.72",
      limit: 540,
      remaining: "100% of room left",
      tone: "gold",
    },
    {
      id: crypto.randomUUID(),
      name: "Transport",
      icon: "✦",
      spent: "$72.00",
      limit: 180,
      remaining: "100% of room left",
      tone: "coral",
    },
    {
      id: crypto.randomUUID(),
      name: "Shopping",
      icon: "●",
      spent: "$128.00",
      limit: 300,
      remaining: "100% of room left",
      tone: "blue",
    },
    {
      id: crypto.randomUUID(),
      name: "Wellness",
      icon: "✦",
      spent: "$38.00",
      limit: 160,
      remaining: "100% of room left",
      tone: "olive",
    },
    {
      id: crypto.randomUUID(),
      name: "Entertainment",
      icon: "●",
      spent: "$19.99",
      limit: 100,
      remaining: "100% of room left",
      tone: "plum",
    },
  ]);

  

  const totalBudgetLimitForMonth = budgets.reduce(
    (sum, budget) => sum + budget.limit,
    0,
  );
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
              <strong>$2K</strong>
            </div>
            <div className="summary-card">
              <i>✦</i>
              <span>Categories</span>
              <strong>{budgets.length}</strong>
            </div>
          </section>

          <section className="budget-grid">
            {budgets.map((budget) => (
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
                      value={ budget.limit}
                      onChange={(event) => handleBudgetLimitChange(budget.id, event)}
                      aria-label={`${budget.name} budget limit`}
                    />
                  </span>
                </div>
                <p>{budget.remaining}</p>
                <strong className="budget-amount">{budget.spent}</strong>
                <div className="budget-card__meta">
                  <span>of ${budget.limit.toFixed(2)} used</span>
                  <b className="budget-percent">0%</b>
                </div>
                <div className="budget-progress">
                  <i className="budget-progress__fill" />
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
