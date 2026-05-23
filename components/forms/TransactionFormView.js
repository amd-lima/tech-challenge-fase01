import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { TRANSACTION_TYPES } from "../../lib/transactions";
import CurrencyTextField from "./CurrencyTextField";

/**
 * Template do formulário — só JSX, sem estado.
 */
export default function TransactionFormView({
  title,
  showDate,
  submitLabel,
  form,
  error,
  loading,
  onFieldChange,
  onSubmit,
}) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
      }}
      aria-labelledby="transaction-form-title"
    >
      <Typography id="transaction-form-title" variant="h6" sx={{ mb: 2, color: "primary.main" }}>
        {title}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 2 }} required>
        <InputLabel id="tipo-label">Tipo de transação</InputLabel>
        <Select
          labelId="tipo-label"
          id="tipo"
          label="Tipo de transação"
          value={form.tipo}
          onChange={(e) => onFieldChange("tipo", e.target.value)}
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
        onChange={(masked) => onFieldChange("valor", masked)}
        sx={{ mb: showDate ? 2 : 3 }}
      />

      {showDate && (
        <TextField
          fullWidth
          required
          type="date"
          id="data"
          name="data"
          label="Data"
          InputLabelProps={{ shrink: true }}
          value={form.data}
          onChange={(e) => onFieldChange("data", e.target.value)}
          sx={{ mb: 3 }}
        />
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? "Salvando..." : submitLabel}
      </Button>
    </Box>
  );
}
