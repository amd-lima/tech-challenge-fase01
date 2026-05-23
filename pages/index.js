import HomeView from "../views/HomeView";
import { useTransactionsManager } from "../hooks/useTransactionsManager";

/**
 * Rota Next.js — só conecta lógica (hook) + template (view).
 */
export default function HomePage() {
  const controller = useTransactionsManager({ withSaldo: true, recentLimit: 5 });

  return (
    <HomeView
      saldo={controller.saldo}
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
