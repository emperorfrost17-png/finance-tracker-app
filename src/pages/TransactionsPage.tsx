import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import "./TransactionsPage.css";

type Transaction = {
  icon: string;
  title: string;
  detail: string;
  amount: string;
  date: string;
  tone: string;
};

const transactions: Transaction[] = [
  {
    icon: "↗",
    title: "Coffee catch-up",
    detail: "Kindred Coffee  ·  Food",
    amount: "-$14.50",
    date: "Sep 18",
    tone: "peach",
  },
  {
    icon: "↗",
    title: "Streaming bundle",
    detail: "Peach+ Play  ·  Entertainment",
    amount: "-$19.99",
    date: "Sep 16",
    tone: "pink",
  },
  {
    icon: "↗",
    title: "Yoga studio",
    detail: "Moss Movement  ·  Wellness",
    amount: "-$38.00",
    date: "Sep 14",
    tone: "olive",
  },
  {
    icon: "↘",
    title: "Project retainer",
    detail: "Juniper Press  ·  Freelance",
    amount: "+$620.00",
    date: "Sep 12",
    tone: "blue",
  },
  {
    icon: "↗",
    title: "New running shoes",
    detail: "Field & Form  ·  Shopping",
    amount: "-$128.00",
    date: "Sep 10",
    tone: "lavender",
  },
  {
    icon: "↗",
    title: "Dinner with Eli",
    detail: "Luma Kitchen  ·  Food",
    amount: "-$64.80",
    date: "Sep 8",
    tone: "peach",
  },
  {
    icon: "↗",
    title: "Train pass",
    detail: "MetroLink  ·  Transport",
    amount: "-$72.00",
    date: "Sep 5",
    tone: "coral",
  },
  {
    icon: "↗",
    title: "Weekly groceries",
    detail: "Marlow Market  ·  Food",
    amount: "-$86.42",
    date: "Sep 4",
    tone: "peach",
  },
  {
    icon: "↗",
    title: "Apartment rent",
    detail: "Cedar House  ·  Housing",
    amount: "-$1,420.00",
    date: "Sep 2",
    tone: "blue",
  },
  {
    icon: "↘",
    title: "Monthly pay",
    detail: "Northstar Studio  ·  Salary",
    amount: "+$4,850.00",
    date: "Sep 1",
    tone: "mint",
  },
];

export function TransactionsPage() {
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
            <div className="transaction-add" aria-hidden="true">
              <span>+</span> Add transaction
            </div>
          </div>

          <section className="transactions-card">
            <div className="transaction-toolbar">
              <div className="transaction-search">
                <span aria-hidden="true">⌕</span>
                <span>Search transactions...</span>
              </div>
              <div className="transaction-filter">
                ☷ &nbsp; All types &nbsp;⌄
              </div>
              <div className="transaction-filter">
                ☷ &nbsp; All categories &nbsp;⌄
              </div>
            </div>
            <div className="transaction-list">
              {transactions.map((transaction) => (
                <div className="transaction-row" key={transaction.title}>
                  <span
                    className={`transaction-icon transaction-icon--${transaction.tone}`}
                  >
                    {transaction.icon}
                  </span>
                  <div className="transaction-info">
                    <strong>{transaction.title}</strong>
                    <small>{transaction.detail}</small>
                  </div>
                  <div className="transaction-amount">
                    <strong
                      className={
                        transaction.amount.startsWith("+") ? "income" : ""
                      }
                    >
                      {transaction.amount}
                    </strong>
                    <small>{transaction.date}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
