import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { formatCurrency, formatDate } from "../lib/format";

export default function TransactionDetailDialog({ open, transaction, onClose }) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="detail-dialog-title" maxWidth="xs" fullWidth>
      <DialogTitle id="detail-dialog-title">Detalhes da transação</DialogTitle>
      <DialogContent>
        <Stack spacing={2} divider={<Divider flexItem />}>
          <div>
            <Typography variant="body2" color="text.secondary">
              ID
            </Typography>
            <Typography>{transaction.id}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Tipo
            </Typography>
            <Typography>{transaction.tipo}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Valor
            </Typography>
            <Typography fontWeight={600}>{formatCurrency(transaction.valor)}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              Data
            </Typography>
            <Typography>{formatDate(transaction.data)}</Typography>
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
