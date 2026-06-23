export const ROUTE_SYNONYMS = {
  home: "landing",
  public: "landing",
  inicio: "dashboard",
  validar: "pagos",
  estado: "estado-cuenta",
  config: "configuracion",
  resident: "residente",
};

export const ROUTES = [
  "landing",
  "login",
  "dashboard",
  "mapa",
  "unidades",
  "estado-cuenta",
  "cobranza",
  "pagos",
  "mantenimiento",
  "albercas",
  "amenidades",
  "comunicados",
  "accesos",
  "reportes",
  "residente",
  "configuracion",
];

export const NAV_GROUPS = [
  {
    group: "Operacion",
    items: [
      { id: "dashboard", label: "Inicio", icon: "Home" },
      { id: "mapa", label: "Mapa", icon: "Map" },
      { id: "unidades", label: "Unidades", icon: "Building" },
      { id: "cobranza", label: "Cobranza", icon: "Coins" },
      { id: "pagos", label: "Pagos por validar", icon: "Wallet" },
    ],
  },
  {
    group: "Comunidad",
    items: [
      { id: "mantenimiento", label: "Mantenimiento", icon: "Wrench" },
      { id: "albercas", label: "Albercas", icon: "Waves" },
      { id: "amenidades", label: "Amenidades", icon: "CalendarCheck" },
      { id: "comunicados", label: "Comunicados", icon: "Megaphone" },
      { id: "accesos", label: "Accesos", icon: "KeyRound" },
    ],
  },
  { group: "Analisis", items: [{ id: "reportes", label: "Reportes", icon: "ChartPie" }] },
  {
    group: "General",
    items: [{ id: "configuracion", label: "Configuracion", icon: "Settings" }],
  },
];

export const PAGE_META = {
  landing: { title: "Condo by Virtualia", sub: "Landing publica de producto." },
  login: { title: "Login", sub: "Acceso privado al panel administrativo." },
  dashboard: { title: "Inicio", sub: "Prioridades operativas de la comunidad." },
  mapa: {
    title: "Mapa",
    sub: "Vista read-only del condominio por cobranza, mantenimiento y ocupacion.",
  },
  unidades: {
    title: "Unidades",
    sub: "Padron operativo con propietarios, residentes, estado y saldo derivado.",
  },
  "estado-cuenta": {
    title: "Estado de cuenta",
    sub: "Detalle por unidad: cargos, pagos manuales validados, ajustes y saldo.",
  },
  cobranza: {
    title: "Cobranza",
    sub: "Operacion mensual de cuotas, cargos, pagos manuales y morosidad.",
  },
  pagos: {
    title: "Pagos por validar",
    sub: "Revisa comprobantes reportados y deja una decision auditable.",
  },
  mantenimiento: {
    title: "Mantenimiento",
    sub: "Incidencias, prioridades y seguimiento operativo manual.",
  },
  albercas: {
    title: "Albercas",
    sub: "Bitacora operativa y estado de servicio por alberca.",
  },
  amenidades: {
    title: "Amenidades",
    sub: "Activos comunitarios, calendario y solicitudes sujetas a aprobacion.",
  },
  comunicados: {
    title: "Comunicados y documentos",
    sub: "Avisos publicados y documentos visibles para la comunidad.",
  },
  accesos: {
    title: "Accesos y visitantes",
    sub: "Pases manuales, autorizaciones y bitacora de caseta.",
  },
  reportes: {
    title: "Reportes para comite",
    sub: "Resumen operativo y financiero derivado de datos ficticios.",
  },
  residente: {
    title: "Portal residente",
    sub: "Vista movil para saldo, comprobantes, comunicados y solicitudes propias.",
  },
  configuracion: {
    title: "Configuracion",
    sub: "Parametros visibles de comunidad, roles y operacion manual.",
  },
};

export function normalizeRoute(route) {
  const cleaned =
    String(route || "")
      .replace(/^#\/?/, "")
      .replace(/^\//, "") || "landing";
  const normalized = ROUTE_SYNONYMS[cleaned] || cleaned;
  return ROUTES.includes(normalized) ? normalized : "landing";
}

export function toHash(route) {
  return `#/${normalizeRoute(route)}`;
}
