import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import "./SettingsPage.css";

export function SettingsPage({ accountName, setAccountName, currency, setCurrency }: { accountName: string; setAccountName: (name: string) => void; currency: string; setCurrency: (currency: string) => void }) {
  return (
    <main className="App settings-page">
      <Sidebar />
      <section className="main-content">
        <Header title="Settings" name={accountName} />
        <div className="settings-content">
          <section className="settings-intro">
            <p>Your preferences, your pace</p>
            <h2>Settings</h2>
          </section>

          <section className="settings-card">
            <header className="settings-card__header">
              <span className="settings-card__icon" aria-hidden="true">
                <i className="fa-solid fa-sliders"></i>
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
                <input
                  type="text"
                  className="settings-value"
                  defaultValue={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div className="settings-field">
                <div>
                  <strong>Currency</strong>
                  <span>Used across balances and budgets</span>
                </div>
                <select
                  className="settings-value settings-select"
                  aria-label="Select currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="$">USD — US Dollar</option>
                  <option value="€">EUR — Euro</option>
                  <option value="£">GBP — Pound Sterling</option>
                  <option value="C$">CAD — Canadian Dollar</option>
                  <option value="A$">AUD — Australian Dollar</option>
                  <option value="₵">GHC - Ghana Cedis</option>
                </select>
              </div>
              <div className="settings-field">
                <div>
                  <strong>Focus month</strong>
                  <span>The month shown on your overview</span>
                </div>
                <input
                  type="month"
                  className="settings-value settings-month"
                  defaultValue="2026-10"
                  aria-label="Focus month"
                />
              </div>
            </div>
          </section>

          <section className="reset-card">
            <div>
              <h3>Start fresh</h3>
              <p>
                Remove every transaction and budget stored on this device, then
                restore the starter view.
              </p>
            </div>
            <button
              type="button"
              className="reset-control"
              disabled
            >
              <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
              <span>Reset data</span>
            </button>
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
