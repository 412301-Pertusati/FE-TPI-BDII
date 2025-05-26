export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("es-ES", options)
}

export function formatPrice(price?: number): string {
  if (!price) return ""
  return price.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  })
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
