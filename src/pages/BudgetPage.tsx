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
interface BudgetPageProps {
  transactions: Transaction[];
}

export function BudgetPage({ transactions }: BudgetPageProps) {
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
      return [];
    }

    
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
