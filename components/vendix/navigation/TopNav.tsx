import { APP_NAME } from "@/shared/constants/app";

export function TopNav({ onDashboard, onMetrics, onNewItem }: {
  onDashboard: () => void;
  onMetrics: () => void;
  onNewItem: () => void;
}) {
  return (
    <nav className="top-nav" aria-label="Main navigation">
      <button className="brand" onClick={onDashboard} aria-label="Open dashboard">
        <span className="brand-mark">V</span>
        <span>{APP_NAME}</span>
      </button>
      <div className="nav-actions">
        <button onClick={onMetrics}>Metrics</button>
        <button className="primary small" onClick={onNewItem}>+ New item</button>
      </div>
    </nav>
  );
}
