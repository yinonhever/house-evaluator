/**
 * Calculating a house's risk as the ratio of its loan amount to its current value.
 * If the loan amount is over 50% of the current value, the risk is increased by 10%.
 */
export const calculateRisk = (currentValue: number, loanAmount: number) => {
  let risk = loanAmount / currentValue;
  if (risk > 0.5) {
    risk += (risk * 10) / 100;
  }
  return risk;
};
