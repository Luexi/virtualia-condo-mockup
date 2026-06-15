import React from "react";
import { NAV_GROUPS } from "../lib/routes.js";
import StatusTag from "./StatusTag.jsx";
import { Ic, Logo } from "./ui.jsx";

export default function Sidebar({ route, navigate, onLogout, onResident, mobile = false }) {
  return (
    <aside className={mobile ? "sidebar sidebar--mobile" : "sidebar"}>
      <div className="sidebar__brand">
        <Logo />
        <button className="sidebar__collapse" aria-label="Colapsar menú">
          <Ic name="ChevronLeft" size={16} />
        </button>
      </div>

      <nav className="sidebar__nav" aria-label="Navegación principal">
        {NAV_GROUPS.map((group) => (
          <div key={group.group}>
            <div className="sidebar__group-label">{group.group}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                className={
                  "nav-item" +
                  (route === item.id || (route === "estado-cuenta" && item.id === "unidades")
                    ? " nav-item--active"
                    : "")
                }
                onClick={() => navigate(item.id)}
              >
                <span className="nav-item__icon">
                  <Ic name={item.icon} size={20} />
                </span>
                <span>{item.label}</span>
                {item.badge ? (
                  <span
                    className={
                      "nav-item__badge" +
                      (item.badgeTone ? ` nav-item__badge--${item.badgeTone}` : "")
                    }
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ))}

        <button
          className={"nav-item" + (route === "residente" ? " nav-item--active" : "")}
          onClick={onResident}
        >
          <span className="nav-item__icon">
            <Ic name="UserCircle" size={20} />
          </span>
          <span>Portal de residente</span>
          <span className="right">
            <Ic name="ArrowRight" size={15} />
          </span>
        </button>

        <button className="nav-item" onClick={onLogout}>
          <span className="nav-item__icon">
            <Ic name="LogOut" size={20} />
          </span>
          <span>Cerrar sesión</span>
        </button>
      </nav>

      <div className="sidebar__footer">
        <div className="promo">
          <div className="promo__title">Reporte para comité</div>
          <div className="promo__text">
            Preparar cierre mensual con indicadores ejecutivos.
          </div>
          <button className="promo__btn" onClick={() => navigate("reportes")}>
            <Ic name="Sparkles" size={15} />
            Preparar
          </button>
        </div>
        <div style={{ marginTop: 12 }}>
          <StatusTag />
        </div>
      </div>
    </aside>
  );
}
