import { useCallback, useEffect, useState } from "react";
import {
  fetchSaldo,
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../lib/api";

function sortByDateDesc(list) {
  return [...list].sort((a, b) => new Date(b.data) - new Date(a.data));
}

/**
 * Lógica compartilhada das telas (equivalente ao .ts do componente no Angular).
 */
export function useTransactionsManager({ withSaldo = false, recentLimit = null } = {}) {
  const [saldo, setSaldo] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState(null);
  const [edit, setEdit] = useState(null);

  const loadData = useCallback(async () => {
    setError("");
    try {
      const requests = [fetchTransactions()];
      if (withSaldo) requests.unshift(fetchSaldo());

      const results = await Promise.all(requests);
      if (withSaldo) {
        setSaldo(results[0]);
        setTransactions(results[1]);
      } else {
        setTransactions(results[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [withSaldo]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (payload) => {
    await createTransaction(payload);
    await loadData();
  };

  const handleUpdate = async (payload) => {
    await updateTransaction(payload);
    await loadData();
  };

  const handleDelete = async (transaction) => {
    if (!window.confirm(`Excluir transação de ${transaction.tipo}?`)) return;
    await deleteTransaction(transaction.id);
    await loadData();
  };

  const sorted = sortByDateDesc(transactions);
  const displayed = recentLimit != null ? sorted.slice(0, recentLimit) : sorted;

  return {
    saldo,
    transactions: displayed,
    loading,
    error,
    detail,
    edit,
    setDetail,
    setEdit,
    handleCreate,
    handleUpdate,
    handleDelete,
    closeDetail: () => setDetail(null),
    closeEdit: () => setEdit(null),
  };
}
