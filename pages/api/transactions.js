import { formatDate } from "../../lib/format";
import { normalizeValor } from "../../lib/transactions";

if (!global.transactions) {
  global.transactions = [
    { id: 1, tipo: "depósito", valor: 1000, data: "2026-05-15T15:30" },
    { id: 2, tipo: "transferência", valor: -200, data: "2026-05-16T22:05" },
    { id: 3, tipo: "depósito", valor: 150, data: "2022-11-18T20:00" },
    { id: 4, tipo: "transferência", valor: -500, data: "2022-11-20T10:06" },
  ];
}


export function getTransactions() {
  return global.transactions;
}

function findIndexById(id) {
  return global.transactions.findIndex((t) => t.id === Number(id));
}

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(global.transactions);
  }

  if (req.method === "POST") {
    const { tipo, valor, data } = req.body;
    if (!tipo || valor === undefined || valor === "" || !data) {
      return res.status(400).json({ message: "tipo, valor e data são obrigatórios" });
    }

    // Se veio só a data (sem hora), adiciona hora/minuto atuais
    let finalData = data;
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      finalData = `${data}T${h}:${m}`; // formato ISO
    }

    const nova = {
      id: Date.now(),
      tipo,
      valor: normalizeValor(tipo, valor),
      data: finalData,
    };
    global.transactions.push(nova);
    return res.status(201).json(nova);
  }

  if (req.method === "PUT") {
    const { id, tipo, valor, data } = req.body;
    if (!id || !tipo || valor === undefined || valor === "" || !data) {
      return res.status(400).json({ message: "id, tipo, valor e data são obrigatórios" });
    }

    const index = findIndexById(id);
    if (index === -1) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    // Se veio só a data (sem hora), adiciona hora/minuto atuais
    let finalData = data;
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      finalData = `${data}T${h}:${m}`; // formato ISO
    }

    const atualizada = {
      id: Number(id),
      tipo,
      valor: normalizeValor(tipo, valor),
      data: finalData,
    };

    global.transactions[index] = atualizada;
    return res.status(200).json(atualizada);
  }


  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "id é obrigatório" });
    }
    const antes = global.transactions.length;
    global.transactions = global.transactions.filter((t) => t.id !== Number(id));
    if (global.transactions.length === antes) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }
    return res.status(200).json({ message: "Transação deletada" });
  }

  return res.status(405).json({ message: "Método não permitido" });
}
