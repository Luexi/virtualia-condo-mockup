import React, { useState } from "react";
import * as D from "../data/mockData.js";
import { Ic, Logo, Badge } from "../components/ui.jsx";

function QuickAction({ icon, label, onClick }) {
  return (
    <button className="r-quick__item" onClick={onClick}>
      <span className="r-quick__icon"><Ic name={icon} size={21} /></span>
      <span className="r-quick__label">{label}</span>
    </button>
  );
}

function ResidentPortalScreen({ onBack, showToast }) {
  const [tab, setTab] = useState("inicio");
  const balance = -2100;

  const home = (
    <>
      <div className="r-balance">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.66)" }}>Mi saldo / Depto A-204</div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 0, marginTop: 4, fontFamily: "var(--font-mono)", color: "#FF9B8A" }}>
            {D.fmtMXN(balance)}
          </div>
          <div className="row" style={{ gap: 8, marginTop: 10 }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>
              <span className="badge__dot" style={{ background: "#FFB4A6" }} />Cuota de junio pendiente
            </span>
          </div>
          <button className="btn btn--primary btn--block" style={{ marginTop: 16 }} onClick={() => setTab("comprobantes")}>
            <Ic name="Paperclip" size={16} /> Enviar comprobante
          </button>
        </div>
      </div>

      <div className="r-quick">
        <QuickAction icon="Paperclip" label="Comprobante" onClick={() => setTab("comprobantes")} />
        <QuickAction icon="Wrench" label="Incidencia" onClick={() => showToast("Incidencia preparada")} />
        <QuickAction icon="CalendarCheck" label="Amenidad" onClick={() => showToast("Solicitud preparada")} />
        <QuickAction icon="KeyRound" label="Visita" onClick={() => showToast("Autorizacion preparada")} />
      </div>

      <div className="r-card">
        <div className="row row--between" style={{ marginBottom: 12 }}>
          <span className="fw-700" style={{ fontSize: 14 }}>Movimientos</span>
          <button className="card__link" style={{ fontSize: 12 }} onClick={() => setTab("comprobantes")}>Historial</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[...D.STATEMENT.cargos.slice(0, 2), ...D.STATEMENT.pagos.slice(0, 2)].map((item, index) => {
            const isPayment = "ref" in item;
            return (
              <div key={`${item.fecha}-${item.concepto}`} className="row row--between" style={{ padding: "9px 0", borderBottom: index < 3 ? "1px solid var(--border)" : "none" }}>
                <div className="row" style={{ gap: 9 }}>
                  <span className={`icon-chip icon-chip--${isPayment ? "green" : "amber"}`} style={{ width: 30, height: 30 }}>
                    <Ic name={isPayment ? "CheckCircle" : "Receipt"} size={14} />
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.concepto}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>{item.fecha}</div>
                  </div>
                </div>
                <span className={`money ${isPayment ? "money--pos" : "money--neg"}`} style={{ fontSize: 12.5 }}>
                  {isPayment ? "-" : "+"}{D.fmtMXN(item.monto)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="r-card">
        <div className="row row--between" style={{ marginBottom: 12 }}>
          <span className="fw-700" style={{ fontSize: 14 }}>Comunicados</span>
          <button className="card__link" style={{ fontSize: 12 }}>Ver todos</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {D.COMUNICADOS.slice(0, 2).map((item) => (
            <div key={item.titulo} className="row" style={{ gap: 11 }}>
              <span className={`icon-chip ${item.prioridad === "alta" ? "icon-chip--red" : "icon-chip--teal"}`} style={{ width: 34, height: 34 }}>
                <Ic name="Megaphone" size={15} />
              </span>
              <div>
                <div className="fw-600" style={{ fontSize: 13 }}>{item.titulo}</div>
                <div className="muted" style={{ fontSize: 11.5 }}>{item.fecha} / {item.seg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const receipts = (
    <>
      <div className="r-card">
        <div className="fw-700" style={{ fontSize: 15, marginBottom: 4 }}>Enviar comprobante</div>
        <div className="muted" style={{ fontSize: 12.5, marginBottom: 14 }}>
          Adjunta evidencia para revision de administracion. Esta demo no procesa cargos ni pagos en linea.
        </div>
        <div className="field">
          <label className="field__label">Monto reportado</label>
          <input className="field__input" defaultValue="$2,100.00" />
        </div>
        <div className="field" style={{ marginTop: 10 }}>
          <label className="field__label">Origen del comprobante</label>
          <select className="field__select" defaultValue="Comprobante manual">
            <option>Comprobante manual</option>
            <option>Deposito reportado</option>
            <option>Efectivo administracion</option>
          </select>
        </div>
        <div className="ph" style={{ height: 130, marginTop: 12, flexDirection: "column", gap: 6 }}>
          <Ic name="Paperclip" size={22} />
          <div>Adjuntar archivo</div>
        </div>
        <button className="btn btn--primary btn--block" style={{ marginTop: 14 }} onClick={() => showToast("Comprobante enviado a revision")}>
          <Ic name="Send" size={16} /> Enviar comprobante
        </button>
        <div className="banner banner--teal" style={{ fontSize: 12, marginTop: 12 }}>
          <span className="banner__icon"><Ic name="Info" size={14} /></span>
          El movimiento queda como "Por validar" hasta que administracion lo revise.
        </div>
      </div>

      <div className="r-card">
        <div className="row row--between" style={{ marginBottom: 12 }}>
          <span className="fw-700" style={{ fontSize: 14 }}>Recibos</span>
          <button className="card__link" style={{ fontSize: 12 }}>Historial</button>
        </div>
        {D.RES_RECIBOS.map((receipt, index) => (
          <div key={receipt.mes} className="row row--between" style={{ padding: "9px 0", borderBottom: index < D.RES_RECIBOS.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div className="row" style={{ gap: 9 }}>
              <span className="icon-chip icon-chip--slate" style={{ width: 30, height: 30 }}><Ic name="Receipt" size={14} /></span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{receipt.mes}</span>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <span className="money" style={{ fontSize: 12.5 }}>{D.fmtMXN(receipt.monto)}</span>
              <Badge tone={receipt.estado === "pagado" ? "green" : "amber"}>{receipt.estado === "pagado" ? "Validado" : "Pendiente"}</Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const more = (
    <>
      <div className="r-card">
        <div className="fw-700" style={{ fontSize: 15, marginBottom: 12 }}>Mas opciones</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {[
            ["FolderOpen", "Documentos publicados", "documentos"],
            ["CalendarCheck", "Reservar amenidad", "amenidad"],
            ["KeyRound", "Autorizar visita", "acceso"],
            ["Wrench", "Reportar incidencia", "incidencia"],
            ["UserCircle", "Contacto administracion", "contacto"],
          ].map(([icon, label, key], index) => (
            <button
              key={key}
              className="row row--between"
              style={{ padding: "13px 0", borderBottom: index < 4 ? "1px solid var(--border)" : "none", width: "100%", textAlign: "left" }}
              onClick={() => showToast(`${label} abierto`)}
            >
              <span className="row" style={{ gap: 11 }}>
                <span className="icon-chip icon-chip--teal" style={{ width: 32, height: 32 }}><Ic name={icon} size={16} /></span>
                <span style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</span>
              </span>
              <Ic name="ChevronRight" size={16} color="var(--text-subtle)" />
            </button>
          ))}
        </div>
      </div>

      <div className="r-card">
        <div className="fw-700" style={{ fontSize: 14, marginBottom: 10 }}>Documentos recientes</div>
        {D.DOCUMENTOS.slice(0, 3).map((doc, index) => (
          <div key={doc.nombre} className="row row--between" style={{ padding: "9px 0", borderBottom: index < 2 ? "1px solid var(--border)" : "none" }}>
            <div className="row" style={{ gap: 9 }}>
              <span className="icon-chip icon-chip--slate" style={{ width: 30, height: 30 }}><Ic name={doc.icon} size={14} /></span>
              <div>
                <div className="fw-600" style={{ fontSize: 12.5 }}>{doc.nombre}</div>
                <div className="muted" style={{ fontSize: 11 }}>{doc.fecha}</div>
              </div>
            </div>
            <Ic name="Download" size={15} color="var(--text-subtle)" />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="phone-stage">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <div className="row row--between" style={{ width: 390, maxWidth: "100%" }}>
          <button className="btn btn--secondary btn--sm" onClick={onBack}><Ic name="ChevronLeft" size={15} /> Volver al panel</button>
          <span className="status-tag">Portal residente / movil</span>
        </div>
        <div className="phone">
          <div className="phone__status">
            <span>9:41</span>
            <div className="row" style={{ gap: 5 }}><span>5G</span><span>100%</span></div>
          </div>
          <div style={{ padding: "4px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ transform: "scale(0.86)", transformOrigin: "left" }}><Logo /></div>
            <button className="icon-btn" type="button" aria-label="Notificaciones" style={{ width: 34, height: 34 }}><Ic name="Bell" size={18} /></button>
          </div>
          <div className="phone__scroll">{tab === "inicio" ? home : tab === "comprobantes" ? receipts : more}</div>
          <div className="phone__tabbar">
            {[
              ["inicio", "Home", "Inicio"],
              ["comprobantes", "Paperclip", "Comprobantes"],
              ["mas", "Grid", "Mas"],
            ].map(([key, icon, label]) => (
              <button key={key} className={`phone__tab ${tab === key ? "phone__tab--active" : ""}`} onClick={() => setTab(key)}>
                <Ic name={icon} size={21} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ResidentPortalScreen };
