/* global React, ReactDOM, UI, Icons */
const { useState, useEffect, createElement: e } = React;
const { Logo, Badge, Avatar, Ic, useToast } = UI;
const D = window.DATA;

const NAV = [
  { group: 'Operación', items: [
    { id: 'inicio', label: 'Inicio', icon: 'Home' },
    { id: 'unidades', label: 'Unidades', icon: 'Building' },
    { id: 'cobranza', label: 'Cobranza', icon: 'Coins' },
    { id: 'validar', label: 'Pagos por validar', icon: 'Wallet', badge: 9, badgeTone: 'amber' },
  ]},
  { group: 'Comunidad', items: [
    { id: 'mantenimiento', label: 'Mantenimiento', icon: 'Wrench', badge: 18 },
    { id: 'albercas', label: 'Albercas', icon: 'Waves' },
    { id: 'amenidades', label: 'Amenidades', icon: 'CalendarCheck' },
    { id: 'comunicados', label: 'Comunicados', icon: 'Megaphone' },
    { id: 'accesos', label: 'Accesos', icon: 'KeyRound' },
  ]},
  { group: 'Análisis', items: [
    { id: 'reportes', label: 'Reportes', icon: 'ChartPie' },
  ]},
  { group: 'General', items: [
    { id: 'config', label: 'Configuración', icon: 'Settings' },
  ]},
];

const PAGE_META = {
  inicio: { title: 'Inicio', sub: '¿Qué necesita atención hoy?' },
  unidades: { title: 'Unidades', sub: '174 unidades en dos comunidades · propietarios, inquilinos y saldos.' },
  estado: { title: 'Estado de cuenta', sub: 'Detalle financiero de la unidad: saldo, cargos, pagos y comprobantes.' },
  cobranza: { title: 'Cobranza', sub: 'El corazón financiero de la comunidad: cuotas, recargos y morosidad.' },
  validar: { title: 'Pagos por validar', sub: 'Revisa comprobantes con trazabilidad y deja registro de cada decisión.' },
  mantenimiento: { title: 'Mantenimiento', sub: 'Tickets, prioridades y mantenimiento preventivo.' },
  albercas: { title: 'Albercas', sub: 'Bitácora química y de servicio por alberca.' },
  amenidades: { title: 'Amenidades', sub: 'Reservas, calendario y reglas de uso.' },
  comunicados: { title: 'Comunicados y documentos', sub: 'Avisos segmentados, confirmación de lectura y archivo de la comunidad.' },
  accesos: { title: 'Accesos y visitantes', sub: 'QR de visitantes, autorizaciones y bitácora de caseta.' },
  reportes: { title: 'Reportes para comité', sub: 'Vista ejecutiva de ingresos, egresos, flujo y morosidad.' },
  config: { title: 'Configuración', sub: 'Comunidad, cuotas, usuarios, permisos e instancia.' },
};

function TenantSelector({ active, onChange }) {
  const [open, setOpen] = useState(false);
  const com = D.COMMUNITIES.find(c => c.id === active) || { name: 'Ambas comunidades', units: 174, kind: 'Instancia privada' };
  return e('div', { style: { position: 'relative' } },
    e('button', { className: 'tenant-selector', onClick: () => setOpen(o => !o) },
      e('span', { className: 'tenant-selector__icon-wrap' }, e(Ic, { name: 'Layers', size: 16 })),
      e('div', { style: { textAlign: 'left' } },
        e('div', null, com.name),
        e('div', { className: 'tenant-selector__sub' }, active === 'all' ? '174 unidades · 2 comunidades' : `${com.units} ${com.unitWord || ''}`),
      ),
      e('span', { className: 'tenant-selector__chevron' }, e(Ic, { name: 'ChevronDown', size: 16 })),
    ),
    open && e(React.Fragment, null,
      e('div', { style: { position: 'fixed', inset: 0, zIndex: 55 }, onClick: () => setOpen(false) }),
      e('div', { className: 'tenant-menu' },
        e('button', { className: 'tenant-menu__item' + (active === 'all' ? ' tenant-menu__item--active' : ''), onClick: () => { onChange('all'); setOpen(false); } },
          e('span', { className: 'tenant-selector__icon-wrap' }, e(Ic, { name: 'Layers', size: 16 })),
          e('div', { style: { textAlign: 'left' } }, e('div', { className: 'fw-600' }, 'Ambas comunidades'), e('div', { className: 'tenant-selector__sub' }, '174 unidades')),
        ),
        D.COMMUNITIES.map(c => e('button', { key: c.id, className: 'tenant-menu__item' + (active === c.id ? ' tenant-menu__item--active' : ''), onClick: () => { onChange(c.id); setOpen(false); } },
          e('span', { className: `tenant-selector__icon-wrap`, style: c.color === 'sky' ? { background: 'var(--sky-50)', color: 'var(--sky-600)' } : {} }, e(Ic, { name: c.icon, size: 16 })),
          e('div', { style: { textAlign: 'left' } }, e('div', { className: 'fw-600' }, c.name), e('div', { className: 'tenant-selector__sub' }, `${c.units} ${c.unitWord} · ${c.city}`)),
        )),
      ),
    ),
  );
}

function Sidebar({ route, setRoute, onLogout, onResident }) {
  return e('aside', { className: 'sidebar' },
    e('div', { className: 'sidebar__brand' },
      e(Logo),
      e('button', { className: 'sidebar__collapse', title: 'Colapsar' }, e(Ic, { name: 'ChevronLeft', size: 16 })),
    ),
    e('nav', { className: 'sidebar__nav' },
      NAV.map(g => e('div', { key: g.group },
        e('div', { className: 'sidebar__group-label' }, g.group),
        g.items.map(it => e('button', {
          key: it.id,
          className: 'nav-item' + (route === it.id || (route === 'estado' && it.id === 'unidades') ? ' nav-item--active' : ''),
          onClick: () => setRoute(it.id),
        },
          e('span', { className: 'nav-item__icon' }, e(Ic, { name: it.icon, size: 20 })),
          e('span', null, it.label),
          it.badge && e('span', { className: 'nav-item__badge' + (it.badgeTone ? ` nav-item__badge--${it.badgeTone}` : '') }, it.badge),
        )),
      )),
      e('button', { className: 'nav-item', onClick: onResident },
        e('span', { className: 'nav-item__icon' }, e(Ic, { name: 'UserCircle', size: 20 })),
        e('span', null, 'Portal de residente'),
        e('span', { className: 'right' }, e(Ic, { name: 'ArrowRight', size: 15 })),
      ),
      e('button', { className: 'nav-item', onClick: onLogout },
        e('span', { className: 'nav-item__icon' }, e(Ic, { name: 'LogOut', size: 20 })),
        e('span', null, 'Cerrar sesión'),
      ),
    ),
    e('div', { className: 'sidebar__footer' },
      e('div', { className: 'promo' },
        e('div', { className: 'promo__title' }, 'Reporte del comité'),
        e('div', { className: 'promo__text' }, 'Prepara el cierre mensual con un clic y compártelo en PDF.'),
        e('button', { className: 'promo__btn', onClick: () => setRoute('reportes') }, e(Ic, { name: 'Sparkles', size: 15 }), 'Preparar'),
      ),
    ),
  );
}

function Topbar({ tenant, setTenant, onLogout }) {
  return e('header', { className: 'topbar' },
    e(TenantSelector, { active: tenant, onChange: setTenant }),
    e('div', { className: 'search' },
      e('span', { className: 'search__icon' }, e(Ic, { name: 'Search', size: 17 })),
      e('input', { placeholder: 'Buscar unidad, residente, pago, ticket…' }),
      e('span', { className: 'search__kbd' }, '⌘K'),
    ),
    e('div', { className: 'top-actions' },
      e('button', { className: 'icon-btn', title: 'Ayuda' }, e(Ic, { name: 'Help', size: 19 })),
      e('button', { className: 'icon-btn', title: 'Mensajes' }, e(Ic, { name: 'Mail', size: 19 }), e('span', { className: 'icon-btn__dot icon-btn__dot--teal' }, '2')),
      e('button', { className: 'icon-btn', title: 'Notificaciones' }, e(Ic, { name: 'Bell', size: 19 }), e('span', { className: 'icon-btn__dot' }, '3')),
      e('div', { className: 'top-profile', onClick: onLogout, title: 'Admin Demo · cerrar sesión' },
        e('div', { className: 'top-avatar' }, 'AM'),
        e('span', { className: 'user-card__chevron' }, e(Ic, { name: 'ChevronDown', size: 15 })),
      ),
    ),
  );
}

function Login({ onEnter }) {
  return e('div', { className: 'login' },
    e('div', { className: 'login__aside' },
      e(Logo, { size: 'lg', onDark: true }),
      e('div', { className: 'login__quote' }, 'La administración de tu comunidad, ', e('span', null, 'clara y bajo control'), '.'),
      e('div', { className: 'login__meta' },
        e('div', { className: 'login__stat' }, e('div', { style: { width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', color: '#57BFA4' } }, e(Ic, { name: 'Building2', size: 20 })), e('div', null, e('div', { className: 'login__stat-num' }, '174'), e('div', { className: 'login__stat-label' }, 'unidades en 2 comunidades'))),
        e('div', { className: 'login__stat' }, e('div', { style: { width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', color: '#57BFA4' } }, e(Ic, { name: 'ShieldCheck', size: 20 })), e('div', null, e('div', { className: 'login__stat-num' }, 'Instancia privada'), e('div', { className: 'login__stat-label' }, 'Acceso solo por invitación'))),
      ),
    ),
    e('div', { className: 'login__main' },
      e('form', { className: 'login__card', onSubmit: (ev) => { ev.preventDefault(); onEnter(); } },
        e('div', { className: 'login__lock' }, e(Ic, { name: 'Lock', size: 13 }), 'Instancia privada'),
        e('div', null,
          e('h1', { style: { fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 6px' } }, 'Inicia sesión'),
          e('p', { className: 'muted', style: { margin: 0, fontSize: 14 } }, 'Bienvenido de vuelta. Ingresa con tu cuenta autorizada.'),
        ),
        e('div', { className: 'field' }, e('label', { className: 'field__label' }, 'Correo'), e('input', { className: 'field__input', type: 'email', defaultValue: 'admin@demo.condo', autoComplete: 'off' })),
        e('div', { className: 'field' }, e('label', { className: 'field__label' }, 'Contraseña'), e('input', { className: 'field__input', type: 'password', defaultValue: '••••••••' })),
        e('div', { className: 'row row--between' },
          e('label', { className: 'row', style: { gap: 8, fontSize: 13, cursor: 'pointer' } }, e('input', { type: 'checkbox', defaultChecked: true }), 'Recordar este equipo'),
          e('a', { className: 'card__link', href: '#' }, '¿Olvidaste tu acceso?'),
        ),
        e('button', { className: 'btn btn--primary btn--lg btn--block', type: 'submit' }, 'Entrar', e(Ic, { name: 'ArrowRight', size: 16 })),
        e('div', { className: 'banner banner--teal', style: { fontSize: 12 } }, e('span', { className: 'banner__icon' }, e(Ic, { name: 'Info', size: 16 })), 'Mockup demo · sin autenticación real. Cualquier dato es ficticio.'),
      ),
    ),
  );
}

function App() {
  const [view, setView] = useState('login'); // login | admin | resident
  const [route, setRoute] = useState('inicio');
  const [tenant, setTenant] = useState('all');
  const [detail, setDetail] = useState(null); // unit for estado de cuenta
  const [showToast, toastNode] = useToast();

  useEffect(() => { document.querySelector('.main')?.scrollTo?.(0, 0); window.scrollTo(0, 0); }, [route]);

  if (view === 'login') return e(React.Fragment, null, e(Login, { onEnter: () => { setView('admin'); setRoute('inicio'); } }));
  if (view === 'resident') return e(React.Fragment, null, e(window.Screens.Residente, { onBack: () => setView('admin'), showToast }), toastNode);

  const S = window.Screens;
  const ctx = { tenant, route, setRoute, showToast, detail, setDetail };
  let content;
  if (route === 'inicio') content = e(S.Inicio, ctx);
  else if (route === 'unidades') content = e(S.Unidades, ctx);
  else if (route === 'estado') content = e(S.EstadoCuenta, ctx);
  else if (route === 'cobranza') content = e(S.Cobranza, ctx);
  else if (route === 'validar') content = e(S.Validar, ctx);
  else if (route === 'mantenimiento') content = e(S.Mantenimiento, ctx);
  else if (route === 'albercas') content = e(S.Albercas, ctx);
  else if (route === 'amenidades') content = e(S.Amenidades, ctx);
  else if (route === 'comunicados') content = e(S.Comunicados, ctx);
  else if (route === 'accesos') content = e(S.Accesos, ctx);
  else if (route === 'reportes') content = e(S.Reportes, ctx);
  else if (route === 'config') content = e(S.Config, ctx);

  const meta = PAGE_META[route === 'estado' ? 'unidades' : route];

  return e(React.Fragment, null,
    e('div', { className: 'app' },
      e(Sidebar, { route, setRoute: (r) => { setDetail(null); setRoute(r); }, onLogout: () => setView('login'), onResident: () => setView('resident') }),
      e('div', { className: 'main' },
        e(Topbar, { tenant, setTenant, onLogout: () => setView('login') }),
        content,
      ),
    ),
    toastNode,
  );
}

window.App = App;
window.PAGE_META = PAGE_META;
