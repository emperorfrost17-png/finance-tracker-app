import "./Sidebar.css";

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__top">
        <div className="brand-mark" aria-hidden="true">
          <i className="fa-solid fa-dollar-sign" />
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
              <i className="fa-solid fa-table-cells-large" />
            </span>
            <span>Overview</span>
          </li>
          <li className="sidebar__item">
            <span className="sidebar__icon" aria-hidden="true">
              <i className="fa-solid fa-receipt" />
            </span>
            <span>Transactions</span>
          </li>
          <li className="sidebar__item">
            <span className="sidebar__icon" aria-hidden="true">
              <i className="fa-solid fa-bullseye" />
            </span>
            <span>Budgets</span>
          </li>
        </ul>

        <p className="sidebar__label sidebar__label--personal">Personal</p>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <span className="sidebar__icon" aria-hidden="true">
              <i className="fa-solid fa-sliders" />
            </span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar__bottom">
        <section className="sidebar__nudge" aria-label="A small nudge">
          <p className="sidebar__nudge-title">
            <span aria-hidden="true">
              <i className="fa-solid fa-wand-magic-sparkles" />
            </span>{" "}
            A small nudge
          </p>
          <p className="sidebar__nudge-copy">
            Clarity is a habit. One honest look at a time.
          </p>
        </section>
        <p className="sidebar__privacy">
          <span aria-hidden="true">
            <i className="fa-solid fa-circle" />
          </span>{" "}
          Stored only on this device
        </p>
      </div>
    </aside>
  );
}
