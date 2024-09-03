interface MonthlyDataEntry {
  month: number;
  expenses: number;
  revenue: number;
  profit: number;
  netProfit: number;
  netProfitMargin: number;
}

const parseMonthlyData = (monthlyData: string): MonthlyDataEntry[] => {
  const monthsData = JSON.parse(monthlyData);
  return monthsData.map((entry: any, index: number) => ({
    month: index + 1,
    expenses: parseFloat(entry.expenses),
    revenue: parseFloat(entry.revenue),
    profit: parseFloat(entry.profit),
    netProfit: parseFloat(entry.revenue) - parseFloat(entry.expenses),
    netProfitMargin: calculateNetProfitMargin(entry.revenue, entry.expenses),
    cash_flow: parseFloat(entry.cashFlow),
    cash_reserve: parseFloat(entry.cash_reserve)
  }));
};

const calculateNetProfitMargin = (revenue: string, expenses: string): number => {
  const netProfitMargin = ((parseFloat(revenue.replace('$', '')) - parseFloat(expenses.replace('$', ''))) / parseFloat(revenue)) * 100;
  return isNaN(netProfitMargin) ? 0 : netProfitMargin;
};

const calculateMonthlyProfit = (monthlyData: MonthlyDataEntry[]): { month: number; profit: number }[] => {
  return monthlyData.map((entry) => ({ month: entry.month, profit: entry.profit }));
};

const calculateMonthlyNetProfit = (monthlyData: MonthlyDataEntry[]): { month: number; netProfit: number }[] => {
  return monthlyData.map((entry) => ({ month: entry.month, netProfit: entry.netProfit }));
};

const calculateMonthlyNetProfitMargin = (monthlyData: MonthlyDataEntry[]): { month: number; netProfitMargin: number }[] => {
  return monthlyData.map((entry) => ({ month: entry.month, netProfitMargin: entry.netProfitMargin }));
};

const calculateMonthlyExpenses = (monthlyData: MonthlyDataEntry[]): { month: number; expense: number }[] => {
  return monthlyData.map((entry) => ({ month: entry.month, expense: entry.expense }));
};

export { parseMonthlyData, calculateMonthlyProfit, calculateMonthlyNetProfit, calculateMonthlyNetProfitMargin, calculateMonthlyExpenses };