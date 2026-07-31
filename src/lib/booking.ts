export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
