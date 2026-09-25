import "./NothingMatches.css";

export function NothingMatches() {
  return (
    <div className="nothing-matches">
      <span className="nothing-matches-icon" aria-hidden="true">
        <i className="fa-regular fa-file-lines"></i>
      </span>
      <h2>Nothing matches</h2>
      <p>Try a different search or add a new transaction.</p>
    </div>
  );
}
