import { rmSync, existsSync } from "fs";
import { join } from "path";

const root = join(import.meta.dirname, "..");
const dirs = [".next", join("node_modules", ".cache")];

for (const dir of dirs) {
  const path = join(root, dir);
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
    console.log(`Removido: ${dir}`);
  }
}

console.log("Cache limpo. Rode: npm run build && npm run start (ou npm run dev)");
