import "./AddTransaction.css";
import type { Transaction } from "../App";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
interface EditTransactionProps {
  setEditTransaction: (editTransaction: boolean) => void;
  taskToEdit: Transaction | null;
}
export function EditTransaction({
  setEditTransaction,
  taskToEdit,
}: EditTransactionProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newMerchant, setNewMerchant] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newType, setNewType] = useState<"Expense" | "Income">("Expense");
  const [newCategory, setNewCategory] =
    useState<Transaction["category"]>("Other");
  const [newDate, setNewDate] = useState("");
  const [newNote, setNewNote] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleMerchantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMerchant(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAmount(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewType(event.target.value as "Expense" | "Income");
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setNewCategory(event.target.value as Transaction["category"]);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDate(event.target.value);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(event.target.value);
  };

  useEffect(() => {
    if (taskToEdit) {
      // eslint-disable-next-line
      setNewTitle(taskToEdit.title);
      setNewMerchant(taskToEdit.merchant || "");
      setNewAmount(
        taskToEdit.amount.income > 0
          ? taskToEdit.amount.income.toString()
          : taskToEdit.amount.expense.toString(),
      );
      setNewType(taskToEdit.type);
      setNewCategory(taskToEdit.category);
      setNewDate(dayjs(taskToEdit.date).format("YYYY-MM-DD"));
      setNewNote(taskToEdit.note || "");
    }
  }, [taskToEdit]);

  return (
    <div className="transaction-modal-backdrop" aria-hidden="false">
      <section
        className="transaction-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-transaction-title"
      >
        <form>
          <div className="transaction-modal-header">
            <p className="transaction-modal-eyebrow">Edit entry</p>
            <button
              type="button"
              className="transaction-modal-close"
              aria-label="Close"
              onClick={() => setEditTransaction(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <h2 id="add-transaction-title" className="transaction-modal-title">
            Edit transaction
          </h2>

          <div className="transaction-field">
            <label htmlFor="transaction-name">What was this for?</label>
            <input
              id="transaction-name"
              className="transaction-input"
              type="text"
              placeholder="g. Weekly groceries"
              value={newTitle}
              onChange={handleTitleChange}
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
                value={newMerchant}
                onChange={handleMerchantChange}
              />
            </div>

            <div>
              <label htmlFor="amount">Amount (USD)</label>
              <input
                id="amount"
                className="transaction-input"
                type="number"
                placeholder="0.00"
                value={newAmount}
                onChange={handleAmountChange}
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
                aria-label="Type"
                value={newType}
                onChange={handleTypeChange}
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
                aria-label="Category"
                value={newCategory}
                onChange={handleCategoryChange}
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
              value={newDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="transaction-field">
            <label htmlFor="note">Note</label>
            <textarea
              id="note"
              className="transaction-note"
              placeholder="A little context for later"
              value={newNote}
              onChange={handleNoteChange}
            />
          </div>

          <div className="transaction-actions">
            <button
              type="button"
              className="transaction-btn transaction-btn--secondary"
              onClick={() => setEditTransaction(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="transaction-btn transaction-btn--primary"
            >
              Save transaction
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
