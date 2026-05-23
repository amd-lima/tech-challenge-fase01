import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
} from "@mui/material";
import { TRANSACTION_TYPES } from "../lib/transactions";
import {
  parseCurrencyInput,
  formatCurrencyInputFromNumber,
} from "../lib/format";
import CurrencyTextField from "./forms/CurrencyTextField";

export default function TransactionEditDialog({ open, transaction, onClose, onSave }) {
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setForm({
        id: transaction.id,
        tipo: transaction.tipo,
        valor: formatCurrencyInputFromNumber(transaction.valor),
        data: transaction.data,
      });
      setError("");
    }
  }, [transaction]);

  if (!form) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const valorNumerico = parseCurrencyInput(form.valor);
    if (!valorNumerico || valorNumerico <= 0) {
      setError("Informe um valor maior que zero.");
      return;
    }
    setLoading(true);
    try {
      await onSave({
        id: form.id,
        tipo: form.tipo,
        valor: valorNumerico,
        data: form.data,
      });
      onClose();
    } catch (err) {
      setError(err.message || "Não foi possível atualizar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-dialog-title"
      maxWidth="xs"
      fullWidth
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogTitle id="edit-dialog-title">Editar transação</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <FormControl fullWidth sx={{ mb: 2, mt: 1 }} required>
          <InputLabel id="edit-tipo-label">Tipo</InputLabel>
          <Select
            labelId="edit-tipo-label"
            label="Tipo"
            value={form.tipo}
            onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
          >
            {TRANSACTION_TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CurrencyTextField
          value={form.valor}
          onChange={(masked) => setForm((f) => ({ ...f, valor: masked }))}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          required
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.data}
          onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
