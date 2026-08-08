/** Current month + year for availability copy, e.g. "August 2026". */
export const CURRENT_MONTH_YEAR = new Date().toLocaleString("en-US", {
  month: "long",
  year: "numeric",
});
