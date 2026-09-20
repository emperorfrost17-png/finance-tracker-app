import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main className="main-content">
        <Header />
      </main>
    </div>
  );
}

export default App;
