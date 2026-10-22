import "./AddTransaction.css";
import type { Transaction } from "../App";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
interface EditTransactionProps {
  setEditTransaction: (editTransaction: boolean) => void;
  transactionToEdit: Transaction | null;
  setTransactions: (
    transactions:
      | Transaction[]
      | ((currentTransactions: Transaction[]) => Transaction[]),
  ) => void;
  setShowEditTransactionNotification: (showEditTransactionNotification: boolean) => void;
  currency: string;
}
export function EditTransaction({
  setEditTransaction,
  transactionToEdit,
  setTransactions,
  setShowEditTransactionNotification,
  currency,
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
  useEffect(() => {
    if (transactionToEdit) {
      // eslint-disable-next-line
      setNewTitle(transactionToEdit.title);
      setNewMerchant(transactionToEdit.merchant || "");
      setNewAmount(
        transactionToEdit.amount.income > 0
          ? transactionToEdit.amount.income.toString()
          : transactionToEdit.amount.expense.toString(),
      );
      setNewType(transactionToEdit.type);
      setNewCategory(transactionToEdit.category);
      setNewDate(dayjs(transactionToEdit.date).format("YYYY-MM-DD"));
      setNewNote(transactionToEdit.note || "");
    }
  }, [transactionToEdit]);

  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAmount = parseFloat(newAmount);
    if (
      !newTitle.trim() ||
      Number.isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      !newDate
    ) {
      return;
    }
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) => {
        if (transaction.id === transactionToEdit?.id) {
          return {
            ...transaction,
            title: newTitle.trim(),
            merchant: newMerchant.trim() || "Personal",
            amount: {
              expense: newType === "Expense" ? parsedAmount : 0,
              income: newType === "Income" ? parsedAmount : 0,
            },
            type: newType,
            category: newCategory,
            date: newDate,
            note: newNote,
            tone: toneByCategory[newCategory] || "blue",
          };
        }
        return transaction;
      }),
    );
    setEditTransaction(false);
    setShowEditTransactionNotification(true);
  };
  return (
    <div className="transaction-modal-backdrop" aria-hidden="false">
      <section
        className="transaction-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-transaction-title"
      >
        <form onSubmit={handleSaveChanges} autoComplete="off">
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
              <label htmlFor="amount">Amount ({currency})</label>
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
