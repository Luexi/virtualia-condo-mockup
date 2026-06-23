import React, { useState } from "react";
import * as D from "../data/mockData.js";
import { PageHeader, Card, Badge, Ic, Money, Avatar } from "../components/ui.jsx";

const REVIEW_STATE = {
  nuevo: { tone: "amber", label: "Por validar" },
  revision: { tone: "sky", label: "En revision" },
  aclaracion: { tone: "peach", label: "Aclaracion" },
};

function CollectionsScreen({ tenant, showToast }) {
  const k = D.KPIS;
  const maxFlow = Math.max(...D.FLUJO.map((f) => f.cobrado + f.pendiente));
  const units = D.UNITS.filter((u) => tenant === "all" || u.com === tenant);
  const overdue = units.filter((u) => u.saldo < 0);

  const summary = (label, value, icon, tone, sub) => (
    <div className={`kpi ${tone ? `kpi--${tone}` : ""}`}>
      <div className="kpi__head">
        <span className="kpi__icon"><Ic name={icon} size={19} /></span>
        <span className="kpi__label">{label}</span>
      </div>
      <div className="kpi__value">{value}</div>
      {sub && <div className="kpi__sub" style={{ marginTop: 12 }}>{sub}</div>}
    </div>
  );

  return (
    <main className="page fade-in">
      <PageHeader
        route="cobranza"
        actions={[
          <button key="export" className="btn btn--ghost" onClick={() => showToast("Vista exportada")}>
            <Ic name="Sheet" size={16} /> Exportar
          </button>,
          <button key="follow" className="btn btn--secondary" onClick={() => showToast("Seguimiento manual preparado")}>
            <Ic name="Send" size={16} /> Preparar seguimiento
          </button>,
          <button key="charges" className="btn btn--primary" onClick={() => showToast("Previsualizacion de cuotas abierta")}>
            <Ic name="Coins" size={16} /> Previsualizar cuotas
          </button>,
        ]}
      />

      <div className="kpis">
        {summary("Cobrado / junio", D.fmtMXN(k.cobrado), "TrendingUp", "green", `${k.cobradoPct}% de presupuesto`)}
        {summary("Pendiente", D.fmtMXN(k.pendiente), "Wallet", "amber", `${overdue.length} unidades con saldo`)}
        {summary("Por validar", String(k.porValidar), "FileCheck", "sky", "Comprobantes recibidos")}
        {summary("Recargos manuales", D.fmtMXN(8400), "AlertTriangle", "red", "Sujetos a revision")}
      </div>

      <div className="grid-main">
        <div className="stack">
          <Card
            title="Cobranza vs. pendiente"
            sub="Ultimos 6 meses / miles de MXN"
            icon="ChartPie"
            headerRight={
              <div className="chart-legend" style={{ display: "flex", gap: 14 }}>
                <span className="row" style={{ gap: 6, fontSize: 12 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--teal-500)" }} />Cobrado</span>
                <span className="row" style={{ gap: 6, fontSize: 12 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--teal-100)" }} />Pendiente</span>
              </div>
            }
          >
            <div className="barchart">
              {D.FLUJO.map((f) => (
                <div key={f.mes} className="barchart__col">
                  <div className="barchart__bars">
                    <div className="barchart__bar barchart__bar--cobrado" style={{ height: `${(f.cobrado / maxFlow) * 150}px` }} title={`$${f.cobrado}k`} />
                    <div className="barchart__bar barchart__bar--pendiente" style={{ height: `${(f.pendiente / maxFlow) * 150}px` }} />
                  </div>
                  <div className="barchart__label">{f.mes}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card
            title="Pagos manuales recientes"
            icon="CheckCircle"
            iconTone="green"
            body={false}
            headerRight={<span className="badge badge--green">Validados</span>}
          >
            <div className="table-wrap">
              <table className="tbl">
                <thead>
                  <tr>{["Fecha", "Unidad", "Concepto", "Metodo", "Monto"].map((head) => <th key={head} className={head === "Monto" ? "num" : ""}>{head}</th>)}</tr>
                </thead>
                <tbody>
                  {D.PAGOS_RECIENTES.map((p) => (
                    <tr key={`${p.fecha}-${p.unit}-${p.monto}`}>
                      <td className="muted">{p.fecha}</td>
                      <td><span className="fw-600">{p.unit}</span></td>
                      <td>{p.concepto}</td>
                      <td><span className="badge badge--ghost">{p.metodo}</span></td>
                      <td className="num"><span className="money money--pos">{D.fmtMXN(p.monto)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="stack">
          <Card title="Flujo operativo" icon="List">
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                ["Receipt", "Cargar cuota", "Registro interno de cargo"],
                ["Paperclip", "Recibir comprobante", "Archivo enviado por residente"],
                ["FileCheck", "Revisar archivo", "Validacion administrativa"],
                ["CheckCircle", "Aplicar pago manual", "Afecta saldo y reporte"],
              ].map(([icon, label, sub]) => (
                <div key={label} className="act-item" style={{ gridTemplateColumns: "34px 1fr" }}>
                  <span className="icon-chip icon-chip--teal" style={{ width: 34, height: 34 }}><Ic name={icon} size={16} /></span>
                  <div><div className="fw-600" style={{ fontSize: 13 }}>{label}</div><div className="muted" style={{ fontSize: 12 }}>{sub}</div></div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Acciones masivas" icon="Bolt">
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                ["Coins", "Previsualizar cuotas de junio", "primary", "Previsualizacion abierta"],
                ["Send", "Preparar seguimiento manual", "soft", "Seguimiento preparado"],
                ["Sheet", "Exportar tabla", "secondary", "Vista exportada"],
                ["Printer", "Preparar reporte PDF", "secondary", "Reporte preparado"],
              ].map(([icon, label, tone, toast]) => (
                <button key={label} className={`btn btn--${tone} btn--block`} style={{ justifyContent: "flex-start" }} onClick={() => showToast(toast)}>
                  <Ic name={icon} size={16} /> {label}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Composicion de cuotas" icon="Layers">
            <div className="kv-list">
              {[
                ["Ordinarias", 268000, "teal"],
                ["Extraordinarias / fachada", 42000, "sky"],
                ["Recargos manuales", 8400, "red"],
                ["Ajustes aprobados", -3200, "green"],
              ].map(([label, amount, color]) => (
                <div key={label} className="kv-row">
                  <span className="kv-row__k row" style={{ gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: `var(--${color}-${color === "teal" ? "500" : "600"})` }} />{label}
                  </span>
                  <span className={`kv-row__v money ${amount < 0 ? "money--pos" : ""}`}>{D.fmtMXN(amount)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Morosidad por antiguedad" icon="AlertTriangle" iconTone="red" body={false} headerRight={<span className="badge badge--red">{D.KPIS.morosos} unidades</span>}>
            <div style={{ padding: "8px 6px" }}>
              {D.MOROSIDAD_ANT.map((item, index) => (
                <div key={item.rango} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, padding: "11px 12px", borderBottom: index < D.MOROSIDAD_ANT.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div>
                    <div className="row row--between" style={{ marginBottom: 6 }}>
                      <span className="fw-600" style={{ fontSize: 13 }}>{item.rango}</span>
                      <span className="money fw-700" style={{ fontSize: 13 }}>{D.fmtMXN(item.monto)}</span>
                    </div>
                    <div className="progress-track"><div className={`progress-fill progress-fill--${item.color}`} style={{ width: `${(item.unidades / 6) * 100}%` }} /></div>
                    <div className="muted" style={{ fontSize: 11.5, marginTop: 5 }}>{item.unidades} unidades</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

function PaymentsReviewScreen({ tenant, showToast }) {
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState({});
  const rows = D.PAGOS_VALIDAR.filter((p) => tenant === "all" || p.com === tenant);
  const total = rows.reduce((sum, p) => sum + p.monto, 0);

  const resolve = (id, label) => {
    setDone((current) => ({ ...current, [id]: label }));
    setSelected(null);
    showToast(label);
  };

  return (
    <main className="page fade-in">
      <PageHeader
        route="pagos"
        actions={[
          <span key="count" className="badge badge--amber" style={{ alignSelf: "center" }}><Ic name="Wallet" size={13} />{rows.length} pendientes / {D.fmtMXN(total)}</span>,
          <button key="filter" className="btn btn--secondary" onClick={() => showToast("Filtros visuales")}>
            <Ic name="Filter" size={16} /> Filtrar
          </button>,
        ]}
      />

      <div className="banner banner--sky">
        <span className="banner__icon"><Ic name="ShieldCheck" size={17} /></span>
        <div>
          <div className="banner__title">Revision manual con trazabilidad visual</div>
          Aprueba, rechaza o solicita aclaracion sobre comprobantes ficticios. La demo no conecta con bancos ni procesa pagos.
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>{["Folio", "Unidad", "Monto", "Metodo", "Reportado", "Comprobante", "Estado", "Acciones"].map((head) => <th key={head} className={head === "Monto" ? "num" : ""}>{head}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const resolved = done[p.id];
                const status = REVIEW_STATE[p.estado] || REVIEW_STATE.nuevo;
                return (
                  <tr key={p.id} className={resolved ? "" : "clickable"} onClick={() => !resolved && setSelected(p)} style={resolved ? { opacity: 0.55 } : undefined}>
                    <td><span className="mono muted">{p.id}</span></td>
                    <td>
                      <div className="av-pair">
                        <Avatar name={p.unit} size="sm" tone={p.com === "lago" ? "sky" : "teal"} />
                        <div><div className="cell-main" style={{ fontSize: 13 }}>{p.unit}</div><div className="cell-sub">{p.quien}</div></div>
                      </div>
                    </td>
                    <td className="num"><span className="money">{D.fmtMXN(p.monto)}</span></td>
                    <td><span className="badge badge--ghost">{p.metodo}</span></td>
                    <td className="muted" style={{ fontSize: 12.5 }}>{p.fecha}</td>
                    <td><span className="row" style={{ gap: 6, fontSize: 12 }}><Ic name="Paperclip" size={14} color="var(--text-subtle)" /><span className="mono" style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.evidencia}</span></span></td>
                    <td>{resolved ? <Badge tone={resolved.includes("aprob") ? "green" : resolved.includes("rechaz") ? "red" : "peach"}>{resolved}</Badge> : <Badge tone={status.tone} dot>{status.label}</Badge>}</td>
                    <td>
                      {resolved ? (
                        <span className="subtle" style={{ fontSize: 12 }}>Resuelto</span>
                      ) : (
                        <div className="row-actions">
                          <button className="icon-btn" title="Aprobar" aria-label={`Aprobar comprobante ${p.id}`} onClick={(ev) => { ev.stopPropagation(); resolve(p.id, "Comprobante aprobado"); }} style={{ color: "var(--green-700)" }}><Ic name="Check" size={16} /></button>
                          <button className="icon-btn" title="Rechazar" aria-label={`Rechazar comprobante ${p.id}`} onClick={(ev) => { ev.stopPropagation(); resolve(p.id, "Comprobante rechazado"); }} style={{ color: "var(--red-600)" }}><Ic name="X" size={16} /></button>
                          <button className="icon-btn" title="Ver detalle" aria-label={`Ver detalle ${p.id}`} onClick={(ev) => { ev.stopPropagation(); setSelected(p); }}><Ic name="Eye" size={16} /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <>
          <div className="drawer-overlay" onClick={() => setSelected(null)} />
          <div className="drawer">
            <div className="drawer__header">
              <div>
                <div className="row" style={{ gap: 8 }}>
                  <span className="mono muted">{selected.id}</span>
                  <Badge tone={(REVIEW_STATE[selected.estado] || REVIEW_STATE.nuevo).tone}>{(REVIEW_STATE[selected.estado] || REVIEW_STATE.nuevo).label}</Badge>
                </div>
                <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: 0, marginTop: 6 }}>{D.fmtMXN(selected.monto)}</div>
                <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>{selected.unit} / {selected.quien}</div>
              </div>
              <button className="icon-btn" aria-label="Cerrar panel de comprobante" onClick={() => setSelected(null)}><Ic name="X" size={18} /></button>
            </div>
            <div className="drawer__body">
              <div className="banner banner--sky" style={{ fontSize: 12.5 }}>
                <span className="banner__icon"><Ic name="Info" size={15} /></span>
                Revisa que monto, unidad y concepto coincidan antes de aplicar el pago manual.
              </div>
              <div>
                <div className="context-section__title" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0, color: "var(--text-subtle)", fontWeight: 700, marginBottom: 10 }}>
                  Archivo adjunto
                </div>
                <div className="ph" style={{ height: 200 }}>
                  <div style={{ textAlign: "center" }}><Ic name="Image" size={26} /><div style={{ marginTop: 6 }}>{selected.evidencia}</div></div>
                </div>
              </div>
              <div className="kv-list">
                <div className="kv-row"><span className="kv-row__k">Monto reportado</span><span className="kv-row__v money">{D.fmtMXN(selected.monto)}</span></div>
                <div className="kv-row"><span className="kv-row__k">Metodo</span><span className="kv-row__v">{selected.metodo}</span></div>
                <div className="kv-row"><span className="kv-row__k">Unidad</span><span className="kv-row__v">{selected.unit}</span></div>
                <div className="kv-row"><span className="kv-row__k">Reportado por</span><span className="kv-row__v">{selected.quien}</span></div>
                <div className="kv-row"><span className="kv-row__k">Fecha</span><span className="kv-row__v">{selected.fecha}</span></div>
              </div>
              <div className="field">
                <label className="field__label">Nota de revision</label>
                <textarea className="field__textarea" placeholder="Ej. Coincide con cuota ordinaria de junio..." style={{ minHeight: 64 }} />
              </div>
            </div>
            <div className="drawer__footer">
              <button className="btn btn--danger-soft" style={{ flex: 1 }} onClick={() => resolve(selected.id, "Comprobante rechazado")}><Ic name="X" size={16} />Rechazar</button>
              <button className="btn btn--secondary" style={{ flex: 1 }} onClick={() => resolve(selected.id, "Aclaracion solicitada")}><Ic name="Help" size={16} />Aclaracion</button>
              <button className="btn btn--primary" style={{ flex: 1 }} onClick={() => resolve(selected.id, "Comprobante aprobado")}><Ic name="Check" size={16} />Aprobar</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export { CollectionsScreen, PaymentsReviewScreen };
