import React, { useState } from "react";
import * as D from "../data/mockData.js";
import { PageHeader, Card, Badge, Ic, Avatar } from "../components/ui.jsx";

const SEGMENTS = ["Todos", "Propietarios", "Inquilinos", "Comite", "Morosos", "Torre Cedro", "Privada Lago Azul"];
const ACCESS_STATE = {
  autorizado: { tone: "green", label: "Autorizado" },
  usado: { tone: "slate", label: "Usado" },
  expirado: { tone: "amber", label: "Expirado" },
  cancelado: { tone: "red", label: "Cancelado" },
};

function CommunicationsScreen({ showToast }) {
  const [draftOpen, setDraftOpen] = useState(false);
  const [segment, setSegment] = useState("Todos");
  const [message, setMessage] = useState("");

  return (
    <main className="page fade-in">
      <PageHeader
        route="comunicados"
        actions={[
          <button key="doc" className="btn btn--secondary" onClick={() => showToast("Documento visual preparado")}><Ic name="Plus" size={16} />Subir documento</button>,
          <button key="new" className="btn btn--primary" onClick={() => setDraftOpen(true)}><Ic name="Megaphone" size={16} />Nuevo comunicado</button>,
        ]}
      />

      <div className="grid-main">
        <div className="stack">
          <Card title="Avisos recientes" icon="Megaphone" body={false} headerRight={<button className="card__link">Historial</button>}>
            <div>
              {D.COMUNICADOS.map((item, index) => (
                <div key={item.titulo} style={{ padding: "16px 20px", borderBottom: index < D.COMUNICADOS.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="row row--between" style={{ marginBottom: 8 }}>
                    <div className="row" style={{ gap: 9 }}>
                      <span className={`icon-chip ${item.prioridad === "alta" ? "icon-chip--red" : "icon-chip--teal"}`} style={{ width: 32, height: 32 }}>
                        <Ic name="Megaphone" size={15} />
                      </span>
                      <div>
                        <div className="fw-700" style={{ fontSize: 14 }}>{item.titulo}</div>
                        <div className="muted" style={{ fontSize: 12, marginTop: 1 }}>{item.fecha} / Segmento: {item.seg}</div>
                      </div>
                    </div>
                    <Badge tone="green" dot>Publicado</Badge>
                  </div>
                  <div className="row row--between">
                    <span className="muted" style={{ fontSize: 12 }}>Publicacion visible en portal residente</span>
                    <button className="btn btn--ghost btn--sm" onClick={() => showToast("Detalle del comunicado abierto")}>Detalle</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="banner banner--teal">
            <span className="banner__icon"><Ic name="FileText" size={17} /></span>
            <div>
              <div className="banner__title">Plantillas manuales</div>
              Prepara avisos base para revision antes de publicarlos en la comunidad.
              <button className="card__link" style={{ display: "inline-flex", marginLeft: 6 }} onClick={() => setDraftOpen(true)}>Crear aviso</button>
            </div>
          </div>
        </div>

        <Card title="Documentos de la comunidad" icon="FolderOpen" body={false} headerRight={<button className="card__link" onClick={() => showToast("Documento preparado")}><Ic name="Plus" size={14} />Subir</button>}>
          <div style={{ padding: "6px 8px" }}>
            {D.DOCUMENTOS.map((doc, index) => (
              <div key={doc.nombre} className="row row--between" style={{ padding: "11px 12px", borderBottom: index < D.DOCUMENTOS.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div className="row" style={{ gap: 11 }}>
                  <span className="icon-chip icon-chip--slate" style={{ width: 34, height: 34 }}><Ic name={doc.icon} size={16} /></span>
                  <div>
                    <div className="fw-600" style={{ fontSize: 13 }}>{doc.nombre}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>{doc.tipo} / {doc.peso} / {doc.fecha}</div>
                  </div>
                </div>
                <button className="icon-btn" aria-label={`Descargar ${doc.nombre}`} onClick={() => showToast("Documento descargado")}>
                  <Ic name="Download" size={16} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {draftOpen && (
        <>
          <div className="modal-overlay" onClick={() => setDraftOpen(false)} />
          <div className="modal modal--lg">
            <div className="modal__header">
              <div className="row row--between">
                <div className="card__title">
                  <span className="icon-chip icon-chip--teal" style={{ width: 30, height: 30 }}><Ic name="Megaphone" size={16} /></span>
                  Nuevo comunicado
                </div>
                <button className="icon-btn" aria-label="Cerrar comunicado" onClick={() => setDraftOpen(false)}><Ic name="X" size={18} /></button>
              </div>
            </div>
            <div className="modal__body">
              <div className="field">
                <label className="field__label">Segmentacion</label>
                <div className="filters">
                  {SEGMENTS.map((item) => (
                    <button key={item} className={`chip ${segment === item ? "chip--active" : ""}`} onClick={() => setSegment(item)}>{item}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label className="field__label">Titulo</label>
                <input className="field__input" placeholder="Ej. Corte de agua programado" />
              </div>
              <div className="field">
                <div className="row row--between">
                  <label className="field__label">Mensaje</label>
                  <button
                    className="btn btn--soft btn--sm"
                    onClick={() => setMessage("Estimados residentes: informamos una actividad de mantenimiento programada. Favor de tomar previsiones y revisar los detalles publicados por administracion.")}
                  >
                    <Ic name="FileText" size={14} />Usar plantilla
                  </button>
                </div>
                <textarea
                  className="field__textarea"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Escribe el comunicado..."
                  style={{ minHeight: 120 }}
                />
                <div className="field__hint row" style={{ gap: 6 }}><Ic name="Info" size={13} />Revisar contenido antes de publicarlo.</div>
              </div>
            </div>
            <div className="modal__footer">
              <button className="btn btn--ghost" onClick={() => setDraftOpen(false)}>Cancelar</button>
              <button className="btn btn--secondary" onClick={() => showToast("Borrador guardado")}>Guardar borrador</button>
              <button className="btn btn--primary" onClick={() => { setDraftOpen(false); showToast(`Comunicado publicado para: ${segment}`); }}>
                <Ic name="Send" size={15} />Publicar
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

function AccessScreen({ showToast }) {
  const [selected, setSelected] = useState(D.VISITAS[0]);
  const state = ACCESS_STATE[selected.estado] || ACCESS_STATE.autorizado;

  return (
    <main className="page fade-in">
      <PageHeader
        route="accesos"
        actions={[
          <span key="state" className="badge badge--green" style={{ alignSelf: "center" }}><span className="badge__dot" />Caseta operativa</span>,
          <button key="new" className="btn btn--primary" onClick={() => showToast("Autorizacion visual preparada")}><Ic name="Plus" size={16} />Generar folio</button>,
        ]}
      />

      <div className="grid-main">
        <div className="stack">
          <Card title="Autorizaciones" icon="KeyRound" body={false} headerRight={<div className="row" style={{ gap: 8 }}><span className="badge badge--green">2 activas</span><span className="badge badge--slate">6 hoy</span></div>}>
            <div className="table-wrap">
              <table className="tbl">
                <thead>
                  <tr>{["Folio", "Visitante", "Unidad", "Tipo", "Vehiculo", "Vence", "Estado"].map((head) => <th key={head}>{head}</th>)}</tr>
                </thead>
                <tbody>
                  {D.VISITAS.map((visit) => {
                    const visitState = ACCESS_STATE[visit.estado] || ACCESS_STATE.autorizado;
                    return (
                      <tr key={visit.folio} className="clickable" onClick={() => setSelected(visit)}>
                        <td><span className="mono muted">{visit.folio}</span></td>
                        <td><span className="cell-main" style={{ fontSize: 13 }}>{visit.nombre}</span></td>
                        <td>{visit.unidad}</td>
                        <td><span className="badge badge--ghost">{visit.tipo}</span></td>
                        <td><span className="mono muted">{visit.placa}</span></td>
                        <td className="muted" style={{ fontSize: 12.5 }}>{visit.vence}</td>
                        <td><Badge tone={visitState.tone} dot={visit.estado === "autorizado"}>{visitState.label}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Bitacora de caseta / hoy" icon="List" body={false}>
            <div style={{ padding: "6px 20px 16px" }}>
              <div className="timeline" style={{ marginTop: 10 }}>
                {D.BITACORA.map((entry) => (
                  <div key={`${entry.hora}-${entry.evento}`} className="tl-item">
                    <span className={`tl-dot tl-dot--${entry.tone}`}>
                      <Ic name={entry.tone === "red" ? "X" : entry.evento.includes("Salida") ? "ArrowRight" : "Check"} size={15} />
                    </span>
                    <div className="tl-body">
                      <div className="tl-title">{entry.evento}<span className="muted" style={{ fontWeight: 500, fontSize: 12 }}>{entry.hora}</span></div>
                      <div className="tl-meta">{entry.detalle.replace("Codigo", "Folio")}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="stack">
          <Card title="Pase de acceso" icon="KeyRound" iconTone="sky">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
              <div className="ph" style={{ width: 160, height: 118, flexDirection: "column", gap: 8 }}>
                <Ic name="KeyRound" size={28} />
                <span className="mono" style={{ fontSize: 17, fontWeight: 800 }}>{selected.folio}</span>
              </div>
              <div>
                <div className="fw-700" style={{ fontSize: 14.5 }}>{selected.nombre}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>{selected.unidad} / {selected.tipo}</div>
              </div>
              <Badge tone={state.tone} dot={selected.estado === "autorizado"}>{state.label}</Badge>
            </div>
            <div className="kv-list" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
              <div className="kv-row"><span className="kv-row__k">Folio</span><span className="kv-row__v mono">{selected.folio}</span></div>
              <div className="kv-row"><span className="kv-row__k">Vigencia</span><span className="kv-row__v">{selected.vence}</span></div>
              <div className="kv-row"><span className="kv-row__k">Vehiculo</span><span className="kv-row__v mono">{selected.placa}</span></div>
            </div>
            <div className="status-tag" style={{ marginTop: 14 }}>Autorizacion manual</div>
          </Card>

          <Card title="Vista de vigilancia" icon="Shield" iconTone="slate">
            <div className="banner banner--sky" style={{ fontSize: 12.5 }}>
              <span className="banner__icon"><Ic name="Info" size={15} /></span>
              Modo simplificado para caseta: consultar autorizaciones y registrar entradas o salidas.
            </div>
            <div className="row" style={{ gap: 8, marginTop: 12 }}>
              <button className="btn btn--primary btn--block" onClick={() => showToast("Entrada registrada")}>
                <Ic name="Check" size={16} />Entrada
              </button>
              <button className="btn btn--secondary btn--block" onClick={() => showToast("Registro manual abierto")}>Manual</button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
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

function ReportsScreen({ showToast }) {
  const k = D.KPIS;
  const maxFlow = Math.max(...D.FLUJO.map((flow) => flow.cobrado));

  return (
    <main className="page fade-in">
      <PageHeader
        route="reportes"
        actions={[
          <button key="sheet" className="btn btn--ghost" onClick={() => showToast("Tabla exportada")}><Ic name="Sheet" size={16} />Tabla</button>,
          <button key="pdf" className="btn btn--secondary" onClick={() => showToast("PDF preparado")}><Ic name="Printer" size={16} />PDF</button>,
          <button key="report" className="btn btn--primary" onClick={() => showToast("Corte mensual preparado")}><Ic name="FileText" size={16} />Preparar corte</button>,
        ]}
      />

      <div className="card" style={{ background: "#0F3540", color: "#fff", overflow: "hidden" }}>
        <div className="card__body" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {[
            ["Ingresos del mes", D.fmtMXN(k.cobrado), "+6.4%", "TrendingUp"],
            ["Egresos del mes", D.fmtMXN(k.egresos), "-2.1%", "TrendingDown"],
            ["Resultado neto", D.fmtMXN(k.cobrado - k.egresos), "Superavit", "CheckCircle"],
            ["Saldo operativo", D.fmtMXN(k.saldoOperativo), "Por revisar", "ShieldCheck"],
          ].map(([label, value, sub, icon], index) => (
            <div key={label} style={{ borderLeft: index ? "1px solid rgba(255,255,255,0.12)" : "none", paddingLeft: index ? 24 : 0 }}>
              <div className="row" style={{ gap: 7, fontSize: 12.5, color: "rgba(255,255,255,0.62)" }}><Ic name={icon} size={14} color="#57BFA4" />{label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 0, marginTop: 8, fontFamily: "var(--font-mono)" }}>{value}</div>
              <div style={{ fontSize: 12, color: "#57BFA4", marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <Card title="Egresos por categoria" sub="Junio 2026" icon="ChartPie">
          <div className="donut-wrap">
            <div style={{ position: "relative", width: 150, height: 150, borderRadius: "50%", background: donutGradient(D.EGRESOS) }}>
              <div style={{ position: "absolute", inset: 26, background: "var(--surface)", borderRadius: "50%", display: "grid", placeItems: "center", textAlign: "center" }}>
                <div><div className="muted" style={{ fontSize: 11 }}>Total</div><div className="fw-700" style={{ fontSize: 15, fontFamily: "var(--font-mono)" }}>$198k</div></div>
              </div>
            </div>
            <div className="donut-legend">
              {D.EGRESOS.map((item) => (
                <div key={item.cat} className="donut-legend__row">
                  <span className="donut-legend__sw" style={{ background: item.color }} />
                  <span>{item.cat}</span>
                  <span className="money fw-700" style={{ fontSize: 12.5 }}>{D.fmtMXN(item.monto)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Flujo mensual" sub="Ingresos cobrados / 6 meses" icon="TrendingUp">
          <div className="barchart">
            {D.FLUJO.map((flow) => (
              <div key={flow.mes} className="barchart__col">
                <div className="barchart__bars">
                  <div className="barchart__bar barchart__bar--cobrado" style={{ height: `${(flow.cobrado / maxFlow) * 150}px`, width: 22 }} />
                </div>
                <div className="barchart__label">{flow.mes}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid-2">
        <Card title="Gastos por categoria operativa" icon="Briefcase" body={false}>
          <div style={{ padding: "8px 6px" }}>
            {D.PROVEEDORES.map((item, index) => (
              <div key={item.nombre} style={{ padding: "11px 14px", borderBottom: index < D.PROVEEDORES.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div className="row row--between" style={{ marginBottom: 6 }}>
                  <div><span className="fw-600" style={{ fontSize: 13 }}>{item.nombre}</span><span className="muted" style={{ fontSize: 12 }}> / {item.cat}</span></div>
                  <span className="money fw-700" style={{ fontSize: 13 }}>{D.fmtMXN(item.monto)}</span>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${item.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>

        <div className="stack">
          <Card title="Morosidad por antiguedad" icon="AlertTriangle" iconTone="red">
            <div className="kv-list">
              {D.MOROSIDAD_ANT.map((item) => (
                <div key={item.rango} className="kv-row">
                  <span className="kv-row__k row" style={{ gap: 8 }}><span className={`badge badge--${item.color}`}>{item.unidades} u.</span>{item.rango}</span>
                  <span className="kv-row__v money money--neg">{D.fmtMXN(item.monto)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Mantenimiento abierto" icon="Wrench" iconTone="sky">
            <div className="row" style={{ gap: 20 }}>
              <div><div className="fw-700" style={{ fontSize: 28, letterSpacing: 0 }}>{D.KPIS.tickets}</div><div className="muted" style={{ fontSize: 12 }}>tickets abiertos</div></div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  ["Alta", 3, "red"],
                  ["Media", 7, "amber"],
                  ["Baja", 8, "teal"],
                ].map(([label, count, tone]) => (
                  <div key={label}>
                    <div className="row row--between" style={{ fontSize: 11.5, marginBottom: 3 }}><span className="muted">{label}</span><span className="fw-600">{count}</span></div>
                    <div className="progress-track" style={{ height: 5 }}><div className={`progress-fill progress-fill--${tone}`} style={{ width: `${(count / 18) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

function SettingsScreen({ showToast }) {
  const [switches, setSwitches] = useState({ recargos: true, seguimiento: false, pronto: false });
  const toggle = (key) => setSwitches((current) => ({ ...current, [key]: !current[key] }));
  const sectionCard = (title, icon, children) => <Card title={title} icon={icon}>{children}</Card>;

  return (
    <main className="page fade-in">
      <PageHeader
        route="configuracion"
        actions={[
          <span key="private" className="badge badge--teal" style={{ alignSelf: "center" }}><Ic name="Lock" size={13} />Instancia privada</span>,
        ]}
      />

      <div className="grid-2">
        {sectionCard("Datos de la comunidad", "Building2", (
          <div className="kv-list">
            <div className="kv-row"><span className="kv-row__k">Nombre</span><span className="kv-row__v">Administracion Condo</span></div>
            <div className="kv-row"><span className="kv-row__k">Comunidades</span><span className="kv-row__v">2 / 174 unidades</span></div>
            <div className="kv-row"><span className="kv-row__k">Moneda</span><span className="kv-row__v">MXN / Peso mexicano</span></div>
            <div className="kv-row"><span className="kv-row__k">Zona horaria</span><span className="kv-row__v">America/Mexico_City</span></div>
          </div>
        ))}

        {sectionCard("Cuotas y recargos", "Coins", (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              ["Cuota ordinaria / Depto", "$2,100 / mes"],
              ["Cuota ordinaria / Casa", "$2,100 / mes"],
              ["Extraordinaria / Fachada", "$1,500 / vigente"],
            ].map(([label, value], index) => (
              <div key={label} className="row row--between" style={{ padding: "10px 0", borderBottom: index < 2 ? "1px solid var(--border)" : "none" }}>
                <span style={{ fontSize: 13 }}>{label}</span>
                <span className="money fw-600" style={{ fontSize: 13 }}>{value}</span>
              </div>
            ))}
            <div className="row row--between" style={{ padding: "12px 0 2px" }}>
              <div>
                <div className="fw-600" style={{ fontSize: 13 }}>Recargo manual por mora</div>
                <div className="muted" style={{ fontSize: 11.5 }}>$600 tras revision administrativa</div>
              </div>
              <button type="button" role="switch" aria-checked={switches.recargos} aria-label="Activar recargo manual por mora" className={`switch ${switches.recargos ? "switch--on" : ""}`} onClick={() => toggle("recargos")} />
            </div>
          </div>
        ))}

        {sectionCard("Usuarios y roles", "Users", (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              ["Admin Condo", "Administrador", "teal"],
              ["Comite Condo", "Comite", "sky"],
              ["Vigilancia Condo", "Vigilancia", "slate"],
              ["Residente 02", "Residente", "amber"],
            ].map(([name, role, tone], index) => (
              <div key={name} className="row row--between" style={{ padding: "10px 0", borderBottom: index < 3 ? "1px solid var(--border)" : "none" }}>
                <div className="row" style={{ gap: 10 }}><Avatar name={name} size="sm" tone={tone} /><span className="fw-600" style={{ fontSize: 13 }}>{name}</span></div>
                <span className={`badge badge--${tone === "slate" ? "slate" : tone}`}>{role}</span>
              </div>
            ))}
            <button className="btn btn--soft btn--sm" style={{ marginTop: 10 }} onClick={() => showToast("Invitacion preparada")}><Ic name="Plus" size={14} />Invitar usuario</button>
          </div>
        ))}

        {sectionCard("Metodos de registro", "Wallet", (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Comprobante manual", "Deposito reportado", "Efectivo administracion"].map((method, index) => (
              <div key={method} className="row row--between" style={{ padding: "9px 0", borderBottom: index < 2 ? "1px solid var(--border)" : "none" }}>
                <span className="row" style={{ gap: 9, fontSize: 13 }}>
                  <span className="icon-chip icon-chip--slate" style={{ width: 28, height: 28 }}><Ic name="Wallet" size={14} /></span>
                  {method}
                </span>
                <Badge tone="slate" dot>Visible</Badge>
              </div>
            ))}
          </div>
        ))}

        {sectionCard("Parametros operativos", "Bolt", (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              ["seguimiento", "Seguimiento de saldos", "Prepara avisos internos para revision"],
              ["pronto", "Ajuste por pronto pago", "Visible como parametro administrativo"],
              ["recargos", "Recargos por mora", "Registro manual sujeto a aprobacion"],
            ].map(([key, label, hint], index) => (
              <div key={key} className="row row--between" style={{ padding: "11px 0", borderBottom: index < 2 ? "1px solid var(--border)" : "none" }}>
                <div><div className="fw-600" style={{ fontSize: 13 }}>{label}</div><div className="muted" style={{ fontSize: 11.5 }}>{hint}</div></div>
                <button type="button" role="switch" aria-checked={switches[key]} aria-label={label} className={`switch ${switches[key] ? "switch--on" : ""}`} onClick={() => toggle(key)} />
              </div>
            ))}
          </div>
        ))}

        {sectionCard("Respaldos y datos", "Database", (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="banner banner--teal" style={{ fontSize: 12.5 }}>
              <span className="banner__icon"><Ic name="ShieldCheck" size={15} /></span>
              <div><span className="fw-700">Datos ficticios. </span>Configuracion centralizada para la operacion visual de la comunidad.</div>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <button className="btn btn--secondary btn--block" onClick={() => showToast("Datos exportados")}><Ic name="Download" size={15} />Exportar datos</button>
              <button className="btn btn--ghost btn--block" onClick={() => showToast("Respaldo visual preparado")}><Ic name="Database" size={15} />Respaldo</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export { CommunicationsScreen, AccessScreen, ReportsScreen, SettingsScreen };
