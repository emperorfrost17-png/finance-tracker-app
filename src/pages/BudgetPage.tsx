import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import "./BudgetPage.css";

type Budget = {
  name: string;
  icon: string;
  spent: string;
  limit: string;
  remaining: string;
  tone: string;
};

const budgets: Budget[] = [
  {
    name: "Housing",
    icon: "◎",
    spent: "$1,420.00",
    limit: "$1,500.00",
    remaining: "100% of room left",
    tone: "coral",
  },
  {
    name: "Food",
    icon: "▣",
    spent: "$165.72",
    limit: "$540.00",
    remaining: "100% of room left",
    tone: "gold",
  },
  {
    name: "Transport",
    icon: "✦",
    spent: "$72.00",
    limit: "$180.00",
    remaining: "100% of room left",
    tone: "coral",
  },
  {
    name: "Shopping",
    icon: "●",
    spent: "$128.00",
    limit: "$300.00",
    remaining: "100% of room left",
    tone: "blue",
  },
  {
    name: "Wellness",
    icon: "✦",
    spent: "$38.00",
    limit: "$160.00",
    remaining: "100% of room left",
    tone: "olive",
  },
  {
    name: "Entertainment",
    icon: "●",
    spent: "$19.99",
    limit: "$120.00",
    remaining: "100% of room left",
    tone: "plum",
  },
];

export function BudgetPage() {
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
              <strong>$3K</strong>
            </div>
            <div className="summary-card">
              <i>▣</i>
              <span>Spent so far</span>
              <strong>$2K</strong>
            </div>
            <div className="summary-card">
              <i>✦</i>
              <span>Categories</span>
              <strong>6</strong>
            </div>
          </section>

          <section className="budget-grid">
            {budgets.map((budget) => (
              <article className="budget-card" key={budget.name}>
                <div className="budget-card__heading">
                  <div>
                    <i className={`budget-dot budget-dot--${budget.tone}`}>
                      {budget.icon}
                    </i>
                    <h3>{budget.name}</h3>
                  </div>
                  <span className="budget-limit">
                    USD <b>{budget.limit.replace("$", "")}</b>⌕
                  </span>
                </div>
                <p>{budget.remaining}</p>
                <strong className="budget-amount">{budget.spent}</strong>
                <div className="budget-card__meta">
                  <span>of {budget.limit} used</span>
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
