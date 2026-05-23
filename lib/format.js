const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCurrency(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "R$ 0,00";
  return brlFormatter.format(num);
}

/** Máscara enquanto o usuário digita (centavos → R$ 0,00). */
export function maskCurrencyInput(raw) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return brlFormatter.format(parseInt(digits, 10) / 100);
}

/** Converte texto mascarado em número (ex.: "R$ 150,00" → 150). */
export function parseCurrencyInput(masked) {
  const digits = String(masked ?? "").replace(/\D/g, "");
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
}

/** Valor numérico → string para o input (edição). */
export function formatCurrencyInputFromNumber(value) {
  const num = Math.abs(Number(value));
  if (Number.isNaN(num) || num === 0) return "";
  return brlFormatter.format(num);
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr; // evita erro se vier algo inválido

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
