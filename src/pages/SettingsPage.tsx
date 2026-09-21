import { Header } from "../components/Header";

export function SettingsPage() {
  return (
    <div className="settings-page">
      <Header />
      <main className="settings-page__content">
        <h2>Welcome to your settings</h2>
        <p>This is where you can manage your settings.</p>
      </main>
    </div>
  );
}
