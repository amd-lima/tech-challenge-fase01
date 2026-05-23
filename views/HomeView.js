import Link from "next/link";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Stack,
} from "@mui/material";
import Layout from "../components/Layout";
import BalanceCard from "../components/BalanceCard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionDetailDialog from "../components/TransactionDetailDialog";
import TransactionEditDialog from "../components/TransactionEditDialog";

/**
 * Template da Home — só apresentação (equivalente ao .html do Angular).
 */
export default function HomeView({
  saldo,
  transactions,
  loading,
  error,
  detail,
  edit,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onUpdate,
  onCloseDetail,
  onCloseEdit,
}) {
  return (
    <Layout title="Início">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" py={6}>
          <CircularProgress aria-label="Carregando" />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <BalanceCard saldo={saldo} />
              <TransactionForm
                title="Nova transação"
                showDate={false}
                submitLabel="Concluir transação"
                onSubmit={onCreate}
              />
              <Paper sx={{ p: 2 }} elevation={0} variant="outlined">
                <Typography variant="body2" color="text.secondary">
                  Gerencie todas as transações na página dedicada: visualizar detalhes, editar e
                  excluir registros com formulário completo.
                </Typography>
                <Button component={Link} href="/transactions" variant="contained" sx={{ mt: 2 }}>
                  Ir para Transações
                </Button>
              </Paper>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: 2 }} elevation={1}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" component="h2">
                  Extrato
                </Typography>
                <Button component={Link} href="/transactions" size="small" variant="text">
                  Ver todas
                </Button>
              </Box>
              <TransactionList
                transactions={transactions}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                emptyMessage="Nenhuma transação recente."
              />
            </Paper>
          </Grid>
        </Grid>
      )}

      <TransactionDetailDialog
        open={Boolean(detail)}
        transaction={detail}
        onClose={onCloseDetail}
      />
      <TransactionEditDialog
        open={Boolean(edit)}
        transaction={edit}
        onClose={onCloseEdit}
        onSave={onUpdate}
      />
    </Layout>
  );
}
