import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import "./SettingsPage.css";

export function SettingsPage() {
  return (
    <main className="App settings-page">
      <Sidebar />
      <section className="main-content">
        <Header title="Settings" />
        <div className="settings-content">
          <section className="settings-intro">
            <p>Your preferences, your pace</p>
            <h2>Settings</h2>
          </section>

          <section className="settings-card">
            <header className="settings-card__header">
              <span className="settings-card__icon" aria-hidden="true">
                ⌘
              </span>
              <div>
                <h3>Personal space</h3>
                <p>A few details to make Clearspace feel like yours.</p>
              </div>
            </header>
            <div className="settings-fields">
              <div className="settings-field">
                <div>
                  <strong>Your name</strong>
                  <span>Used in your welcome message</span>
                </div>
                <div className="settings-value">Maya</div>
              </div>
              <div className="settings-field">
                <div>
                  <strong>Currency</strong>
                  <span>Used across balances and budgets</span>
                </div>
                  <select className="settings-value settings-select" defaultValue="USD">
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — Pound Sterling</option>
                    <option value="CAD">CAD — Canadian Dollar</option>
                    <option value="AUD">AUD — Australian Dollar</option>
                  </select>
              </div>
              <div className="settings-field">
                <div>
                  <strong>Focus month</strong>
                  <span>The month shown on your overview</span>
                </div>
                <div className="settings-value">
                  September 2026 <b>▣</b>
                </div>
              </div>
            </div>
          </section>

          

          <p className="settings-privacy">
            <span aria-hidden="true">●</span> Your data stays in this browser.
            Clearspace never sends it anywhere.
          </p>
        </div>
      </section>
    </main>
  );
}
