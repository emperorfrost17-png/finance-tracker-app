import { Bar } from "react-chartjs-2";
import type { Transaction } from "../App";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const BarChart = ({ transactions }: { transactions: Transaction[] }) => {
  const daysInMonth = dayjs().daysInMonth();
  // Generate an array of days for the current month (1 to daysInMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) =>
    (i + 1).toString(),
  );
  const dailySpending = days.map((day) => {
    return transactions
      .filter(
        (t) => dayjs(t.date).date() === parseInt(day) && t.type === "Expense",
      )
      .reduce((sum, t) => sum + t.amount.expense, 0);
  });
  const data = {
    labels: days,
    datasets: [
      {
        label: "Daily spending",
        data: dailySpending,
        backgroundColor: days.map((_, index) =>
          index >= 23 ? "#f8c45c" : "#f7e7c8",
        ),
        borderRadius: { topLeft: 10, topRight: 10 },
        borderSkipped: "bottom" as const,
        categoryPercentage: 0.88,
        barPercentage: 0.94,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 4 } },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        displayColors: false,
        backgroundColor: "#183d3e",
        padding: 10,
        titleFont: { family: "DM Sans", size: 11 },
        bodyFont: { family: "DM Sans", size: 12, weight: "bold" },
        callbacks: {
          label: (context) => `$${(context.parsed.y ?? 0).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { color: "#f0ebe1" },
        ticks: {
          color: "#8ba09d",
          font: { family: "DM Sans", size: 8 },
          padding: 8,
          maxRotation: 0,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <section className="dashboard-panel spending-panel">
      <div className="panel-heading">
        <div>
          <span className="panel-kicker">This month</span>
          <h2>Spending rhythm</h2>
        </div>
        <span className="panel-note">
          <span aria-hidden="true">&#8599;</span> 8.4% vs last month
        </span>
      </div>
      <div
        className="bar-chart"
        role="img"
        aria-label="Daily spending across the month, with recent days highlighted"
      >
        <Bar data={data} options={options} />
      </div>
      <div className="chart-legend" aria-hidden="true">
        <span>
          <i /> Daily spending
        </span>
        <span>
          <i /> Recent days
        </span>
      </div>
    </section>
  );
};
