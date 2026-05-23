import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatCurrency, formatDate } from "../lib/format";

function valorColor(valor) {
  const n = Number(valor);
  if (n < 0) return "error.main";
  if (n > 0) return "secondary.main";
  return "text.secondary";
}

export default function TransactionList({
  transactions,
  onView,
  onEdit,
  onDelete,
  emptyMessage = "Nenhuma transação encontrada.",
}) {
  if (!transactions.length) {
    return (
      <Typography color="text.secondary" role="status">
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <List aria-label="Lista de transações" disablePadding>
      {transactions.map((t, index) => (
        <Box key={t.id}>
          {index > 0 && <Divider />}
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <Stack direction="row" spacing={0.5} aria-label={`Ações da transação ${t.id}`}>
                <IconButton
                  edge="end"
                  aria-label={`Ver detalhes da transação ${t.id}`}
                  onClick={() => onView(t)}
                  size="small"
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label={`Editar transação ${t.id}`}
                  onClick={() => onEdit(t)}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label={`Excluir transação ${t.id}`}
                  onClick={() => onDelete(t)}
                  size="small"
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            }
          >
            <ListItemText
              primary={
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", flexWrap: "wrap" }}
                >
                  <Chip label={t.tipo} size="small" color="primary" variant="outlined" />
                  <Typography
                    component="span"
                    fontWeight={600}
                    sx={{ color: valorColor(t.valor) }}
                  >
                    {formatCurrency(t.valor)}
                  </Typography>
                </Stack>
              }
              secondary={formatDate(t.data)}
            />
          </ListItem>
        </Box>
      ))}
    </List>
  );
}
