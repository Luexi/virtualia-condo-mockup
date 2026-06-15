/* global React, UI */
const { createElement: s4, useState: useState4 } = React;
const D4 = window.DATA;
const { PageHeader: PH4, Card: C4, Badge: B4, Ic: I4, QR: QR4, Avatar: AV4 } = UI;

// ============ COMUNICADOS Y DOCUMENTOS ============
const SEG = ['Todos', 'Propietarios', 'Inquilinos', 'Comité', 'Morosos', 'Torre Cedro', 'Privada Lago Azul'];
function Comunicados({ showToast }) {
  const [draft, setDraft] = useState4(false);
  const [seg, setSeg] = useState4('Todos');
  const [text, setText] = useState4('');

  const modal = draft && s4(React.Fragment, null,
    s4('div', { className: 'modal-overlay', onClick: () => setDraft(false) }),
    s4('div', { className: 'modal modal--lg' },
      s4('div', { className: 'modal__header' }, s4('div', { className: 'row row--between' },
        s4('div', { className: 'card__title' }, s4('span', { className: 'icon-chip icon-chip--teal', style: { width: 30, height: 30 } }, s4(I4, { name: 'Megaphone', size: 16 })), 'Nuevo comunicado'),
        s4('button', { className: 'icon-btn', onClick: () => setDraft(false) }, s4(I4, { name: 'X', size: 18 })),
      )),
      s4('div', { className: 'modal__body' },
        s4('div', { className: 'field' }, s4('label', { className: 'field__label' }, 'Segmentación'),
          s4('div', { className: 'filters' }, SEG.map(sg => s4('button', { key: sg, className: 'chip' + (seg === sg ? ' chip--active' : ''), onClick: () => setSeg(sg) }, sg)))),
        s4('div', { className: 'field' }, s4('label', { className: 'field__label' }, 'Título'), s4('input', { className: 'field__input', placeholder: 'Ej. Corte de agua programado' })),
        s4('div', { className: 'field' },
          s4('div', { className: 'row row--between' },
            s4('label', { className: 'field__label' }, 'Mensaje'),
            s4('button', { className: 'btn btn--soft btn--sm', onClick: () => setText('Estimados residentes: les informamos que el día martes 3 de junio se realizará un corte de agua programado de 09:00 a 14:00 por mantenimiento a la cisterna. Agradecemos tomar previsiones. — Administración.') },
              s4(I4, { name: 'Sparkles', size: 14 }), 'Borrador con IA'),
          ),
          s4('textarea', { className: 'field__textarea', value: text, onChange: e => setText(e.target.value), placeholder: 'Escribe el comunicado o genera un borrador asistido…', style: { minHeight: 120 } }),
          s4('div', { className: 'field__hint row', style: { gap: 6 } }, s4(I4, { name: 'Info', size: 13 }), 'La IA solo sugiere un borrador. Tú revisas y envías — no se envía nada automáticamente.'),
        ),
      ),
      s4('div', { className: 'modal__footer' },
        s4('button', { className: 'btn btn--ghost', onClick: () => setDraft(false) }, 'Cancelar'),
        s4('button', { className: 'btn btn--secondary' }, 'Guardar borrador'),
        s4('button', { className: 'btn btn--primary', onClick: () => { setDraft(false); showToast(`Comunicado enviado a: ${seg} (demo)`); } }, s4(I4, { name: 'Send', size: 15 }), 'Enviar'),
      ),
    ),
  );

  return s4('main', { className: 'page fade-in' },
    s4(PH4, { route: 'comunicados', actions: [
      s4('button', { key: 1, className: 'btn btn--secondary', onClick: () => showToast('Demo: subir documento') }, s4(I4, { name: 'Plus', size: 16 }), 'Subir documento'),
      s4('button', { key: 2, className: 'btn btn--primary', onClick: () => setDraft(true) }, s4(I4, { name: 'Megaphone', size: 16 }), 'Nuevo comunicado'),
    ] }),
    s4('div', { className: 'grid-main' },
      s4('div', { className: 'stack' },
        s4(C4, { title: 'Avisos recientes', icon: 'Megaphone', body: false,
          headerRight: s4('button', { className: 'card__link' }, 'Historial') },
          s4('div', null, D4.COMUNICADOS.map((c, i) => s4('div', { key: i, style: { padding: '16px 20px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' } },
            s4('div', { className: 'row row--between', style: { marginBottom: 8 } },
              s4('div', { className: 'row', style: { gap: 9 } },
                s4('span', { className: `icon-chip ${c.prioridad === 'alta' ? 'icon-chip--red' : 'icon-chip--teal'}`, style: { width: 32, height: 32 } }, s4(I4, { name: 'Megaphone', size: 15 })),
                s4('div', null, s4('div', { className: 'fw-700', style: { fontSize: 14 } }, c.titulo), s4('div', { className: 'muted', style: { fontSize: 12, marginTop: 1 } }, `${c.fecha} · Segmento: ${c.seg}`)),
              ),
              s4(B4, { tone: 'green', dot: true }, 'Enviado'),
            ),
            s4('div', { className: 'row', style: { gap: 12 } },
              s4('div', { style: { flex: 1 } },
                s4('div', { className: 'row row--between', style: { fontSize: 11.5, marginBottom: 4 } }, s4('span', { className: 'muted' }, 'Confirmación de lectura'), s4('span', { className: 'fw-600' }, `${c.leido}/${c.total} · ${Math.round(c.leido / c.total * 100)}%`)),
                s4('div', { className: 'progress-track' }, s4('div', { className: 'progress-fill', style: { width: (c.leido / c.total * 100) + '%' } })),
              ),
              s4('button', { className: 'btn btn--ghost btn--sm', onClick: () => showToast('Demo: ver detalle de lectura') }, 'Detalle'),
            ),
          ))),
        ),
        s4('div', { className: 'banner banner--teal' }, s4('span', { className: 'banner__icon' }, s4(I4, { name: 'Sparkles', size: 17 })),
          s4('div', null, s4('div', { className: 'banner__title' }, 'Borrador asistido por IA'),
            'Redacta avisos más rápido. La IA propone el texto; el envío siempre es una acción manual y revisada. ',
            s4('button', { className: 'card__link', style: { display: 'inline-flex' }, onClick: () => setDraft(true) }, 'Probar borrador'))),
      ),
      s4(C4, { title: 'Documentos de la comunidad', icon: 'FolderOpen', body: false,
        headerRight: s4('button', { className: 'card__link', onClick: () => showToast('Demo: subir') }, s4(I4, { name: 'Plus', size: 14 }), 'Subir') },
        s4('div', { style: { padding: '6px 8px' } }, D4.DOCUMENTOS.map((d, i) => s4('div', { key: i, className: 'row row--between', style: { padding: '11px 12px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' } },
          s4('div', { className: 'row', style: { gap: 11 } },
            s4('span', { className: 'icon-chip icon-chip--slate', style: { width: 34, height: 34 } }, s4(I4, { name: d.icon, size: 16 })),
            s4('div', null, s4('div', { className: 'fw-600', style: { fontSize: 13 } }, d.nombre), s4('div', { className: 'muted', style: { fontSize: 11.5 } }, `${d.tipo} · ${d.peso} · ${d.fecha}`)),
          ),
          s4('button', { className: 'icon-btn', onClick: () => showToast('Demo: descargar ' + d.nombre) }, s4(I4, { name: 'Download', size: 16 })),
        ))),
      ),
    ),
    modal,
  );
}

// ============ ACCESOS / VISITANTES ============
const ACC_ESTADO = { autorizado: { tone: 'green', label: 'Autorizado' }, usado: { tone: 'slate', label: 'Usado' }, expirado: { tone: 'amber', label: 'Expirado' }, cancelado: { tone: 'red', label: 'Cancelado' } };
function Accesos({ showToast }) {
  const [sel, setSel] = useState4(D4.VISITAS[0]);
  return s4('main', { className: 'page fade-in' },
    s4(PH4, { route: 'accesos', actions: [
      s4('span', { key: 0, className: 'badge badge--green', style: { alignSelf: 'center' } }, s4('span', { className: 'badge__dot' }), 'Caseta en línea'),
      s4('button', { key: 1, className: 'btn btn--primary', onClick: () => showToast('Demo: generar QR de visita') }, s4(I4, { name: 'Plus', size: 16 }), 'Generar QR'),
    ] }),
    s4('div', { className: 'grid-main' },
      s4('div', { className: 'stack' },
        s4(C4, { title: 'Autorizaciones', icon: 'KeyRound', body: false,
          headerRight: s4('div', { className: 'row', style: { gap: 8 } }, s4('span', { className: 'badge badge--green' }, '2 activas'), s4('span', { className: 'badge badge--slate' }, '6 hoy')) },
          s4('div', { className: 'table-wrap' }, s4('table', { className: 'tbl' },
            s4('thead', null, s4('tr', null, ['QR', 'Visitante', 'Unidad', 'Tipo', 'Vehículo', 'Vence', 'Estado'].map((t, i) => s4('th', { key: i }, t)))),
            s4('tbody', null, D4.VISITAS.map((v, i) => s4('tr', { key: i, className: 'clickable', onClick: () => setSel(v) },
              s4('td', null, s4('span', { className: 'mono muted' }, v.qr)),
              s4('td', null, s4('span', { className: 'cell-main', style: { fontSize: 13 } }, v.nombre)),
              s4('td', null, v.unidad),
              s4('td', null, s4('span', { className: 'badge badge--ghost' }, v.tipo)),
              s4('td', null, s4('span', { className: 'mono muted' }, v.placa)),
              s4('td', { className: 'muted', style: { fontSize: 12.5 } }, v.vence),
              s4('td', null, s4(B4, { tone: ACC_ESTADO[v.estado].tone, dot: v.estado === 'autorizado' }, ACC_ESTADO[v.estado].label)),
            ))),
          )),
        ),
        s4(C4, { title: 'Bitácora de caseta · hoy', icon: 'List', body: false },
          s4('div', { style: { padding: '6px 20px 16px' } }, s4('div', { className: 'timeline', style: { marginTop: 10 } }, D4.BITACORA.map((b, i) => s4('div', { key: i, className: 'tl-item' },
            s4('span', { className: `tl-dot tl-dot--${b.tone}` }, s4(I4, { name: b.tone === 'red' ? 'X' : b.evento.includes('Salida') ? 'ArrowRight' : 'Check', size: 15 })),
            s4('div', { className: 'tl-body' }, s4('div', { className: 'tl-title' }, b.evento, s4('span', { className: 'muted', style: { fontWeight: 500, fontSize: 12 } }, b.hora)), s4('div', { className: 'tl-meta' }, b.detalle)),
          )))),
        ),
      ),
      s4('div', { className: 'stack' },
        s4(C4, { title: 'Pase de acceso', icon: 'ScanLine', iconTone: 'sky' },
          s4('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' } },
            s4('div', { className: 'qr' }, s4(QR4, { seed: (sel.qr.charCodeAt(3) || 7), size: 132 })),
            s4('div', null, s4('div', { className: 'fw-700', style: { fontSize: 14.5 } }, sel.nombre), s4('div', { className: 'muted', style: { fontSize: 12.5 } }, `${sel.unidad} · ${sel.tipo}`)),
            s4(B4, { tone: ACC_ESTADO[sel.estado].tone, dot: sel.estado === 'autorizado' }, ACC_ESTADO[sel.estado].label),
          ),
          s4('div', { className: 'kv-list', style: { marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' } },
            s4('div', { className: 'kv-row' }, s4('span', { className: 'kv-row__k' }, 'Folio'), s4('span', { className: 'kv-row__v mono' }, sel.qr)),
            s4('div', { className: 'kv-row' }, s4('span', { className: 'kv-row__k' }, 'Vigencia'), s4('span', { className: 'kv-row__v' }, sel.vence)),
            s4('div', { className: 'kv-row' }, s4('span', { className: 'kv-row__k' }, 'Vehículo'), s4('span', { className: 'kv-row__v mono' }, sel.placa)),
          ),
          s4('div', { className: 'demo-tag', style: { marginTop: 14 } }, 'QR demo · no funcional'),
        ),
        s4(C4, { title: 'Vista de vigilancia', icon: 'Shield', iconTone: 'slate' },
          s4('div', { className: 'banner banner--sky', style: { fontSize: 12.5 } }, s4('span', { className: 'banner__icon' }, s4(I4, { name: 'Info', size: 15 })), 'Modo simplificado para caseta: escanear QR, registrar entrada/salida y consultar autorizaciones del día.'),
          s4('div', { className: 'row', style: { gap: 8, marginTop: 12 } },
            s4('button', { className: 'btn btn--primary btn--block', onClick: () => showToast('Demo: escanear QR') }, s4(I4, { name: 'ScanLine', size: 16 }), 'Escanear'),
            s4('button', { className: 'btn btn--secondary btn--block', onClick: () => showToast('Demo: registro manual') }, 'Manual'),
          ),
        ),
      ),
    ),
  );
}

// ============ REPORTES ============
function donutGradient(items) {
  let acc = 0; const stops = [];
  items.forEach(it => { const start = acc; acc += it.pct; stops.push(`${it.color} ${start}% ${acc}%`); });
  return `conic-gradient(${stops.join(', ')})`;
}
function Reportes({ showToast }) {
  const k = D4.KPIS;
  const maxFlujo = Math.max(...D4.FLUJO.map(f => f.cobrado));
  return s4('main', { className: 'page fade-in' },
    s4(PH4, { route: 'reportes', actions: [
      s4('button', { key: 1, className: 'btn btn--ghost', onClick: () => showToast('Demo: Excel') }, s4(I4, { name: 'Sheet', size: 16 }), 'Excel'),
      s4('button', { key: 2, className: 'btn btn--secondary', onClick: () => showToast('Demo: PDF') }, s4(I4, { name: 'Printer', size: 16 }), 'PDF'),
      s4('button', { key: 3, className: 'btn btn--primary', onClick: () => showToast('Demo: reporte mensual preparado') }, s4(I4, { name: 'Sparkles', size: 16 }), 'Preparar reporte mensual'),
    ] }),

    // Executive band
    s4('div', { className: 'card', style: { background: 'linear-gradient(135deg,#0F3540,#0B2B34)', color: '#fff', overflow: 'hidden' } },
      s4('div', { className: 'card__body', style: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 } },
        [['Ingresos del mes', D4.fmtMXN(k.cobrado), '+6.4%', 'TrendingUp'], ['Egresos del mes', D4.fmtMXN(k.egresos), '−2.1%', 'TrendingDown'], ['Resultado neto', D4.fmtMXN(k.cobrado - k.egresos), 'Superávit', 'CheckCircle'], ['Saldo en banco', D4.fmtMXN(k.saldoBanco), 'Conciliado', 'ShieldCheck']].map((m, i) =>
          s4('div', { key: i, style: { borderLeft: i ? '1px solid rgba(255,255,255,0.12)' : 'none', paddingLeft: i ? 24 : 0 } },
            s4('div', { className: 'row', style: { gap: 7, fontSize: 12.5, color: 'rgba(255,255,255,0.62)' } }, s4(I4, { name: m[3], size: 14, color: '#57BFA4' }), m[0]),
            s4('div', { style: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 8, fontFamily: 'var(--font-mono)' } }, m[1]),
            s4('div', { style: { fontSize: 12, color: '#57BFA4', marginTop: 4 } }, m[2]),
          )),
      ),
    ),

    s4('div', { className: 'grid-2' },
      s4(C4, { title: 'Egresos por categoría', sub: 'Mayo 2026', icon: 'ChartPie' },
        s4('div', { className: 'donut-wrap' },
          s4('div', { style: { position: 'relative', width: 150, height: 150, borderRadius: '50%', background: donutGradient(D4.EGRESOS) } },
            s4('div', { style: { position: 'absolute', inset: 26, background: 'var(--surface)', borderRadius: '50%', display: 'grid', placeItems: 'center', textAlign: 'center' } },
              s4('div', null, s4('div', { className: 'muted', style: { fontSize: 11 } }, 'Total'), s4('div', { className: 'fw-700', style: { fontSize: 15, fontFamily: 'var(--font-mono)' } }, '$198k'))),
          ),
          s4('div', { className: 'donut-legend' }, D4.EGRESOS.map((eg, i) => s4('div', { key: i, className: 'donut-legend__row' },
            s4('span', { className: 'donut-legend__sw', style: { background: eg.color } }),
            s4('span', null, eg.cat),
            s4('span', { className: 'money fw-700', style: { fontSize: 12.5 } }, D4.fmtMXN(eg.monto)),
          ))),
        ),
      ),
      s4(C4, { title: 'Flujo mensual', sub: 'Ingresos cobrados · 6 meses', icon: 'TrendingUp' },
        s4('div', { className: 'barchart' }, D4.FLUJO.map((f, i) => s4('div', { key: i, className: 'barchart__col' },
          s4('div', { className: 'barchart__bars' }, s4('div', { className: 'barchart__bar barchart__bar--cobrado', style: { height: (f.cobrado / maxFlujo * 150) + 'px', width: 22 } })),
          s4('div', { className: 'barchart__label' }, f.mes),
        ))),
      ),
    ),

    s4('div', { className: 'grid-2' },
      s4(C4, { title: 'Gastos por proveedor', icon: 'Briefcase', body: false },
        s4('div', { style: { padding: '8px 6px' } }, D4.PROVEEDORES.map((p, i) => s4('div', { key: i, style: { padding: '11px 14px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' } },
          s4('div', { className: 'row row--between', style: { marginBottom: 6 } },
            s4('div', null, s4('span', { className: 'fw-600', style: { fontSize: 13 } }, p.nombre), s4('span', { className: 'muted', style: { fontSize: 12 } }, ' · ' + p.cat)),
            s4('span', { className: 'money fw-700', style: { fontSize: 13 } }, D4.fmtMXN(p.monto)),
          ),
          s4('div', { className: 'progress-track' }, s4('div', { className: 'progress-fill', style: { width: p.pct + '%' } })),
        ))),
      ),
      s4('div', { className: 'stack' },
        s4(C4, { title: 'Morosidad por antigüedad', icon: 'AlertTriangle', iconTone: 'red' },
          s4('div', { className: 'kv-list' }, D4.MOROSIDAD_ANT.map((m, i) => s4('div', { key: i, className: 'kv-row' },
            s4('span', { className: 'kv-row__k row', style: { gap: 8 } }, s4('span', { className: `badge badge--${m.color}` }, m.unidades + ' u.'), m.rango),
            s4('span', { className: 'kv-row__v money money--neg' }, D4.fmtMXN(m.monto)),
          ))),
        ),
        s4(C4, { title: 'Mantenimiento abierto', icon: 'Wrench', iconTone: 'sky' },
          s4('div', { className: 'row', style: { gap: 20 } },
            s4('div', null, s4('div', { className: 'fw-700', style: { fontSize: 28, letterSpacing: '-0.03em' } }, '18'), s4('div', { className: 'muted', style: { fontSize: 12 } }, 'tickets abiertos')),
            s4('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 7 } },
              [['Alta', 3, 'red'], ['Media', 7, 'amber'], ['Baja', 8, 'teal']].map((r, i) => s4('div', { key: i },
                s4('div', { className: 'row row--between', style: { fontSize: 11.5, marginBottom: 3 } }, s4('span', { className: 'muted' }, r[0]), s4('span', { className: 'fw-600' }, r[1])),
                s4('div', { className: 'progress-track', style: { height: 5 } }, s4('div', { className: `progress-fill progress-fill--${r[2]}`, style: { width: (r[1] / 18 * 100) + '%' } })),
              )),
            ),
          ),
        ),
      ),
    ),
  );
}

// ============ CONFIGURACIÓN ============
function Config({ showToast }) {
  const [sw, setSw] = useState4({ recargos: true, recordatorios: true, pronto: false, qr: true });
  const toggle = k => setSw(s => ({ ...s, [k]: !s[k] }));
  const sectionCard = (title, icon, children) => s4(C4, { title, icon }, children);

  return s4('main', { className: 'page fade-in' },
    s4(PH4, { route: 'config', actions: [s4('span', { key: 0, className: 'badge badge--teal', style: { alignSelf: 'center' } }, s4(I4, { name: 'Lock', size: 13 }), 'Instancia privada · V1')] }),
    s4('div', { className: 'grid-2' },
      sectionCard('Datos de la comunidad', 'Building2',
        s4('div', { className: 'kv-list' },
          s4('div', { className: 'kv-row' }, s4('span', { className: 'kv-row__k' }, 'Nombre'), s4('span', { className: 'kv-row__v' }, 'Administración Demo Condo')),
          s4('div', { className: 'kv-row' }, s4('span', { className: 'kv-row__k' }, 'Comunidades'), s4('span', { className: 'kv-row__v' }, '2 · 174 unidades')),
          s4('div', { className: 'kv-row' }, s4('span', { className: 'kv-row__k' }, 'Moneda'), s4('span', { className: 'kv-row__v' }, 'MXN · Peso mexicano')),
          s4('div', { className: 'kv-row' }, s4('span', { className: 'kv-row__k' }, 'Zona horaria'), s4('span', { className: 'kv-row__v' }, 'America/Mexico_City')),
        ),
      ),
      sectionCard('Cuotas y recargos', 'Coins',
        s4('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
          [['Cuota ordinaria · Depto', '$2,100 / mes'], ['Cuota ordinaria · Casa', '$2,100 / mes'], ['Extraordinaria · Fachada', '$1,500 · vigente']].map((r, i) =>
            s4('div', { key: i, className: 'row row--between', style: { padding: '10px 0', borderBottom: '1px solid var(--border)' } }, s4('span', { style: { fontSize: 13 } }, r[0]), s4('span', { className: 'money fw-600', style: { fontSize: 13 } }, r[1]))),
          s4('div', { className: 'row row--between', style: { padding: '12px 0 2px' } }, s4('div', null, s4('div', { className: 'fw-600', style: { fontSize: 13 } }, 'Recargo automático por mora'), s4('div', { className: 'muted', style: { fontSize: 11.5 } }, '$600 tras 15 días')), s4('div', { className: 'switch' + (sw.recargos ? ' switch--on' : ''), onClick: () => toggle('recargos') })),
        ),
      ),
      sectionCard('Usuarios y roles', 'Users',
        s4('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
          [['Admin Demo', 'Administrador', 'teal'], ['Comité Demo', 'Comité', 'sky'], ['Vigilancia Demo', 'Vigilancia', 'slate'], ['Residente Demo 02', 'Residente', 'amber']].map((u, i) =>
            s4('div', { key: i, className: 'row row--between', style: { padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' } },
              s4('div', { className: 'row', style: { gap: 10 } }, s4(AV4, { name: u[0], size: 'sm', tone: u[2] }), s4('span', { className: 'fw-600', style: { fontSize: 13 } }, u[0])),
              s4('span', { className: `badge badge--${u[2] === 'slate' ? 'slate' : u[2]}` }, u[1]),
            )),
          s4('button', { className: 'btn btn--soft btn--sm', style: { marginTop: 10 }, onClick: () => showToast('Demo: invitar usuario') }, s4(I4, { name: 'Plus', size: 14 }), 'Invitar usuario'),
        ),
      ),
      sectionCard('Métodos de pago', 'Wallet',
        s4('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
          ['Transferencia / SPEI', 'Depósito en ventanilla', 'Efectivo en caja', 'Tarjeta (TPV)'].map((m, i) =>
            s4('div', { key: i, className: 'row row--between', style: { padding: '9px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' } }, s4('span', { className: 'row', style: { gap: 9, fontSize: 13 } }, s4('span', { className: 'icon-chip icon-chip--slate', style: { width: 28, height: 28 } }, s4(I4, { name: 'Wallet', size: 14 })), m), s4(B4, { tone: 'green', dot: true }, 'Activo'))),
        ),
      ),
      sectionCard('Automatizaciones', 'Bolt',
        s4('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } },
          [['recordatorios', 'Recordatorios de pago', 'Aviso 3 días antes del corte'], ['pronto', 'Descuento por pronto pago', '5% antes del día 5'], ['qr', 'Caducidad automática de QR', 'Expira al terminar la vigencia']].map((r, i) =>
            s4('div', { key: i, className: 'row row--between', style: { padding: '11px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' } },
              s4('div', null, s4('div', { className: 'fw-600', style: { fontSize: 13 } }, r[1]), s4('div', { className: 'muted', style: { fontSize: 11.5 } }, r[2])),
              s4('div', { className: 'switch' + (sw[r[0]] ? ' switch--on' : ''), onClick: () => toggle(r[0]) }),
            )),
        ),
      ),
      sectionCard('Respaldos y datos', 'Database',
        s4('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
          s4('div', { className: 'banner banner--teal', style: { fontSize: 12.5 } }, s4('span', { className: 'banner__icon' }, s4(I4, { name: 'ShieldCheck', size: 15 })), s4('div', null, s4('span', { className: 'fw-700' }, 'Instancia privada. '), 'Tus datos viven solo en esta instancia. No es multi-tenant en V1.')),
          s4('div', { className: 'row', style: { gap: 8 } },
            s4('button', { className: 'btn btn--secondary btn--block', onClick: () => showToast('Demo: exportando datos') }, s4(I4, { name: 'Download', size: 15 }), 'Exportar datos'),
            s4('button', { className: 'btn btn--ghost btn--block', onClick: () => showToast('Demo: respaldo creado') }, s4(I4, { name: 'Database', size: 15 }), 'Respaldo'),
          ),
        ),
      ),
    ),
  );
}

window.Screens = Object.assign(window.Screens || {}, { Comunicados, Accesos, Reportes, Config });
