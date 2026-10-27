import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useState } from "react";
import dayjs from "dayjs";
import "./SettingsPage.css";
import type { Transaction } from "../App";

interface SettingsPageProps {
  accountName: string;
  setAccountName: (name: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  focusMonth: string;
  handleFocusMonthChange: (month: string) => void;
  transactions: Transaction[];
}
// List of all localStorage keys used by the app
const APP_STORAGE_KEYS = [
  "transactions",
  "accountName",
  "currency",
  "budgets",
  "focusMonth",
];
export function SettingsPage({
  accountName,
  setAccountName,
  currency,
  setCurrency,
  focusMonth,
  handleFocusMonthChange,
  transactions,
}: SettingsPageProps) {
  const [resetConfirmation, setResetConfirmation] = useState(false);

  const handleResetData = () => {
    // Clear all relevant data from localStorage
    APP_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    window.location.assign("/");
  };
  const monthOptions = Array.from(
    new Set([
      dayjs().format("YYYY-MM"),
      focusMonth,
      ...transactions.map((t) => dayjs(t.date).format("YYYY-MM")),
    ]),
  )
    .sort()
    .reverse(); // newest first
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
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — Pound Sterling</option>
                  <option value="CAD">CAD — Canadian Dollar</option>
                  <option value="AUD">AUD — Australian Dollar</option>
                  <option value="GHS">GHS — Ghana Cedis</option>
                </select>
              </div>
              <div className="settings-field">
                <div>
                  <strong>Focus month</strong>
                  <span>The month shown on your overview</span>
                </div>
                <select
                  className="settings-value settings-select"
                  aria-label="Select focus month"
                  value={focusMonth}
                  onChange={(e) => handleFocusMonthChange(e.target.value)}
                >
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {dayjs(`${month}-01`).format("MMMM YYYY")}
                    </option>
                  ))}
                </select>
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
            {resetConfirmation ? (
              <div className="reset-confirmation">
                <p>Are you sure you want to reset your data?</p>
                <button
                  type="button"
                  className="reset-confirmation__confirm"
                  onClick={handleResetData}
                >
                  Yes, reset data
                </button>
                <button
                  type="button"
                  className="reset-confirmation__cancel"
                  onClick={() => setResetConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="reset-control"
                onClick={() => setResetConfirmation(true)}
              >
                <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
                <span>Reset data</span>
              </button>
            )}
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
