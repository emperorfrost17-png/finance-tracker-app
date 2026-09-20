import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header__heading">
        <span className="header__eyebrow">Your money, made clear</span>
        <h1>Overview</h1>
      </div>

      <div className="header__actions">
        <button
          className="header__notification"
          type="button"
          aria-label="Notifications"
        >
          <i className="fa-regular fa-bell" aria-hidden="true" />
          <span className="header__notification-dot" aria-hidden="true" />
        </button>
        <span className="header__divider" aria-hidden="true" />
        <button
          className="header__profile"
          type="button"
          aria-label="Open Maya's profile"
        >
          <span className="header__avatar">M</span>
          <span className="header__name">Maya</span>
        </button>
      </div>
    </header>
  );
}
