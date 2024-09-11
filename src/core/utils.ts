export const ONE_HOUR = 60 * 60 * 1000;
export const ONE_DAY = 24 * ONE_HOUR;

export function onlyDate(dateToConvert: Date): Date {
  const year = dateToConvert.getUTCFullYear();
  const month = dateToConvert.getUTCMonth();
  const date = dateToConvert.getUTCDate();

  return new Date(Date.UTC(year, month, date))
}

export function dayOfDate(date: Date): number {
  return date.getUTCDay();
}