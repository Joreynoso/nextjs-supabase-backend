import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;


// Función para obtener las iniciales de un email
export function getInitials(email: string) {
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase();
}

// Función para convertir bytes a KB
export function bytesToKB(bytes: number) {
  return (bytes / 1024).toFixed(2);
}