import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function chunk<T>(arr: T[], n: number) {
  const size = Math.ceil(arr.length / n)
  return Array.from({ length: n }, (_v, i) =>
    arr.slice(i * size, i * size + size)
  )
}
