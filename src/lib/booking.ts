export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKDAYS_FULL = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
export const SLOT_TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

export const WITTY_DECLINES = [
  "I'm out building on that day. Try another one.",
  "That day's already spoken for. Pick a free one.",
  "Nope — that one's booked solid. Try a green day.",
  "I wish I could clone myself, but that day's full.",
  "Taken. Even Butler can't get me out of that one.",
  "That slot's gone. The calendar doesn't lie.",
];

export function hashKey(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

export type CalendarCell = {
  key: string;
  num: number | null;
  date: Date | null;
  available: boolean;
};

export function getMonthMeta(offset: number) {
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  return { year: first.getFullYear(), month: first.getMonth() };
}

export function isDayAvailable(key: string, date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = date < today;
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const isBooked = hashKey(key) % 5 === 0;
  return !isPast && !isWeekend && !isBooked;
}

export function buildCalendarWeeks(offset: number): CalendarCell[][] {
  const { year, month } = getMonthMeta(offset);
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: CalendarCell[] = [];
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ key: `blank-${i}`, num: null, date: null, available: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const key = `${year}-${month}-${d}`;
    cells.push({ key, num: d, date, available: isDayAvailable(key, date) });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ key: `blank-tail-${cells.length}`, num: null, date: null, available: false });
  }

  const weeks: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function isSlotAvailable(dateKey: string, time: string): boolean {
  return hashKey(dateKey + time) % 4 !== 0;
}
