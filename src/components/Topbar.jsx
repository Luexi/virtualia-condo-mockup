import React, { useState } from "react";
import * as D from "../data/mockData.js";
import { Ic } from "./ui.jsx";

function TenantSelector({ active, onChange }) {
  const [open, setOpen] = useState(false);
  const community = D.COMMUNITIES.find((item) => item.id === active) || {
    name: "Ambas comunidades",
    units: 174,
    kind: "Instancia privada",
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="tenant-selector"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="tenant-selector__icon-wrap">
          <Ic name="Layers" size={16} />
        </span>
        <span style={{ textAlign: "left" }}>
          <span>{community.name}</span>
          <span className="tenant-selector__sub">
            {active === "all"
              ? "174 unidades / 2 comunidades"
              : `${community.units} ${community.unitWord || ""}`}
          </span>
        </span>
        <span className="tenant-selector__chevron">
          <Ic name="ChevronDown" size={16} />
        </span>
      </button>

      {open ? (
        <>
          <button
            className="tenant-menu__scrim"
            aria-label="Cerrar selector"
            onClick={() => setOpen(false)}
          />
          <div className="tenant-menu" role="listbox">
            <button
              className={
                "tenant-menu__item" + (active === "all" ? " tenant-menu__item--active" : "")
              }
              onClick={() => {
                onChange("all");
                setOpen(false);
              }}
            >
              <span className="tenant-selector__icon-wrap">
                <Ic name="Layers" size={16} />
              </span>
              <span style={{ textAlign: "left" }}>
                <span className="fw-600">Ambas comunidades</span>
                <span className="tenant-selector__sub">174 unidades ficticias</span>
              </span>
            </button>
            {D.COMMUNITIES.map((item) => (
              <button
                key={item.id}
                className={
                  "tenant-menu__item" + (active === item.id ? " tenant-menu__item--active" : "")
                }
                onClick={() => {
                  onChange(item.id);
                  setOpen(false);
                }}
              >
                <span
                  className="tenant-selector__icon-wrap"
                  style={
                    item.color === "sky"
                      ? { background: "var(--sky-50)", color: "var(--sky-600)" }
                      : {}
                  }
                >
                  <Ic name={item.icon} size={16} />
                </span>
                <span style={{ textAlign: "left" }}>
                  <span className="fw-600">{item.name}</span>
                  <span className="tenant-selector__sub">
                    {item.units} {item.unitWord} / {item.city}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default function Topbar({ tenant, setTenant, onLogout, onMenu }) {
  return (
    <header className="topbar">
      <button className="icon-btn topbar__menu" aria-label="Abrir menu" onClick={onMenu}>
        <Ic name="List" size={19} />
      </button>
      <TenantSelector active={tenant} onChange={setTenant} />
      <div className="search">
        <span className="search__icon">
          <Ic name="Search" size={17} />
        </span>
        <input placeholder="Buscar unidad, residente, comprobante..." aria-label="Buscar" />
        <span className="search__kbd">LOCAL</span>
      </div>
      <div className="top-actions">
        <span className="date-pill">
          <Ic name="Calendar" size={16} />
          Periodo Jun 2026
        </span>
        <button className="icon-btn" aria-label="Ayuda">
          <Ic name="Help" size={19} />
        </button>
        <button className="icon-btn" aria-label="Pendientes operativos">
          <Ic name="Bell" size={19} />
        </button>
        <button
          className="top-profile"
          onClick={onLogout}
          title="Admin Condo / cerrar sesion"
          aria-label="Admin Condo, cerrar sesion"
        >
          <span className="top-avatar">AD</span>
          <span className="user-card__chevron">
            <Ic name="ChevronDown" size={15} />
          </span>
        </button>
      </div>
    </header>
  );
}
