// Datos ficticios de referencia para Condo by Virtualia.
const fmtMXN = (n, opts = {}) => {
  const value = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: opts.dec ? 2 : 0,
    maximumFractionDigits: opts.dec ? 2 : 0,
  }).format(Math.abs(n));
  return n < 0 ? "-" + value : value;
};

const COMMUNITIES = [
  {
    id: "cedro",
    name: "Torre Cedro",
    kind: "Condominio vertical",
    units: 96,
    unitWord: "departamentos",
    city: "Zapopan, Jal.",
    icon: "Building2",
    color: "teal",
  },
  {
    id: "lago",
    name: "Privada Lago Azul",
    kind: "Fraccionamiento",
    units: 78,
    unitWord: "casas",
    city: "El Salto, Jal.",
    icon: "HomeUnit",
    color: "sky",
    pools: true,
  },
];

const KPIS = {
  cobrado: 284500,
  pendiente: 67800,
  morosos: 14,
  porValidar: 9,
  tickets: 18,
  programados: 6,
  cobradoPct: 81,
  presupuesto: 352300,
  egresos: 198400,
  saldoOperativo: 86100,
};

const UNITS = [
  { u: "A-204", com: "cedro", tipo: "Departamento", owner: "Propietario 01", tenant: "Residente 02", renta: true, saldo: -4200, estado: "moroso", dias: 38, contacto: "Contacto privado", cars: 1, tags: ["Renta"], m2: 78 },
  { u: "A-512", com: "cedro", tipo: "Departamento", owner: "Propietario 07", tenant: "-", renta: false, saldo: 0, estado: "corriente", dias: 0, contacto: "Contacto privado", cars: 2, tags: [], m2: 92 },
  { u: "B-1102", com: "cedro", tipo: "Departamento", owner: "Propietario 12", tenant: "Residente 09", renta: true, saldo: -12600, estado: "moroso", dias: 74, contacto: "Contacto privado", cars: 1, tags: ["Renta", "Acuerdo"], m2: 110 },
  { u: "A-307", com: "cedro", tipo: "Departamento", owner: "Propietario 03", tenant: "-", renta: false, saldo: -1800, estado: "pendiente", dias: 9, contacto: "Contacto privado", cars: 1, tags: [], m2: 78 },
  { u: "B-806", com: "cedro", tipo: "Departamento", owner: "Propietario 18", tenant: "-", renta: false, saldo: 0, estado: "corriente", dias: 0, contacto: "Contacto privado", cars: 2, tags: ["Comité"], m2: 92 },
  { u: "Casa 14", com: "lago", tipo: "Casa", owner: "Propietario 21", tenant: "-", renta: false, saldo: 0, estado: "corriente", dias: 0, contacto: "Contacto privado", cars: 2, tags: ["Alberca"], m2: 180 },
  { u: "Casa 37", com: "lago", tipo: "Casa", owner: "Propietario 25", tenant: "Residente 11", renta: true, saldo: -9400, estado: "moroso", dias: 52, contacto: "Contacto privado", cars: 2, tags: ["Renta", "Alberca"], m2: 210 },
  { u: "Casa 58", com: "lago", tipo: "Casa", owner: "Propietario 30", tenant: "-", renta: false, saldo: -2100, estado: "pendiente", dias: 6, contacto: "Contacto privado", cars: 3, tags: ["Alberca"], m2: 240 },
  { u: "Casa 09", com: "lago", tipo: "Casa", owner: "Propietario 33", tenant: "-", renta: false, saldo: 0, estado: "corriente", dias: 0, contacto: "Contacto privado", cars: 2, tags: ["Alberca"], m2: 180 },
  { u: "Casa 71", com: "lago", tipo: "Casa", owner: "Propietario 38", tenant: "Residente 14", renta: true, saldo: 0, estado: "corriente", dias: 0, contacto: "Contacto privado", cars: 1, tags: ["Renta", "Alberca"], m2: 210 },
];

const STATEMENT = {
  unit: "A-204",
  saldo: -4200,
  cargos: [
    { fecha: "01 Jun 2026", concepto: "Cuota ordinaria junio", monto: 2100, tipo: "ordinaria" },
    { fecha: "01 Jun 2026", concepto: "Cuota extraordinaria fachada", monto: 1500, tipo: "extra" },
    { fecha: "16 Jun 2026", concepto: "Recargo manual por mora", monto: 600, tipo: "recargo" },
    { fecha: "01 May 2026", concepto: "Cuota ordinaria mayo", monto: 2100, tipo: "ordinaria" },
  ],
  pagos: [
    { fecha: "04 May 2026", concepto: "Pago manual mayo", monto: 2100, metodo: "Comprobante manual", ref: "REC-0081", estado: "validado" },
    { fecha: "03 Abr 2026", concepto: "Pago manual abril", monto: 2100, metodo: "Depósito reportado", ref: "REC-0074", estado: "validado" },
    { fecha: "06 Mar 2026", concepto: "Pago manual marzo", monto: 2100, metodo: "Efectivo administración", ref: "REC-0068", estado: "validado" },
  ],
  timeline: [
    { t: "Recargo manual registrado", meta: "16 Jun 2026 / +$600 por mora", tone: "red", icon: "AlertTriangle" },
    { t: "Cargo de cuota junio", meta: "01 Jun 2026 / $2,100 ordinaria + $1,500 extra", tone: "amber", icon: "Receipt" },
    { t: "Pago manual validado", meta: "04 May 2026 / $2,100 con comprobante revisado", tone: "green", icon: "CheckCircle" },
    { t: "Cargo de cuota mayo", meta: "01 May 2026 / $2,100 ordinaria", tone: "slate", icon: "Receipt" },
  ],
};

const PAGOS_VALIDAR = [
  { id: "PV-0091", unit: "A-204", com: "cedro", monto: 4200, metodo: "Comprobante manual", fecha: "22 Jun 2026 / 09:12", quien: "Residente 02", evidencia: "comprobante_manual_0091.pdf", estado: "nuevo" },
  { id: "PV-0090", unit: "Casa 37", com: "lago", monto: 9400, metodo: "Depósito reportado", fecha: "22 Jun 2026 / 08:40", quien: "Residente 11", evidencia: "ficha_deposito_0090.jpg", estado: "nuevo" },
  { id: "PV-0089", unit: "B-1102", com: "cedro", monto: 6300, metodo: "Comprobante manual", fecha: "21 Jun 2026 / 19:22", quien: "Residente 09", evidencia: "captura_pago_0089.png", estado: "revision" },
  { id: "PV-0088", unit: "Casa 58", com: "lago", monto: 2100, metodo: "Efectivo administración", fecha: "21 Jun 2026 / 16:05", quien: "Propietario 30", evidencia: "recibo_caja_0088.jpg", estado: "nuevo" },
  { id: "PV-0087", unit: "A-307", com: "cedro", monto: 1800, metodo: "Comprobante manual", fecha: "21 Jun 2026 / 12:31", quien: "Propietario 03", evidencia: "comprobante_0087.pdf", estado: "aclaracion" },
  { id: "PV-0086", unit: "Casa 14", com: "lago", monto: 2100, metodo: "Comprobante manual", fecha: "20 Jun 2026 / 10:18", quien: "Propietario 21", evidencia: "comprobante_0086.pdf", estado: "nuevo" },
  { id: "PV-0085", unit: "A-512", com: "cedro", monto: 4200, metodo: "Comprobante manual", fecha: "20 Jun 2026 / 09:02", quien: "Propietario 07", evidencia: "comprobante_0085.pdf", estado: "nuevo" },
  { id: "PV-0084", unit: "B-806", com: "cedro", monto: 2100, metodo: "Depósito reportado", fecha: "19 Jun 2026 / 18:44", quien: "Propietario 18", evidencia: "ficha_0084.jpg", estado: "revision" },
  { id: "PV-0083", unit: "Casa 71", com: "lago", monto: 2100, metodo: "Comprobante manual", fecha: "19 Jun 2026 / 14:10", quien: "Residente 14", evidencia: "comprobante_0083.pdf", estado: "nuevo" },
];

const TICKETS = [
  { id: "MT-318", titulo: "Fuga en cisterna nivel B", cat: "Plomería", icon: "Droplet", prio: "alta", resp: "Mtto. interno", prov: "Por asignar", costo: 0, estado: "proceso", com: "cedro", fecha: "22 Jun 2026" },
  { id: "MT-317", titulo: "Falla intermitente elevador 2", cat: "Elevador", icon: "Elevator", prio: "alta", resp: "Administración", prov: "Por asignar", costo: 0, estado: "programado", com: "cedro", fecha: "21 Jun 2026" },
  { id: "MT-316", titulo: "Bomba de alberca casa club", cat: "Alberca", icon: "Waves", prio: "media", resp: "Mtto. externo", prov: "Por asignar", costo: 0, estado: "revision", com: "lago", fecha: "21 Jun 2026" },
  { id: "MT-315", titulo: "Poda de áreas verdes acceso", cat: "Jardinería", icon: "Leaf", prio: "baja", resp: "Jardinería", prov: "Por asignar", costo: 0, estado: "programado", com: "lago", fecha: "20 Jun 2026" },
  { id: "MT-314", titulo: "Cambio de luminarias pasillo 8", cat: "Electricidad", icon: "Bolt", prio: "media", resp: "Mtto. interno", prov: "Por asignar", costo: 0, estado: "nuevo", com: "cedro", fecha: "20 Jun 2026" },
  { id: "MT-313", titulo: "Cámara caseta sin señal", cat: "Seguridad", icon: "Shield", prio: "alta", resp: "Vigilancia", prov: "Por asignar", costo: 0, estado: "nuevo", com: "lago", fecha: "19 Jun 2026" },
  { id: "MT-312", titulo: "Limpieza profunda lobby", cat: "Limpieza", icon: "Sparkles", prio: "baja", resp: "Intendencia", prov: "Por asignar", costo: 0, estado: "resuelto", com: "cedro", fecha: "18 Jun 2026" },
  { id: "MT-311", titulo: "Fuga en jardín casa 37", cat: "Plomería", icon: "Droplet", prio: "media", resp: "Mtto. externo", prov: "Por asignar", costo: 0, estado: "resuelto", com: "lago", fecha: "17 Jun 2026" },
];

const TICKET_ESTADOS = [
  { k: "nuevo", label: "Nuevo", badge: "slate" },
  { k: "revision", label: "En revisión", badge: "sky" },
  { k: "programado", label: "Programado", badge: "amber" },
  { k: "proceso", label: "En proceso", badge: "peach" },
  { k: "resuelto", label: "Resuelto", badge: "green" },
];

const PREVENTIVO = [
  { titulo: "Lavado de cisternas", prox: "28 Jun 2026", com: "Torre Cedro", icon: "Droplet", estado: "Programado" },
  { titulo: "Revisión elevadores", prox: "02 Jul 2026", com: "Torre Cedro", icon: "Elevator", estado: "Programado" },
  { titulo: "Fumigación áreas comunes", prox: "Por agendar", com: "Ambas", icon: "Leaf", estado: "Por agendar" },
];

const POOLS = [
  { id: "ALB-CC", nombre: "Alberca Casa Club", com: "Privada Lago Azul", estado: "optima", ph: 7.4, cloro: 1.8, alc: 110, ultima: "22 Jun 2026 / revisión visual", prox: "28 Jun 2026", prov: "Por asignar", costo: 0, temp: 27 },
  { id: "ALB-N", nombre: "Alberca Norte", com: "Privada Lago Azul", estado: "atencion", ph: 7.9, cloro: 0.6, alc: 95, ultima: "21 Jun 2026 / observación manual", prox: "Por confirmar", prov: "Por asignar", costo: 0, temp: 26 },
  { id: "ALB-S", nombre: "Alberca Sur", com: "Privada Lago Azul", estado: "fuera", ph: 0, cloro: 0, alc: 0, ultima: "20 Jun 2026 / fuera de servicio", prox: "Suspendido", prov: "Por asignar", costo: 0, temp: 0 },
];

const POOL_LOG = [
  { fecha: "22 Jun 2026", accion: "Revisión visual de área", quien: "Mtto. interno", ph: 0, cloro: 0, tone: "green" },
  { fecha: "21 Jun 2026", accion: "Limpieza general registrada", quien: "Mtto. interno", ph: 0, cloro: 0, tone: "slate" },
  { fecha: "20 Jun 2026", accion: "Observación pendiente de atención", quien: "Administración", ph: 0, cloro: 0, tone: "amber" },
  { fecha: "19 Jun 2026", accion: "Bitácora actualizada", quien: "Administración", ph: 0, cloro: 0, tone: "slate" },
];

const AMENITIES = [
  { id: "salon", nombre: "Salón de eventos", icon: "Sofa", com: "Torre Cedro", deposito: 2000, regla: "Máx. 50 personas / hasta 23:00" },
  { id: "palapa", nombre: "Palapa", icon: "Sun", com: "Privada Lago Azul", deposito: 800, regla: "Máx. 30 personas / hasta 22:00" },
  { id: "gym", nombre: "Gimnasio", icon: "Dumbbell", com: "Torre Cedro", deposito: 0, regla: "Aforo 8 / 05:00-23:00" },
  { id: "cancha", nombre: "Cancha múltiple", icon: "Briefcase", com: "Privada Lago Azul", deposito: 0, regla: "Bloques de 1 h" },
  { id: "albercac", nombre: "Alberca común", icon: "Waves", com: "Privada Lago Azul", deposito: 0, regla: "Aforo 25 / 08:00-20:00" },
];

const RESERVAS = [
  { amenidad: "Salón de eventos", unidad: "A-512", dia: "Sáb 27 Jun", hora: "18:00-23:00", estado: "aprobada", deposito: 2000 },
  { amenidad: "Palapa", unidad: "Casa 14", dia: "Dom 28 Jun", hora: "13:00-18:00", estado: "pendiente", deposito: 800 },
  { amenidad: "Gimnasio", unidad: "B-806", dia: "Lun 29 Jun", hora: "07:00-08:00", estado: "aprobada", deposito: 0 },
  { amenidad: "Cancha múltiple", unidad: "Casa 71", dia: "Mié 01 Jul", hora: "19:00-20:00", estado: "pendiente", deposito: 0 },
];

const COMUNICADOS = [
  { titulo: "Corte de agua programado", seg: "Torre Cedro", fecha: "22 Jun 2026", leido: 0, total: 96, prioridad: "alta", estado: "publicado" },
  { titulo: "Asamblea ordinaria: acuerdos", seg: "Todos", fecha: "20 Jun 2026", leido: 0, total: 174, prioridad: "media", estado: "publicado" },
  { titulo: "Recordatorio de administración", seg: "Unidades con saldo", fecha: "19 Jun 2026", leido: 0, total: 14, prioridad: "media", estado: "publicado" },
  { titulo: "Mantenimiento de albercas", seg: "Privada Lago Azul", fecha: "18 Jun 2026", leido: 0, total: 78, prioridad: "baja", estado: "publicado" },
];

const DOCUMENTOS = [
  { nombre: "Reglamento interno 2026", tipo: "Reglamento", peso: "1.2 MB", fecha: "12 Ene 2026", icon: "FileText" },
  { nombre: "Acta asamblea abril", tipo: "Acta", peso: "480 KB", fecha: "28 Abr 2026", icon: "FileText" },
  { nombre: "Presupuesto anual 2026", tipo: "Presupuesto", peso: "2.1 MB", fecha: "05 Ene 2026", icon: "Sheet" },
  { nombre: "Resumen financiero abril", tipo: "Finanzas", peso: "760 KB", fecha: "03 May 2026", icon: "ChartPie" },
  { nombre: "Manual de amenidades", tipo: "Operación", peso: "320 KB", fecha: "15 Feb 2026", icon: "Briefcase" },
];

const VISITAS = [
  { folio: "ACC-7741", nombre: "Visita familiar", unidad: "A-204", tipo: "Visitante", vence: "22 Jun 2026 / 22:00", placa: "JAL-12-***", estado: "autorizado" },
  { folio: "ACC-7738", nombre: "Paquetería Central", unidad: "Casa 14", tipo: "Proveedor", vence: "22 Jun 2026 / 14:00", placa: "-", estado: "usado" },
  { folio: "ACC-7735", nombre: "Servicio alberca", unidad: "Áreas comunes", tipo: "Proveedor", vence: "22 Jun 2026 / 12:00", placa: "JAL-88-***", estado: "usado" },
  { folio: "ACC-7730", nombre: "Visita evento", unidad: "A-512", tipo: "Visitante", vence: "21 Jun 2026 / 23:00", placa: "JAL-44-***", estado: "expirado" },
  { folio: "ACC-7728", nombre: "Invitado", unidad: "Casa 58", tipo: "Visitante", vence: "22 Jun 2026 / 20:00", placa: "-", estado: "autorizado" },
  { folio: "ACC-7725", nombre: "Mensajería Express", unidad: "B-1102", tipo: "Proveedor", vence: "21 Jun 2026 / 18:00", placa: "-", estado: "cancelado" },
];

const BITACORA = [
  { hora: "13:42", evento: "Entrada peatonal", detalle: "ACC-7741 / A-204", tone: "green" },
  { hora: "12:08", evento: "Entrada vehicular", detalle: "Servicio alberca / JAL-88-***", tone: "slate" },
  { hora: "11:30", evento: "Salida vehicular", detalle: "Paquetería Central", tone: "slate" },
  { hora: "09:15", evento: "Acceso denegado", detalle: "Código expirado / ACC-7730", tone: "red" },
];

const EGRESOS = [
  { cat: "Mantenimiento", monto: 64200, pct: 32, color: "#0E8C6F" },
  { cat: "Vigilancia", monto: 52800, pct: 27, color: "#1688F0" },
  { cat: "Limpieza", monto: 31600, pct: 16, color: "#16A164" },
  { cat: "Albercas", monto: 22400, pct: 11, color: "#D9891C" },
  { cat: "Jardinería", monto: 16800, pct: 8, color: "#94A3B8" },
  { cat: "Administración", monto: 10600, pct: 6, color: "#5F6F7A" },
];

const FLUJO = [
  { mes: "Ene", cobrado: 262, pendiente: 38 },
  { mes: "Feb", cobrado: 255, pendiente: 52 },
  { mes: "Mar", cobrado: 271, pendiente: 44 },
  { mes: "Abr", cobrado: 278, pendiente: 49 },
  { mes: "May", cobrado: 284, pendiente: 68 },
  { mes: "Jun", cobrado: 221, pendiente: 71 },
];

const PROVEEDORES = [
  { nombre: "Elevadores", cat: "Servicio recurrente", monto: 18900, pct: 100 },
  { nombre: "Vigilancia", cat: "Operación", monto: 52800, pct: 100 },
  { nombre: "Albercas", cat: "Operación", monto: 12000, pct: 64 },
  { nombre: "Jardinería", cat: "Áreas comunes", monto: 9600, pct: 51 },
  { nombre: "Plomería", cat: "Mantenimiento", monto: 6500, pct: 34 },
];

const MOROSIDAD_ANT = [
  { rango: "1-30 días", unidades: 6, monto: 14200, color: "amber" },
  { rango: "31-60 días", unidades: 5, monto: 28600, color: "peach" },
  { rango: "61-90 días", unidades: 2, monto: 16400, color: "red" },
  { rango: "+90 días", unidades: 1, monto: 8600, color: "red" },
];

const PAGOS_RECIENTES = [
  { fecha: "22 Jun", unit: "A-512", concepto: "Cuota ordinaria junio", monto: 4200, metodo: "Comprobante manual", estado: "validado" },
  { fecha: "22 Jun", unit: "Casa 09", concepto: "Cuota ordinaria junio", monto: 2100, metodo: "Comprobante manual", estado: "validado" },
  { fecha: "21 Jun", unit: "B-806", concepto: "Cuota + extraordinaria", monto: 3600, metodo: "Depósito reportado", estado: "validado" },
  { fecha: "21 Jun", unit: "Casa 71", concepto: "Cuota ordinaria junio", monto: 2100, metodo: "Comprobante manual", estado: "validado" },
  { fecha: "20 Jun", unit: "A-204", concepto: "Abono manual", monto: 2100, metodo: "Efectivo administración", estado: "validado" },
];

const ACTIVIDAD = [
  { txt: "<b>PV-0088</b> quedó aprobado para Casa 58", time: "22 Jun 2026", icon: "CheckCircle", tone: "green" },
  { txt: "Comprobante por revisar de <b>A-204</b> / $4,200", time: "22 Jun 2026", icon: "Wallet", tone: "amber" },
  { txt: "Ticket <b>MT-318</b> pasó a <b>En proceso</b>", time: "21 Jun 2026", icon: "Wrench", tone: "peach" },
  { txt: "Alberca Norte marcada como <b>Requiere atención</b>", time: "21 Jun 2026", icon: "Waves", tone: "amber" },
  { txt: "Comunicado <b>Corte de agua</b> publicado para Torre Cedro", time: "20 Jun 2026", icon: "Megaphone", tone: "sky" },
];

const RES_RECIBOS = [
  { mes: "Junio 2026", monto: 2100, estado: "pendiente" },
  { mes: "Mayo 2026", monto: 2100, estado: "pagado" },
  { mes: "Abril 2026", monto: 2100, estado: "pagado" },
  { mes: "Marzo 2026", monto: 2100, estado: "pagado" },
];

export const formatCurrencyMXN = fmtMXN;

export const mockData = {
  fmtMXN,
  COMMUNITIES,
  KPIS,
  UNITS,
  STATEMENT,
  PAGOS_VALIDAR,
  TICKETS,
  TICKET_ESTADOS,
  PREVENTIVO,
  POOLS,
  POOL_LOG,
  AMENITIES,
  RESERVAS,
  COMUNICADOS,
  DOCUMENTOS,
  VISITAS,
  BITACORA,
  EGRESOS,
  FLUJO,
  PROVEEDORES,
  MOROSIDAD_ANT,
  PAGOS_RECIENTES,
  ACTIVIDAD,
  RES_RECIBOS,
};

export {
  fmtMXN,
  COMMUNITIES,
  KPIS,
  UNITS,
  STATEMENT,
  PAGOS_VALIDAR,
  TICKETS,
  TICKET_ESTADOS,
  PREVENTIVO,
  POOLS,
  POOL_LOG,
  AMENITIES,
  RESERVAS,
  COMUNICADOS,
  DOCUMENTOS,
  VISITAS,
  BITACORA,
  EGRESOS,
  FLUJO,
  PROVEEDORES,
  MOROSIDAD_ANT,
  PAGOS_RECIENTES,
  ACTIVIDAD,
  RES_RECIBOS,
};

export default mockData;
