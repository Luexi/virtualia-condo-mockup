import React, { useEffect, useState } from "react";
import {
  MAP_COMMUNITIES,
  MAP_ORDER,
  LAYERS,
  OVERLAYS,
  unitClass,
  legendFor,
  mapSummary,
} from "../data/mapData.js";
import {
  PageHeader,
  Card,
  Badge,
  Ic,
  Money,
  Avatar,
  ESTADO_BADGE,
} from "../components/ui.jsx";

const AMENITY_TONE = { optima: "sky", atencion: "amber", fuera: "red" };
const AMENITY_LABEL = { optima: "En servicio", atencion: "Requiere atencion", fuera: "Fuera de servicio" };

function MapScreen({ tenant, setRoute, setDetail, showToast }) {
  const [localCommunity, setLocalCommunity] = useState(MAP_ORDER[0]);
  const communityId = tenant === "all" ? localCommunity : tenant;
  const community = MAP_COMMUNITIES[communityId] || MAP_COMMUNITIES[MAP_ORDER[0]];
  const [layer, setLayer] = useState("cobranza");
  const [overlays, setOverlays] = useState({ amenidades: true, accesos: true });
  const [selected, setSelected] = useState(null);

  useEffect(() => setSelected(null), [communityId]);

  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const summary = mapSummary(community.hotspots);
  const toggleOverlay = (id) => setOverlays((current) => ({ ...current, [id]: !current[id] }));

  const openUnit = (id) => {
    setDetail(id);
    setRoute("unidades");
  };

  const renderUnitPin = (spot) => {
    const isSelected = selected && selected.id === spot.id;
    const hasTicket = spot.tickets && spot.tickets.length > 0;
    return (
      <button
        key={spot.id}
        className={`map-pin map-pin--unit ${unitClass(spot, layer)} ${isSelected ? "is-selected" : ""}`}
        style={{ left: `${spot.xPct}%`, top: `${spot.yPct}%` }}
        type="button"
        aria-label={`${spot.id} / ${ESTADO_BADGE[spot.estado] ? ESTADO_BADGE[spot.estado].label : spot.estado}`}
        onClick={() => setSelected(spot)}
      >
        <span className="map-pin__halo" />
        <span className="map-pin__dot">{hasTicket ? <span className="map-pin__flag" /> : null}</span>
        <span className="map-pin__label">{spot.id}</span>
      </button>
    );
  };

  const renderBlockPin = (spot) => {
    const tone = AMENITY_TONE[spot.estado] || "sky";
    const kindClass = spot.tipo === "gate" ? "map-pin--gate" : "map-pin--amenity";
    return (
      <button
        key={spot.id}
        className={`map-pin ${kindClass} map-pin--${tone} ${selected && selected.id === spot.id ? "is-selected" : ""}`}
        style={{ left: `${spot.xPct}%`, top: `${spot.yPct}%` }}
        type="button"
        aria-label={`${spot.label} / ${AMENITY_LABEL[spot.estado] || ""}`}
        onClick={() => setSelected(spot)}
      >
        <span className="map-pin__halo" />
        <span className="map-pin__chip"><Ic name={spot.icon} size={15} /></span>
        <span className="map-pin__label">{spot.label}</span>
      </button>
    );
  };

  const renderPopover = () => {
    if (!selected) return null;
    const below = selected.yPct < 42;
    const side = selected.xPct > 72 ? " map-popover--align-end" : selected.xPct < 28 ? " map-popover--align-start" : "";

    if (selected.tipo === "unit") {
      const state = ESTADO_BADGE[selected.estado] || { tone: "slate", label: selected.estado };
      return (
        <div
          className={`map-popover ${below ? "map-popover--below" : "map-popover--above"}${side}`}
          style={{ left: `${selected.xPct}%`, top: `${selected.yPct}%` }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="map-popover__head">
            <div className="row" style={{ gap: 10 }}>
              <Avatar name={selected.id} size="sm" tone={selected.kind === "Casa" ? "sky" : "teal"} />
              <div>
                <div className="map-popover__id">{selected.id}</div>
                <div className="map-popover__sub">{selected.kind}{selected.real ? "" : " / ficticia"}</div>
              </div>
            </div>
            <button className="icon-btn" aria-label="Cerrar" style={{ width: 30, height: 30 }} onClick={() => setSelected(null)}>
              <Ic name="X" size={16} />
            </button>
          </div>

          <div className="map-popover__row">
            <span className="muted" style={{ fontSize: 12.5 }}>Saldo</span>
            {selected.saldo < 0 ? <Money value={selected.saldo} /> : <span className="money" style={{ fontSize: 13 }}>$0</span>}
          </div>
          <div className="map-popover__row">
            <span className="muted" style={{ fontSize: 12.5 }}>Estado</span>
            <Badge tone={state.tone} dot>{state.label}{selected.dias > 0 ? ` / ${selected.dias} d` : ""}</Badge>
          </div>
          <div className="map-popover__row">
            <span className="muted" style={{ fontSize: 12.5 }}>{selected.renta ? "Inquilino" : "Propietario"}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{selected.renta ? selected.tenant : selected.owner}</span>
          </div>

          {selected.tickets && selected.tickets.length ? (
            <div className="map-popover__tickets">
              {selected.tickets.map((ticket) => (
                <div key={ticket.titulo} className="map-popover__ticket">
                  <span
                    className={`icon-chip icon-chip--${ticket.prio === "alta" ? "red" : ticket.prio === "media" ? "amber" : "teal"}`}
                    style={{ width: 28, height: 28 }}
                  >
                    <Ic name={ticket.icon} size={14} />
                  </span>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{ticket.titulo}</div>
                    <div className="muted" style={{ fontSize: 11.5 }}>{ticket.cat} / prioridad {ticket.prio}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="map-popover__actions">
            <button className="btn btn--primary btn--sm" onClick={() => openUnit(selected.id)}>
              <Ic name="Eye" size={14} /> Ver unidad
            </button>
            {selected.tickets && selected.tickets.length ? (
              <button className="btn btn--soft btn--sm" onClick={() => setRoute("mantenimiento")}>
                <Ic name="Wrench" size={14} /> Ver ticket
              </button>
            ) : (
              <button className="btn btn--ghost btn--sm" onClick={() => showToast("Ficha visual abierta")}>
                <Ic name="FileText" size={14} /> Ficha
              </button>
            )}
          </div>
        </div>
      );
    }

    const tone = AMENITY_TONE[selected.estado] || "sky";
    const targetRoute = selected.tipo === "gate" ? "accesos" : "amenidades";
    return (
      <div
        className={`map-popover map-popover--amenity ${below ? "map-popover--below" : "map-popover--above"}${side}`}
        style={{ left: `${selected.xPct}%`, top: `${selected.yPct}%` }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="map-popover__head">
          <div className="row" style={{ gap: 10 }}>
            <span className={`icon-chip icon-chip--${tone}`} style={{ width: 30, height: 30 }}><Ic name={selected.icon} size={16} /></span>
            <div>
              <div className="map-popover__id" style={{ fontSize: 15 }}>{selected.label}</div>
              <div className="map-popover__sub">{selected.tipo === "gate" ? "Acceso / caseta" : "Amenidad"}</div>
            </div>
          </div>
          <button className="icon-btn" aria-label="Cerrar" style={{ width: 30, height: 30 }} onClick={() => setSelected(null)}>
            <Ic name="X" size={16} />
          </button>
        </div>
        <div className="map-popover__row">
          <span className="muted" style={{ fontSize: 12.5 }}>Estado</span>
          <Badge tone={tone} dot>{AMENITY_LABEL[selected.estado] || "-"}</Badge>
        </div>
        <div className="map-popover__actions">
          <button className="btn btn--soft btn--sm btn--block" onClick={() => setRoute(targetRoute)}>
            <Ic name={selected.tipo === "gate" ? "Shield" : "Eye"} size={14} />
            {selected.tipo === "gate" ? "Ver accesos" : "Ver detalle"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <main className="page fade-in">
      <PageHeader
        route="mapa"
        actions={[
          tenant === "all" ? (
            <div key="community" className="seg">
              {MAP_ORDER.map((id) => (
                <button key={id} className={`seg__btn ${communityId === id ? "seg__btn--active" : ""}`} onClick={() => setLocalCommunity(id)}>
                  <Ic name={id === "cedro" ? "Building2" : "HomeUnit"} size={15} />
                  {MAP_COMMUNITIES[id].name}
                </button>
              ))}
            </div>
          ) : null,
        ]}
      />

      <Card
        title={community.name}
        sub={`${community.kind} / vista interactiva`}
        icon="Map"
        headerRight={
          <div className="map-kpis">
            <span className="badge badge--ghost"><Ic name="MapPin" size={13} />{summary.total} destacadas</span>
            <span className="badge badge--red"><Ic name="AlertTriangle" size={13} />{summary.morosas} morosas</span>
            <span className="badge badge--amber"><Ic name="Wallet" size={13} />{summary.porValidar} por validar</span>
            <span className="badge badge--sky"><Ic name="Wrench" size={13} />{summary.tickets} tickets</span>
          </div>
        }
        body={false}
      >
        <div className="map-frame">
          <div className="map-toolbar">
            <div className="map-toolbar__group">
              <span className="map-toolbar__label">Vista</span>
              <div className="seg">
                {LAYERS.map((item) => (
                  <button key={item.id} className={`seg__btn ${layer === item.id ? "seg__btn--active" : ""}`} onClick={() => setLayer(item.id)}>
                    <Ic name={item.icon} size={15} />{item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="map-toolbar__group">
              <span className="map-toolbar__label">Capas</span>
              <div className="filters">
                {OVERLAYS.map((item) => (
                  <button key={item.id} className={`chip ${overlays[item.id] ? "chip--active" : ""}`} aria-pressed={overlays[item.id]} onClick={() => toggleOverlay(item.id)}>
                    <Ic name={item.icon} size={14} />{item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="map-canvas">
            {selected ? <button className="map-canvas__scrim" aria-label="Cerrar detalle" onClick={() => setSelected(null)} /> : null}
            <div className="map-stage">
              <img className="map-photo" src={community.image} alt={`Mapa isometrico de ${community.name}`} draggable={false} />
              {community.hotspots.map((spot) => {
                if (spot.tipo === "unit") return renderUnitPin(spot);
                if (spot.tipo === "amenity") return overlays.amenidades ? renderBlockPin(spot) : null;
                if (spot.tipo === "gate") return overlays.accesos ? renderBlockPin(spot) : null;
                return null;
              })}
              {renderPopover()}
            </div>
          </div>

          <div className="map-legend">
            {legendFor(layer).map((item) => (
              <span key={item.cls} className="map-legend__item">
                <span className={`map-legend__sw map-unit--${item.cls}`} />{item.label}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </main>
  );
}

export { MapScreen };
export default MapScreen;
