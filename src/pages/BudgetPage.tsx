import { Header } from "../components/Header";
export function BudgetPage() {
  return (
    <div className="budget-page">
      <Header />
      <main className="budget-page__content">
        <h2>Welcome to your budget</h2>
        <p>This is where you can manage your budget and track your expenses.</p>
      </main>
    </div>
  );
}