import "./Sidebar.css";

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__top">
        <div className="brand-mark" aria-hidden="true">
          $
        </div>
        <div className="brand-copy">
          <strong>clearspace</strong>
          <span>money, simplified</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Workspace">
        <p className="sidebar__label">Workspace</p>
        <ul className="sidebar__list">
          <li className="sidebar__item sidebar__item--active">
            <span className="sidebar__icon" aria-hidden="true">
              ▦
            </span>
            <span>Overview</span>
          </li>
          <li className="sidebar__item">
            <span className="sidebar__icon" aria-hidden="true">
              ▤
            </span>
            <span>Transactions</span>
          </li>
          <li className="sidebar__item">
            <span className="sidebar__icon" aria-hidden="true">
              ◎
            </span>
            <span>Budgets</span>
          </li>
        </ul>

        <p className="sidebar__label sidebar__label--personal">Personal</p>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <span className="sidebar__icon" aria-hidden="true">
              ⌘
            </span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar__bottom">
        <section className="sidebar__nudge" aria-label="A small nudge">
          <p className="sidebar__nudge-title">
            <span aria-hidden="true">✣</span> A small nudge
          </p>
          <p className="sidebar__nudge-copy">
            Clarity is a habit. One honest look at a time.
          </p>
        </section>
        <p className="sidebar__privacy">
          <span aria-hidden="true">•</span> Stored only on this device
        </p>
      </div>
    </aside>
  );
}
