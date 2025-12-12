import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número de teléfono para mostrarlo con espacios
 * Formato: "33 3410 9866" o "333 410 9866"
 * @param phone - Número de teléfono (con o sin espacios/guiones)
 * @returns Número formateado con espacios
 */
export function formatPhoneNumber(phone: string): string {
  // Remover todos los caracteres que no sean dígitos
  const cleaned = phone.replace(/\D/g, '');

  // Si el número tiene 10 dígitos (formato mexicano)
  if (cleaned.length === 10) {
    // Formato: XX XXXX XXXX
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
  }

  // Si el número tiene 11 dígitos (con código de país +52)
  if (cleaned.length === 11 && cleaned.startsWith('52')) {
    // Remover el 52 y formatear los 10 dígitos restantes
    const withoutCountryCode = cleaned.slice(2);
    return `${withoutCountryCode.slice(0, 2)} ${withoutCountryCode.slice(2, 6)} ${withoutCountryCode.slice(6)}`;
  }

  // Si el número tiene 12 dígitos (con código de país 52 sin +)
  if (cleaned.length === 12 && cleaned.startsWith('52')) {
    // Remover el 52 y formatear los 10 dígitos restantes
    const withoutCountryCode = cleaned.slice(2);
    return `${withoutCountryCode.slice(0, 2)} ${withoutCountryCode.slice(2, 6)} ${withoutCountryCode.slice(6)}`;
  }

  // Para otros casos, intentar formatear con espacios cada 4 dígitos
  if (cleaned.length > 0) {
    return cleaned.match(/.{1,4}/g)?.join(' ') || phone;
  }

  // Si no se pudo limpiar, devolver el original
  return phone;
}
