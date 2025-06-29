import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const generateClassNames = (...classes: ClassValue[]) =>
  twMerge(clsx(classes));
