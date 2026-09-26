import "./NoSpendingYet.css";

export function NoSpendingYet() {
  return (
    <div className="no-spending-yet">
      <span className="no-spending-yet-icon" aria-hidden="true">
        <i className="fa-solid fa-chart-column" />
      </span>
      <h2>No spending yet</h2>
      <p>Your category breakdown will appear when you record an expense.</p>
    </div>
  );
}
