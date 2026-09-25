import "./AddTransaction.css";
import type { Transaction } from "../App";
import dayjs from "dayjs";
import { useState } from "react";
interface AddTransactionProps {
  setAddTransaction: (addTransaction: boolean) => void;
  setTransactions: (
    transactions:
      | Transaction[]
      | ((currentTransactions: Transaction[]) => Transaction[]),
  ) => void;
}
export function AddTransaction({
  setAddTransaction,
  setTransactions,
}: AddTransactionProps) {
  const [title, setTitle] = useState("");
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Expense" | "Income">("Expense");
  const [category, setCategory] = useState<
    | "Housing"
    | "Transportation"
    | "Food"
    | "Wellness"
    | "Salary"
    | "Healthcare"
    | "Savings & Investments"
    | "Personal Spending"
    | "Entertainment"
    | "Other"
  >("Food");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [note, setNote] = useState("");

  const savedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const savedMerchant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMerchant(event.target.value);
  };
  const savedAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  const savedType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as "Expense" | "Income");
  };
  const savedCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(
      event.target.value as
        | "Housing"
        | "Transportation"
        | "Food"
        | "Wellness"
        | "Salary"
        | "Healthcare"
        | "Savings & Investments"
        | "Personal Spending"
        | "Entertainment"
        | "Other",
    );
  };
  const savedDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const savedNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };
  // Parse the amount to a number for validation
  const parsedAmount = parseFloat(amount);

  // Define a mapping of categories to tones
  // This will help in assigning a tone based on the selected category
  const toneByCategory: Record<string, string> = {
    Housing: "blue",
    Transportation: "blue",
    Food: "coral",
    Wellness: "olive",
    Salary: "mint",
    Healthcare: "pink",
    "Savings & Investments": "peach",
    "Personal Spending": "lavender",
    Entertainment: "coral",
    Other: "blue",
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      !amount.trim() ||
      !title.trim()
    ) {
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      icon: (
        <i
          className={`fa-solid ${type === "Income" ? "fa-arrow-up" : "fa-arrow-down"}`}
        />
      ),
      title: title,
      merchant: !merchant.trim() ? "Personal" : merchant,
      amount: {
        expense: type === "Expense" ? parsedAmount : 0,
        income: type === "Income" ? parsedAmount : 0,
      },
      category: category,
      date: date,
      note: note,
      type: type,
      // Assign tone based on category, defaulting to "gray" if not found
      tone: toneByCategory[category] || "blue",
    };
    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);
    setAddTransaction(false);
  };
  return (
    <div className="transaction-modal-backdrop" aria-hidden="false">
      <section
        className="transaction-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-transaction-title"
      >
        <form onSubmit={handleSubmit}>
          <div className="transaction-modal-header">
            <p className="transaction-modal-eyebrow">New entry</p>
            <button
              type="button"
              className="transaction-modal-close"
              aria-label="Close"
              onClick={() => setAddTransaction(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <h2 id="add-transaction-title" className="transaction-modal-title">
            Add transaction
          </h2>

          <div className="transaction-field">
            <label htmlFor="transaction-name">What was this for?</label>
            <input
              id="transaction-name"
              className="transaction-input"
              type="text"
              placeholder="g. Weekly groceries"
              value={title}
              onChange={savedTitle}
              required
            />
          </div>

          <div className="transaction-field transaction-field--inline">
            <div>
              <label htmlFor="merchant">Merchant</label>
              <input
                id="merchant"
                className="transaction-input"
                type="text"
                placeholder="e.g. Marlow Market"
                value={merchant}
                onChange={savedMerchant}
              />
            </div>

            <div>
              <label htmlFor="amount">Amount (USD)</label>
              <input
                id="amount"
                className="transaction-input"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={savedAmount}
                required
              />
            </div>
          </div>

          <div className="transaction-field transaction-field--inline">
            <div>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                className="transaction-select"
                value={type}
                onChange={savedType}
                aria-label="Type"
              >
                <option>Expense</option>
                <option>Income</option>
              </select>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="transaction-select"
                value={category}
                onChange={savedCategory}
                aria-label="Category"
              >
                <option>Food</option>
                <option>Housing</option>
                <option>Transportation</option>
                <option>Wellness</option>
                <option>Salary</option>
                <option>Healthcare</option>
                <option>Savings & Investments</option>
                <option>Personal Spending</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="transaction-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              className="transaction-date"
              type="date"
              value={date}
              onChange={savedDate}
            />
          </div>

          <div className="transaction-field">
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              className="transaction-note"
              placeholder="A little context for later"
              value={note}
              onChange={savedNote}
            />
          </div>

          <div className="transaction-actions">
            <button
              type="button"
              className="transaction-btn transaction-btn--secondary"
              onClick={() => setAddTransaction(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="transaction-btn transaction-btn--primary"
            >
              Add transaction
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
