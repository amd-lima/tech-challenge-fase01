import { TextField } from "@mui/material";
import { maskCurrencyInput } from "../../lib/format";

/**
 * Campo de valor com máscara de Real (R$), sem type="number".
 */
export default function CurrencyTextField({
  id = "valor",
  name = "valor",
  label = "Valor",
  value,
  onChange,
  required = true,
  sx,
}) {
  return (
    <TextField
      fullWidth
      required={required}
      id={id}
      name={name}
      label={label}
      placeholder="R$ 0,00"
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={value}
      onChange={(e) => onChange(maskCurrencyInput(e.target.value))}
      sx={sx}
    />
  );
}
