import { Box, Grid, Paper, Typography, Alert, CircularProgress } from "@mui/material";
import Layout from "../components/Layout";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionDetailDialog from "../components/TransactionDetailDialog";
import TransactionEditDialog from "../components/TransactionEditDialog";

/**
 * Template da página de transações — só apresentação.
 */
export default function TransactionsView({
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
    <Layout title="Transações">
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
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TransactionForm
              title="Adicionar transação"
              showDate
              submitLabel="Adicionar"
              onSubmit={onCreate}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 2 }} elevation={1}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Todas as transações
              </Typography>
              <TransactionList
                transactions={transactions}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
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
