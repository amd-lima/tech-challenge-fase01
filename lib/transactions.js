export const TRANSACTION_TYPES = [
  { value: "depósito", label: "Depósito" },
  { value: "transferência", label: "Transferência" },
  { value: "câmbio", label: "Câmbio de Moeda" },
  { value: "doc/ted", label: "DOC/TED" },
  { value: "empréstimo", label: "Empréstimo e Financiamento" },
];

export function normalizeValor(tipo, valor) {
  const num = Number(valor);
  if (Number.isNaN(num)) return 0;
  if (tipo === "transferência" && num > 0) return -num;
  return num;
}
