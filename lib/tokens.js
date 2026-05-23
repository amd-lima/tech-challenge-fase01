/**
 * Fonte única das cores do projeto.
 * Altere aqui — o MUI (lib/theme.js) e as variáveis CSS (:root) usam estes valores.
 */
export const colors = {
  principal: "#6e0d6a",
  principalDark: "#4a0947",
  principalLight: "#8f3a8c",
  secundaria: "#a559d8",
  secundariaDark: "#7d3ca8",
  secundariaLight: "#c48ae8",
  destaque: "#ff5031",
  fundo: "#f3e9f3",
  branca: "#ffffff",
  texto: "#191c1d",
  textoSecundario: "#5c6266",
};

/** Variáveis CSS expostas em document.documentElement */
export const cssVariables = {
  "--cor-branca": colors.branca,
  "--cor-principal": colors.principal,
  "--cor-secundaria": colors.secundaria,
  "--cor-destaque": colors.destaque,
  "--cor-fundo": colors.fundo,
};
