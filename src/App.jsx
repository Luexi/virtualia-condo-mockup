import React, { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import AppToast from "./components/AppToast.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import { AccessScreen } from "./screens/AccessScreen.jsx";
import { AmenitiesScreen } from "./screens/AmenitiesScreen.jsx";
import { CollectionsScreen } from "./screens/CollectionsScreen.jsx";
import { CommunicationsScreen } from "./screens/CommunicationsScreen.jsx";
import { DashboardScreen } from "./screens/DashboardScreen.jsx";
import { MaintenanceScreen } from "./screens/MaintenanceScreen.jsx";
import { MapScreen } from "./screens/MapScreen.jsx";
import { PaymentsReviewScreen } from "./screens/PaymentsReviewScreen.jsx";
import { PoolsScreen } from "./screens/PoolsScreen.jsx";
import { ReportsScreen } from "./screens/ReportsScreen.jsx";
import { ResidentPortalScreen } from "./screens/ResidentPortalScreen.jsx";
import { SettingsScreen } from "./screens/SettingsScreen.jsx";
import { UnitStatementScreen } from "./screens/UnitStatementScreen.jsx";
import { UnitsScreen } from "./screens/UnitsScreen.jsx";
import { useHashRoute, useToast } from "./lib/appState.js";

export default function App() {
  const [route, navigate] = useHashRoute();
  const [tenant, setTenant] = useState("all");
  const [detail, setDetail] = useState(null);
  const [showToast, toastMessage] = useToast();

  useEffect(() => {
    document.querySelector(".main")?.scrollTo?.(0, 0);
    window.scrollTo(0, 0);
  }, [route]);

  const goLogin = () => navigate("login");
  const goDashboard = () => navigate("dashboard");

  if (route === "landing") {
    return <LandingScreen />;
  }

  if (route === "login") {
    return (
      <>
        <LoginScreen onEnter={goDashboard} />
        <AppToast message={toastMessage} />
      </>
    );
  }

  if (route === "residente") {
    return (
      <>
        <ResidentPortalScreen onBack={goDashboard} showToast={showToast} />
        <AppToast message={toastMessage} />
      </>
    );
  }

  const ctx = { tenant, route, setRoute: navigate, showToast, detail, setDetail };
  const screens = {
    dashboard: <DashboardScreen {...ctx} />,
    mapa: <MapScreen {...ctx} />,
    unidades: <UnitsScreen {...ctx} />,
    "estado-cuenta": <UnitStatementScreen {...ctx} />,
    cobranza: <CollectionsScreen {...ctx} />,
    pagos: <PaymentsReviewScreen {...ctx} />,
    mantenimiento: <MaintenanceScreen {...ctx} />,
    albercas: <PoolsScreen {...ctx} />,
    amenidades: <AmenitiesScreen {...ctx} />,
    comunicados: <CommunicationsScreen {...ctx} />,
    accesos: <AccessScreen {...ctx} />,
    reportes: <ReportsScreen {...ctx} />,
    configuracion: <SettingsScreen {...ctx} />,
  };

  return (
    <>
      <AppShell
        route={route}
        navigate={(nextRoute) => {
          if (nextRoute !== "estado-cuenta") setDetail(null);
          navigate(nextRoute);
        }}
        tenant={tenant}
        setTenant={setTenant}
        onLogout={goLogin}
      >
        {screens[route] || screens.dashboard}
      </AppShell>
      <AppToast message={toastMessage} />
    </>
  );
}
