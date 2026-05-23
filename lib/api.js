export async function fetchSaldo() {
  const res = await fetch("/api/saldo");
  if (!res.ok) throw new Error("Erro ao carregar saldo");
  const data = await res.json();
  return data.saldo;
}

export async function fetchTransactions() {
  const res = await fetch("/api/transactions");
  if (!res.ok) throw new Error("Erro ao carregar transações");
  return res.json();
}

export async function createTransaction(payload) {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Erro ao criar transação");
  return res.json();
}

export async function updateTransaction(payload) {
  const res = await fetch("/api/transactions", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Erro ao atualizar transação");
  }
  return res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch("/api/transactions", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Erro ao deletar transação");
  return res.json();
}
