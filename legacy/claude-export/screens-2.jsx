/* global React, UI */
const { createElement: se2, useState: useState2 } = React;
const D2 = window.DATA;
const { PageHeader: PH2, Card: C2, Badge: B2, Ic: I2, Money: M2, Avatar: AV2 } = UI;

// ============ COBRANZA ============
function Cobranza({ tenant, showToast }) {
  const k = D2.KPIS;
  const maxFlujo = Math.max(...D2.FLUJO.map(f => f.cobrado + f.pendiente));
  const summary = (label, val, icon, tone, sub) => se2('div', { className: 'kpi' + (tone ? ` kpi--${tone}` : '') },
    se2('div', { className: 'kpi__head' }, se2('span', { className: 'kpi__icon' }, se2(I2, { name: icon, size: 19 })), se2('span', { className: 'kpi__label' }, label), se2('button', { className: 'kebab kpi__menu' }, se2(I2, { name: 'MoreVertical', size: 16 }))),
    se2('div', { className: 'kpi__value' }, val),
    sub && se2('div', { className: 'kpi__sub', style: { marginTop: 12 } }, sub),
  );

  return se2('main', { className: 'page fade-in' },
    se2(PH2, { route: 'cobranza', actions: [
      se2('button', { key: 1, className: 'btn btn--ghost', onClick: () => showToast('Demo: exportando a Excel') }, se2(I2, { name: 'Sheet', size: 16 }), 'Exportar Excel'),
      se2('button', { key: 2, className: 'btn btn--secondary', onClick: () => showToast('Demo: recordatorios enviados') }, se2(I2, { name: 'Send', size: 16 }), 'Enviar recordatorios'),
      se2('button', { key: 3, className: 'btn btn--primary', onClick: () => showToast('Demo: generación de cuotas de junio') }, se2(I2, { name: 'Coins', size: 16 }), 'Generar cuotas'),
    ] }),

    se2('div', { className: 'kpis' },
      summary('Cobrado · mayo', D2.fmtMXN(k.cobrado), 'TrendingUp', 'green', '81% de lo esperado'),
      summary('Pendiente', D2.fmtMXN(k.pendiente), 'Wallet', 'amber', '14 unidades'),
      summary('Recargos', D2.fmtMXN(8400), 'AlertTriangle', 'red', 'Por mora acumulada'),
      summary('Descuentos', D2.fmtMXN(-3200), 'Tag', '', 'Pronto pago'),
    ),

    se2('div', { className: 'grid-main' },
      // LEFT
      se2('div', { className: 'stack' },
        se2(C2, { title: 'Cobranza vs. pendiente', sub: 'Últimos 6 meses · miles de MXN', icon: 'ChartPie',
          headerRight: se2('div', { className: 'chart-legend', style: { display: 'flex', gap: 14 } },
            se2('span', { className: 'row', style: { gap: 6, fontSize: 12 } }, se2('span', { style: { width: 10, height: 10, borderRadius: 3, background: 'var(--teal-500)' } }), 'Cobrado'),
            se2('span', { className: 'row', style: { gap: 6, fontSize: 12 } }, se2('span', { style: { width: 10, height: 10, borderRadius: 3, background: 'var(--teal-100)' } }), 'Pendiente'),
          ) },
          se2('div', { className: 'barchart' }, D2.FLUJO.map((f, i) => se2('div', { key: i, className: 'barchart__col' },
            se2('div', { className: 'barchart__bars' },
              se2('div', { className: 'barchart__bar barchart__bar--cobrado', style: { height: (f.cobrado / maxFlujo * 150) + 'px' }, title: '$' + f.cobrado + 'k' }),
              se2('div', { className: 'barchart__bar barchart__bar--pendiente', style: { height: (f.pendiente / maxFlujo * 150) + 'px' } }),
            ),
            se2('div', { className: 'barchart__label' }, f.mes),
          ))),
        ),
        se2(C2, { title: 'Pagos recientes', icon: 'CheckCircle', iconTone: 'green', body: false,
          headerRight: se2('span', { className: 'badge badge--green' }, 'Validados') },
          se2('div', { className: 'table-wrap' }, se2('table', { className: 'tbl' },
            se2('thead', null, se2('tr', null, ['Fecha', 'Unidad', 'Concepto', 'Método', 'Monto'].map((t, i) => se2('th', { key: i, className: t === 'Monto' ? 'num' : '' }, t)))),
            se2('tbody', null, D2.PAGOS_RECIENTES.map((p, i) => se2('tr', { key: i },
              se2('td', { className: 'muted' }, p.fecha),
              se2('td', null, se2('span', { className: 'fw-600' }, p.unit)),
              se2('td', null, p.concepto),
              se2('td', null, se2('span', { className: 'badge badge--ghost' }, p.metodo)),
              se2('td', { className: 'num' }, se2('span', { className: 'money money--pos' }, D2.fmtMXN(p.monto))),
            ))),
          )),
        ),
      ),

      // RIGHT
      se2('div', { className: 'stack' },
        se2(C2, { title: 'Acciones masivas', icon: 'Bolt' },
          se2('div', { style: { display: 'flex', flexDirection: 'column', gap: 9 } },
            [['Coins', 'Generar cuotas de junio', 'primary'], ['Send', 'Enviar recordatorios (14)', 'soft'], ['Sheet', 'Exportar a Excel', 'secondary'], ['Printer', 'Generar reporte PDF', 'secondary']].map((a, i) =>
              se2('button', { key: i, className: `btn btn--${a[2]} btn--block`, style: { justifyContent: 'flex-start' }, onClick: () => showToast('Demo: ' + a[1]) }, se2(I2, { name: a[0], size: 16 }), a[1])),
          ),
        ),
        se2(C2, { title: 'Composición de cuotas', icon: 'Layers' },
          se2('div', { className: 'kv-list' },
            [['Ordinarias', 268000, 'teal'], ['Extraordinarias · fachada', 42000, 'sky'], ['Recargos por mora', 8400, 'red'], ['Descuentos pronto pago', -3200, 'green']].map((r, i) =>
              se2('div', { key: i, className: 'kv-row' },
                se2('span', { className: 'kv-row__k row', style: { gap: 8 } }, se2('span', { style: { width: 8, height: 8, borderRadius: 2, background: `var(--${r[2]}-${r[2] === 'teal' ? '500' : '600'})` } }), r[0]),
                se2('span', { className: 'kv-row__v money' + (r[1] < 0 ? ' money--pos' : '') }, D2.fmtMXN(r[1])),
              )),
          ),
        ),
        se2(C2, { title: 'Morosos por antigüedad', icon: 'AlertTriangle', iconTone: 'red', body: false,
          headerRight: se2('span', { className: 'badge badge--red' }, '14 unidades') },
          se2('div', { style: { padding: '8px 6px' } }, D2.MOROSIDAD_ANT.map((m, i) => se2('div', { key: i, style: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, padding: '11px 12px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' } },
            se2('div', null,
              se2('div', { className: 'row row--between', style: { marginBottom: 6 } },
                se2('span', { className: 'fw-600', style: { fontSize: 13 } }, m.rango),
                se2('span', { className: 'money fw-700', style: { fontSize: 13 } }, D2.fmtMXN(m.monto)),
              ),
              se2('div', { className: 'progress-track' }, se2('div', { className: `progress-fill progress-fill--${m.color}`, style: { width: (m.unidades / 6 * 100) + '%' } })),
              se2('div', { className: 'muted', style: { fontSize: 11.5, marginTop: 5 } }, `${m.unidades} unidad${m.unidades > 1 ? 'es' : ''}`),
            ),
          ))),
        ),
      ),
    ),
  );
}

// ============ PAGOS POR VALIDAR ============
const PV_ESTADO = { nuevo: { tone: 'amber', label: 'Por validar' }, revision: { tone: 'sky', label: 'En revisión' }, aclaracion: { tone: 'peach', label: 'Aclaración' } };
const METODO_ICON = { 'Transferencia': 'ArrowRight', 'Depósito': 'Wallet', 'Efectivo': 'Coins', 'Tarjeta': 'FileCheck' };

function Validar({ tenant, showToast }) {
  const [sel, setSel] = useState2(null);
  const [done, setDone] = useState2({});
  let rows = D2.PAGOS_VALIDAR.filter(p => tenant === 'all' || p.com === tenant);
  const total = rows.reduce((s, p) => s + p.monto, 0);
  const act = (id, label) => { setDone(d => ({ ...d, [id]: label })); setSel(null); showToast('Demo: ' + label); };

  const drawer = sel && se2(React.Fragment, null,
    se2('div', { className: 'drawer-overlay', onClick: () => setSel(null) }),
    se2('div', { className: 'drawer' },
      se2('div', { className: 'drawer__header' },
        se2('div', null,
          se2('div', { className: 'row', style: { gap: 8 } }, se2('span', { className: 'mono muted' }, sel.id), se2(B2, { tone: (PV_ESTADO[sel.estado] || {}).tone || 'slate' }, (PV_ESTADO[sel.estado] || {}).label)),
          se2('div', { style: { fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 6 } }, D2.fmtMXN(sel.monto)),
          se2('div', { className: 'muted', style: { fontSize: 13, marginTop: 2 } }, `${sel.unit} · ${sel.quien}`),
        ),
        se2('button', { className: 'icon-btn', onClick: () => setSel(null) }, se2(I2, { name: 'X', size: 18 })),
      ),
      se2('div', { className: 'drawer__body' },
        se2('div', { className: 'banner banner--sky', style: { fontSize: 12.5 } }, se2('span', { className: 'banner__icon' }, se2(I2, { name: 'ShieldCheck', size: 15 })), 'Cada decisión queda registrada con usuario, fecha y hora para auditoría del comité.'),
        se2('div', null, se2('div', { className: 'context-section__title', style: { fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-subtle)', fontWeight: 700, marginBottom: 10 } }, 'Evidencia adjunta'),
          se2('div', { className: 'ph', style: { height: 200 } }, se2('div', { style: { textAlign: 'center' } }, se2(I2, { name: 'Image', size: 26 }), se2('div', { style: { marginTop: 6 } }, sel.evidencia))),
        ),
        se2('div', { className: 'kv-list' },
          se2('div', { className: 'kv-row' }, se2('span', { className: 'kv-row__k' }, 'Monto reportado'), se2('span', { className: 'kv-row__v money' }, D2.fmtMXN(sel.monto))),
          se2('div', { className: 'kv-row' }, se2('span', { className: 'kv-row__k' }, 'Método'), se2('span', { className: 'kv-row__v' }, sel.metodo)),
          se2('div', { className: 'kv-row' }, se2('span', { className: 'kv-row__k' }, 'Unidad'), se2('span', { className: 'kv-row__v' }, sel.unit)),
          se2('div', { className: 'kv-row' }, se2('span', { className: 'kv-row__k' }, 'Reportado por'), se2('span', { className: 'kv-row__v' }, sel.quien)),
          se2('div', { className: 'kv-row' }, se2('span', { className: 'kv-row__k' }, 'Fecha'), se2('span', { className: 'kv-row__v' }, sel.fecha)),
        ),
        se2('div', { className: 'field' }, se2('label', { className: 'field__label' }, 'Nota de validación (opcional)'), se2('textarea', { className: 'field__textarea', placeholder: 'Ej. Coincide con cuota ordinaria de mayo…', style: { minHeight: 64 } })),
      ),
      se2('div', { className: 'drawer__footer' },
        se2('button', { className: 'btn btn--danger-soft', style: { flex: 1 }, onClick: () => act(sel.id, 'Comprobante rechazado') }, se2(I2, { name: 'X', size: 16 }), 'Rechazar'),
        se2('button', { className: 'btn btn--secondary', style: { flex: 1 }, onClick: () => act(sel.id, 'Aclaración solicitada') }, se2(I2, { name: 'Help', size: 16 }), 'Aclaración'),
        se2('button', { className: 'btn btn--primary', style: { flex: 1 }, onClick: () => act(sel.id, 'Pago aprobado') }, se2(I2, { name: 'Check', size: 16 }), 'Aprobar'),
      ),
    ),
  );

  return se2('main', { className: 'page fade-in' },
    se2(PH2, { route: 'validar', actions: [
      se2('span', { key: 0, className: 'badge badge--amber', style: { alignSelf: 'center' } }, se2(I2, { name: 'Wallet', size: 13 }), `${rows.length} pendientes · ${D2.fmtMXN(total)}`),
      se2('button', { key: 1, className: 'btn btn--secondary' }, se2(I2, { name: 'Filter', size: 16 }), 'Filtrar'),
    ] }),
    se2('div', { className: 'banner banner--sky' }, se2('span', { className: 'banner__icon' }, se2(I2, { name: 'ShieldCheck', size: 17 })),
      se2('div', null, se2('div', { className: 'banner__title' }, 'Control financiero con trazabilidad'), 'Aprueba, rechaza o solicita aclaración. Cada acción genera un registro auditable visible para el comité.')),
    se2('div', { className: 'card', body: false },
      se2('div', { className: 'table-wrap' }, se2('table', { className: 'tbl' },
        se2('thead', null, se2('tr', null, ['Folio', 'Unidad', 'Monto', 'Método', 'Reportado', 'Evidencia', 'Estado', 'Acciones'].map((t, i) => se2('th', { key: i, className: t === 'Monto' ? 'num' : '' }, t)))),
        se2('tbody', null, rows.map((p, i) => {
          const d = done[p.id];
          return se2('tr', { key: i, className: d ? '' : 'clickable', onClick: () => !d && setSel(p), style: d ? { opacity: 0.55 } : {} },
            se2('td', null, se2('span', { className: 'mono muted' }, p.id)),
            se2('td', null, se2('div', { className: 'av-pair' }, se2(AV2, { name: p.unit, size: 'sm', tone: p.com === 'lago' ? 'sky' : 'teal' }), se2('div', null, se2('div', { className: 'cell-main', style: { fontSize: 13 } }, p.unit), se2('div', { className: 'cell-sub' }, p.quien)))),
            se2('td', { className: 'num' }, se2('span', { className: 'money' }, D2.fmtMXN(p.monto))),
            se2('td', null, se2('span', { className: 'badge badge--ghost' }, p.metodo)),
            se2('td', { className: 'muted', style: { fontSize: 12.5 } }, p.fecha),
            se2('td', null, se2('span', { className: 'row', style: { gap: 6, fontSize: 12 } }, se2(I2, { name: 'Paperclip', size: 14, color: 'var(--text-subtle)' }), se2('span', { className: 'mono', style: { maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, p.evidencia))),
            se2('td', null, d ? se2(B2, { tone: d.includes('aprob') ? 'green' : d.includes('rechaz') ? 'red' : 'peach' }, d) : se2(B2, { tone: (PV_ESTADO[p.estado] || {}).tone, dot: true }, (PV_ESTADO[p.estado] || {}).label)),
            se2('td', null, d ? se2('span', { className: 'subtle', style: { fontSize: 12 } }, 'Resuelto') : se2('div', { className: 'row-actions' },
              se2('button', { className: 'icon-btn', title: 'Aprobar', onClick: (ev) => { ev.stopPropagation(); act(p.id, 'Pago aprobado'); }, style: { color: 'var(--green-700)' } }, se2(I2, { name: 'Check', size: 16 })),
              se2('button', { className: 'icon-btn', title: 'Rechazar', onClick: (ev) => { ev.stopPropagation(); act(p.id, 'Comprobante rechazado'); }, style: { color: 'var(--red-600)' } }, se2(I2, { name: 'X', size: 16 })),
              se2('button', { className: 'icon-btn', title: 'Ver detalle', onClick: (ev) => { ev.stopPropagation(); setSel(p); } }, se2(I2, { name: 'Eye', size: 16 })),
            )),
          );
        })),
      )),
    ),
    drawer,
  );
}

window.Screens = Object.assign(window.Screens || {}, { Cobranza, Validar });
