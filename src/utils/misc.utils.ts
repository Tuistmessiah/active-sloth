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
