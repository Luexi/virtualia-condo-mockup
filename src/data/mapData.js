// Datos del Mapa — Virtualia Condo.
// El mapa ES una ilustracion isometrica fija (diorama 3D) subida a mano. Encima se
// superpone una capa interactiva de "hotspots" (pines) posicionados por porcentaje
// sobre la imagen. El sistema NO genera ni modifica la ilustracion.
//
// Las posiciones xPct/yPct (0-100) estan CALIBRADAS A MANO sobre cada render concreto.
// Es un subconjunto curado (no todas las unidades) pensado para una demo visual hermosa.
// Datos ficticios; las unidades reales del mock se integran para que el mapa cuadre con
// Unidades / Cobranza / Estado de cuenta.

import { UNITS } from "./mockData.js";
import lagoImg from "../assets/mapa-lago.png";
import cedroImg from "../assets/mapa-cedro.png";

// ------------------------------------------------------------------
// Helpers deterministas para rellenar datos sinteticos coherentes.
// ------------------------------------------------------------------
function mulberry(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function saldoFor(estado, rnd) {
  if (estado === "corriente") return 0;
  if (estado === "pendiente") return -(1500 + Math.floor(rnd() * 9) * 300);
  return -(3800 + Math.floor(rnd() * 30) * 400);
}
function diasFor(estado, rnd) {
  if (estado === "corriente") return 0;
  if (estado === "pendiente") return 3 + Math.floor(rnd() * 10);
  return 32 + Math.floor(rnd() * 70);
}

// Catalogo corto de incidencias demo.
const INCIDENCIAS = [
  { cat: "Plomería", icon: "Droplet", prio: "media", titulo: "Fuga reportada en patio" },
  { cat: "Electricidad", icon: "Bolt", prio: "media", titulo: "Falla de luminaria exterior" },
  { cat: "Jardinería", icon: "Leaf", prio: "baja", titulo: "Poda pendiente" },
  { cat: "Seguridad", icon: "Shield", prio: "alta", titulo: "Sensor de acceso intermitente" },
  { cat: "Limpieza", icon: "Sparkles", prio: "baja", titulo: "Limpieza profunda solicitada" },
];

const REAL_BY_ID = UNITS.reduce((acc, u) => {
  acc[u.u] = u;
  return acc;
}, {});

// Construye un hotspot de unidad. Si `id` existe en el mock real, usa sus datos;
// si no, genera datos sinteticos deterministas a partir de `estado`.
function unit(id, tipo, xPct, yPct, estado, seed, extra = {}) {
  const rnd = mulberry(seed);
  const real = REAL_BY_ID[id];
  if (real) {
    return {
      id,
      tipo: "unit",
      kind: tipo,
      xPct,
      yPct,
      estado: real.estado,
      saldo: real.saldo,
      dias: real.dias,
      owner: real.owner,
      tenant: real.tenant,
      renta: real.renta,
      tags: real.tags || [],
      tickets:
        real.estado !== "corriente" && rnd() > 0.4
          ? [INCIDENCIAS[seed % INCIDENCIAS.length]]
          : [],
      real: true,
      ...extra,
    };
  }
  const renta = rnd() > 0.6;
  const hasTicket = estado !== "corriente" ? rnd() > 0.45 : rnd() > 0.85;
  return {
    id,
    tipo: "unit",
    kind: tipo,
    xPct,
    yPct,
    estado,
    saldo: saldoFor(estado, rnd),
    dias: diasFor(estado, rnd),
    owner: "Propietario " + String(seed % 90 + 1).padStart(2, "0"),
    tenant: renta ? "Residente " + String(seed % 90 + 1).padStart(2, "0") : "—",
    renta,
    tags: renta ? ["Renta"] : [],
    tickets: hasTicket ? [INCIDENCIAS[seed % INCIDENCIAS.length]] : [],
    real: false,
    ...extra,
  };
}

function amenity(id, label, icon, xPct, yPct, estado = "optima") {
  return { id, tipo: "amenity", label, icon, xPct, yPct, estado };
}
function gate(id, label, xPct, yPct, estado = "optima") {
  return { id, tipo: "gate", label, icon: "KeyRound", xPct, yPct, estado };
}

// ==================================================================
// PRIVADA LAGO AZUL — diorama `mapa-lago.png` (1586x992).
// 4 manzanas de villas en cuadricula; albercas turquesa en el centro de
// cada manzana; caseta de acceso abajo al centro. Coordenadas a mano.
// ==================================================================
// Coordenadas calibradas: techos detectados por analisis de imagen (deteccion de
// teja naranja) y centroides de alberca turquesa. Verificadas con previsualizacion.
const LAGO_HOTSPOTS = [
  // --- Manzana superior-izquierda (alberca en 34%,29.5%) ---
  unit("Casa 14", "Casa", 20.4, 18.3, "corriente", 14), // real · al corriente
  unit("Casa 02", "Casa", 28.4, 13.8, "moroso", 2),
  unit("Casa 06", "Casa", 18.2, 31.0, "pendiente", 6),
  unit("Casa 09", "Casa", 26.4, 33.9, "corriente", 9),
  // --- Manzana superior-derecha (alberca en 66.5%,29.4%) ---
  unit("Casa 37", "Casa", 58.1, 13.9, "moroso", 37), // real · moroso
  unit("Casa 71", "Casa", 74.3, 14.0, "corriente", 71), // real · al corriente
  unit("Casa 22", "Casa", 63.3, 33.8, "corriente", 22),
  unit("Casa 33", "Casa", 79.9, 19.5, "pendiente", 33),
  // --- Manzana inferior-izquierda (alberca en 32%,57.4%) ---
  unit("Casa 58", "Casa", 25.7, 45.7, "pendiente", 58), // real · por validar
  unit("Casa 41", "Casa", 32.8, 67.5, "corriente", 41),
  unit("Casa 45", "Casa", 19.9, 67.3, "moroso", 45),
  // --- Manzana inferior-derecha (alberca en 68.5%,57.7%) ---
  unit("Casa 63", "Casa", 64.2, 45.8, "corriente", 63),
  unit("Casa 67", "Casa", 79.6, 67.6, "corriente", 67),
  unit("Casa 69", "Casa", 73.3, 68.0, "moroso", 69),
  // --- Amenidades: 4 albercas (centroides detectados; una atencion, una fuera) ---
  amenity("ALB-1", "Alberca M1", "Waves", 34.0, 29.5, "optima"),
  amenity("ALB-2", "Alberca M2", "Waves", 66.5, 29.4, "atencion"),
  amenity("ALB-3", "Alberca M3", "Waves", 32.0, 57.4, "optima"),
  amenity("ALB-4", "Alberca M4", "Waves", 68.5, 57.7, "fuera"),
  // --- Caseta de acceso (casetita real, entrada abajo al centro) ---
  gate("CASETA-L", "Caseta principal", 48.4, 73.0, "optima"),
];

// ==================================================================
// TORRE CEDRO — diorama `mapa-cedro.png` (1586x992).
// Torre A (izquierda) y Torre B (derecha); deck central con alberca, gym
// y salon; caseta al frente. Coordenadas a mano sobre las fachadas.
// ==================================================================
// Coordenadas calibradas sobre las fachadas frontales de cada torre (rejilla de
// balcones) y centroides del deck central. Verificadas con previsualizacion.
const CEDRO_HOTSPOTS = [
  // --- Torre A (izquierda): cara frontal con balcones, 3 columnas x 3 filas ---
  unit("A-512", "Departamento", 22, 24, "corriente", 512), // real
  unit("A-307", "Departamento", 28, 24, "pendiente", 307), // real · por validar
  unit("A-204", "Departamento", 22, 38, "moroso", 204), // real · moroso
  unit("A-806", "Departamento", 28, 38, "corriente", 806),
  unit("A-410", "Departamento", 22, 50, "corriente", 410),
  unit("A-118", "Departamento", 28, 50, "moroso", 118),
  // --- Torre B (derecha): cara frontal iluminada ---
  unit("B-806", "Departamento", 66, 24, "corriente", 8061), // real (B-806)
  unit("B-1102", "Departamento", 72, 24, "moroso", 1102), // real · moroso
  unit("B-512", "Departamento", 66, 38, "pendiente", 5121),
  unit("B-309", "Departamento", 72, 38, "corriente", 309),
  unit("B-707", "Departamento", 66, 50, "corriente", 707),
  unit("B-204", "Departamento", 72, 50, "corriente", 2041),
  // --- Deck de amenidades central (alberca turquesa + gym + salon) ---
  amenity("ALB-C", "Alberca", "Waves", 48, 62, "optima"),
  amenity("GYM-C", "Gimnasio", "Dumbbell", 43, 44, "optima"),
  amenity("SALON-C", "Salón", "Sofa", 55, 45, "atencion"),
  // --- Caseta de acceso al frente ---
  gate("CASETA-C", "Acceso Torre Cedro", 48, 80, "optima"),
];

export const MAP_COMMUNITIES = {
  cedro: {
    id: "cedro",
    name: "Torre Cedro",
    kind: "Condominio vertical",
    image: cedroImg,
    hotspots: CEDRO_HOTSPOTS,
  },
  lago: {
    id: "lago",
    name: "Privada Lago Azul",
    kind: "Fraccionamiento",
    image: lagoImg,
    hotspots: LAGO_HOTSPOTS,
  },
};

// Orden de presentacion en el selector.
export const MAP_ORDER = ["cedro", "lago"];

// ------------------------------------------------------------------
// Capas (vista que colorea los pines) + overlays (toggles de pines).
// ------------------------------------------------------------------
export const LAYERS = [
  { id: "cobranza", label: "Cobranza", icon: "Coins" },
  { id: "mantenimiento", label: "Mantenimiento", icon: "Wrench" },
  { id: "ocupacion", label: "Ocupación", icon: "Users" },
];

export const OVERLAYS = [
  { id: "amenidades", label: "Amenidades", icon: "Waves" },
  { id: "accesos", label: "Accesos", icon: "KeyRound" },
];

// Devuelve la clase modificadora del pin segun la capa activa.
export function unitClass(unit, layer) {
  if (layer === "cobranza") {
    return "map-unit--" + unit.estado; // corriente | pendiente | moroso
  }
  if (layer === "mantenimiento") {
    if (!unit.tickets || unit.tickets.length === 0) return "map-unit--ok";
    return "map-unit--mtto-" + unit.tickets[0].prio; // alta | media | baja
  }
  if (unit.renta) return "map-unit--renta";
  if (unit.tags && unit.tags.includes("Comité")) return "map-unit--comite";
  return "map-unit--propio";
}

// Leyenda segun la capa activa.
export function legendFor(layer) {
  if (layer === "cobranza") {
    return [
      { cls: "corriente", label: "Al corriente" },
      { cls: "pendiente", label: "Por validar" },
      { cls: "moroso", label: "Moroso" },
    ];
  }
  if (layer === "mantenimiento") {
    return [
      { cls: "ok", label: "Sin tickets" },
      { cls: "mtto-baja", label: "Prioridad baja" },
      { cls: "mtto-media", label: "Prioridad media" },
      { cls: "mtto-alta", label: "Prioridad alta" },
    ];
  }
  return [
    { cls: "propio", label: "Habita propietario" },
    { cls: "renta", label: "En renta" },
    { cls: "comite", label: "Comité" },
  ];
}

// Resumen para los mini-KPIs (solo unidades destacadas en el mapa).
export function mapSummary(hotspots) {
  const units = hotspots.filter((h) => h.tipo === "unit");
  let morosas = 0;
  let porValidar = 0;
  let tickets = 0;
  units.forEach((u) => {
    if (u.estado === "moroso") morosas++;
    if (u.estado === "pendiente") porValidar++;
    if (u.tickets) tickets += u.tickets.length;
  });
  return { total: units.length, morosas, porValidar, tickets };
}

export default MAP_COMMUNITIES;
