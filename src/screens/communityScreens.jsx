import React, { useState as useState3 } from "react";
import * as D3 from "../data/mockData.js";
import { PageHeader as PH3, Card as C3, Badge as B3, Ic as I3, Avatar as AV3 } from "../components/ui.jsx";

const { createElement: se3 } = React;
const PRIO_BADGE = { alta: 'red', media: 'amber', baja: 'teal' };

// ============ MANTENIMIENTO ============
function Mantenimiento({ tenant, showToast }) {
  const [vista, setVista] = useState3('tablero');
  let tickets = D3.TICKETS.filter(t => tenant === 'all' || t.com === tenant);
  const byEstado = (k) => tickets.filter(t => t.estado === k);

  const ticketCard = (t) => se3('button', { key: t.id, type: 'button', className: 'ticket', 'aria-label': `Abrir ticket ${t.id}`, onClick: () => showToast('Ticket abierto ' + t.id) },
    se3('div', { className: `prio-bar prio-bar--${t.prio}` }),
    se3('div', { className: 'ticket__top' }, se3('span', { className: 'ticket__id' }, t.id), se3('span', { className: 'row', style: { gap: 5, fontSize: 11.5 } }, se3(I3, { name: t.icon, size: 13, color: 'var(--text-muted)' }), t.cat)),
    se3('div', { className: 'ticket__title' }, t.titulo),
    se3('div', { className: 'ticket__foot' },
      se3('span', { className: `badge badge--${PRIO_BADGE[t.prio]}` }, t.prio === 'alta' ? 'Alta' : t.prio === 'media' ? 'Media' : 'Baja'),
      t.costo > 0 ? se3('span', { className: 'money', style: { fontSize: 12 } }, D3.fmtMXN(t.costo)) : se3('span', { className: 'subtle', style: { fontSize: 11.5 } }, 'Sin costo'),
    ),
    se3('div', { className: 'row', style: { gap: 7, paddingTop: 8, borderTop: '1px solid var(--border)' } },
      se3(AV3, { name: t.resp, size: 'sm', tone: 'slate' }), se3('span', { className: 'muted', style: { fontSize: 11.5 } }, t.resp),
    ),
  );

  return se3('main', { className: 'page fade-in' },
    se3(PH3, { route: 'mantenimiento', actions: [
      se3('div', { key: 0, className: 'seg' },
        se3('button', { className: 'seg__btn' + (vista === 'tablero' ? ' seg__btn--active' : ''), onClick: () => setVista('tablero') }, se3(I3, { name: 'Columns', size: 15 }), 'Tablero'),
        se3('button', { className: 'seg__btn' + (vista === 'tabla' ? ' seg__btn--active' : ''), onClick: () => setVista('tabla') }, se3(I3, { name: 'List', size: 15 }), 'Tabla'),
      ),
      se3('button', { key: 1, className: 'btn btn--primary', onClick: () => showToast('Ticket creado') }, se3(I3, { name: 'Plus', size: 16 }), 'Nuevo ticket'),
    ] }),

    // Preventivo destacado
    se3('div', { className: 'card', style: { background: 'linear-gradient(120deg, var(--teal-50), var(--surface) 60%)', borderColor: 'var(--teal-100)' } },
      se3('div', { className: 'card__body', style: { display: 'grid', gridTemplateColumns: '1fr', gap: 14 } },
        se3('div', { className: 'row row--between row--wrap' },
          se3('div', { className: 'row', style: { gap: 12 } }, se3('span', { className: 'icon-chip icon-chip--lg icon-chip--teal' }, se3(I3, { name: 'ShieldCheck', size: 22 })),
            se3('div', null, se3('div', { className: 'fw-700', style: { fontSize: 15 } }, 'Mantenimiento preventivo'), se3('div', { className: 'muted', style: { fontSize: 13 } }, 'Adelántate a las fallas · próximos servicios programados'))),
          se3('button', { className: 'btn btn--soft btn--sm' }, se3(I3, { name: 'Calendar', size: 15 }), 'Agendar servicio'),
        ),
        se3('div', { className: 'preventive-grid' },
          D3.PREVENTIVO.map((p, i) => se3('div', { key: i, style: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, display: 'flex', gap: 11, alignItems: 'center' } },
            se3('span', { className: 'icon-chip icon-chip--teal' }, se3(I3, { name: p.icon, size: 17 })),
            se3('div', null, se3('div', { className: 'fw-600', style: { fontSize: 13 } }, p.titulo), se3('div', { className: 'muted', style: { fontSize: 12, marginTop: 1 } }, `${p.prox} · ${p.com}`)),
          )),
        ),
      ),
    ),

    vista === 'tablero'
      ? se3('div', { className: 'board' }, D3.TICKET_ESTADOS.map(es => se3('div', { key: es.k, className: 'board__col' },
          se3('div', { className: 'board__col-head' },
            se3('span', { className: 'board__col-title' }, se3('span', { style: { width: 8, height: 8, borderRadius: 2, background: `var(--${es.badge === 'green' ? 'green-600' : es.badge === 'slate' ? 'slate-600' : es.badge === 'sky' ? 'sky-600' : es.badge === 'amber' ? 'amber-600' : 'peach-600'})` } }), es.label),
            se3('span', { className: 'board__col-count' }, byEstado(es.k).length),
          ),
          byEstado(es.k).map(ticketCard),
          byEstado(es.k).length === 0 && se3('div', { className: 'subtle', style: { fontSize: 12, textAlign: 'center', padding: '20px 0' } }, 'Sin tickets'),
        )))
      : se3('div', { className: 'card', body: false },
          se3('div', { className: 'table-wrap' }, se3('table', { className: 'tbl' },
            se3('thead', null, se3('tr', null, ['Folio', 'Asunto', 'Categoría', 'Prioridad', 'Responsable', 'Proveedor', 'Costo est.', 'Estado'].map((t, i) => se3('th', { key: i, className: t === 'Costo est.' ? 'num' : '' }, t)))),
            se3('tbody', null, tickets.map((t, i) => se3('tr', { key: i, className: 'clickable', onClick: () => showToast('Ticket abierto ' + t.id) },
              se3('td', null, se3('span', { className: 'mono muted' }, t.id)),
              se3('td', null, se3('span', { className: 'cell-main', style: { fontSize: 13 } }, t.titulo)),
              se3('td', null, se3('span', { className: 'row', style: { gap: 6 } }, se3(I3, { name: t.icon, size: 14, color: 'var(--text-muted)' }), t.cat)),
              se3('td', null, se3(B3, { tone: PRIO_BADGE[t.prio], dot: true }, t.prio[0].toUpperCase() + t.prio.slice(1))),
              se3('td', null, t.resp),
              se3('td', { className: 'muted' }, t.prov),
              se3('td', { className: 'num' }, t.costo > 0 ? se3('span', { className: 'money' }, D3.fmtMXN(t.costo)) : se3('span', { className: 'subtle' }, '—')),
              se3('td', null, se3(B3, { tone: D3.TICKET_ESTADOS.find(e => e.k === t.estado).badge }, D3.TICKET_ESTADOS.find(e => e.k === t.estado).label)),
            ))),
          )),
        ),
  );
}

// ============ ALBERCAS ============
const POOL_ESTADO = { optima: { tone: 'green', label: 'Óptima' }, atencion: { tone: 'amber', label: 'Requiere atención' }, fuera: { tone: 'red', label: 'Fuera de servicio' } };
function gauge(label, val, unit, min, max, okLow, okHigh) {
  const pct = val <= 0 ? 0 : Math.max(3, Math.min(97, (val - min) / (max - min) * 100));
  const zL = (okLow - min) / (max - min) * 100, zH = (okHigh - min) / (max - min) * 100;
  const inRange = val >= okLow && val <= okHigh;
  return se3('div', { className: 'gauge' },
    se3('div', { className: 'gauge__head' }, se3('span', { className: 'gauge__label' }, label), se3('span', { className: 'gauge__val', style: { color: val <= 0 ? 'var(--text-subtle)' : inRange ? 'var(--green-700)' : 'var(--amber-700)' } }, val <= 0 ? '—' : val + (unit || ''))),
    se3('div', { className: 'gauge__bar' }, se3('span', { className: 'gauge__zone', style: { left: zL + '%', width: (zH - zL) + '%' } }), val > 0 && se3('span', { className: 'gauge__pin', style: { left: pct + '%' } })),
    se3('div', { className: 'gauge__range' }, se3('span', null, min), se3('span', { style: { color: 'var(--green-700)' } }, `${okLow}–${okHigh} ideal`), se3('span', null, max)),
  );
}

function Albercas({ showToast }) {
  const [sel, setSel] = useState3(D3.POOLS[0].id);
  const pool = D3.POOLS.find(p => p.id === sel);
  const totalCosto = D3.POOLS.reduce((s, p) => s + p.costo, 0);

  return se3('main', { className: 'page fade-in' },
    se3(PH3, { route: 'albercas', actions: [
      se3('span', { key: 0, className: 'status-tag', style: { alignSelf: 'center' } }, 'Control químico'),
      se3('button', { key: 1, className: 'btn btn--secondary', onClick: () => showToast('Bitácora exportada') }, se3(I3, { name: 'Download', size: 16 }), 'Bitácora PDF'),
      se3('button', { key: 2, className: 'btn btn--primary', onClick: () => showToast('Lectura química registrada') }, se3(I3, { name: 'Plus', size: 16 }), 'Registrar lectura'),
    ] }),

    // Pool selector cards
    se3('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 16 } },
      D3.POOLS.map(p => se3('button', { key: p.id, className: 'card', onClick: () => setSel(p.id),
        style: { textAlign: 'left', padding: 0, cursor: 'pointer', borderColor: sel === p.id ? 'var(--teal-300)' : 'var(--border)', boxShadow: sel === p.id ? '0 0 0 3px var(--teal-50)' : 'var(--shadow-xs)' } },
        se3('div', { className: 'card__body', style: { display: 'flex', flexDirection: 'column', gap: 10 } },
          se3('div', { className: 'row row--between' },
            se3('span', { className: `icon-chip icon-chip--lg ${p.estado === 'fuera' ? 'icon-chip--red' : p.estado === 'atencion' ? 'icon-chip--amber' : 'icon-chip--sky'}` }, se3(I3, { name: 'Waves', size: 21 })),
            se3(B3, { tone: POOL_ESTADO[p.estado].tone, dot: true }, POOL_ESTADO[p.estado].label),
          ),
          se3('div', null, se3('div', { className: 'fw-700', style: { fontSize: 14.5 } }, p.nombre), se3('div', { className: 'muted', style: { fontSize: 12 } }, p.com)),
          se3('div', { className: 'row', style: { gap: 14, fontSize: 12 } },
            se3('span', { className: 'muted' }, 'pH ', se3('b', { style: { color: 'var(--text)' } }, p.ph || '—')),
            se3('span', { className: 'muted' }, 'Cloro ', se3('b', { style: { color: 'var(--text)' } }, p.cloro || '—')),
            p.temp > 0 && se3('span', { className: 'muted' }, p.temp + '°C'),
          ),
        ),
      )),
    ),

    se3('div', { className: 'grid-main' },
      // LEFT — detail of selected pool
      se3('div', { className: 'stack' },
        se3(C3, { title: `Lectura química · ${pool.nombre}`, icon: 'Droplet', iconTone: pool.estado === 'fuera' ? 'red' : 'sky',
          headerRight: se3(B3, { tone: POOL_ESTADO[pool.estado].tone, dot: true }, POOL_ESTADO[pool.estado].label) },
          pool.estado === 'fuera'
            ? se3('div', { className: 'banner banner--amber' }, se3('span', { className: 'banner__icon' }, se3(I3, { name: 'AlertTriangle', size: 17 })), se3('div', null, se3('div', { className: 'banner__title' }, 'Fuera de servicio'), 'Bomba detenida desde el 24 de mayo. Lecturas suspendidas hasta reparación (ticket MT-316).'))
            : se3('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22 } },
                gauge('pH', pool.ph, '', 6.5, 8.5, 7.2, 7.6),
                gauge('Cloro libre', pool.cloro, ' ppm', 0, 3, 1.0, 2.0),
                gauge('Alcalinidad', pool.alc, ' ppm', 60, 140, 80, 120),
              ),
        ),
        se3(C3, { title: 'Bitácora de servicio', icon: 'FileText', body: false,
          headerRight: se3('button', { className: 'card__link' }, 'Ver completa') },
          se3('div', { style: { padding: '6px 20px 14px' } }, se3('div', { className: 'timeline', style: { marginTop: 8 } }, D3.POOL_LOG.map((l, i) => se3('div', { key: i, className: 'tl-item' },
            se3('span', { className: `tl-dot tl-dot--${l.tone}` }, se3(I3, { name: 'Droplet', size: 15 })),
            se3('div', { className: 'tl-body' },
              se3('div', { className: 'tl-title' }, l.accion, se3('span', { className: 'muted', style: { fontWeight: 500, fontSize: 12 } }, l.fecha)),
              se3('div', { className: 'tl-meta' }, `${l.quien} · pH ${l.ph} · cloro ${l.cloro} ppm`),
            ),
          )))),
        ),
        se3(C3, { title: 'Evidencia fotográfica', icon: 'Image',
          headerRight: se3('button', { className: 'card__link', onClick: () => showToast('Foto adjuntada') }, se3(I3, { name: 'Plus', size: 14 }), 'Subir') },
          se3('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 } },
            ['Antes', 'Después', 'Filtros', 'Equipo'].map((f, i) => se3('div', { key: i, style: { display: 'flex', flexDirection: 'column', gap: 6 } },
              se3('div', { className: 'ph', style: { height: 90 } }, se3(I3, { name: 'Image', size: 20 })),
              se3('div', { style: { fontSize: 11, fontWeight: 600, textAlign: 'center', color: 'var(--text-muted)' } }, f),
            )),
          ),
        ),
      ),

      // RIGHT
      se3('div', { className: 'stack' },
        se3(C3, { title: 'Ficha de la alberca', icon: 'Info' },
          se3('div', { className: 'kv-list' },
            se3('div', { className: 'kv-row' }, se3('span', { className: 'kv-row__k' }, 'Última limpieza'), se3('span', { className: 'kv-row__v' }, pool.ultima)),
            se3('div', { className: 'kv-row' }, se3('span', { className: 'kv-row__k' }, 'Próximo servicio'), se3('span', { className: 'kv-row__v' }, pool.estado === 'fuera' ? se3('span', { className: 'badge badge--red' }, 'Suspendido') : pool.prox)),
            se3('div', { className: 'kv-row' }, se3('span', { className: 'kv-row__k' }, 'Proveedor'), se3('span', { className: 'kv-row__v' }, pool.prov)),
            se3('div', { className: 'kv-row' }, se3('span', { className: 'kv-row__k' }, 'Costo mensual'), se3('span', { className: 'kv-row__v money' }, D3.fmtMXN(pool.costo))),
            se3('div', { className: 'kv-row' }, se3('span', { className: 'kv-row__k' }, 'Temperatura'), se3('span', { className: 'kv-row__v' }, pool.temp > 0 ? pool.temp + ' °C' : '—')),
          ),
        ),
        se3(C3, { title: 'Incidencias abiertas', icon: 'AlertTriangle', iconTone: 'amber' },
          pool.estado === 'optima'
            ? se3('div', { className: 'empty', style: { padding: '24px 12px' } }, se3('span', { className: 'empty__icon', style: { width: 44, height: 44 } }, se3(I3, { name: 'CheckCircle', size: 20 })), se3('div', { className: 'empty__title', style: { fontSize: 13.5 } }, 'Sin incidencias'), se3('div', { className: 'empty__text', style: { fontSize: 12 } }, 'Todo en parámetros normales.'))
            : se3('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
                se3('div', { className: 'row', style: { gap: 11, padding: 12, background: 'var(--surface-2)', borderRadius: 11 } },
                  se3('span', { className: `icon-chip ${pool.estado === 'fuera' ? 'icon-chip--red' : 'icon-chip--amber'}` }, se3(I3, { name: 'Wrench', size: 16 })),
                  se3('div', null, se3('div', { className: 'fw-600', style: { fontSize: 13 } }, pool.estado === 'fuera' ? 'Bomba detenida' : 'Cloro por debajo del rango'), se3('div', { className: 'muted', style: { fontSize: 12 } }, pool.estado === 'fuera' ? 'MT-316 · proveedor en revisión' : 'Cloración programada para hoy')),
                )),
        ),
        se3(C3, { title: 'Costo total albercas', icon: 'Coins' },
          se3('div', { style: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' } }, D3.fmtMXN(totalCosto)),
          se3('div', { className: 'muted', style: { fontSize: 12.5, marginTop: 4 } }, '3 albercas · Privada Lago Azul · mensual'),
        ),
      ),
    ),
  );
}

// ============ AMENIDADES ============
const RES_ESTADO = { aprobada: { tone: 'green', label: 'Aprobada' }, pendiente: { tone: 'amber', label: 'Pendiente' } };
function Amenidades({ showToast }) {
  const [vista, setVista] = useState3('admin');
  const week = ['Lun 26', 'Mar 27', 'Mié 28', 'Jue 29', 'Vie 30', 'Sáb 31', 'Dom 1'];
  const cal = { 5: [['Salón', 'teal']], 6: [['Palapa', 'amber'], ['Alberca', 'sky']], 1: [['Gimnasio', 'green']], 3: [['Cancha', 'teal']] };

  return se3('main', { className: 'page fade-in' },
    se3(PH3, { route: 'amenidades', actions: [
      se3('div', { key: 0, className: 'seg' },
        se3('button', { className: 'seg__btn' + (vista === 'admin' ? ' seg__btn--active' : ''), onClick: () => setVista('admin') }, 'Administrador'),
        se3('button', { className: 'seg__btn' + (vista === 'residente' ? ' seg__btn--active' : ''), onClick: () => setVista('residente') }, 'Residente'),
      ),
      se3('button', { key: 1, className: 'btn btn--primary', onClick: () => showToast('Reserva preparada') }, se3(I3, { name: 'Plus', size: 16 }), 'Nueva reserva'),
    ] }),

    vista === 'residente'
      ? se3('div', { className: 'card', style: { maxWidth: 560 } }, se3('div', { className: 'card__body', style: { display: 'flex', flexDirection: 'column', gap: 14 } },
          se3('div', { className: 'fw-700', style: { fontSize: 16 } }, 'Reservar amenidad'),
          se3('div', { className: 'muted', style: { fontSize: 13, marginTop: -8 } }, 'Vista simplificada para residentes · sujeta a aprobación del administrador.'),
          se3('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } }, D3.AMENITIES.slice(0, 4).map((a, i) =>
            se3('button', { key: i, className: 'card', style: { padding: 14, display: 'flex', gap: 11, alignItems: 'center', textAlign: 'left' }, onClick: () => showToast('Reserva preparada para ' + a.nombre) },
              se3('span', { className: 'icon-chip icon-chip--lg icon-chip--teal' }, se3(I3, { name: a.icon, size: 20 })),
              se3('div', null, se3('div', { className: 'fw-600', style: { fontSize: 13.5 } }, a.nombre), se3('div', { className: 'muted', style: { fontSize: 11.5 } }, a.deposito > 0 ? 'Depósito ' + D3.fmtMXN(a.deposito) : 'Sin depósito')),
            ))),
          se3('div', { className: 'banner banner--teal', style: { fontSize: 12.5 } }, se3('span', { className: 'banner__icon' }, se3(I3, { name: 'Info', size: 15 })), 'Tu reserva quedará en estado “Pendiente” hasta que el administrador la apruebe.'),
        ))
      : se3(React.Fragment, null,
          se3('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 14 } },
            D3.AMENITIES.map((a, i) => se3('div', { key: i, className: 'card' }, se3('div', { className: 'card__body', style: { display: 'flex', flexDirection: 'column', gap: 9 } },
              se3('span', { className: 'icon-chip icon-chip--lg icon-chip--teal' }, se3(I3, { name: a.icon, size: 20 })),
              se3('div', null, se3('div', { className: 'fw-700', style: { fontSize: 14 } }, a.nombre), se3('div', { className: 'muted', style: { fontSize: 11.5 } }, a.com)),
              se3('div', { className: 'muted', style: { fontSize: 11.5, lineHeight: 1.4 } }, a.regla),
              se3('div', { className: 'row row--between', style: { paddingTop: 8, borderTop: '1px solid var(--border)' } },
                a.deposito > 0 ? se3('span', { className: 'badge badge--ghost' }, 'Depósito ' + D3.fmtMXN(a.deposito)) : se3('span', { className: 'subtle', style: { fontSize: 12 } }, 'Sin depósito'),
              ),
            ))),
          ),
          se3('div', { className: 'grid-main' },
            se3(C3, { title: 'Calendario semanal', sub: '26 May – 1 Jun 2026', icon: 'Calendar', body: false },
              se3('div', { style: { padding: 16 } }, se3('div', { className: 'calendar' },
                week.map((w, i) => se3('div', { key: 'h' + i, className: 'calendar__weekday' }, w)),
                week.map((w, i) => se3('div', { key: 'd' + i, className: 'calendar__day' + (i === 4 ? ' calendar__day--today' : '') },
                  se3('div', { className: 'calendar__day-num' }, w.split(' ')[1]),
                  (cal[i] || []).map((ev, j) => se3('div', { key: j, className: `calendar__ev calendar__ev--${ev[1]}` }, ev[0])),
                )),
              )),
            ),
            se3(C3, { title: 'Reservas por aprobar', icon: 'CalendarCheck', body: false,
              headerRight: se3('span', { className: 'badge badge--amber' }, '2 pendientes') },
              se3('div', { style: { padding: '6px 8px' } }, D3.RESERVAS.map((r, i) => se3('div', { key: i, style: { padding: '12px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' } },
                se3('div', { className: 'row row--between', style: { marginBottom: 4 } }, se3('span', { className: 'fw-600', style: { fontSize: 13 } }, r.amenidad), se3(B3, { tone: RES_ESTADO[r.estado].tone, dot: true }, RES_ESTADO[r.estado].label)),
                se3('div', { className: 'muted', style: { fontSize: 12 } }, `${r.unidad} · ${r.dia} · ${r.hora}`),
                r.estado === 'pendiente' && se3('div', { className: 'row', style: { gap: 6, marginTop: 8 } },
                  se3('button', { className: 'btn btn--soft btn--sm', onClick: () => showToast('Reserva aprobada') }, se3(I3, { name: 'Check', size: 14 }), 'Aprobar'),
                  se3('button', { className: 'btn btn--ghost btn--sm', onClick: () => showToast('Reserva rechazada') }, 'Rechazar'),
                ),
              ))),
            ),
          ),
        ),
  );
}

export { Mantenimiento as MaintenanceScreen, Albercas as PoolsScreen, Amenidades as AmenitiesScreen };




