import React, { useEffect, useRef, useState } from "react";
import { DashboardScreen } from "../screens/DashboardScreen.jsx";
import { MapScreen } from "../screens/MapScreen.jsx";
import { ReportsScreen } from "../screens/ReportsScreen.jsx";
import { useInView } from "../lib/useReveal.js";

const noop = () => {};

// Ancho de diseno al que renderiza la pantalla real antes de escalar.
const DESIGN_WIDTH = 1280;

// Contexto inerte: las pantallas reales se montan con handlers vacios
// para que ningun modal/toast/navegacion dispare dentro del embed.
const INERT_CTX = {
  tenant: "all",
  route: "dashboard",
  setRoute: noop,
  setDetail: noop,
  showToast: noop,
  detail: null,
};

const SCREENS = {
  dashboard: { Component: DashboardScreen, route: "dashboard", path: "dashboard" },
  mapa: { Component: MapScreen, route: "mapa", path: "mapa" },
  reportes: { Component: ReportsScreen, route: "reportes", path: "reportes" },
};

/**
 * Marco de navegador con una pantalla real de Condo embebida, escalada y no
 * interactiva. Se monta de forma perezosa cuando se acerca al viewport para no
 * renderizar pantallas completas en la carga inicial de la landing.
 */
export default function LandingPreview({ screen = "dashboard", label }) {
  const config = SCREENS[screen] || SCREENS.dashboard;
  const { Component, route, path } = config;

  // rootMargin amplio: pre-montar antes de que entre del todo a pantalla.
  const [ref, near] = useInView({ rootMargin: "400px 0px", threshold: 0, once: true });
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (near) setMounted(true);
  }, [near]);

  // Escala exacta = ancho del viewport / ancho de diseno (sin huecos laterales).
  useEffect(() => {
    if (!mounted) return;
    const node = viewportRef.current;
    if (!node) return;
    const apply = () => {
      const width = node.clientWidth;
      if (width > 0) setScale(width / DESIGN_WIDTH);
    };
    apply();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(apply);
    ro.observe(node);
    return () => ro.disconnect();
  }, [mounted]);

  // Marca el contenido como inerte tambien a nivel DOM (atributo `inert`).
  useEffect(() => {
    if (mounted && stageRef.current) stageRef.current.inert = true;
  }, [mounted]);

  return (
    <div className="landing-preview" ref={ref} role="img" aria-label={label || `Vista de ${path} en Condo`}>
      <div className="landing-preview__bar" aria-hidden="true">
        <span className="landing-preview__dots">
          <i /><i /><i />
        </span>
        <span className="landing-preview__url">condo.virtualia.app/{path}</span>
      </div>
      <div className="landing-preview__viewport" ref={viewportRef} aria-hidden="true">
        {mounted ? (
          <div
            className="landing-preview__stage"
            ref={stageRef}
            tabIndex={-1}
            style={{ transform: `scale(${scale})` }}
          >
            <div className="main main--preview">
              <Component {...INERT_CTX} route={route} />
            </div>
          </div>
        ) : (
          <div className="landing-preview__skeleton" />
        )}
      </div>
    </div>
  );
}
