import { Sidebar } from "../components/Sidebar";
import "./OverviewPage.css";

export function OverviewPage() {
  return (
    <main className="App">
      <Sidebar />

      <section className="main-content">
        <div className="overview-content">
          <section className="welcome-row">
            <div>
              <p className="welcome-eyebrow">Good morning, Maya</p>
              <h1>
                A clearer month
                <br />
                <span>starts here.</span>
              </h1>
            </div>
            <div className="overview-actions">
              <button className="month-select" type="button">
                <span aria-hidden="true">▣</span> September 2026{" "}
                <span aria-hidden="true">⌄</span>
              </button>
              <button className="add-button" type="button">
                <span aria-hidden="true">+</span> Add
              </button>
            </div>
          </section>

          <section className="balance-banner">
            <div className="balance-copy">
              <span className="panel-kicker">Available balance</span>
              <strong>$2K</strong>
              <p>
                <span className="status-pill">On track</span> for your september
              </p>
            </div>
            <div className="balance-stats">
              <div>
                <span>Income</span>
                <strong>$5K</strong>
              </div>
              <div>
                <span>Spent</span>
                <strong>$2K</strong>
              </div>
              <div>
                <span>Savings rate</span>
                <strong>66%</strong>
              </div>
              <div>
                <span>Transactions</span>
                <strong>10</strong>
              </div>
            </div>
          </section>

          <div className="overview-grid overview-grid--top">
            <section className="dashboard-panel spending-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">This month</span>
                  <h2>Spending rhythm</h2>
                </div>
                <span className="panel-note">⌁ 8.4% vs last month</span>
              </div>
              <div
                className="bar-chart"
                aria-label="Static spending rhythm chart"
              >
                {[38, 55, 44, 70, 51, 78, 65, 87, 73, 81, 67, 96].map(
                  (height, index) => (
                    <span
                      className={index > 8 ? "bar bar--recent" : "bar"}
                      style={{ height: `${height}%` }}
                      key={index}
                    />
                  ),
                )}
              </div>
              <div className="chart-axis">
                <span>1</span>
                <span>4</span>
                <span>7</span>
                <span>10</span>
                <span>13</span>
                <span>16</span>
                <span>19</span>
                <span>22</span>
                <span>25</span>
                <span>28</span>
              </div>
              <div className="chart-legend">
                <span>
                  <i /> Daily spending
                </span>
                <span>
                  <i /> Recent days
                </span>
              </div>
            </section>

            <section className="dashboard-panel category-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">By category</span>
                  <h2>Where it goes</h2>
                </div>
                <span className="panel-note">View all</span>
              </div>
              <div className="category-list">
                {[
                  ["Housing", "$1,420.00", "teal", "78%"],
                  ["Food", "$165.72", "gold", "10%"],
                  ["Shopping", "$128.00", "blue", "7%"],
                  ["Transport", "$72.00", "coral", "4%"],
                  ["Wellness", "$38.00", "olive", "3%"],
                ].map(([name, amount, color, width]) => (
                  <div className="category-row" key={name}>
                    <div>
                      <span className={`category-dot category-dot--${color}`} />
                      <strong>{name}</strong>
                      <small>{amount}</small>
                    </div>
                    <span
                      className={`category-bar category-bar--${color}`}
                      style={{ width }}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="overview-grid overview-grid--bottom">
            <section className="dashboard-panel budget-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">A gentle check-in</span>
                  <h2>Budget pulse</h2>
                </div>
                <span className="panel-note">Manage</span>
              </div>
              <div className="budget-list">
                {[
                  ["Housing", "$1,420.00", "$2K", "78%", "coral"],
                  ["Food", "$165.72", "$540.00", "32%", "gold"],
                  ["Transport", "$72.00", "$180.00", "40%", "coral"],
                  ["Shopping", "$128.00", "$300.00", "43%", "blue"],
                ].map(([name, spent, total, width, color]) => (
                  <div className="budget-row" key={name}>
                    <div>
                      <strong>{name}</strong>
                      <span>
                        <b className={`text--${color}`}>{spent}</b> / {total}
                      </span>
                    </div>
                    <div className="budget-track">
                      <i
                        className={`budget-fill budget-fill--${color}`}
                        style={{ width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-panel activity-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">Latest moves</span>
                  <h2>Recent activity</h2>
                </div>
                <span className="panel-note">See all</span>
              </div>
              <div className="activity-list">
                {[
                  [
                    "↗",
                    "Coffee catch-up",
                    "Kindred Coffee  ·  Food",
                    "-$14.50",
                    "Sep 18",
                    "peach",
                  ],
                  [
                    "↗",
                    "Streaming bundle",
                    "Peach+ Play  ·  Entertainment",
                    "-$19.99",
                    "Sep 16",
                    "pink",
                  ],
                  [
                    "↗",
                    "Yoga studio",
                    "Moss Movement  ·  Wellness",
                    "-$38.00",
                    "Sep 14",
                    "olive",
                  ],
                  [
                    "↘",
                    "Project retainer",
                    "Juniper Press  ·  Freelance",
                    "+$620.00",
                    "Sep 12",
                    "blue",
                  ],
                  [
                    "↗",
                    "New running shoes",
                    "Field & Form  ·  Shopping",
                    "-$128.00",
                    "Sep 10",
                    "lavender",
                  ],
                ].map(([icon, title, detail, amount, date, tone]) => (
                  <div className="activity-row" key={title}>
                    <span className={`activity-icon activity-icon--${tone}`}>
                      {icon}
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <small>{detail}</small>
                    </div>
                    <div className="activity-amount">
                      <strong
                        className={amount.startsWith("+") ? "income" : ""}
                      >
                        {amount}
                      </strong>
                      <small>{date}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
