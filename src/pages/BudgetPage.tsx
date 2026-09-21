import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import "./BudgetPage.css";
export function BudgetPage() {
  return (
    <main className="app">
      <Sidebar />

      <section className="main-content">
        <Header />
      </section>
    </main>
  );
}
