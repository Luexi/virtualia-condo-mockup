export const ROUTE_ALIASES = {
  inicio: "dashboard",
  validar: "pagos",
  estado: "estado-cuenta",
  config: "configuracion",
  resident: "residente",
};

export const ROUTES = [
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
    group: "Operación",
    items: [
      { id: "dashboard", label: "Inicio", icon: "Home" },
      { id: "mapa", label: "Mapa", icon: "Map" },
      { id: "unidades", label: "Unidades", icon: "Building" },
      { id: "cobranza", label: "Cobranza", icon: "Coins" },
      { id: "pagos", label: "Pagos por validar", icon: "Wallet", badge: 9, badgeTone: "amber" },
    ],
  },
  {
    group: "Comunidad",
    items: [
      { id: "mantenimiento", label: "Mantenimiento", icon: "Wrench", badge: 18 },
      { id: "albercas", label: "Albercas", icon: "Waves" },
      { id: "amenidades", label: "Amenidades", icon: "CalendarCheck" },
      { id: "comunicados", label: "Comunicados", icon: "Megaphone" },
      { id: "accesos", label: "Accesos", icon: "KeyRound" },
    ],
  },
  { group: "Análisis", items: [{ id: "reportes", label: "Reportes", icon: "ChartPie" }] },
  {
    group: "General",
    items: [{ id: "configuracion", label: "Configuración", icon: "Settings" }],
  },
];

export const PAGE_META = {
  login: { title: "Login", sub: "Acceso privado al panel administrativo." },
  dashboard: { title: "Inicio", sub: "¿Qué necesita atención hoy?" },
  mapa: {
    title: "Mapa",
    sub: "Vista del condominio: cobranza, mantenimiento y ocupación por unidad.",
  },
  unidades: { title: "Unidades", sub: "174 unidades en dos comunidades · propietarios, inquilinos y saldos." },
  "estado-cuenta": {
    title: "Estado de cuenta",
    sub: "Detalle financiero de la unidad: saldo, cargos, pagos y comprobantes.",
  },
  cobranza: { title: "Cobranza", sub: "El corazón financiero de la comunidad: cuotas, recargos y morosidad." },
  pagos: { title: "Pagos por validar", sub: "Revisa comprobantes con trazabilidad y deja registro de cada decisión." },
  mantenimiento: { title: "Mantenimiento", sub: "Tickets, prioridades y mantenimiento preventivo." },
  albercas: { title: "Albercas", sub: "Bitácora química y de servicio por alberca." },
  amenidades: { title: "Amenidades", sub: "Reservas, calendario y reglas de uso." },
  comunicados: {
    title: "Comunicados y documentos",
    sub: "Avisos segmentados, confirmación de lectura y archivo de la comunidad.",
  },
  accesos: { title: "Accesos y visitantes", sub: "Código de visitantes, autorizaciones y bitácora de caseta." },
  reportes: { title: "Reportes para comité", sub: "Vista ejecutiva de ingresos, egresos, flujo y morosidad." },
  residente: { title: "Portal residente", sub: "Vista simplificada para propietario o residente." },
  configuracion: { title: "Configuración", sub: "Comunidad, cuotas, usuarios, permisos e instancia." },
};

export function normalizeRoute(route) {
  const cleaned = String(route || "")
    .replace(/^#\/?/, "")
    .replace(/^\//, "") || "login";
  const normalized = ROUTE_ALIASES[cleaned] || cleaned;
  return ROUTES.includes(normalized) ? normalized : "login";
}

export function toHash(route) {
  return `#/${normalizeRoute(route)}`;
}
