import { Header } from "../components/Header";

export function TransactionsPage() {
  return (
    <div className="transactions-page">
      <Header />
      <main className="transactions-page__content">
        <h2>Welcome to your transactions</h2>
        <p>
          This is where you can manage your transactions and track your
          expenses.
        </p>
      </main>
    </div>
  );
}
