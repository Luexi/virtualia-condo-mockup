/* global React, UI */
const { createElement: sr, useState: useStateR } = React;
const DR = window.DATA;
const { Ic: IR, Logo: LogoR, Badge: BR } = UI;

function Residente({ onBack, showToast }) {
  const [tab, setTab] = useStateR('inicio');
  const saldo = -2100;

  const Quick = ({ icon, label, onClick }) => sr('button', { className: 'r-quick__item', onClick },
    sr('span', { className: 'r-quick__icon' }, sr(IR, { name: icon, size: 21 })),
    sr('span', { className: 'r-quick__label' }, label),
  );

  const inicio = sr(React.Fragment, null,
    sr('div', { className: 'r-balance' },
      sr('div', { style: { position: 'relative', zIndex: 1 } },
        sr('div', { style: { fontSize: 12.5, color: 'rgba(255,255,255,0.66)' } }, 'Mi saldo · Depto A-204'),
        sr('div', { style: { fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 4, fontFamily: 'var(--font-mono)', color: '#FF9B8A' } }, DR.fmtMXN(saldo)),
        sr('div', { className: 'row', style: { gap: 8, marginTop: 10 } },
          sr('span', { className: 'badge', style: { background: 'rgba(255,255,255,0.12)', color: '#fff' } }, sr('span', { className: 'badge__dot', style: { background: '#FFB4A6' } }), 'Cuota de mayo pendiente'),
        ),
        sr('button', { className: 'btn btn--primary btn--block', style: { marginTop: 16 }, onClick: () => showToast('Demo: ir a pagar') }, sr(IR, { name: 'Wallet', size: 16 }), 'Pagar ahora'),
      ),
    ),
    sr('div', { className: 'r-quick' },
      sr(Quick, { icon: 'Wallet', label: 'Pagar', onClick: () => showToast('Demo: pagar / subir comprobante') }),
      sr(Quick, { icon: 'Wrench', label: 'Reportar', onClick: () => showToast('Demo: reportar incidencia') }),
      sr(Quick, { icon: 'CalendarCheck', label: 'Reservar', onClick: () => showToast('Demo: reservar amenidad') }),
      sr(Quick, { icon: 'KeyRound', label: 'Visita', onClick: () => showToast('Demo: autorizar visita') }),
    ),
    sr('div', { className: 'r-card' },
      sr('div', { className: 'row row--between', style: { marginBottom: 12 } }, sr('span', { className: 'fw-700', style: { fontSize: 14 } }, 'Comunicados'), sr('button', { className: 'card__link', style: { fontSize: 12 } }, 'Ver todos')),
      sr('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } }, DR.COMUNICADOS.slice(0, 2).map((c, i) => sr('div', { key: i, className: 'row', style: { gap: 11 } },
        sr('span', { className: `icon-chip ${c.prioridad === 'alta' ? 'icon-chip--red' : 'icon-chip--teal'}`, style: { width: 34, height: 34 } }, sr(IR, { name: 'Megaphone', size: 15 })),
        sr('div', null, sr('div', { className: 'fw-600', style: { fontSize: 13 } }, c.titulo), sr('div', { className: 'muted', style: { fontSize: 11.5 } }, c.fecha)),
      ))),
    ),
    sr('div', { className: 'r-card' },
      sr('div', { className: 'row row--between', style: { marginBottom: 12 } }, sr('span', { className: 'fw-700', style: { fontSize: 14 } }, 'Mis recibos'), sr('button', { className: 'card__link', style: { fontSize: 12 } }, 'Historial')),
      sr('div', { style: { display: 'flex', flexDirection: 'column', gap: 2 } }, DR.RES_RECIBOS.map((r, i) => sr('div', { key: i, className: 'row row--between', style: { padding: '9px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' } },
        sr('div', { className: 'row', style: { gap: 9 } }, sr('span', { className: 'icon-chip icon-chip--slate', style: { width: 30, height: 30 } }, sr(IR, { name: 'Receipt', size: 14 })), sr('span', { style: { fontSize: 13, fontWeight: 500 } }, r.mes)),
        sr('div', { className: 'row', style: { gap: 8 } }, sr('span', { className: 'money', style: { fontSize: 12.5 } }, DR.fmtMXN(r.monto)), sr(BR, { tone: r.estado === 'pagado' ? 'green' : 'amber' }, r.estado === 'pagado' ? 'Pagado' : 'Pendiente')),
      ))),
    ),
  );

  const pagar = sr(React.Fragment, null,
    sr('div', { className: 'r-card' },
      sr('div', { className: 'fw-700', style: { fontSize: 15, marginBottom: 4 } }, 'Pagar cuota'),
      sr('div', { className: 'muted', style: { fontSize: 12.5, marginBottom: 14 } }, 'Sube tu comprobante para validación del administrador.'),
      sr('div', { className: 'field' }, sr('label', { className: 'field__label' }, 'Monto'), sr('input', { className: 'field__input', defaultValue: '$2,100.00' })),
      sr('div', { className: 'field', style: { marginTop: 10 } }, sr('label', { className: 'field__label' }, 'Método'), sr('select', { className: 'field__select' }, sr('option', null, 'Transferencia / SPEI'), sr('option', null, 'Depósito'), sr('option', null, 'Efectivo'))),
      sr('div', { className: 'ph', style: { height: 130, marginTop: 12, flexDirection: 'column', gap: 6 } }, sr(IR, { name: 'Paperclip', size: 22 }), sr('div', null, 'Adjuntar comprobante')),
      sr('button', { className: 'btn btn--primary btn--block', style: { marginTop: 14 }, onClick: () => showToast('Comprobante enviado · queda Por validar (demo)') }, sr(IR, { name: 'Send', size: 16 }), 'Enviar comprobante'),
      sr('div', { className: 'banner banner--teal', style: { fontSize: 12, marginTop: 12 } }, sr('span', { className: 'banner__icon' }, sr(IR, { name: 'Info', size: 14 })), 'Tu pago aparecerá como “Por validar” hasta que el administrador lo apruebe.'),
    ),
  );

  const mas = sr(React.Fragment, null,
    sr('div', { className: 'r-card' },
      sr('div', { className: 'fw-700', style: { fontSize: 15, marginBottom: 12 } }, 'Más opciones'),
      sr('div', { style: { display: 'flex', flexDirection: 'column', gap: 2 } },
        [['Wrench', 'Reportar incidencia'], ['CalendarCheck', 'Reservar amenidad'], ['KeyRound', 'Autorizar visita'], ['FolderOpen', 'Documentos'], ['UserCircle', 'Mi perfil']].map((r, i) =>
          sr('button', { key: i, className: 'row row--between', style: { padding: '13px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none', width: '100%', textAlign: 'left' }, onClick: () => showToast('Demo: ' + r[1]) },
            sr('span', { className: 'row', style: { gap: 11 } }, sr('span', { className: 'icon-chip icon-chip--teal', style: { width: 32, height: 32 } }, sr(IR, { name: r[0], size: 16 })), sr('span', { style: { fontSize: 13.5, fontWeight: 500 } }, r[1])),
            sr(IR, { name: 'ChevronRight', size: 16, color: 'var(--text-subtle)' }),
          )),
      ),
    ),
  );

  return sr('div', { className: 'phone-stage' },
    sr('div', { style: { display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' } },
      sr('div', { className: 'row row--between', style: { width: 390, maxWidth: '100%' } },
        sr('button', { className: 'btn btn--secondary btn--sm', onClick: onBack }, sr(IR, { name: 'ChevronLeft', size: 15 }), 'Volver al panel'),
        sr('span', { className: 'demo-tag' }, 'Portal de residente · móvil'),
      ),
      sr('div', { className: 'phone' },
        sr('div', { className: 'phone__status' }, sr('span', null, '9:41'), sr('div', { className: 'row', style: { gap: 5 } }, sr('span', null, '5G'), sr('span', null, '100%'))),
        sr('div', { style: { padding: '4px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
          sr('div', { style: { transform: 'scale(0.86)', transformOrigin: 'left' } }, sr(LogoR)),
          sr('span', { className: 'icon-btn', style: { width: 34, height: 34 } }, sr(IR, { name: 'Bell', size: 18 })),
        ),
        sr('div', { className: 'phone__scroll' }, tab === 'inicio' ? inicio : tab === 'pagar' ? pagar : mas),
        sr('div', { className: 'phone__tabbar' },
          [['inicio', 'Home', 'Inicio'], ['pagar', 'Wallet', 'Pagar'], ['mas', 'Grid', 'Más']].map(t =>
            sr('button', { key: t[0], className: 'phone__tab' + (tab === t[0] ? ' phone__tab--active' : ''), onClick: () => setTab(t[0]) }, sr(IR, { name: t[1], size: 21 }), sr('span', null, t[2]))),
        ),
      ),
    ),
  );
}

window.Screens = Object.assign(window.Screens || {}, { Residente });
