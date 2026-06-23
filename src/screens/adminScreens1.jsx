import React, { useState } from "react";
import * as D from "../data/mockData.js";
import { PageHeader, Card, Badge, Ic, Money, Avatar, Spark, ESTADO_BADGE } from "../components/ui.jsx";

const statusTone = (status) => (ESTADO_BADGE[status] || { tone: "slate", label: status });
const tenantLabel = (value) => (value && value !== "-" ? value : "Sin inquilino registrado");

function ActivityText({ value }) {
  const parts = String(value).split(/(<b>|<\/b>)/);
  return parts.map((part, index) => {
    if (part === "<b>" || part === "</b>") return null;
    const bold = parts[index - 1] === "<b>";
    return bold ? <b key={index}>{part}</b> : <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function donutGradient(items) {
  let acc = 0;
  const stops = [];
  items.forEach((item) => {
    const start = acc;
    acc += item.pct;
    stops.push(`${item.color} ${start}% ${acc}%`);
  });
  return `conic-gradient(${stops.join(", ")})`;
}

const sparkPct = (arr) => {
  const max = Math.max(...arr) || 1;
  return arr.map((v) => Math.round((v / max) * 100));
};

// Cobranza mensual con eje, gridlines, linea de meta y tooltip en hover.
function CollectionsChart({ onDetail }) {
  const [hover, setHover] = useState(null);
  const k = D.KPIS;
  const H = 188;
  // Junio se alinea con el headline (cobrado/pendiente del KPI) para evitar cifras contradictorias.
  const flow = D.FLUJO.map((f) =>
    f.mes === "Jun"
      ? { mes: f.mes, cobrado: k.cobrado / 1000, pendiente: k.pendiente / 1000, cobradoMXN: k.cobrado, pendienteMXN: k.pendiente }
      : { mes: f.mes, cobrado: f.cobrado, pendiente: f.pendiente, cobradoMXN: f.cobrado * 1000, pendienteMXN: f.pendiente * 1000 }
  );
  const meta = k.presupuesto / 1000;
  const peak = Math.max(meta, ...flow.map((f) => f.cobrado + f.pendiente));
  const domain = Math.ceil(peak / 50) * 50;
  const ticks = [1, 0.75, 0.5, 0.25, 0].map((t) => Math.round(domain * t));
  const px = (val) => (val / domain) * H;

  return (
    <div className="flowchart">
      <div className="flowchart__yaxis" aria-hidden="true">
        {ticks.map((t) => <span key={t}>${t}k</span>)}
      </div>
      <div className="flowchart__plot">
        {ticks.map((t) => <span key={t} className="flowchart__gridline" style={{ bottom: `${px(t)}px` }} />)}
        <span className="flowchart__meta" style={{ bottom: `${px(meta)}px` }}>
          <span className="flowchart__meta-tag">Meta {D.fmtMXN(k.presupuesto)}</span>
        </span>
        {flow.map((f) => {
          const active = hover === f.mes;
          return (
            <button
              key={f.mes}
              type="button"
              className={`flowchart__col ${f.mes === "Jun" ? "is-current" : ""}`}
              onMouseEnter={() => setHover(f.mes)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(f.mes)}
              onBlur={() => setHover(null)}
              onClick={onDetail}
              aria-label={`${f.mes}: cobrado ${D.fmtMXN(f.cobradoMXN)}, pendiente ${D.fmtMXN(f.pendienteMXN)}`}
            >
              <div className="flowchart__stack">
                <span className="flowchart__seg flowchart__seg--pendiente" style={{ height: `${px(f.pendiente)}px` }} />
                <span className="flowchart__seg flowchart__seg--cobrado" style={{ height: `${px(f.cobrado)}px` }} />
              </div>
              {active && (
                <div className="chart-tooltip" style={{ bottom: `${px(f.cobrado + f.pendiente) + 12}px` }}>
                  <div className="chart-tooltip__label"><span className="chart-dot chart-dot--cobrado" />Cobrado</div>
                  <div className="chart-tooltip__val">{D.fmtMXN(f.cobradoMXN)}</div>
                  <div className="chart-tooltip__label" style={{ marginTop: 7 }}><span className="chart-dot chart-dot--pendiente" />Pendiente</div>
                  <div className="chart-tooltip__val">{D.fmtMXN(f.pendienteMXN)}</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="flowchart__xaxis">
        {flow.map((f) => (
          <span key={f.mes} className={`flowchart__xlabel ${f.mes === "Jun" ? "is-current" : ""}`}>{f.mes}</span>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen({ setRoute, setDetail, showToast }) {
  const k = D.KPIS;
  const pct = (part, whole) => Math.round((part / whole) * 100);
  const SPARK = {
    pendiente: sparkPct(D.FLUJO.map((f) => f.pendiente)),
    tickets: sparkPct([12, 15, 13, 17, 16, 18]),
    mtto: sparkPct([3, 4, 6, 5, 7, 6]),
  };

  const openStatement = (unit) => {
    setDetail(unit);
    setRoute("estado-cuenta");
  };

  const queue = [
    { icon: "Wallet", tone: "amber", title: "9 comprobantes por revisar", sub: `${D.fmtMXN(24300)} reportados por residentes`, cta: "Revisar", route: "pagos" },
    { icon: "AlertTriangle", tone: "red", title: "3 unidades con mora mayor a 60 dias", sub: "B-1102, Casa 37 y una unidad adicional", cta: "Ver saldos", route: "cobranza" },
    { icon: "Waves", tone: "sky", title: "Alberca Sur fuera de servicio", sub: "Bomba detenida, ticket MT-316", cta: "Bitacora", route: "albercas" },
    { icon: "Elevator", tone: "peach", title: "Elevador 2 con falla intermitente", sub: "MT-317 pendiente de seguimiento", cta: "Ticket", route: "mantenimiento" },
  ];

  const kpi = (label, value, icon, tone, sub, delta) => (
    <div className={`kpi ${tone ? `kpi--${tone}` : ""}`}>
      <div className="kpi__head">
        <span className="kpi__icon"><Ic name={icon} size={19} /></span>
        <span className="kpi__label">{label}</span>
        {delta?.spark && <Spark data={delta.spark} tallIdx={delta.spark.length - 1} />}
      </div>
      <div className="kpi__value">{value}</div>
      <div className="kpi__bottom">
        {delta?.text && (
          <span className={`kpi__delta kpi__delta--${delta.tone}`}>
            <Ic name={delta.icon} size={12} />{delta.text}
          </span>
        )}
        <span className="kpi__sub">{sub}</span>
      </div>
    </div>
  );

  return (
    <main className="page fade-in">
      <div className="page-header__row" style={{ alignItems: "flex-start" }}>
        <div>
          <h1 className="welcome-h1">Bienvenido, Admin Condo</h1>
          <p className="muted" style={{ margin: "8px 0 0", fontSize: 14.5 }}>
            Resumen operativo de comunidades, saldos, comprobantes y atencion.
          </p>
        </div>
        <div className="page-header__actions">
          <span className="date-pill"><Ic name="Calendar" size={16} color="var(--text-muted)" />Periodo Jun 2026</span>
          <button className="btn btn--dark" onClick={() => showToast("Reporte visual preparado")}>
            <Ic name="Download" size={16} /> Exportar
          </button>
        </div>
      </div>

      <div className="dash-grid">
        <div className="stack">
          <div className="hero">
            <div className="row row--between">
              <div className="card__title">
                <span className="icon-chip icon-chip--teal" style={{ width: 38, height: 38 }}><Ic name="Coins" size={19} /></span>
                Corte operativo de junio
              </div>
              <span className="hero__chip">MXN</span>
            </div>
            <div className="hero__value">{D.fmtMXN(k.cobrado)}</div>
            <div className="row" style={{ gap: 9, marginTop: 12 }}>
              <span className="kpi__delta kpi__delta--up"><Ic name="ArrowUp" size={12} />{k.cobradoPct}%</span>
              <span className="kpi__sub">de presupuesto mensual registrado</span>
            </div>
            <div className="row" style={{ gap: 10, marginTop: 18 }}>
              <button className="btn btn--primary" style={{ flex: 1 }} onClick={() => setRoute("cobranza")}>
                <Ic name="Receipt" size={16} /> Revisar cobranza
              </button>
              <button className="btn btn--secondary" style={{ flex: 1 }} onClick={() => setRoute("pagos")}>
                <Ic name="FileCheck" size={16} /> Validar comprobantes
              </button>
            </div>
            <div className="row row--between" style={{ margin: "20px 0 12px" }}>
              <span className="fw-700" style={{ fontSize: 14 }}>Por comunidad</span>
              <button className="card__link" onClick={() => setRoute("unidades")}>Ver unidades</button>
            </div>
            <div className="mini-grid">
              {[
                { label: "Torre Cedro", value: "84%", sub: "cobrado", icon: "Building2", tone: "teal", go: "unidades" },
                { label: "Privada Lago Azul", value: "77%", sub: "cobrado", icon: "HomeUnit", tone: "sky", go: "unidades" },
                { label: "Por validar", value: String(k.porValidar), sub: D.fmtMXN(24300), icon: "Wallet", tone: "amber", go: "pagos" },
                { label: "Morosidad", value: String(k.morosos), sub: "unidades", icon: "AlertTriangle", tone: "red", go: "cobranza" },
              ].map((item) => (
                <button key={item.label} className="mini" type="button" onClick={() => setRoute(item.go)}>
                  <div className="mini__top">
                    <span className={`icon-chip icon-chip--${item.tone}`} style={{ width: 30, height: 30 }}><Ic name={item.icon} size={15} /></span>
                    <Ic name="ArrowRight" size={14} color="var(--text-subtle)" />
                  </div>
                  <div className="mini__value" style={{ marginTop: 8 }}>{item.value}</div>
                  <div className="mini__label">{item.label}<span className="subtle" style={{ fontWeight: 500 }}> / {item.sub}</span></div>
                </button>
              ))}
            </div>
          </div>

          <Card
            title="Cola operativa"
            icon="List"
            iconTone="amber"
            headerRight={<span className="badge badge--amber">4 pendientes</span>}
            body={false}
          >
            <div style={{ padding: "4px 22px 14px" }}>
              {queue.map((item) => (
                <div key={item.title} className="act-item" style={{ gridTemplateColumns: "38px 1fr auto", alignItems: "center" }}>
                  <span className={`icon-chip icon-chip--${item.tone}`} style={{ width: 38, height: 38 }}><Ic name={item.icon} size={17} /></span>
                  <div>
                    <div className="fw-600" style={{ fontSize: 13.5 }}>{item.title}</div>
                    <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <button className="btn btn--soft btn--sm" onClick={() => setRoute(item.route)}>{item.cta}</button>
                </div>
              ))}
            </div>
          </Card>

          <div className="copilot">
            <div className="copilot__head">
              <span className="copilot__mark"><Ic name="List" size={18} color="#fff" /></span>
              <div>
                <div className="copilot__title">Mesa operativa</div>
                <div className="copilot__sub">Atajos visuales para revisar pendientes</div>
              </div>
              <span className="right status-tag" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.2)" }}>
                Manual
              </span>
            </div>
            <div className="copilot__prompts">
              {[
                ["pagos", "Revisar pagos pendientes"],
                ["reportes", "Ver reporte para comite"],
                ["cobranza", "Auditar unidades con saldo"],
                ["comunicados", "Preparar comunicado manual"],
              ].map(([route, label]) => (
                <button key={label} className="copilot__prompt" onClick={() => setRoute(route)}>
                  <Ic name="ArrowRight" size={15} /> {label}<span className="right"><Ic name="ChevronRight" size={14} /></span>
                </button>
              ))}
            </div>
            <div className="copilot__foot"><Ic name="Info" size={13} />Acciones visuales sin automatizaciones externas.</div>
          </div>
        </div>

        <div className="stack">
          <div className="kpi-strip">
            {kpi("Saldo pendiente", D.fmtMXN(k.pendiente), "Wallet", "amber", "14 unidades", { text: "4%", tone: "down", icon: "ArrowUp", spark: SPARK.pendiente })}
            {kpi("Tickets abiertos", String(k.tickets), "Wrench", "sky", "6 programados", { text: "+3", tone: "flat", icon: "ArrowUp", spark: SPARK.tickets })}
            {kpi("Mtto. programado", String(k.programados), "CalendarCheck", "green", "Proximos 14 dias", { text: "Al dia", tone: "up", icon: "Check", spark: SPARK.mtto })}
          </div>

          <Card
            title="Cobranza mensual"
            sub="Cobrado vs. pendiente / meta de presupuesto"
            icon="ChartPie"
            body={false}
            headerRight={<button className="card__link" onClick={() => setRoute("cobranza")}>Detalle</button>}
          >
            <div style={{ padding: "0 22px 18px" }}>
              <div className="chart-legend">
                <span className="chart-legend__item"><span className="chart-legend__sw chart-legend__sw--cobrado" />Cobrado</span>
                <span className="chart-legend__item"><span className="chart-legend__sw chart-legend__sw--pendiente" />Pendiente</span>
                <span className="chart-legend__item"><span className="chart-legend__sw chart-legend__sw--meta" />Meta mensual</span>
              </div>
              <CollectionsChart onDetail={() => setRoute("cobranza")} />
            </div>
          </Card>

          <Card
            title="Pagos recientes"
            icon="CheckCircle"
            iconTone="green"
            body={false}
            headerRight={<button className="card__link" onClick={() => setRoute("cobranza")}>Ver todo</button>}
          >
            <div style={{ padding: "4px 22px 16px" }}>
              {D.PAGOS_RECIENTES.map((p) => (
                <div key={`${p.unit}-${p.fecha}`} className="tx-row">
                  <span className={`icon-chip icon-chip--${p.metodo.includes("Efectivo") ? "amber" : p.metodo.includes("Deposito") ? "sky" : "teal"}`}>
                    <Ic name={p.metodo.includes("Efectivo") ? "Coins" : "Wallet"} size={16} />
                  </span>
                  <div>
                    <div className="fw-600" style={{ fontSize: 13.5 }}>{p.concepto}</div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 1 }}>{p.unit} / {p.fecha} / {p.metodo}</div>
                  </div>
                  <span className="money fw-700" style={{ fontSize: 13.5 }}>{D.fmtMXN(p.monto)}</span>
                  <span className="badge badge--green"><Ic name="Check" size={12} />Validado</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid-2">
        <Card title="Salud financiera" sub="Junio 2026 / MXN" icon="ShieldCheck" iconTone="teal">
          <div className="finhealth">
            {[
              { label: "Presupuesto registrado", value: k.presupuesto, width: 100, tone: "slate", note: "Base operativa del mes" },
              { label: "Cobrado", value: k.cobrado, width: pct(k.cobrado, k.presupuesto), tone: "teal", note: `${pct(k.cobrado, k.presupuesto)}% de la meta` },
              { label: "Egresos", value: k.egresos, width: pct(k.egresos, k.presupuesto), tone: "amber", note: `${pct(k.egresos, k.presupuesto)}% del presupuesto` },
            ].map((row) => (
              <div key={row.label} className="finhealth__row">
                <div className="finhealth__top">
                  <span className="finhealth__label">{row.label}</span>
                  <span className="money fw-700" style={{ fontSize: 13.5 }}>{D.fmtMXN(row.value)}</span>
                </div>
                <div className="progress-track"><div className={`progress-fill progress-fill--${row.tone}`} style={{ width: `${row.width}%` }} /></div>
                <div className="finhealth__note">{row.note}</div>
              </div>
            ))}
            <div className="finhealth__result">
              <div>
                <div className="finhealth__label">Saldo operativo</div>
                <div className="muted" style={{ fontSize: 12 }}>Cobrado menos egresos del periodo</div>
              </div>
              <div className="finhealth__result-val">{D.fmtMXN(k.saldoOperativo)}</div>
            </div>
          </div>
        </Card>

        <Card
          title="Egresos por categoria"
          sub="Junio 2026"
          icon="ChartPie"
          headerRight={<button className="card__link" onClick={() => setRoute("reportes")}>Reporte</button>}
        >
          <div className="donut-wrap">
            <div className="donut" style={{ background: donutGradient(D.EGRESOS) }}>
              <div className="donut__hole">
                <div className="muted" style={{ fontSize: 11 }}>Total egresos</div>
                <div className="fw-700" style={{ fontSize: 16, fontFamily: "var(--font-mono)" }}>{D.fmtMXN(k.egresos)}</div>
              </div>
            </div>
            <div className="donut-legend">
              {D.EGRESOS.map((item) => (
                <div key={item.cat} className="donut-legend__row">
                  <span className="donut-legend__sw" style={{ background: item.color }} />
                  <span>{item.cat}<span className="subtle" style={{ fontWeight: 500 }}> / {item.pct}%</span></span>
                  <span className="money fw-700" style={{ fontSize: 12.5 }}>{D.fmtMXN(item.monto)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid-3">
        <Card title="Comunicados recientes" icon="Megaphone" headerRight={<button className="card__link" onClick={() => setRoute("comunicados")}>Ver</button>}>
          <div className="act-list">
            {D.COMUNICADOS.slice(0, 3).map((c) => (
              <div key={c.titulo} className="act-item" style={{ gridTemplateColumns: "1fr", gap: 4 }}>
                <div className="row row--between"><span className="fw-600" style={{ fontSize: 13 }}>{c.titulo}</span><span className="act-item__time">{c.fecha}</span></div>
                <div className="row" style={{ gap: 8 }}><span className="badge badge--ghost">{c.seg}</span><span className="muted" style={{ fontSize: 12 }}>Publicado</span></div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Proximos mantenimientos" icon="CalendarCheck" headerRight={<button className="card__link" onClick={() => setRoute("mantenimiento")}>Ver todo</button>}>
          <div className="act-list">
            {D.PREVENTIVO.map((p) => (
              <div key={p.titulo} className="act-item" style={{ gridTemplateColumns: "34px 1fr auto" }}>
                <span className="icon-chip icon-chip--teal" style={{ width: 34, height: 34 }}><Ic name={p.icon} size={16} /></span>
                <div><div className="fw-600" style={{ fontSize: 13 }}>{p.titulo}</div><div className="muted" style={{ fontSize: 12, marginTop: 1 }}>{p.com} / {p.prox}</div></div>
                <Badge tone={p.estado === "Programado" ? "amber" : "slate"}>{p.estado}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Actividad reciente" icon="Clock">
          <div className="act-list">
            {D.ACTIVIDAD.slice(0, 4).map((a) => (
              <div key={a.txt} className="act-item">
                <span className={`icon-chip icon-chip--${a.tone}`} style={{ width: 32, height: 32 }}><Ic name={a.icon} size={15} /></span>
                <div className="act-item__title"><ActivityText value={a.txt} /></div>
                <span className="act-item__time">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

function UnitsScreen({ tenant, setRoute, setDetail, showToast }) {
  const [filter, setFilter] = useState("todos");
  const [q, setQ] = useState("");
  const baseRows = D.UNITS.filter((u) => tenant === "all" || u.com === tenant);
  let rows = baseRows;
  if (filter === "corriente") rows = rows.filter((u) => u.estado === "corriente");
  if (filter === "moroso") rows = rows.filter((u) => u.estado === "moroso");
  if (filter === "renta") rows = rows.filter((u) => u.renta);
  if (filter === "depto") rows = rows.filter((u) => u.tipo === "Departamento");
  if (filter === "casa") rows = rows.filter((u) => u.tipo === "Casa");
  if (q) {
    const needle = q.toLowerCase();
    rows = rows.filter((u) => `${u.u} ${u.owner} ${u.tenant}`.toLowerCase().includes(needle));
  }

  const counts = {
    todos: baseRows.length,
    corriente: baseRows.filter((u) => u.estado === "corriente").length,
    moroso: baseRows.filter((u) => u.estado === "moroso").length,
    renta: baseRows.filter((u) => u.renta).length,
  };

  const openStatement = (unit) => {
    setDetail(unit);
    setRoute("estado-cuenta");
  };

  return (
    <main className="page fade-in">
      <PageHeader
        route="unidades"
        actions={[
          <button key="export" className="btn btn--ghost" onClick={() => showToast("Vista exportada")}>
            <Ic name="Download" size={16} /> Exportar
          </button>,
          <button key="new" className="btn btn--primary" onClick={() => showToast("Formulario visual abierto")}>
            <Ic name="Plus" size={16} /> Nueva unidad
          </button>,
        ]}
      />
      <div className="card">
        <div className="card__header" style={{ flexWrap: "wrap", gap: 12 }}>
          <div className="filters">
            {[
              ["todos", "Todas", counts.todos],
              ["corriente", "Al corriente", counts.corriente],
              ["moroso", "Morosas", counts.moroso],
              ["renta", "En renta", counts.renta],
              ["depto", "Departamentos"],
              ["casa", "Casas"],
            ].map(([key, label, count]) => (
              <button key={key} className={`chip ${filter === key ? "chip--active" : ""}`} onClick={() => setFilter(key)}>
                {label}{count != null && <span className="chip__count">{count}</span>}
              </button>
            ))}
          </div>
          <div className="search" style={{ maxWidth: 240, margin: 0 }}>
            <span className="search__icon"><Ic name="Search" size={15} /></span>
            <input placeholder="Buscar unidad..." aria-label="Buscar unidad" value={q} onChange={(ev) => setQ(ev.target.value)} style={{ padding: "8px 12px 8px 38px" }} />
          </div>
        </div>
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>{["Unidad", "Propietario", "Inquilino", "Contacto", "Veh.", "Saldo", "Estado", ""].map((th) => <th key={th} className={th === "Saldo" ? "num" : ""}>{th}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((u) => {
                const status = statusTone(u.estado);
                return (
                  <tr key={u.u} className="clickable" onClick={() => openStatement(u.u)}>
                    <td>
                      <div className="av-pair">
                        <Avatar name={u.u} tone={u.tipo === "Casa" ? "sky" : "teal"} />
                        <div>
                          <div className="cell-main">{u.u}</div>
                          <div className="cell-sub">{u.tipo}{u.tags.includes("Comite") ? " / Comite" : ""}</div>
                        </div>
                      </div>
                    </td>
                    <td><div className="cell-main" style={{ fontWeight: 500 }}>{u.owner}</div><div className="cell-sub">{u.m2} m2</div></td>
                    <td>{u.tenant === "-" ? <span className="subtle">-</span> : <span>{u.tenant}</span>}</td>
                    <td><span className="mono muted">{u.contacto}</span></td>
                    <td><span className="row" style={{ gap: 5 }}><Ic name="Car" size={14} color="var(--text-subtle)" />{u.cars}</span></td>
                    <td className="num">{u.saldo < 0 ? <Money value={u.saldo} /> : <span className="subtle mono">$0</span>}</td>
                    <td><Badge tone={status.tone} dot>{status.label}</Badge></td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-btn" title="Estado de cuenta" aria-label={`Abrir estado de cuenta de ${u.u}`} onClick={(ev) => { ev.stopPropagation(); openStatement(u.u); }}>
                          <Ic name="Eye" size={16} />
                        </button>
                        <button className="icon-btn" title="Revisar cobranza" aria-label={`Revisar cobranza de ${u.u}`} onClick={(ev) => { ev.stopPropagation(); setDetail(u.u); setRoute("cobranza"); }}>
                          <Ic name="Wallet" size={16} />
                        </button>
                        <button className="icon-btn" title="Mas acciones" aria-label={`Mas acciones para ${u.u}`} onClick={(ev) => { ev.stopPropagation(); showToast("Acciones visuales abiertas"); }}>
                          <Ic name="MoreVertical" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card__footer">
          <span className="muted" style={{ fontSize: 13 }}>Mostrando {rows.length} de {baseRows.length} unidades</span>
          <div className="row" style={{ gap: 6 }}>
            <button className="btn btn--ghost btn--sm">Anterior</button>
            <button className="btn btn--ghost btn--sm">Siguiente</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function UnitStatementScreen({ detail, setRoute, showToast }) {
  const unit = D.UNITS.find((u) => u.u === (detail || "A-204")) || D.UNITS[0];
  const community = D.COMMUNITIES.find((c) => c.id === unit.com);
  const status = statusTone(unit.estado);

  return (
    <main className="page fade-in">
      <PageHeader
        route="estado-cuenta"
        crumbs={[
          <button key="units" onClick={() => setRoute("unidades")}>Unidades</button>,
          <span key="sep" className="breadcrumb__sep">/</span>,
          <span key="unit" className="fw-600" style={{ color: "var(--text)" }}>{unit.u}</span>,
        ]}
        actions={[
          <button key="note" className="btn btn--ghost" onClick={() => showToast("Aviso manual preparado")}>
            <Ic name="Send" size={16} /> Preparar aviso
          </button>,
          <button key="pdf" className="btn btn--secondary" onClick={() => showToast("Estado de cuenta preparado")}>
            <Ic name="Printer" size={16} /> PDF
          </button>,
          <button key="manual" className="btn btn--primary" onClick={() => showToast("Registro manual abierto")}>
            <Ic name="Plus" size={16} /> Registrar manual
          </button>,
        ]}
      />

      <div className="grid-main-l">
        <div className="stack">
          <div className="card" style={{ overflow: "hidden" }}>
            <div style={{ padding: 20, background: "#0F3540", color: "#fff" }}>
              <div className="row" style={{ gap: 12 }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center", color: "#57BFA4" }}>
                  <Ic name={unit.tipo === "Casa" ? "HomeUnit" : "Building"} size={22} />
                </span>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: 0 }}>{unit.u}</div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.66)" }}>{community?.name} / {unit.tipo}</div>
                </div>
              </div>
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Saldo actual</div>
                <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 0, marginTop: 2, color: unit.saldo < 0 ? "#FF9B8A" : "#fff", fontFamily: "var(--font-mono)" }}>
                  {D.fmtMXN(unit.saldo)}
                </div>
                <div style={{ marginTop: 8 }}>
                  <span className={`badge badge--${status.tone}`} style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>
                    <span className="badge__dot" />{status.label}{unit.dias > 0 ? ` / ${unit.dias} dias` : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="card__body">
              <div className="kv-list">
                <div className="kv-row"><span className="kv-row__k">Propietario</span><span className="kv-row__v">{unit.owner}</span></div>
                <div className="kv-row"><span className="kv-row__k">Inquilino</span><span className="kv-row__v">{tenantLabel(unit.tenant)}</span></div>
                <div className="kv-row"><span className="kv-row__k">Contacto</span><span className="kv-row__v mono">{unit.contacto}</span></div>
                <div className="kv-row"><span className="kv-row__k">Superficie</span><span className="kv-row__v">{unit.m2} m2</span></div>
                <div className="kv-row"><span className="kv-row__k">Cajones</span><span className="kv-row__v">{unit.cars}</span></div>
                <div className="kv-row"><span className="kv-row__k">Tags</span><span className="kv-row__v" style={{ gap: 5 }}>{unit.tags.length ? unit.tags.map((tag) => <span key={tag} className="badge badge--ghost">{tag}</span>) : "-"}</span></div>
              </div>
            </div>
          </div>

          <Card title="Notas internas" icon="FileText">
            <div className="banner banner--amber" style={{ fontSize: 12.5 }}>
              <span className="banner__icon"><Ic name="Info" size={15} /></span>
              Acuerdo de seguimiento visible para administracion. Sin contacto externo desde esta demo.
            </div>
            <textarea className="field__textarea" style={{ marginTop: 12 }} placeholder="Agregar nota interna..." />
            <button className="btn btn--soft btn--sm" style={{ marginTop: 10 }} onClick={() => showToast("Nota guardada")}>Guardar nota</button>
          </Card>
        </div>

        <div className="stack">
          <Card title="Linea financiera" icon="Clock">
            <div className="timeline">
              {D.STATEMENT.timeline.map((item) => (
                <div key={item.t} className="tl-item">
                  <span className={`tl-dot tl-dot--${item.tone}`}><Ic name={item.icon} size={16} /></span>
                  <div className="tl-body"><div className="tl-title">{item.t}</div><div className="tl-meta">{item.meta}</div></div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid-2">
            <Card title="Historial de cargos" icon="Receipt" iconTone="amber" body={false}>
              <div className="table-wrap">
                <table className="tbl">
                  <tbody>
                    {D.STATEMENT.cargos.map((charge) => (
                      <tr key={`${charge.fecha}-${charge.concepto}`}>
                        <td><div className="cell-main" style={{ fontWeight: 500, fontSize: 13 }}>{charge.concepto}</div><div className="cell-sub">{charge.fecha}</div></td>
                        <td className="num"><span className="money money--neg">+{D.fmtMXN(charge.monto)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <Card title="Pagos manuales" icon="CheckCircle" iconTone="green" body={false}>
              <div className="table-wrap">
                <table className="tbl">
                  <tbody>
                    {D.STATEMENT.pagos.map((payment) => (
                      <tr key={payment.ref}>
                        <td><div className="cell-main" style={{ fontWeight: 500, fontSize: 13 }}>{payment.concepto}</div><div className="cell-sub">{payment.fecha} / {payment.metodo} / {payment.ref}</div></td>
                        <td className="num"><span className="money money--pos">-{D.fmtMXN(payment.monto)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <Card
            title="Comprobantes y recibos"
            icon="FolderOpen"
            headerRight={<button className="card__link" onClick={() => showToast("Adjunto visual preparado")}><Ic name="Plus" size={14} />Subir</button>}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {["comprobante_jun.pdf", "recibo_may.pdf", "ficha_abr.jpg", "recibo_mar.pdf"].map((file, index) => (
                <div key={file} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="ph" style={{ height: 96 }}><Ic name={index % 2 ? "FileText" : "Image"} size={22} /></div>
                  <div style={{ fontSize: 11, fontWeight: 600, textAlign: "center", wordBreak: "break-all" }}>{file}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export { DashboardScreen, UnitsScreen, UnitStatementScreen };
