import Link from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/transactions", label: "Transações" },
];

export default function Layout({ children, title }) {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <AccountBalanceWalletIcon sx={{ color: "secondary.main" }} aria-hidden />
          <Typography variant="h6" component="span" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Tech-challenge
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            component="nav"
            aria-label="Principal"
            sx={{ alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                variant={router.pathname === item.href ? "outlined" : "text"}
                sx={{
                  borderColor: router.pathname === item.href ? "secondary.main" : "transparent",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        {title && (
          <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}
