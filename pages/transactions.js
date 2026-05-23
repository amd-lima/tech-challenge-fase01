import TransactionsView from "../views/TransactionsView";
import { useTransactionsManager } from "../hooks/useTransactionsManager";

/**
 * Rota Next.js — só conecta lógica (hook) + template (view).
 */
export default function TransactionsPage() {
  const controller = useTransactionsManager();

  return (
    <TransactionsView
      transactions={controller.transactions}
      loading={controller.loading}
      error={controller.error}
      detail={controller.detail}
      edit={controller.edit}
      onView={controller.setDetail}
      onEdit={controller.setEdit}
      onDelete={controller.handleDelete}
      onCreate={controller.handleCreate}
      onUpdate={controller.handleUpdate}
      onCloseDetail={controller.closeDetail}
      onCloseEdit={controller.closeEdit}
    />
  );
}
