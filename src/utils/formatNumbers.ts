export function formatNumberWithUnits(num: number): string {
  const units = [
    { value: 1_000_000_000_000, symbol: 'T' },
    { value: 1_000_000_000, symbol: 'B' },
    { value: 1_000_000, symbol: 'M' },
    { value: 1_000, symbol: 'k' }
  ];

  const isNegative = num < 0;
  const absoluteNum = Math.abs(num);

  for (let unit of units) {
    if (absoluteNum >= unit.value) {
      const formattedNum = (absoluteNum / unit.value).toFixed(1).replace(/\.0$/, '') + unit.symbol;
      return isNegative ? '-' + formattedNum : formattedNum;
    }
  }

  return num.toString();
}