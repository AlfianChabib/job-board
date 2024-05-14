export const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i > currentYear - 100; i--) {
    years.push(i);
  }
  return years;
};

export const getMonths = () => {
  const months = [];
  for (let i = 1; i <= 12; i++) {
    const month = new Date(0, i - 1).toLocaleString('default', { month: 'long' });
    months.push(month);
  }
  return months;
};
