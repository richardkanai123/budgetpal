import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type Transaction = {
  id: string;
  transactiondate: Date;
  amount: number;
  type: string;
  category: string;
  description: string;
};