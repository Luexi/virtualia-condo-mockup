import { formatCurrencyMXN } from "../data/mockData.js";

export { formatCurrencyMXN };

export function formatPercent(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export function formatDateShort(value) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function getStatusTone(status) {
  const tones = {
    corriente: "green",
    moroso: "red",
    pendiente: "amber",
    programado: "amber",
    resuelto: "green",
    atencion: "amber",
    operativo: "teal",
    inactivo: "slate",
  };
  return tones[status] || "slate";
}
