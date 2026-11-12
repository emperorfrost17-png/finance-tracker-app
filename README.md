# Clearspace

A personal finance tracker I built to get comfortable with React and TypeScript. It started as a simple list of expenses and slowly turned into something I actually use: transactions, monthly budgets, a spending chart, and currency conversion.

**Live demo:** https://finance-tracker-app-delta-ashy.vercel.app

## What it does

- **Track transactions.** Add, edit and delete income and expenses, with a category, merchant and note. Search and filter by type or category.
- **Monthly overview.** See income, spending, savings rate and whether you're on track for the month. There's a daily spending chart that compares you to the same point last month.
- **Budgets.** Set a limit for each category and watch the progress bars fill up. They turn coral when you go over.
- **Focus month.** Pick any month with data and the whole app (overview, budgets, transactions) switches to it.
- **Currency switching.** Pick USD, EUR, GBP, CAD, AUD or GHS. Amounts and budget limits are converted using live exchange rates.
- **Reset.** One button in Settings wipes everything and starts fresh.

## Built with

- React + TypeScript (Vite)
- React Router
- Chart.js (react-chartjs-2)
- dayjs for date handling
- ExchangeRate-API for exchange rates
- Font Awesome icons

## Running it locally

```bash
git clone https://github.com/emperorfrost17-png/finance-tracker-app.git
cd finance-tracker-app
npm install
```

Currency conversion needs a free API key from [ExchangeRate-API](https://www.exchangerate-api.com/). Create a file called `.env.local` in the project root:

```
VITE_EXCHANGE_API_KEY=your_key_here
```

Then start it:

```bash
npm run dev
```

Everything except currency switching works without a key.

## Things worth knowing

- **Your data stays in your browser.** Everything is saved in localStorage. There's no backend and no account, which also means clearing site data or switching devices loses it.
- **Budgets are one flat set.** A limit applies to every month, so changing it changes it everywhere. I kept it simple on purpose.
- **Conversion changes the stored numbers.** Switching currency multiplies your saved amounts by the exchange rate (rounded to cents), so switching back and forth can drift by a cent or two.
- **The API key is visible in the deployed bundle.** That's how front-end env variables work. It's a free key, but don't reuse this pattern for anything that costs money.

## What I'd do next

- Export and import so data isn't tied to one browser
- Per-month budgets
- Tests for the month filtering and budget math
- Store everything in one base currency and convert only for display

## What I learned

Mostly that "it works" and "it's correct" are different things. Most of the time went into the details: keeping every page agreeing on which month it's showing, handling empty states, and making sure a cleared input doesn't quietly corrupt saved data.
