import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Introduces value in index: arr[index] = value
 * @obs returns same array if index out of bounds
 * @returns copy of new array
 */
export function replaceAtIndex<T>(arr: T[], index: number, value: T): T[] {
  let newArr = [...arr];
  if (index >= 0 && index < newArr.length) newArr[index] = value;
  return newArr;
}

export abstract class MiscUtils {
  static env(name: string) {
    return process.env[name];
  }
}

// Function to format date as "9 Feb 2024 - Fri"
export function formatDate(dateIso: string): string {
  const date = new Date(dateIso);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', weekday: 'short' }).format(date);
}

// Function to calculate relative time difference
export function relativeTimeDifference(providedDateIso: string, currentDateIso: string): string {
  const providedDate = new Date(providedDateIso);
  const currentDate = new Date(currentDateIso);
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysDiff = Math.round((currentDate.getTime() - providedDate.getTime()) / msPerDay);

  if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else if (daysDiff < 30) {
    return `${Math.floor(daysDiff / 7)} week(s) ago`;
  } else if (daysDiff < 365) {
    return `${Math.floor(daysDiff / 30)} month(s) ago`;
  } else {
    return `${Math.floor(daysDiff / 365)} year(s) ago`;
  }
}
