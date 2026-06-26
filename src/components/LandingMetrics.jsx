import React from "react";
import { KPIS } from "../data/mockData.js";
import { Ic } from "./ui.jsx";
import { useInView, useCountUp } from "../lib/useReveal.js";

// Datos ficticios reales del demo (mockData.KPIS) para que los números sean consistentes con el panel.
const STATS = [
  { key: "cobradoPct", target: KPIS.cobradoPct, suffix: "%", icon: "TrendingUp", label: "Cobranza del mes", note: "Cuotas conciliadas en junio" },
  { key: "cobrado", target: KPIS.cobrado, prefix: "$", scale: 1000, decimals: 1, suffix: "k", icon: "Coins", label: "Cobrado en el periodo", note: "Pagos manuales validados" },
  { key: "morosos", target: KPIS.morosos, icon: "AlertTriangle", label: "Unidades en seguimiento", note: "Con saldo vencido" },
  { key: "porValidar", target: KPIS.porValidar, icon: "Wallet", label: "Comprobantes por revisar", note: "En la cola de validación" },
];

function formatStat(value, stat) {
  const scaled = stat.scale ? value / stat.scale : value;
  const decimals = stat.decimals || 0;
  const num = scaled.toLocaleString("es-MX", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${stat.prefix || ""}${num}${stat.suffix || ""}`;
}

function Stat({ stat, active }) {
  const value = useCountUp(stat.target, active, { duration: 1400 });
  return (
    <article className="landing-metric">
      <span className="landing-metric__icon"><Ic name={stat.icon} size={18} /></span>
      <span className="landing-metric__value">{formatStat(value, stat)}</span>
      <span className="landing-metric__label">{stat.label}</span>
      <span className="landing-metric__note">{stat.note}</span>
    </article>
  );
}

export default function LandingMetrics() {
  const [ref, inView] = useInView({ threshold: 0.3, once: true });

  return (
    <section className="landing-metrics" ref={ref} aria-labelledby="landing-metrics-title">
      <div className="landing-metrics__inner">
        <div className="landing-metrics__head">
          <span className="landing-section-label landing-section-label--invert">Impacto operativo</span>
          <h2 id="landing-metrics-title">Números que el comité puede leer de un vistazo.</h2>
          <p>Indicadores derivados del mismo contexto operativo, con datos ficticios de la demo.</p>
        </div>
        <div className="landing-metrics__grid">
          {STATS.map((stat) => (
            <Stat key={stat.key} stat={stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
