// Static estimated exchange rate for display purposes only
const USD_TO_GBP_RATE = 0.73;

export function usdToGbp(usd: number): string {
  return (usd * USD_TO_GBP_RATE).toFixed(2);
}

export function formatGbpEstimate(usd: number): string {
  return `≈ £${usdToGbp(usd)} GBP`;
}

export const GBP_DISCLAIMER = "GBP amount is an estimate. Final payment is calculated in USD at time of order.";
