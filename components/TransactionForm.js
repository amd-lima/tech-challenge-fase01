import { useTransactionForm } from "../hooks/useTransactionForm";
import TransactionFormView from "./forms/TransactionFormView";

/**
 * Componente = hook (lógica) + view (template), como no Angular.
 */
export default function TransactionForm({
  title = "Nova transação",
  showDate = true,
  submitLabel = "Concluir transação",
  onSubmit,
}) {
  const { form, error, loading, updateField, handleSubmit } = useTransactionForm({
    showDate,
    onSubmit,
  });

  return (
    <TransactionFormView
      title={title}
      showDate={showDate}
      submitLabel={submitLabel}
      form={form}
      error={error}
      loading={loading}
      onFieldChange={updateField}
      onSubmit={handleSubmit}
    />
  );
}
