// Datos de referencia para Virtualia Condo.
const fmtMXN = (n, opts = {}) => {
  const v = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: opts.dec ? 2 : 0, maximumFractionDigits: opts.dec ? 2 : 0 }).format(Math.abs(n));
  return n < 0 ? '−' + v : v;
};

const COMMUNITIES = [
  { id: 'cedro', name: 'Torre Cedro', kind: 'Condominio vertical', units: 96, unitWord: 'departamentos', city: 'Zapopan, Jal.', icon: 'Building2', color: 'teal' },
  { id: 'lago', name: 'Privada Lago Azul', kind: 'Fraccionamiento', units: 78, unitWord: 'casas', city: 'El Salto, Jal.', icon: 'HomeUnit', color: 'sky', pools: true },
];

const KPIS = {
  cobrado: 284500, pendiente: 67800, morosos: 14, porValidar: 9, tickets: 18, programados: 6,
  cobradoPct: 81, presupuesto: 352300, egresos: 198400, saldoBanco: 1284900,
};

// Unidades
const UNITS = [
  { u: 'A-204', com: 'cedro', tipo: 'Departamento', owner: 'Propietario 01', tenant: 'Residente 02', renta: true, saldo: -4200, estado: 'moroso', dias: 38, contacto: 'Contacto privado', cars: 1, tags: ['Renta'], m2: 78 },
  { u: 'A-512', com: 'cedro', tipo: 'Departamento', owner: 'Propietario 07', tenant: '—', renta: false, saldo: 0, estado: 'corriente', dias: 0, contacto: 'Contacto privado', cars: 2, tags: [], m2: 92 },
  { u: 'B-1102', com: 'cedro', tipo: 'Departamento', owner: 'Propietario 12', tenant: 'Residente 09', renta: true, saldo: -12600, estado: 'moroso', dias: 74, contacto: 'Contacto privado', cars: 1, tags: ['Renta', 'Acuerdo'], m2: 110 },
  { u: 'A-307', com: 'cedro', tipo: 'Departamento', owner: 'Propietario 03', tenant: '—', renta: false, saldo: -1800, estado: 'pendiente', dias: 9, contacto: 'Contacto privado', cars: 1, tags: [], m2: 78 },
  { u: 'B-806', com: 'cedro', tipo: 'Departamento', owner: 'Propietario 18', tenant: '—', renta: false, saldo: 0, estado: 'corriente', dias: 0, contacto: 'Contacto privado', cars: 2, tags: ['Comité'], m2: 92 },
  { u: 'Casa 14', com: 'lago', tipo: 'Casa', owner: 'Propietario 21', tenant: '—', renta: false, saldo: 0, estado: 'corriente', dias: 0, contacto: 'Contacto privado', cars: 2, tags: ['Alberca'], m2: 180 },
  { u: 'Casa 37', com: 'lago', tipo: 'Casa', owner: 'Propietario 25', tenant: 'Residente 11', renta: true, saldo: -9400, estado: 'moroso', dias: 52, contacto: 'Contacto privado', cars: 2, tags: ['Renta', 'Alberca'], m2: 210 },
  { u: 'Casa 58', com: 'lago', tipo: 'Casa', owner: 'Propietario 30', tenant: '—', renta: false, saldo: -2100, estado: 'pendiente', dias: 6, contacto: 'Contacto privado', cars: 3, tags: ['Alberca'], m2: 240 },
  { u: 'Casa 09', com: 'lago', tipo: 'Casa', owner: 'Propietario 33', tenant: '—', renta: false, saldo: 0, estado: 'corriente', dias: 0, contacto: 'Contacto privado', cars: 2, tags: ['Alberca'], m2: 180 },
  { u: 'Casa 71', com: 'lago', tipo: 'Casa', owner: 'Propietario 38', tenant: 'Residente 14', renta: true, saldo: 0, estado: 'corriente', dias: 0, contacto: 'Contacto privado', cars: 1, tags: ['Renta', 'Alberca'], m2: 210 },
];

// Estado de cuenta de A-204
const STATEMENT = {
  unit: 'A-204', saldo: -4200,
  cargos: [
    { fecha: '01 May 2026', concepto: 'Cuota ordinaria mayo', monto: 2100, tipo: 'ordinaria' },
    { fecha: '01 May 2026', concepto: 'Cuota extraordinaria · Fachada', monto: 1500, tipo: 'extra' },
    { fecha: '16 May 2026', concepto: 'Recargo por mora (mayo)', monto: 600, tipo: 'recargo' },
    { fecha: '01 Abr 2026', concepto: 'Cuota ordinaria abril', monto: 2100, tipo: 'ordinaria' },
  ],
  pagos: [
    { fecha: '04 Abr 2026', concepto: 'Pago cuota abril', monto: 2100, metodo: 'Transferencia', ref: 'SPEI-8841', estado: 'validado' },
    { fecha: '03 Mar 2026', concepto: 'Pago cuota marzo', monto: 2100, metodo: 'Transferencia', ref: 'SPEI-8120', estado: 'validado' },
    { fecha: '06 Feb 2026', concepto: 'Pago cuota febrero', monto: 2100, metodo: 'Efectivo', ref: 'CAJA-204', estado: 'validado' },
  ],
  timeline: [
    { t: 'Recargo aplicado', meta: '16 May 2026 · +$600 por 15 días de mora', tone: 'red', icon: 'AlertTriangle' },
    { t: 'Cargo de cuota mayo', meta: '01 May 2026 · $2,100 ordinaria + $1,500 extra', tone: 'amber', icon: 'Receipt' },
    { t: 'Pago validado · abril', meta: '04 Abr 2026 · $2,100 vía transferencia', tone: 'green', icon: 'CheckCircle' },
    { t: 'Cargo de cuota abril', meta: '01 Abr 2026 · $2,100 ordinaria', tone: 'teal', icon: 'Receipt' },
  ],
};

// Pagos por validar
const PAGOS_VALIDAR = [
  { id: 'PV-0091', unit: 'A-204', com: 'cedro', monto: 4200, metodo: 'Transferencia', fecha: 'Hoy · 09:12', quien: 'Residente 02', evidencia: 'comprobante_spei.pdf', estado: 'nuevo' },
  { id: 'PV-0090', unit: 'Casa 37', com: 'lago', monto: 9400, metodo: 'Depósito', fecha: 'Hoy · 08:40', quien: 'Residente 11', evidencia: 'ficha_deposito.jpg', estado: 'nuevo' },
  { id: 'PV-0089', unit: 'B-1102', com: 'cedro', monto: 6300, metodo: 'Transferencia', fecha: 'Ayer · 19:22', quien: 'Residente 09', evidencia: 'captura_app.png', estado: 'revision' },
  { id: 'PV-0088', unit: 'Casa 58', com: 'lago', monto: 2100, metodo: 'Efectivo', fecha: 'Ayer · 16:05', quien: 'Propietario 30', evidencia: 'recibo_caja.jpg', estado: 'nuevo' },
  { id: 'PV-0087', unit: 'A-307', com: 'cedro', monto: 1800, metodo: 'Tarjeta', fecha: 'Ayer · 12:31', quien: 'Propietario 03', evidencia: 'voucher_tpv.pdf', estado: 'aclaracion' },
  { id: 'PV-0086', unit: 'Casa 14', com: 'lago', monto: 2100, metodo: 'Transferencia', fecha: '27 May · 10:18', quien: 'Propietario 21', evidencia: 'spei_bbva.pdf', estado: 'nuevo' },
  { id: 'PV-0085', unit: 'A-512', com: 'cedro', monto: 4200, metodo: 'Transferencia', fecha: '27 May · 09:02', quien: 'Propietario 07', evidencia: 'comprobante.pdf', estado: 'nuevo' },
  { id: 'PV-0084', unit: 'B-806', com: 'cedro', monto: 2100, metodo: 'Depósito', fecha: '26 May · 18:44', quien: 'Propietario 18', evidencia: 'ficha.jpg', estado: 'revision' },
  { id: 'PV-0083', unit: 'Casa 71', com: 'lago', monto: 2100, metodo: 'Transferencia', fecha: '26 May · 14:10', quien: 'Residente 14', evidencia: 'spei.pdf', estado: 'nuevo' },
];

// Mantenimiento
const TICKETS = [
  { id: 'MT-318', titulo: 'Fuga en cisterna nivel B', cat: 'Plomería', icon: 'Droplet', prio: 'alta', resp: 'Mtto. interno', prov: 'Hidro Servicios', costo: 3800, estado: 'proceso', com: 'cedro', fecha: 'Hace 2 h' },
  { id: 'MT-317', titulo: 'Falla intermitente elevador 2', cat: 'Elevador', icon: 'Elevator', prio: 'alta', resp: 'Comite Condo', prov: 'Elevadores Altura S.A.', costo: 12500, estado: 'programado', com: 'cedro', fecha: 'Hace 5 h' },
  { id: 'MT-316', titulo: 'Bomba de alberca casa club', cat: 'Alberca', icon: 'Waves', prio: 'media', resp: 'Mtto. externo', prov: 'AquaClean', costo: 5400, estado: 'revision', com: 'lago', fecha: 'Ayer' },
  { id: 'MT-315', titulo: 'Poda de áreas verdes acceso', cat: 'Jardinería', icon: 'Leaf', prio: 'baja', resp: 'Jardineria Norte', prov: 'Verde Vivo', costo: 2200, estado: 'programado', com: 'lago', fecha: 'Ayer' },
  { id: 'MT-314', titulo: 'Cambio de luminarias pasillo 8', cat: 'Electricidad', icon: 'Bolt', prio: 'media', resp: 'Mtto. interno', prov: '—', costo: 1600, estado: 'nuevo', com: 'cedro', fecha: 'Hace 1 día' },
  { id: 'MT-313', titulo: 'Cámara caseta sin señal', cat: 'Seguridad', icon: 'Shield', prio: 'alta', resp: 'Seguridad Integral', prov: 'SegTotal', costo: 0, estado: 'nuevo', com: 'lago', fecha: 'Hace 1 día' },
  { id: 'MT-312', titulo: 'Limpieza profunda lobby', cat: 'Limpieza', icon: 'Sparkles', prio: 'baja', resp: 'Intendencia', prov: '—', costo: 900, estado: 'resuelto', com: 'cedro', fecha: 'Hace 2 días' },
  { id: 'MT-311', titulo: 'Fuga en jardín casa 37', cat: 'Plomería', icon: 'Droplet', prio: 'media', resp: 'Mtto. externo', prov: 'Hidro Servicios', costo: 2700, estado: 'resuelto', com: 'lago', fecha: 'Hace 3 días' },
];
const TICKET_ESTADOS = [
  { k: 'nuevo', label: 'Nuevo', badge: 'slate' },
  { k: 'revision', label: 'En revisión', badge: 'sky' },
  { k: 'programado', label: 'Programado', badge: 'amber' },
  { k: 'proceso', label: 'En proceso', badge: 'peach' },
  { k: 'resuelto', label: 'Resuelto', badge: 'green' },
];
const PREVENTIVO = [
  { titulo: 'Lavado de cisternas', prox: '12 Jun 2026', com: 'Torre Cedro', icon: 'Droplet', estado: 'Programado' },
  { titulo: 'Mantenimiento elevadores', prox: '18 Jun 2026', com: 'Torre Cedro', icon: 'Elevator', estado: 'Programado' },
  { titulo: 'Fumigación áreas comunes', prox: '24 Jun 2026', com: 'Ambas', icon: 'Leaf', estado: 'Por agendar' },
];

// Albercas
const POOLS = [
  { id: 'ALB-CC', nombre: 'Alberca Casa Club', com: 'Privada Lago Azul', estado: 'optima', ph: 7.4, cloro: 1.8, alc: 110, ultima: 'Hoy · 07:30', prox: '01 Jun 2026', prov: 'AquaClean', costo: 4800, temp: 27 },
  { id: 'ALB-N', nombre: 'Alberca Norte', com: 'Privada Lago Azul', estado: 'atencion', ph: 7.9, cloro: 0.6, alc: 95, ultima: 'Ayer · 08:10', prox: '31 May 2026', prov: 'AquaClean', costo: 3600, temp: 26 },
  { id: 'ALB-S', nombre: 'Alberca Sur', com: 'Privada Lago Azul', estado: 'fuera', ph: 0, cloro: 0, alc: 0, ultima: '24 May · 09:00', prox: 'Suspendido', prov: 'AquaClean', costo: 3600, temp: 0 },
];
const POOL_LOG = [
  { fecha: 'Hoy · 07:30', accion: 'Lectura química + cloración', quien: 'AquaClean', ph: 7.4, cloro: 1.8, tone: 'green' },
  { fecha: 'Ayer · 07:45', accion: 'Limpieza de fondo y skimmers', quien: 'AquaClean', ph: 7.5, cloro: 1.6, tone: 'teal' },
  { fecha: '28 May · 08:00', accion: 'Ajuste de pH (ácido)', quien: 'AquaClean', ph: 7.8, cloro: 1.2, tone: 'amber' },
  { fecha: '27 May · 07:30', accion: 'Lectura química', quien: 'AquaClean', ph: 7.6, cloro: 1.5, tone: 'teal' },
];

// Amenidades
const AMENITIES = [
  { id: 'salon', nombre: 'Salón de eventos', icon: 'Sofa', com: 'Torre Cedro', deposito: 2000, regla: 'Máx. 50 personas · hasta 23:00' },
  { id: 'palapa', nombre: 'Palapa', icon: 'Sun', com: 'Privada Lago Azul', deposito: 800, regla: 'Máx. 30 personas · hasta 22:00' },
  { id: 'gym', nombre: 'Gimnasio', icon: 'Dumbbell', com: 'Torre Cedro', deposito: 0, regla: 'Aforo 8 · 05:00–23:00' },
  { id: 'cancha', nombre: 'Cancha múltiple', icon: 'Briefcase', com: 'Privada Lago Azul', deposito: 0, regla: 'Bloques de 1 h' },
  { id: 'albercac', nombre: 'Alberca común', icon: 'Waves', com: 'Privada Lago Azul', deposito: 0, regla: 'Aforo 25 · 08:00–20:00' },
];
const RESERVAS = [
  { amenidad: 'Salón de eventos', unidad: 'A-512', dia: 'Sáb 31 May', hora: '18:00–23:00', estado: 'aprobada', deposito: 2000 },
  { amenidad: 'Palapa', unidad: 'Casa 14', dia: 'Dom 1 Jun', hora: '13:00–18:00', estado: 'pendiente', deposito: 800 },
  { amenidad: 'Gimnasio', unidad: 'B-806', dia: 'Lun 2 Jun', hora: '07:00–08:00', estado: 'aprobada', deposito: 0 },
  { amenidad: 'Cancha múltiple', unidad: 'Casa 71', dia: 'Mié 4 Jun', hora: '19:00–20:00', estado: 'pendiente', deposito: 0 },
];

// Comunicados
const COMUNICADOS = [
  { titulo: 'Corte de agua programado · martes', seg: 'Torre Cedro', fecha: 'Hoy', leido: 72, total: 96, prioridad: 'alta', estado: 'enviado' },
  { titulo: 'Asamblea ordinaria · resultados', seg: 'Todos', fecha: 'Hace 2 días', leido: 148, total: 174, prioridad: 'media', estado: 'enviado' },
  { titulo: 'Recordatorio de pago · mayo', seg: 'Morosos', fecha: 'Hace 3 días', leido: 11, total: 14, prioridad: 'media', estado: 'enviado' },
  { titulo: 'Mantenimiento de albercas · junio', seg: 'Privada Lago Azul', fecha: 'Hace 5 días', leido: 61, total: 78, prioridad: 'baja', estado: 'enviado' },
];
const DOCUMENTOS = [
  { nombre: 'Reglamento interno 2026', tipo: 'Reglamento', peso: '1.2 MB', fecha: '12 Ene 2026', icon: 'FileText' },
  { nombre: 'Acta asamblea · abril', tipo: 'Acta', peso: '480 KB', fecha: '28 Abr 2026', icon: 'FileText' },
  { nombre: 'Presupuesto anual 2026', tipo: 'Presupuesto', peso: '2.1 MB', fecha: '05 Ene 2026', icon: 'Sheet' },
  { nombre: 'Estado financiero · abril', tipo: 'Finanzas', peso: '760 KB', fecha: '03 May 2026', icon: 'ChartPie' },
  { nombre: 'Contrato AquaClean', tipo: 'Proveedor', peso: '320 KB', fecha: '15 Feb 2026', icon: 'Briefcase' },
];

// Accesos / visitantes
const VISITAS = [
  { qr: 'ACC-7741', nombre: 'Visita familiar', unidad: 'A-204', tipo: 'Visitante', vence: 'Hoy · 22:00', placa: 'JAL-12-•••', estado: 'autorizado' },
  { qr: 'ACC-7738', nombre: 'Paqueteria Central', unidad: 'Casa 14', tipo: 'Proveedor', vence: 'Hoy · 14:00', placa: '—', estado: 'usado' },
  { qr: 'ACC-7735', nombre: 'AquaClean', unidad: 'Áreas comunes', tipo: 'Proveedor', vence: 'Hoy · 12:00', placa: 'JAL-88-•••', estado: 'usado' },
  { qr: 'ACC-7730', nombre: 'Visita evento', unidad: 'A-512', tipo: 'Visitante', vence: 'Ayer · 23:00', placa: 'JAL-44-•••', estado: 'expirado' },
  { qr: 'ACC-7728', nombre: 'Invitado', unidad: 'Casa 58', tipo: 'Visitante', vence: 'Hoy · 20:00', placa: '—', estado: 'autorizado' },
  { qr: 'ACC-7725', nombre: 'Mensajeria Express', unidad: 'B-1102', tipo: 'Proveedor', vence: 'Ayer · 18:00', placa: '—', estado: 'cancelado' },
];
const BITACORA = [
  { hora: '13:42', evento: 'Entrada peatonal', detalle: 'ACC-7741 · A-204', tone: 'green' },
  { hora: '12:08', evento: 'Entrada vehicular', detalle: 'AquaClean · JAL-88-•••', tone: 'teal' },
  { hora: '11:30', evento: 'Salida vehicular', detalle: 'Paqueteria Central', tone: 'slate' },
  { hora: '09:15', evento: 'Acceso denegado', detalle: 'Código expirado · ACC-7730', tone: 'red' },
];

// Reportes — egresos por categoría
const EGRESOS = [
  { cat: 'Mantenimiento', monto: 64200, pct: 32, color: '#0E8C6F' },
  { cat: 'Vigilancia', monto: 52800, pct: 27, color: '#229F83' },
  { cat: 'Limpieza', monto: 31600, pct: 16, color: '#57BFA4' },
  { cat: 'Albercas', monto: 22400, pct: 11, color: '#1E81E5' },
  { cat: 'Jardinería', monto: 16800, pct: 8, color: '#C68A0E' },
  { cat: 'Administración', monto: 10600, pct: 6, color: '#94A3B8' },
];
const FLUJO = [
  { mes: 'Dic', cobrado: 248, pendiente: 41 }, { mes: 'Ene', cobrado: 262, pendiente: 38 },
  { mes: 'Feb', cobrado: 255, pendiente: 52 }, { mes: 'Mar', cobrado: 271, pendiente: 44 },
  { mes: 'Abr', cobrado: 278, pendiente: 49 }, { mes: 'May', cobrado: 284, pendiente: 68 },
];
const PROVEEDORES = [
  { nombre: 'Elevadores Altura S.A.', cat: 'Elevadores', monto: 18900, pct: 100 },
  { nombre: 'SegTotal', cat: 'Vigilancia', monto: 52800, pct: 100 },
  { nombre: 'AquaClean', cat: 'Albercas', monto: 12000, pct: 64 },
  { nombre: 'Verde Vivo', cat: 'Jardinería', monto: 9600, pct: 51 },
  { nombre: 'Hidro Servicios', cat: 'Plomería', monto: 6500, pct: 34 },
];
const MOROSIDAD_ANT = [
  { rango: '1–30 días', unidades: 6, monto: 14200, color: 'amber' },
  { rango: '31–60 días', unidades: 5, monto: 28600, color: 'peach' },
  { rango: '61–90 días', unidades: 2, monto: 16400, color: 'red' },
  { rango: '+90 días', unidades: 1, monto: 8600, color: 'red' },
];

// Pagos recientes (cobranza)
const PAGOS_RECIENTES = [
  { fecha: 'Hoy', unit: 'A-512', concepto: 'Cuota ordinaria mayo', monto: 4200, metodo: 'Transferencia', estado: 'validado' },
  { fecha: 'Hoy', unit: 'Casa 09', concepto: 'Cuota ordinaria mayo', monto: 2100, metodo: 'Transferencia', estado: 'validado' },
  { fecha: 'Ayer', unit: 'B-806', concepto: 'Cuota + extraordinaria', monto: 3600, metodo: 'Depósito', estado: 'validado' },
  { fecha: 'Ayer', unit: 'Casa 71', concepto: 'Cuota ordinaria mayo', monto: 2100, metodo: 'Transferencia', estado: 'validado' },
  { fecha: '27 May', unit: 'A-204', concepto: 'Abono parcial', monto: 2100, metodo: 'Efectivo', estado: 'validado' },
];

const ACTIVIDAD = [
  { txt: '<b>Comite Condo</b> aprobó el pago PV-0088 de Casa 58', time: 'Hace 12 min', icon: 'CheckCircle', tone: 'green' },
  { txt: 'Nuevo comprobante por validar de <b>A-204</b> · $4,200', time: 'Hace 38 min', icon: 'Wallet', tone: 'teal' },
  { txt: 'Ticket <b>MT-318</b> pasó a <b>En proceso</b>', time: 'Hace 1 h', icon: 'Wrench', tone: 'peach' },
  { txt: 'Alberca Norte marcada como <b>Requiere atención</b>', time: 'Hace 2 h', icon: 'Waves', tone: 'amber' },
  { txt: 'Comunicado <b>Corte de agua</b> enviado a Torre Cedro', time: 'Hace 3 h', icon: 'Megaphone', tone: 'sky' },
];

const RES_RECIBOS = [
  { mes: 'Mayo 2026', monto: 2100, estado: 'pendiente' },
  { mes: 'Abril 2026', monto: 2100, estado: 'pagado' },
  { mes: 'Marzo 2026', monto: 2100, estado: 'pagado' },
  { mes: 'Febrero 2026', monto: 2100, estado: 'pagado' },
];

export const formatCurrencyMXN = fmtMXN;

export const mockData = {
  fmtMXN, COMMUNITIES, KPIS, UNITS, STATEMENT, PAGOS_VALIDAR, TICKETS, TICKET_ESTADOS,
  PREVENTIVO, POOLS, POOL_LOG, AMENITIES, RESERVAS, COMUNICADOS, DOCUMENTOS, VISITAS,
  BITACORA, EGRESOS, FLUJO, PROVEEDORES, MOROSIDAD_ANT, PAGOS_RECIENTES, ACTIVIDAD, RES_RECIBOS,
};

export {
  fmtMXN, COMMUNITIES, KPIS, UNITS, STATEMENT, PAGOS_VALIDAR, TICKETS, TICKET_ESTADOS,
  PREVENTIVO, POOLS, POOL_LOG, AMENITIES, RESERVAS, COMUNICADOS, DOCUMENTOS, VISITAS,
  BITACORA, EGRESOS, FLUJO, PROVEEDORES, MOROSIDAD_ANT, PAGOS_RECIENTES, ACTIVIDAD, RES_RECIBOS,
};

export default mockData;


