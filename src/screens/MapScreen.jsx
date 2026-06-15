import React, { useState as useStateM, useEffect as useEffectM } from "react";
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
  PageHeader as PHM,
  Card as CM,
  Badge as BM,
  Ic as IM,
  Money as MM,
  Avatar as AVM,
  ESTADO_BADGE as EBM,
} from "../components/ui.jsx";

const { createElement: m } = React;

const AMENITY_TONE = { optima: "sky", atencion: "amber", fuera: "red" };
const AMENITY_LABEL = { optima: "En servicio", atencion: "Requiere atención", fuera: "Fuera de servicio" };

function Mapa({ tenant, setRoute, setDetail, showToast }) {
  const [localCom, setLocalCom] = useStateM(MAP_ORDER[0]);
  const comId = tenant === "all" ? localCom : tenant;
  const community = MAP_COMMUNITIES[comId] || MAP_COMMUNITIES[MAP_ORDER[0]];

  const [layer, setLayer] = useStateM("cobranza");
  const [overlays, setOverlays] = useStateM({ amenidades: true, accesos: true });
  const [sel, setSel] = useStateM(null);

  // Cierra el popover al cambiar de comunidad.
  useEffectM(() => {
    setSel(null);
  }, [comId]);

  // Esc cierra el popover.
  useEffectM(() => {
    if (!sel) return undefined;
    const onKey = (ev) => {
      if (ev.key === "Escape") setSel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel]);

  const summary = mapSummary(community.hotspots);
  const toggleOverlay = (id) => setOverlays((o) => ({ ...o, [id]: !o[id] }));

  // ---- pin de unidad ----
  const renderUnitPin = (h) => {
    const cls =
      "map-pin map-pin--unit " + unitClass(h, layer) + (sel && sel.id === h.id ? " is-selected" : "");
    const flag = h.tickets && h.tickets.length > 0;
    return m(
      "button",
      {
        key: h.id,
        className: cls,
        style: { left: h.xPct + "%", top: h.yPct + "%" },
        type: "button",
        "aria-label": `${h.id} · ${EBM[h.estado] ? EBM[h.estado].label : h.estado}`,
        onClick: () => setSel(h),
      },
      m("span", { className: "map-pin__halo" }),
      m("span", { className: "map-pin__dot" }, flag ? m("span", { className: "map-pin__flag" }) : null),
      m("span", { className: "map-pin__label" }, h.id)
    );
  };

  // ---- pin de amenidad / acceso ----
  const renderBlockPin = (h) => {
    const tone = AMENITY_TONE[h.estado] || "sky";
    const kindCls = h.tipo === "gate" ? "map-pin--gate" : "map-pin--amenity";
    return m(
      "button",
      {
        key: h.id,
        className: "map-pin " + kindCls + " map-pin--" + tone + (sel && sel.id === h.id ? " is-selected" : ""),
        style: { left: h.xPct + "%", top: h.yPct + "%" },
        type: "button",
        "aria-label": h.label + " · " + (AMENITY_LABEL[h.estado] || ""),
        onClick: () => setSel(h),
      },
      m("span", { className: "map-pin__halo" }),
      m("span", { className: "map-pin__chip" }, m(IM, { name: h.icon, size: 15 })),
      m("span", { className: "map-pin__label" }, h.label)
    );
  };

  // ---- popover anclado ----
  let popover = null;
  if (sel) {
    const below = sel.yPct < 42;
    const side = sel.xPct > 72 ? " map-popover--align-end" : sel.xPct < 28 ? " map-popover--align-start" : "";
    if (sel.tipo === "unit") {
      const estado = EBM[sel.estado] || { tone: "slate", label: sel.estado };
      popover = m(
        "div",
        {
          className: "map-popover" + (below ? " map-popover--below" : " map-popover--above") + side,
          style: { left: sel.xPct + "%", top: sel.yPct + "%" },
          onClick: (ev) => ev.stopPropagation(),
        },
        m(
          "div",
          { className: "map-popover__head" },
          m(
            "div",
            { className: "row", style: { gap: 10 } },
            m(AVM, { name: sel.id, size: "sm", tone: sel.kind === "Casa" ? "sky" : "teal" }),
            m(
              "div",
              null,
              m("div", { className: "map-popover__id" }, sel.id),
              m("div", { className: "map-popover__sub" }, sel.kind + (sel.real ? "" : " · demo"))
            )
          ),
          m(
            "button",
            { className: "icon-btn", "aria-label": "Cerrar", style: { width: 30, height: 30 }, onClick: () => setSel(null) },
            m(IM, { name: "X", size: 16 })
          )
        ),
        m(
          "div",
          { className: "map-popover__row" },
          m("span", { className: "muted", style: { fontSize: 12.5 } }, "Saldo"),
          sel.saldo < 0 ? m(MM, { value: sel.saldo }) : m("span", { className: "money", style: { fontSize: 13 } }, "$0")
        ),
        m(
          "div",
          { className: "map-popover__row" },
          m("span", { className: "muted", style: { fontSize: 12.5 } }, "Estado"),
          m(BM, { tone: estado.tone, dot: true }, estado.label + (sel.dias > 0 ? ` · ${sel.dias} d` : ""))
        ),
        m(
          "div",
          { className: "map-popover__row" },
          m("span", { className: "muted", style: { fontSize: 12.5 } }, sel.renta ? "Inquilino" : "Propietario"),
          m("span", { style: { fontSize: 13, fontWeight: 600 } }, sel.renta ? sel.tenant : sel.owner)
        ),
        sel.tickets && sel.tickets.length
          ? m(
              "div",
              { className: "map-popover__tickets" },
              sel.tickets.map((t, i) =>
                m(
                  "div",
                  { key: i, className: "map-popover__ticket" },
                  m(
                    "span",
                    {
                      className: `icon-chip icon-chip--${t.prio === "alta" ? "red" : t.prio === "media" ? "amber" : "teal"}`,
                      style: { width: 28, height: 28 },
                    },
                    m(IM, { name: t.icon, size: 14 })
                  ),
                  m(
                    "div",
                    null,
                    m("div", { style: { fontSize: 12.5, fontWeight: 600 } }, t.titulo),
                    m("div", { className: "muted", style: { fontSize: 11.5 } }, t.cat + " · prioridad " + t.prio)
                  )
                )
              )
            )
          : null,
        m(
          "div",
          { className: "map-popover__actions" },
          m(
            "button",
            {
              className: "btn btn--primary btn--sm",
              onClick: () => {
                setDetail(sel.id);
                setRoute("estado-cuenta");
              },
            },
            m(IM, { name: "Eye", size: 14 }),
            "Estado de cuenta"
          ),
          sel.saldo < 0
            ? m(
                "button",
                { className: "btn btn--soft btn--sm", onClick: () => showToast("Pago registrado para " + sel.id) },
                m(IM, { name: "Wallet", size: 14 }),
                "Registrar pago"
              )
            : m(
                "button",
                { className: "btn btn--ghost btn--sm", onClick: () => showToast("Recordatorio enviado a " + sel.id) },
                m(IM, { name: "Send", size: 14 }),
                "Recordar"
              )
        )
      );
    } else {
      // Popover de amenidad / caseta
      const tone = AMENITY_TONE[sel.estado] || "sky";
      popover = m(
        "div",
        {
          className: "map-popover map-popover--amenity" + (below ? " map-popover--below" : " map-popover--above") + side,
          style: { left: sel.xPct + "%", top: sel.yPct + "%" },
          onClick: (ev) => ev.stopPropagation(),
        },
        m(
          "div",
          { className: "map-popover__head" },
          m(
            "div",
            { className: "row", style: { gap: 10 } },
            m("span", { className: "icon-chip icon-chip--" + tone, style: { width: 30, height: 30 } }, m(IM, { name: sel.icon, size: 16 })),
            m(
              "div",
              null,
              m("div", { className: "map-popover__id", style: { fontSize: 15 } }, sel.label),
              m("div", { className: "map-popover__sub" }, sel.tipo === "gate" ? "Acceso · caseta" : "Amenidad")
            )
          ),
          m(
            "button",
            { className: "icon-btn", "aria-label": "Cerrar", style: { width: 30, height: 30 }, onClick: () => setSel(null) },
            m(IM, { name: "X", size: 16 })
          )
        ),
        m(
          "div",
          { className: "map-popover__row" },
          m("span", { className: "muted", style: { fontSize: 12.5 } }, "Estado"),
          m(BM, { tone: tone, dot: true }, AMENITY_LABEL[sel.estado] || "—")
        ),
        m(
          "div",
          { className: "map-popover__actions" },
          m(
            "button",
            {
              className: "btn btn--soft btn--sm btn--block",
              onClick: () => showToast((sel.tipo === "gate" ? "Bitácora de " : "Detalle de ") + sel.label),
            },
            m(IM, { name: sel.tipo === "gate" ? "ScanLine" : "Eye", size: 14 }),
            sel.tipo === "gate" ? "Ver bitácora" : "Ver detalle"
          )
        )
      );
    }
  }

  // ---- toolbar de capas ----
  const layerToolbar = m(
    "div",
    { className: "map-toolbar" },
    m(
      "div",
      { className: "map-toolbar__group" },
      m("span", { className: "map-toolbar__label" }, "Vista"),
      m(
        "div",
        { className: "seg" },
        LAYERS.map((l) =>
          m(
            "button",
            { key: l.id, className: "seg__btn" + (layer === l.id ? " seg__btn--active" : ""), onClick: () => setLayer(l.id) },
            m(IM, { name: l.icon, size: 15 }),
            l.label
          )
        )
      )
    ),
    m(
      "div",
      { className: "map-toolbar__group" },
      m("span", { className: "map-toolbar__label" }, "Capas"),
      m(
        "div",
        { className: "filters" },
        OVERLAYS.map((o) =>
          m(
            "button",
            {
              key: o.id,
              className: "chip" + (overlays[o.id] ? " chip--active" : ""),
              "aria-pressed": overlays[o.id],
              onClick: () => toggleOverlay(o.id),
            },
            m(IM, { name: o.icon, size: 14 }),
            o.label
          )
        )
      )
    )
  );

  // ---- leyenda ----
  const legend = m(
    "div",
    { className: "map-legend" },
    legendFor(layer).map((g) =>
      m("span", { key: g.cls, className: "map-legend__item" }, m("span", { className: "map-legend__sw map-unit--" + g.cls }), g.label)
    )
  );

  // ---- mini KPIs ----
  const kpis = m(
    "div",
    { className: "map-kpis" },
    m("span", { className: "badge badge--ghost" }, m(IM, { name: "MapPin", size: 13 }), summary.total + " destacadas"),
    m("span", { className: "badge badge--red" }, m(IM, { name: "AlertTriangle", size: 13 }), summary.morosas + " morosas"),
    m("span", { className: "badge badge--amber" }, m(IM, { name: "Wallet", size: 13 }), summary.porValidar + " por validar"),
    m("span", { className: "badge badge--sky" }, m(IM, { name: "Wrench", size: 13 }), summary.tickets + " tickets")
  );

  return m(
    "main",
    { className: "page fade-in" },
    m(PHM, {
      route: "mapa",
      actions: [
        tenant === "all"
          ? m(
              "div",
              { key: "sel", className: "seg" },
              MAP_ORDER.map((cid) =>
                m(
                  "button",
                  { key: cid, className: "seg__btn" + (comId === cid ? " seg__btn--active" : ""), onClick: () => setLocalCom(cid) },
                  m(IM, { name: cid === "cedro" ? "Building2" : "HomeUnit", size: 15 }),
                  MAP_COMMUNITIES[cid].name
                )
              )
            )
          : null,
        m("span", { key: "tag", className: "status-tag", style: { alignSelf: "center" } }, "Mapa de demostración"),
      ],
    }),

    m(
      CM,
      {
        title: community.name,
        sub: community.kind + " · vista isométrica interactiva",
        icon: "Map",
        headerRight: kpis,
        body: false,
      },
      m(
        "div",
        { className: "map-frame" },
        layerToolbar,
        m(
          "div",
          { className: "map-canvas" },
          sel ? m("button", { className: "map-canvas__scrim", "aria-label": "Cerrar detalle", onClick: () => setSel(null) }) : null,
          m(
            "div",
            { className: "map-stage" },
            m("img", {
              className: "map-photo",
              src: community.image,
              alt: "Mapa isométrico de " + community.name,
              draggable: false,
            }),
            community.hotspots.map((h) => {
              if (h.tipo === "unit") return renderUnitPin(h);
              if (h.tipo === "amenity") return overlays.amenidades ? renderBlockPin(h) : null;
              if (h.tipo === "gate") return overlays.accesos ? renderBlockPin(h) : null;
              return null;
            }),
            popover
          )
        ),
        legend
      )
    )
  );
}

export { Mapa as MapScreen };
export default Mapa;
