import React, { useState as useState1 } from "react";
import * as D1 from "../data/mockData.js";
import * as U1 from "../components/ui.jsx";

const { createElement: se1 } = React;
const { PageHeader: PH, Card: C1, Badge: B1, Ic: I1, Money: M1, Spark: SP, Avatar: AV1, ESTADO_BADGE: EB } = U1;

// ============ INICIO / DASHBOARD ============
function Inicio({ setRoute, setDetail, showToast }) {
  const k = D1.KPIS;
  const kebab = se1('button', { className: 'kebab kpi__menu', 'aria-label': 'Más opciones', onClick: (ev) => ev.stopPropagation() }, se1(I1, { name: 'MoreVertical', size: 16 }));
  const kpi = (label, value, icon, mod, deltaType, deltaText) => se1('div', { className: 'kpi' + (mod ? ` kpi--${mod}` : '') },
    se1('div', { className: 'kpi__head' },
      se1('span', { className: 'kpi__icon' }, se1(I1, { name: icon, size: 19 })),
      se1('span', { className: 'kpi__label' }, label),
      kebab,
    ),
    se1('div', { className: 'kpi__value' }, value),
    se1('div', { className: 'kpi__bottom' },
      se1('span', { className: `kpi__delta kpi__delta--${deltaType}` }, se1(I1, { name: deltaType === 'up' ? 'ArrowUp' : deltaType === 'down' ? 'ArrowDown' : 'Minus', size: 12 }), deltaText),
      se1('span', { className: 'kpi__sub' }, 'vs. mes anterior'),
    ),
  );

  // chart
  const maxF = Math.max(...D1.FLUJO.map(f => f.cobrado));
  const tallIdx = D1.FLUJO.length - 1;

  return se1('main', { className: 'page fade-in' },
    // Welcome header
    se1('div', { className: 'page-header__row', style: { alignItems: 'flex-start' } },
      se1('div', null,
        se1('h1', { className: 'welcome-h1' }, 'Bienvenido, Admin Condo'),
        se1('p', { className: 'muted', style: { margin: '8px 0 0', fontSize: 14.5 } }, 'Esto es lo que necesita atención hoy en tus comunidades.'),
      ),
      se1('div', { className: 'page-header__actions' },
        se1('span', { className: 'date-pill' }, se1(I1, { name: 'Calendar', size: 16, color: 'var(--text-muted)' }), 'Vie, 30 May 2026'),
        se1('button', { className: 'btn btn--dark', onClick: () => showToast('Resumen exportado') }, se1(I1, { name: 'Download', size: 16 }), 'Exportar'),
      ),
    ),

    se1('div', { className: 'dash-grid' },
      // LEFT COLUMN
      se1('div', { className: 'stack' },
        // Hero cobranza
        se1('div', { className: 'hero' },
          se1('div', { className: 'row row--between' },
            se1('div', { className: 'card__title' }, se1('span', { className: 'icon-chip icon-chip--teal', style: { width: 38, height: 38 } }, se1(I1, { name: 'Coins', size: 19 })), 'Cobranza de mayo'),
            se1('div', { className: 'row', style: { gap: 8 } }, se1('span', { className: 'hero__chip' }, 'MXN ', se1(I1, { name: 'ChevronDown', size: 13 })), kebab),
          ),
          se1('div', { className: 'hero__value' }, D1.fmtMXN(k.cobrado)),
          se1('div', { className: 'row', style: { gap: 9, marginTop: 12 } },
            se1('span', { className: 'kpi__delta kpi__delta--up' }, se1(I1, { name: 'ArrowUp', size: 12 }), '+6.4%'),
            se1('span', { className: 'kpi__sub' }, '81% de lo esperado este mes'),
          ),
          se1('div', { className: 'row', style: { gap: 10, marginTop: 18 } },
            se1('button', { className: 'btn btn--primary', style: { flex: 1 }, onClick: () => setRoute('cobranza') }, se1(I1, { name: 'Coins', size: 16 }), 'Generar cuotas'),
            se1('button', { className: 'btn btn--secondary', style: { flex: 1 }, onClick: () => showToast('Recordatorios enviados') }, se1(I1, { name: 'Send', size: 16 }), 'Recordatorios'),
          ),
          se1('div', { className: 'row row--between', style: { margin: '20px 0 12px' } }, se1('span', { className: 'fw-700', style: { fontSize: 14 } }, 'Por comunidad'), se1('button', { className: 'card__link', onClick: () => setRoute('unidades') }, 'Ver unidades')),
          se1('div', { className: 'mini-grid' },
            [
              { label: 'Torre Cedro', value: '84%', sub: 'cobrado', icon: 'Building2', tone: 'teal', go: 'unidades' },
              { label: 'Privada Lago Azul', value: '77%', sub: 'cobrado', icon: 'HomeUnit', tone: 'sky', go: 'unidades' },
              { label: 'Por validar', value: '9', sub: D1.fmtMXN(24300), icon: 'Wallet', tone: 'amber', go: 'validar' },
              { label: 'Morosidad', value: '14', sub: 'unidades', icon: 'AlertTriangle', tone: 'red', go: 'cobranza' },
            ].map((m, i) => se1('button', { key: i, className: 'mini', type: 'button', 'aria-label': `Abrir ${m.label}`, onClick: () => setRoute(m.go) },
              se1('div', { className: 'mini__top' },
                se1('span', { className: `icon-chip icon-chip--${m.tone}`, style: { width: 30, height: 30 } }, se1(I1, { name: m.icon, size: 15 })),
                se1(I1, { name: 'ArrowRight', size: 14, color: 'var(--text-subtle)' }),
              ),
              se1('div', { className: 'mini__value', style: { marginTop: 8 } }, m.value),
              se1('div', { className: 'mini__label' }, m.label, se1('span', { className: 'subtle', style: { fontWeight: 500 } }, ' · ' + m.sub)),
            )),
          ),
        ),

        // Necesita atención
        se1(C1, { title: '¿Qué necesita atención hoy?', icon: 'Flame', iconTone: 'amber',
          headerRight: se1('span', { className: 'badge badge--amber' }, '4 pendientes'), body: false },
          se1('div', { style: { padding: '4px 22px 14px' } },
            [
              { ic: 'Wallet', tone: 'amber', t: '9 pagos por validar', s: 'Comprobantes esperando revisión · $24,300', cta: 'Revisar', go: 'validar' },
              { ic: 'AlertTriangle', tone: 'red', t: '3 unidades con +60 días de mora', s: 'B-1102, Casa 37 y 1 más · $37,600', cta: 'Ver', go: 'cobranza' },
              { ic: 'Waves', tone: 'sky', t: 'Alberca Sur fuera de servicio', s: 'Bomba detenida desde el 24 de mayo', cta: 'Bitácora', go: 'albercas' },
              { ic: 'Elevator', tone: 'peach', t: 'Elevador 2 con falla intermitente', s: 'MT-317 · proveedor programado mañana', cta: 'Ticket', go: 'mantenimiento' },
            ].map((r, i) => se1('div', { key: i, className: 'act-item', style: { gridTemplateColumns: '38px 1fr auto', alignItems: 'center' } },
              se1('span', { className: `icon-chip icon-chip--${r.tone}`, style: { width: 38, height: 38 } }, se1(I1, { name: r.ic, size: 17 })),
              se1('div', null, se1('div', { className: 'fw-600', style: { fontSize: 13.5 } }, r.t), se1('div', { className: 'muted', style: { fontSize: 12.5, marginTop: 2 } }, r.s)),
              se1('button', { className: 'btn btn--soft btn--sm', onClick: () => setRoute(r.go) }, r.cta),
            )),
          ),
        ),

        // Copiloto
        se1('div', { className: 'copilot' },
          se1('div', { className: 'copilot__head' },
            se1('span', { className: 'copilot__mark' }, se1(I1, { name: 'Sparkles', size: 18, color: '#fff' })),
            se1('div', null, se1('div', { className: 'copilot__title' }, 'Copiloto Condo'), se1('div', { className: 'copilot__sub' }, 'Asistente administrativo')),
            se1('span', { className: 'right status-tag', style: { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', borderColor: 'rgba(255,255,255,0.2)' } }, 'Operativo'),
          ),
          se1('div', { className: 'copilot__prompts' },
            ['Resume morosos del mes', 'Prepara reporte para comité', 'Explica variación de gastos', 'Redacta aviso de mantenimiento'].map((p, i) =>
              se1('button', { key: i, className: 'copilot__prompt', onClick: () => showToast('Borrador preparado') },
                se1(I1, { name: 'Sparkles', size: 15 }), p, se1('span', { className: 'right' }, se1(I1, { name: 'ArrowRight', size: 14 })),
              )),
          ),
          se1('div', { className: 'copilot__foot' }, se1(I1, { name: 'Info', size: 13 }), 'Copiloto para análisis y redacción'),
        ),
      ),

      // RIGHT COLUMN
      se1('div', { className: 'stack' },
        // KPI row
        se1('div', { className: 'kpi-strip' },
          kpi('Saldo pendiente', D1.fmtMXN(k.pendiente), 'Wallet', 'amber', 'down', '+38%'),
          kpi('Tickets abiertos', String(k.tickets), 'Wrench', 'sky', 'up', '−3'),
          kpi('Mtto. programados', String(k.programados), 'CalendarCheck', 'green', 'flat', 'Junio'),
        ),

        // Overview chart
        se1(C1, { title: 'Cobranza mensual', icon: 'ChartPie', body: false,
          headerRight: se1('div', { className: 'row', style: { gap: 10 } },
            se1('span', { className: 'row', style: { gap: 6, fontSize: 12.5, fontWeight: 600 } }, se1('span', { style: { width: 9, height: 9, borderRadius: 3, background: 'var(--teal-500)' } }), 'Cobrado'),
            se1('span', { className: 'seg', style: { padding: 3 } }, se1('span', { className: 'seg__btn seg__btn--active' }, 'Este año')),
            kebab,
          ) },
          se1('div', { style: { padding: '4px 22px 18px' } },
            se1('div', { className: 'barchart-grid', style: { paddingLeft: 38, position: 'relative' } },
              se1('div', { className: 'barchart-yaxis' }, ['$300k', '$225k', '$150k', '$75k', '$0'].map((y, i) => se1('span', { key: i }, y))),
              se1('div', { className: 'barchart' }, D1.FLUJO.map((f, i) => se1('div', { key: i, className: 'barchart__col', style: { position: 'relative' } },
                i === tallIdx && se1('div', { className: 'chart-tooltip', style: { bottom: (f.cobrado / maxF * 200 + 16) + 'px', left: '50%', transform: 'translateX(-50%)' } },
                  se1('div', { className: 'chart-tooltip__label' }, se1('span', { style: { width: 8, height: 8, borderRadius: 2, background: 'var(--teal-600)' } }), 'Cobrado · mayo'),
                  se1('div', { className: 'chart-tooltip__val' }, D1.fmtMXN(f.cobrado * 1000)),
                ),
                se1('div', { className: 'barchart__bars' }, se1('div', { className: 'barchart__bar ' + (i === tallIdx ? 'barchart__bar--tall' : 'barchart__bar--cobrado'), style: { height: (f.cobrado / maxF * 200) + 'px' } })),
                se1('div', { className: 'barchart__label' + (i === tallIdx ? ' barchart__label--active' : '') }, f.mes),
              ))),
            ),
          ),
        ),

        // Pagos recientes
        se1(C1, { title: 'Pagos recientes', icon: 'CheckCircle', iconTone: 'green', body: false,
          headerRight: se1('button', { className: 'card__link', onClick: () => setRoute('cobranza') }, 'Ver todo') },
          se1('div', { style: { padding: '4px 22px 16px' } },
            D1.PAGOS_RECIENTES.map((p, i) => se1('div', { key: i, className: 'tx-row' },
              se1('span', { className: 'icon-chip icon-chip--' + (p.metodo === 'Efectivo' ? 'amber' : p.metodo === 'Depósito' ? 'sky' : 'teal') }, se1(I1, { name: p.metodo === 'Efectivo' ? 'Coins' : 'Wallet', size: 16 })),
              se1('div', null, se1('div', { className: 'fw-600', style: { fontSize: 13.5 } }, p.concepto), se1('div', { className: 'muted', style: { fontSize: 12, marginTop: 1 } }, `${p.unit} · ${p.fecha} · ${p.metodo}`)),
              se1('span', { className: 'money fw-700', style: { fontSize: 13.5 } }, D1.fmtMXN(p.monto)),
              se1('span', { className: 'badge badge--green' }, se1(I1, { name: 'Check', size: 12 }), 'Validado'),
            )),
          ),
        ),
      ),
    ),

    // Bottom row
    se1('div', { className: 'grid-3' },
      se1(C1, { title: 'Comunicados recientes', icon: 'Megaphone',
        headerRight: se1('button', { className: 'card__link', onClick: () => setRoute('comunicados') }, 'Ver') },
        se1('div', { className: 'act-list' },
          D1.COMUNICADOS.slice(0, 3).map((c, i) => se1('div', { key: i, className: 'act-item', style: { gridTemplateColumns: '1fr', gap: 4 } },
            se1('div', { className: 'row row--between' }, se1('span', { className: 'fw-600', style: { fontSize: 13 } }, c.titulo), se1('span', { className: 'act-item__time' }, c.fecha)),
            se1('div', { className: 'row', style: { gap: 8 } }, se1('span', { className: 'badge badge--ghost' }, c.seg), se1('span', { className: 'muted', style: { fontSize: 12 } }, `${c.leido}/${c.total} leídos`)),
          )),
        ),
      ),
      se1(C1, { title: 'Próximos mantenimientos', icon: 'CalendarCheck',
        headerRight: se1('button', { className: 'card__link', onClick: () => setRoute('mantenimiento') }, 'Ver todo') },
        se1('div', { className: 'act-list' },
          D1.PREVENTIVO.map((p, i) => se1('div', { key: i, className: 'act-item', style: { gridTemplateColumns: '34px 1fr auto' } },
            se1('span', { className: 'icon-chip icon-chip--teal', style: { width: 34, height: 34 } }, se1(I1, { name: p.icon, size: 16 })),
            se1('div', null, se1('div', { className: 'fw-600', style: { fontSize: 13 } }, p.titulo), se1('div', { className: 'muted', style: { fontSize: 12, marginTop: 1 } }, `${p.com} · ${p.prox}`)),
            se1('span', { className: 'badge badge--' + (p.estado === 'Programado' ? 'amber' : 'slate') }, p.estado),
          )),
        ),
      ),
      se1(C1, { title: 'Actividad reciente', icon: 'Clock' },
        se1('div', { className: 'act-list' },
          D1.ACTIVIDAD.slice(0, 4).map((a, i) => se1('div', { key: i, className: 'act-item' },
            se1('span', { className: `icon-chip icon-chip--${a.tone}`, style: { width: 32, height: 32 } }, se1(I1, { name: a.icon, size: 15 })),
            se1('div', { className: 'act-item__title' }, renderActivityText(a.txt)),
            se1('span', { className: 'act-item__time' }, a.time),
          )),
        ),
      ),
    ),
  );
}

// ============ UNIDADES ============
function Unidades({ tenant, setRoute, setDetail, showToast }) {
  const [filter, setFilter] = useState1('todos');
  const [q, setQ] = useState1('');
  let rows = D1.UNITS.filter(u => tenant === 'all' || u.com === tenant);
  if (filter === 'corriente') rows = rows.filter(u => u.estado === 'corriente');
  else if (filter === 'moroso') rows = rows.filter(u => u.estado === 'moroso');
  else if (filter === 'renta') rows = rows.filter(u => u.renta);
  else if (filter === 'casa') rows = rows.filter(u => u.tipo === 'Casa');
  else if (filter === 'depto') rows = rows.filter(u => u.tipo === 'Departamento');
  if (q) rows = rows.filter(u => (u.u + u.owner + u.tenant).toLowerCase().includes(q.toLowerCase()));

  const counts = {
    todos: D1.UNITS.filter(u => tenant === 'all' || u.com === tenant).length,
    corriente: D1.UNITS.filter(u => (tenant === 'all' || u.com === tenant) && u.estado === 'corriente').length,
    moroso: D1.UNITS.filter(u => (tenant === 'all' || u.com === tenant) && u.estado === 'moroso').length,
    renta: D1.UNITS.filter(u => (tenant === 'all' || u.com === tenant) && u.renta).length,
  };
  const chips = [
    { k: 'todos', label: 'Todas', n: counts.todos }, { k: 'corriente', label: 'Al corriente', n: counts.corriente },
    { k: 'moroso', label: 'Morosas', n: counts.moroso }, { k: 'renta', label: 'En renta', n: counts.renta },
    { k: 'depto', label: 'Departamentos' }, { k: 'casa', label: 'Casas' },
  ];

  return se1('main', { className: 'page fade-in' },
    se1(PH, { route: 'unidades', actions: [
      se1('button', { key: 1, className: 'btn btn--ghost' }, se1(I1, { name: 'Download', size: 16 }), 'Exportar'),
      se1('button', { key: 2, className: 'btn btn--primary', onClick: () => showToast('Unidad preparada') }, se1(I1, { name: 'Plus', size: 16 }), 'Nueva unidad'),
    ] }),
    se1('div', { className: 'card' },
      se1('div', { className: 'card__header', style: { flexWrap: 'wrap', gap: 12 } },
        se1('div', { className: 'filters' }, chips.map(c => se1('button', { key: c.k, className: 'chip' + (filter === c.k ? ' chip--active' : ''), onClick: () => setFilter(c.k) }, c.label, c.n != null && se1('span', { className: 'chip__count' }, c.n)))),
        se1('div', { className: 'search', style: { maxWidth: 240, margin: 0 } },
          se1('span', { className: 'search__icon' }, se1(I1, { name: 'Search', size: 15 })),
          se1('input', { placeholder: 'Buscar unidad…', 'aria-label': 'Buscar unidad', value: q, onChange: ev => setQ(ev.target.value), style: { padding: '8px 12px 8px 38px' } }),
        ),
      ),
      se1('div', { className: 'table-wrap' },
        se1('table', { className: 'tbl' },
          se1('thead', null, se1('tr', null,
            ['Unidad', 'Propietario', 'Inquilino', 'Contacto', 'Veh.', 'Saldo', 'Estado', ''].map((th, i) => se1('th', { key: i, className: th === 'Saldo' ? 'num' : '' }, th)),
          )),
          se1('tbody', null, rows.map((u, i) => se1('tr', { key: i, className: 'clickable', onClick: () => { setDetail(u.u); setRoute('estado-cuenta'); } },
            se1('td', null, se1('div', { className: 'av-pair' },
              se1(AV1, { name: u.u, tone: u.tipo === 'Casa' ? 'sky' : 'teal' }),
              se1('div', null, se1('div', { className: 'cell-main' }, u.u), se1('div', { className: 'cell-sub' }, u.tipo + (u.tags.includes('Comité') ? ' · Comité' : ''))),
            )),
            se1('td', null, se1('div', { className: 'cell-main', style: { fontWeight: 500 } }, u.owner), se1('div', { className: 'cell-sub' }, `${u.m2} m²`)),
            se1('td', null, u.tenant === '—' ? se1('span', { className: 'subtle' }, '—') : se1('span', null, u.tenant)),
            se1('td', null, se1('span', { className: 'mono muted' }, u.contacto)),
            se1('td', null, se1('span', { className: 'row', style: { gap: 5 } }, se1(I1, { name: 'Car', size: 14, color: 'var(--text-subtle)' }), u.cars)),
            se1('td', { className: 'num' }, u.saldo < 0 ? se1(M1, { value: u.saldo }) : se1('span', { className: 'subtle mono' }, '$0')),
            se1('td', null, se1(B1, { tone: EB[u.estado].tone, dot: true }, EB[u.estado].label)),
            se1('td', null, se1('div', { className: 'row-actions' },
              se1('button', { className: 'icon-btn', title: 'Estado de cuenta', 'aria-label': `Abrir estado de cuenta de ${u.u}`, onClick: (ev) => { ev.stopPropagation(); setDetail(u.u); setRoute('estado-cuenta'); } }, se1(I1, { name: 'Eye', size: 16 })),
              se1('button', { className: 'icon-btn', title: 'Registrar pago', 'aria-label': `Registrar pago de ${u.u}`, onClick: (ev) => { ev.stopPropagation(); showToast('Pago registrado para ' + u.u); } }, se1(I1, { name: 'Wallet', size: 16 })),
              se1('button', { className: 'icon-btn', title: 'Más', 'aria-label': `Más acciones para ${u.u}`, onClick: (ev) => ev.stopPropagation() }, se1(I1, { name: 'MoreVertical', size: 16 })),
            )),
          ))),
        ),
      ),
      se1('div', { className: 'card__footer' },
        se1('span', { className: 'muted', style: { fontSize: 13 } }, `Mostrando ${rows.length} de ${counts.todos} unidades`),
        se1('div', { className: 'row', style: { gap: 6 } }, se1('button', { className: 'btn btn--ghost btn--sm' }, 'Anterior'), se1('button', { className: 'btn btn--ghost btn--sm' }, 'Siguiente')),
      ),
    ),
  );
}

// ============ ESTADO DE CUENTA ============
function EstadoCuenta({ detail, setRoute, showToast }) {
  const u = D1.UNITS.find(x => x.u === (detail || 'A-204')) || D1.UNITS[0];
  const st = D1.STATEMENT;
  const com = D1.COMMUNITIES.find(c => c.id === u.com);
  return se1('main', { className: 'page fade-in' },
    se1(PH, { route: 'estado-cuenta',
      crumbs: [se1('button', { key: 1, onClick: () => setRoute('unidades') }, 'Unidades'), se1('span', { key: 2, className: 'breadcrumb__sep' }, '/'), se1('span', { key: 3, className: 'fw-600', style: { color: 'var(--text)' } }, u.u)],
      actions: [
        se1('button', { key: 1, className: 'btn btn--ghost', onClick: () => showToast('Aviso enviado a ' + u.u) }, se1(I1, { name: 'Send', size: 16 }), 'Enviar aviso'),
        se1('button', { key: 2, className: 'btn btn--secondary', onClick: () => showToast('PDF generado') }, se1(I1, { name: 'Printer', size: 16 }), 'Generar PDF'),
        se1('button', { key: 3, className: 'btn btn--primary', onClick: () => showToast('Pago registrado') }, se1(I1, { name: 'Plus', size: 16 }), 'Registrar pago'),
      ] }),

    se1('div', { className: 'grid-main-l' },
      // LEFT — datos + saldo
      se1('div', { className: 'stack' },
        se1('div', { className: 'card', style: { overflow: 'hidden' } },
          se1('div', { style: { padding: '20px', background: 'linear-gradient(160deg,#0F3540,#0B2B34)', color: '#fff' } },
            se1('div', { className: 'row', style: { gap: 12 } },
              se1('span', { style: { width: 46, height: 46, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center', color: '#57BFA4' } }, se1(I1, { name: u.tipo === 'Casa' ? 'HomeUnit' : 'Building', size: 22 })),
              se1('div', null, se1('div', { style: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em' } }, u.u), se1('div', { style: { fontSize: 12.5, color: 'rgba(255,255,255,0.66)' } }, `${com.name} · ${u.tipo}`)),
            ),
            se1('div', { style: { marginTop: 18 } },
              se1('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.6)' } }, 'Saldo actual'),
              se1('div', { style: { fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 2, color: u.saldo < 0 ? '#FF9B8A' : '#fff', fontFamily: 'var(--font-mono)' } }, D1.fmtMXN(u.saldo)),
              se1('div', { style: { marginTop: 8 } }, se1('span', { className: 'badge badge--' + EB[u.estado].tone, style: { background: 'rgba(255,255,255,0.12)', color: '#fff' } }, se1('span', { className: 'badge__dot' }), EB[u.estado].label, u.dias > 0 ? ` · ${u.dias} días` : '')),
            ),
          ),
          se1('div', { className: 'card__body' },
            se1('div', { className: 'kv-list' },
              se1('div', { className: 'kv-row' }, se1('span', { className: 'kv-row__k' }, 'Propietario'), se1('span', { className: 'kv-row__v' }, u.owner)),
              se1('div', { className: 'kv-row' }, se1('span', { className: 'kv-row__k' }, 'Inquilino'), se1('span', { className: 'kv-row__v' }, u.tenant)),
              se1('div', { className: 'kv-row' }, se1('span', { className: 'kv-row__k' }, 'Contacto'), se1('span', { className: 'kv-row__v mono' }, u.contacto)),
              se1('div', { className: 'kv-row' }, se1('span', { className: 'kv-row__k' }, 'Superficie'), se1('span', { className: 'kv-row__v' }, u.m2 + ' m²')),
              se1('div', { className: 'kv-row' }, se1('span', { className: 'kv-row__k' }, 'Cajones'), se1('span', { className: 'kv-row__v' }, u.cars)),
              se1('div', { className: 'kv-row' }, se1('span', { className: 'kv-row__k' }, 'Tags'), se1('span', { className: 'kv-row__v', style: { gap: 5 } }, u.tags.length ? u.tags.map((t, i) => se1('span', { key: i, className: 'badge badge--ghost' }, t)) : '—')),
            ),
          ),
        ),
        se1(C1, { title: 'Notas internas', icon: 'FileText' },
          se1('div', { className: 'banner banner--amber', style: { fontSize: 12.5 } }, se1('span', { className: 'banner__icon' }, se1(I1, { name: 'Info', size: 15 })), 'Acuerdo de pago vigente: 3 parcialidades de $1,400. Próxima el 05 jun.'),
          se1('textarea', { className: 'field__textarea', style: { marginTop: 12 }, placeholder: 'Agregar nota interna (solo administración)…' }),
          se1('button', { className: 'btn btn--soft btn--sm', style: { marginTop: 10 }, onClick: () => showToast('Nota guardada') }, 'Guardar nota'),
        ),
      ),

      // RIGHT — timeline + cargos + pagos
      se1('div', { className: 'stack' },
        se1(C1, { title: 'Línea de tiempo financiera', icon: 'Clock' },
          se1('div', { className: 'timeline' }, st.timeline.map((t, i) => se1('div', { key: i, className: 'tl-item' },
            se1('span', { className: `tl-dot tl-dot--${t.tone}` }, se1(I1, { name: t.icon, size: 16 })),
            se1('div', { className: 'tl-body' }, se1('div', { className: 'tl-title' }, t.t), se1('div', { className: 'tl-meta' }, t.meta)),
          ))),
        ),
        se1('div', { className: 'grid-2' },
          se1(C1, { title: 'Historial de cargos', icon: 'Receipt', iconTone: 'amber', body: false },
            se1('div', { className: 'table-wrap' }, se1('table', { className: 'tbl' },
              se1('tbody', null, st.cargos.map((c, i) => se1('tr', { key: i },
                se1('td', null, se1('div', { className: 'cell-main', style: { fontWeight: 500, fontSize: 13 } }, c.concepto), se1('div', { className: 'cell-sub' }, c.fecha)),
                se1('td', { className: 'num' }, se1('span', { className: 'money money--neg' }, '+' + D1.fmtMXN(c.monto))),
              ))),
            )),
          ),
          se1(C1, { title: 'Historial de pagos', icon: 'CheckCircle', iconTone: 'green', body: false },
            se1('div', { className: 'table-wrap' }, se1('table', { className: 'tbl' },
              se1('tbody', null, st.pagos.map((p, i) => se1('tr', { key: i },
                se1('td', null, se1('div', { className: 'cell-main', style: { fontWeight: 500, fontSize: 13 } }, p.concepto), se1('div', { className: 'cell-sub' }, `${p.fecha} · ${p.metodo} · ${p.ref}`)),
                se1('td', { className: 'num' }, se1('span', { className: 'money money--pos' }, '−' + D1.fmtMXN(p.monto))),
              ))),
            )),
          ),
        ),
        se1(C1, { title: 'Comprobantes y recibos', icon: 'FolderOpen',
          headerRight: se1('button', { className: 'card__link', onClick: () => showToast('Comprobante adjuntado') }, se1(I1, { name: 'Plus', size: 14 }), 'Subir') },
          se1('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 } },
            ['comprobante_abr.pdf', 'recibo_abr.pdf', 'ficha_mar.jpg', 'recibo_mar.pdf'].map((f, i) =>
              se1('div', { key: i, style: { display: 'flex', flexDirection: 'column', gap: 8 } },
                se1('div', { className: 'ph', style: { height: 96 } }, se1(I1, { name: i % 2 ? 'FileText' : 'Image', size: 22 })),
                se1('div', { style: { fontSize: 11, fontWeight: 600, textAlign: 'center', wordBreak: 'break-all' } }, f),
              )),
          ),
        ),
      ),
    ),
  );
}

function renderActivityText(html) {
  return String(html).split(/(<b>|<\/b>)/).reduce((nodes, part, index, parts) => {
    if (part === '<b>' || part === '</b>') return nodes;
    const bold = parts[index - 1] === '<b>';
    nodes.push(bold ? se1('b', { key: index }, part) : part);
    return nodes;
  }, []);
}

export { Inicio as DashboardScreen, Unidades as UnitsScreen, EstadoCuenta as UnitStatementScreen };





