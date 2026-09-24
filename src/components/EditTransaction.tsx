import "./AddTransaction.css";
import type {Transaction} from "../App";
import dayjs from "dayjs";
import {useEffect, useState} from "react";


export function EditTransaction() {
    
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
            <p className="transaction-modal-eyebrow">Edit entry</p>
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
            Edit transaction
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
              Save transaction
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}