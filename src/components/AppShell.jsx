import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function AppShell({ route, navigate, tenant, setTenant, onLogout, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const goResident = () => navigate("residente");

  return (
    <>
      <div className="app">
        <Sidebar route={route} navigate={navigate} onLogout={onLogout} onResident={goResident} />
        <div className="main">
          <Topbar
            tenant={tenant}
            setTenant={setTenant}
            onLogout={onLogout}
            onMenu={() => setMenuOpen(true)}
          />
          {children}
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-nav">
          <button
            className="mobile-nav__scrim"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
          />
          <div className="mobile-nav__panel">
            <Sidebar
              mobile
              route={route}
              navigate={(nextRoute) => {
                navigate(nextRoute);
                setMenuOpen(false);
              }}
              onLogout={onLogout}
              onResident={() => {
                goResident();
                setMenuOpen(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
