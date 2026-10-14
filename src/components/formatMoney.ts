const locales: Record<string, string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  CAD: "en-CA",
  AUD: "en-AU",
  GHS: "en-GH",
};

export const formatMoney = (amount: number, currency = "USD", compact = false) => {
  const options: Intl.NumberFormatOptions = { style: "currency", currency };
  if (compact && Math.abs(amount) >= 1000) {
    options.notation = "compact";
    options.maximumFractionDigits = 1;
  }
  //! Use the locale corresponding to the currency, defaulting to "en-US" if not found
  return new Intl.NumberFormat(locales[currency] ?? "en-US", options).format(amount);
};