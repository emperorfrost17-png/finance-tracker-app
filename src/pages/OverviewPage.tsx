import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import "./OverviewPage.css";

export function OverviewPage() {
  return (
    <main className="App">
      <Sidebar />

      <section className="main-content">
        <Header />
      </section>
    </main>
  );
}
