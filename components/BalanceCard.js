import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { formatCurrency } from "../lib/format";

export default function BalanceCard({ saldo, subtitle = "Conta Corrente" }) {
  const [visible, setVisible] = useState(true);

  return (
    <Card
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
          Olá! Bem-vindo(a) ao Tech-challenge
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 0.5,
            mb: 0.5,
            minHeight: 32,
          }}
        >
          <Typography variant="body2" component="span" sx={{ lineHeight: 1, m: 0 }}>
            Saldo
          </Typography>
          <IconButton
            size="small"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
            sx={{
              color: "inherit",
              width: 32,
              height: 32,
              p: 0.5,
              flexShrink: 0,
              "& .MuiSvgIcon-root": { fontSize: 20, display: "block" },
            }}
          >
            {visible ? (
              <VisibilityIcon fontSize="small" />
            ) : (
              <VisibilityOffIcon fontSize="small" />
            )}
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ opacity: 0.85, mb: 1 }}>
          {subtitle}
        </Typography>
        <Box>
          <Typography variant="h4" component="p" aria-live="polite" sx={{ m: 0 }}>
            {visible ? formatCurrency(saldo) : "••••••"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
