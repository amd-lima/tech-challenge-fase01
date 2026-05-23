import { useState } from "react";
import { todayISO, parseCurrencyInput } from "../lib/format";

const createEmptyForm = () => ({ tipo: "depósito", valor: "", data: todayISO() });

/**
 * Lógica do formulário de transação (sem JSX).
 */
export function useTransactionForm({ showDate, onSubmit }) {
  const [form, setForm] = useState(createEmptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const valorNumerico = parseCurrencyInput(form.valor);
    if (!valorNumerico || valorNumerico <= 0) {
      setError("Informe um valor maior que zero.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        tipo: form.tipo,
        valor: valorNumerico,
        data: showDate ? form.data : todayISO(),
      });
      setForm(createEmptyForm());
    } catch (err) {
      setError(err.message || "Não foi possível salvar a transação.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    loading,
    updateField,
    handleSubmit,
  };
}
