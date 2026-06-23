import React, { useState } from "react";
import * as D from "../data/mockData.js";
import { PageHeader, Card, Badge, Ic, Avatar } from "../components/ui.jsx";

const PRIORITY = { alta: "red", media: "amber", baja: "teal" };
const POOL_STATE = {
  optima: { tone: "green", label: "En servicio" },
  atencion: { tone: "amber", label: "Requiere atencion" },
  fuera: { tone: "red", label: "Fuera de servicio" },
};
const RES_STATE = {
  aprobada: { tone: "green", label: "Aprobada" },
  pendiente: { tone: "amber", label: "Pendiente" },
};

function MaintenanceScreen({ tenant, showToast }) {
  const [view, setView] = useState("tablero");
  const tickets = D.TICKETS.filter((ticket) => tenant === "all" || ticket.com === tenant);
  const byState = (key) => tickets.filter((ticket) => ticket.estado === key);
  const stateLabel = (key) => D.TICKET_ESTADOS.find((item) => item.k === key) || D.TICKET_ESTADOS[0];

  const ticketCard = (ticket) => (
    <button key={ticket.id} type="button" className="ticket" aria-label={`Abrir ticket ${ticket.id}`} onClick={() => showToast(`Ticket abierto ${ticket.id}`)}>
      <div className={`prio-bar prio-bar--${ticket.prio}`} />
      <div className="ticket__top">
        <span className="ticket__id">{ticket.id}</span>
        <span className="row" style={{ gap: 5, fontSize: 11.5 }}><Ic name={ticket.icon} size={13} color="var(--text-muted)" />{ticket.cat}</span>
      </div>
      <div className="ticket__title">{ticket.titulo}</div>
      <div className="ticket__foot">
        <span className={`badge badge--${PRIORITY[ticket.prio]}`}>{ticket.prio === "alta" ? "Alta" : ticket.prio === "media" ? "Media" : "Baja"}</span>
        <span className="subtle" style={{ fontSize: 11.5 }}>Seguimiento manual</span>
      </div>
      <div className="row" style={{ gap: 7, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
        <Avatar name={ticket.resp} size="sm" tone="slate" />
        <span className="muted" style={{ fontSize: 11.5 }}>{ticket.resp}</span>
      </div>
    </button>
  );

  return (
    <main className="page fade-in">
      <PageHeader
        route="mantenimiento"
        actions={[
          <div key="view" className="seg">
            <button className={`seg__btn ${view === "tablero" ? "seg__btn--active" : ""}`} onClick={() => setView("tablero")}><Ic name="Columns" size={15} />Tablero</button>
            <button className={`seg__btn ${view === "tabla" ? "seg__btn--active" : ""}`} onClick={() => setView("tabla")}><Ic name="List" size={15} />Tabla</button>
          </div>,
          <button key="new" className="btn btn--primary" onClick={() => showToast("Ticket visual creado")}><Ic name="Plus" size={16} />Nuevo ticket</button>,
        ]}
      />

      <div className="card" style={{ background: "var(--surface)", borderColor: "var(--teal-100)" }}>
        <div className="card__body" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          <div className="row row--between row--wrap">
            <div className="row" style={{ gap: 12 }}>
              <span className="icon-chip icon-chip--lg icon-chip--teal"><Ic name="ShieldCheck" size={22} /></span>
              <div>
                <div className="fw-700" style={{ fontSize: 15 }}>Mantenimiento preventivo</div>
                <div className="muted" style={{ fontSize: 13 }}>Servicios programados y pendientes de agenda</div>
              </div>
            </div>
            <button className="btn btn--soft btn--sm" onClick={() => showToast("Agenda visual abierta")}><Ic name="Calendar" size={15} />Agendar servicio</button>
          </div>
          <div className="preventive-grid">
            {D.PREVENTIVO.map((item) => (
              <div key={item.titulo} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, display: "flex", gap: 11, alignItems: "center" }}>
                <span className="icon-chip icon-chip--teal"><Ic name={item.icon} size={17} /></span>
                <div>
                  <div className="fw-600" style={{ fontSize: 13 }}>{item.titulo}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 1 }}>{item.prox} / {item.com}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {view === "tablero" ? (
        <div className="board">
          {D.TICKET_ESTADOS.map((state) => (
            <div key={state.k} className="board__col">
              <div className="board__col-head">
                <span className="board__col-title">
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: `var(--${state.badge === "green" ? "green-600" : state.badge === "slate" ? "slate-600" : state.badge === "sky" ? "sky-600" : state.badge === "amber" ? "amber-600" : "peach-600"})` }} />
                  {state.label}
                </span>
                <span className="board__col-count">{byState(state.k).length}</span>
              </div>
              {byState(state.k).map(ticketCard)}
              {byState(state.k).length === 0 && <div className="subtle" style={{ fontSize: 12, textAlign: "center", padding: "20px 0" }}>Sin tickets</div>}
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="table-wrap">
            <table className="tbl">
              <thead>
                <tr>{["Folio", "Asunto", "Categoria", "Prioridad", "Responsable", "Fecha", "Estado"].map((head) => <th key={head}>{head}</th>)}</tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => {
                  const state = stateLabel(ticket.estado);
                  return (
                    <tr key={ticket.id} className="clickable" onClick={() => showToast(`Ticket abierto ${ticket.id}`)}>
                      <td><span className="mono muted">{ticket.id}</span></td>
                      <td><span className="cell-main" style={{ fontSize: 13 }}>{ticket.titulo}</span></td>
                      <td><span className="row" style={{ gap: 6 }}><Ic name={ticket.icon} size={14} color="var(--text-muted)" />{ticket.cat}</span></td>
                      <td><Badge tone={PRIORITY[ticket.prio]} dot>{ticket.prio[0].toUpperCase() + ticket.prio.slice(1)}</Badge></td>
                      <td>{ticket.resp}</td>
                      <td className="muted">{ticket.fecha}</td>
                      <td><Badge tone={state.badge}>{state.label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

function PoolsScreen({ showToast }) {
  const [selectedId, setSelectedId] = useState(D.POOLS[0].id);
  const pool = D.POOLS.find((item) => item.id === selectedId) || D.POOLS[0];
  const poolState = POOL_STATE[pool.estado] || POOL_STATE.atencion;
  const relatedTicket = D.TICKETS.find((ticket) => ticket.cat === "Alberca" && ticket.com === "lago");

  return (
    <main className="page fade-in">
      <PageHeader
        route="albercas"
        actions={[
          <span key="state" className="status-tag" style={{ alignSelf: "center" }}>Operacion manual</span>,
          <button key="log" className="btn btn--secondary" onClick={() => showToast("Bitacora visual preparada")}><Ic name="Download" size={16} />Bitacora</button>,
          <button key="add" className="btn btn--primary" onClick={() => showToast("Registro de servicio abierto")}><Ic name="Plus" size={16} />Registrar servicio</button>,
        ]}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 16 }}>
        {D.POOLS.map((item) => {
          const state = POOL_STATE[item.estado] || POOL_STATE.atencion;
          return (
            <button
              key={item.id}
              className="card"
              onClick={() => setSelectedId(item.id)}
              style={{
                textAlign: "left",
                padding: 0,
                cursor: "pointer",
                borderColor: selectedId === item.id ? "var(--teal-300)" : "var(--border)",
                boxShadow: selectedId === item.id ? "0 0 0 3px var(--teal-50)" : "var(--shadow-xs)",
              }}
            >
              <div className="card__body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="row row--between">
                  <span className={`icon-chip icon-chip--lg ${item.estado === "fuera" ? "icon-chip--red" : item.estado === "atencion" ? "icon-chip--amber" : "icon-chip--sky"}`}>
                    <Ic name="Waves" size={21} />
                  </span>
                  <Badge tone={state.tone} dot>{state.label}</Badge>
                </div>
                <div>
                  <div className="fw-700" style={{ fontSize: 14.5 }}>{item.nombre}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{item.com}</div>
                </div>
                <div className="muted" style={{ fontSize: 12, lineHeight: 1.5 }}>{item.ultima}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid-main">
        <div className="stack">
          <Card title={`Estado de servicio / ${pool.nombre}`} icon="Waves" iconTone={pool.estado === "fuera" ? "red" : "sky"} headerRight={<Badge tone={poolState.tone} dot>{poolState.label}</Badge>}>
            {pool.estado === "fuera" ? (
              <div className="banner banner--amber">
                <span className="banner__icon"><Ic name="AlertTriangle" size={17} /></span>
                <div>
                  <div className="banner__title">Fuera de servicio</div>
                  Bomba detenida desde el 20 Jun 2026. Seguimiento en ticket MT-316.
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                  ["Ultima revision", pool.ultima, "CheckCircle"],
                  ["Proximo servicio", pool.prox, "CalendarCheck"],
                  ["Responsable", "Administracion", "UserCircle"],
                ].map(([label, value, icon]) => (
                  <div key={label} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
                    <span className="icon-chip icon-chip--teal" style={{ width: 30, height: 30 }}><Ic name={icon} size={15} /></span>
                    <div className="fw-700" style={{ fontSize: 13, marginTop: 10 }}>{label}</div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>{value}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Bitacora de servicio" icon="FileText" body={false} headerRight={<button className="card__link">Ver completa</button>}>
            <div style={{ padding: "6px 20px 14px" }}>
              <div className="timeline" style={{ marginTop: 8 }}>
                {D.POOL_LOG.map((log) => (
                  <div key={`${log.fecha}-${log.accion}`} className="tl-item">
                    <span className={`tl-dot tl-dot--${log.tone}`}><Ic name="FileText" size={15} /></span>
                    <div className="tl-body">
                      <div className="tl-title">{log.accion}<span className="muted" style={{ fontWeight: 500, fontSize: 12 }}>{log.fecha}</span></div>
                      <div className="tl-meta">{log.quien} / registro manual</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Evidencia de servicio" icon="Image" headerRight={<button className="card__link" onClick={() => showToast("Foto adjuntada")}><Ic name="Plus" size={14} />Subir</button>}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {["Area", "Equipo", "Limpieza", "Cierre"].map((label) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="ph" style={{ height: 90 }}><Ic name="Image" size={20} /></div>
                  <div style={{ fontSize: 11, fontWeight: 600, textAlign: "center", color: "var(--text-muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="stack">
          <Card title="Ficha de alberca" icon="Info">
            <div className="kv-list">
              <div className="kv-row"><span className="kv-row__k">Ultima revision</span><span className="kv-row__v">{pool.ultima}</span></div>
              <div className="kv-row"><span className="kv-row__k">Proximo servicio</span><span className="kv-row__v">{pool.estado === "fuera" ? <span className="badge badge--red">Suspendido</span> : pool.prox}</span></div>
              <div className="kv-row"><span className="kv-row__k">Seguimiento</span><span className="kv-row__v">{relatedTicket ? relatedTicket.id : "Sin ticket abierto"}</span></div>
              <div className="kv-row"><span className="kv-row__k">Ubicacion</span><span className="kv-row__v">{pool.com}</span></div>
            </div>
          </Card>

          <Card title="Incidencias abiertas" icon="AlertTriangle" iconTone="amber">
            {pool.estado === "optima" ? (
              <div className="empty" style={{ padding: "24px 12px" }}>
                <span className="empty__icon" style={{ width: 44, height: 44 }}><Ic name="CheckCircle" size={20} /></span>
                <div className="empty__title" style={{ fontSize: 13.5 }}>Sin incidencias</div>
                <div className="empty__text" style={{ fontSize: 12 }}>Sin pendientes registrados para esta alberca.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="row" style={{ gap: 11, padding: 12, background: "var(--surface-2)", borderRadius: 11 }}>
                  <span className={`icon-chip ${pool.estado === "fuera" ? "icon-chip--red" : "icon-chip--amber"}`}><Ic name="Wrench" size={16} /></span>
                  <div>
                    <div className="fw-600" style={{ fontSize: 13 }}>{pool.estado === "fuera" ? "Bomba detenida" : "Revision pendiente"}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{relatedTicket ? `${relatedTicket.id} / ${relatedTicket.estado}` : "Sin ticket asignado"}</div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card title="Resumen operativo" icon="List">
            <div className="kv-list">
              <div className="kv-row"><span className="kv-row__k">Albercas</span><span className="kv-row__v">3</span></div>
              <div className="kv-row"><span className="kv-row__k">En servicio</span><span className="kv-row__v">{D.POOLS.filter((item) => item.estado === "optima").length}</span></div>
              <div className="kv-row"><span className="kv-row__k">Requieren atencion</span><span className="kv-row__v">{D.POOLS.filter((item) => item.estado !== "optima").length}</span></div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

function AmenitiesScreen({ showToast }) {
  const [view, setView] = useState("admin");
  const week = ["Lun 22", "Mar 23", "Mie 24", "Jue 25", "Vie 26", "Sab 27", "Dom 28"];
  const calendar = {
    0: [["Gimnasio", "green"]],
    4: [["Salon", "teal"]],
    5: [["Palapa", "amber"], ["Alberca", "sky"]],
    6: [["Cancha", "teal"]],
  };

  return (
    <main className="page fade-in">
      <PageHeader
        route="amenidades"
        actions={[
          <div key="view" className="seg">
            <button className={`seg__btn ${view === "admin" ? "seg__btn--active" : ""}`} onClick={() => setView("admin")}>Administrador</button>
            <button className={`seg__btn ${view === "residente" ? "seg__btn--active" : ""}`} onClick={() => setView("residente")}>Residente</button>
          </div>,
          <button key="new" className="btn btn--primary" onClick={() => showToast("Reserva visual preparada")}><Ic name="Plus" size={16} />Nueva reserva</button>,
        ]}
      />

      {view === "residente" ? (
        <div className="card" style={{ maxWidth: 560 }}>
          <div className="card__body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="fw-700" style={{ fontSize: 16 }}>Solicitar amenidad</div>
            <div className="muted" style={{ fontSize: 13, marginTop: -8 }}>Vista simplificada para residentes. Las solicitudes quedan pendientes de aprobacion.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {D.AMENITIES.slice(0, 4).map((item) => (
                <button key={item.id} className="card" style={{ padding: 14, display: "flex", gap: 11, alignItems: "center", textAlign: "left" }} onClick={() => showToast(`Solicitud preparada para ${item.nombre}`)}>
                  <span className="icon-chip icon-chip--lg icon-chip--teal"><Ic name={item.icon} size={20} /></span>
                  <div>
                    <div className="fw-600" style={{ fontSize: 13.5 }}>{item.nombre}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>{item.deposito > 0 ? `Deposito ${D.fmtMXN(item.deposito)}` : "Sin deposito"}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="banner banner--teal" style={{ fontSize: 12.5 }}>
              <span className="banner__icon"><Ic name="Info" size={15} /></span>
              La reserva queda pendiente hasta que administracion la apruebe.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 14 }}>
            {D.AMENITIES.map((item) => (
              <div key={item.id} className="card">
                <div className="card__body" style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  <span className="icon-chip icon-chip--lg icon-chip--teal"><Ic name={item.icon} size={20} /></span>
                  <div>
                    <div className="fw-700" style={{ fontSize: 14 }}>{item.nombre}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>{item.com}</div>
                  </div>
                  <div className="muted" style={{ fontSize: 11.5, lineHeight: 1.4 }}>{item.regla}</div>
                  <div className="row row--between" style={{ paddingTop: 8, borderTop: "1px solid var(--border)" }}>
                    {item.deposito > 0 ? <span className="badge badge--ghost">Deposito {D.fmtMXN(item.deposito)}</span> : <span className="subtle" style={{ fontSize: 12 }}>Sin deposito</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid-main">
            <Card title="Calendario semanal" sub="22-28 Jun 2026" icon="Calendar" body={false}>
              <div style={{ padding: 16 }}>
                <div className="calendar">
                  {week.map((day) => <div key={`h-${day}`} className="calendar__weekday">{day}</div>)}
                  {week.map((day, index) => (
                    <div key={day} className={`calendar__day ${index === 1 ? "calendar__day--today" : ""}`}>
                      <div className="calendar__day-num">{day.split(" ")[1]}</div>
                      {(calendar[index] || []).map(([label, tone]) => <div key={label} className={`calendar__ev calendar__ev--${tone}`}>{label}</div>)}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Reservas por aprobar" icon="CalendarCheck" body={false} headerRight={<span className="badge badge--amber">2 pendientes</span>}>
              <div style={{ padding: "6px 8px" }}>
                {D.RESERVAS.map((item, index) => {
                  const state = RES_STATE[item.estado] || RES_STATE.pendiente;
                  return (
                    <div key={`${item.amenidad}-${item.unidad}`} style={{ padding: 12, borderBottom: index < D.RESERVAS.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div className="row row--between" style={{ marginBottom: 4 }}>
                        <span className="fw-600" style={{ fontSize: 13 }}>{item.amenidad}</span>
                        <Badge tone={state.tone} dot>{state.label}</Badge>
                      </div>
                      <div className="muted" style={{ fontSize: 12 }}>{item.unidad} / {item.dia} / {item.hora}</div>
                      {item.estado === "pendiente" && (
                        <div className="row" style={{ gap: 6, marginTop: 8 }}>
                          <button className="btn btn--soft btn--sm" onClick={() => showToast("Reserva aprobada")}><Ic name="Check" size={14} />Aprobar</button>
                          <button className="btn btn--ghost btn--sm" onClick={() => showToast("Reserva rechazada")}>Rechazar</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </>
      )}
    </main>
  );
}

export { MaintenanceScreen, PoolsScreen, AmenitiesScreen };
