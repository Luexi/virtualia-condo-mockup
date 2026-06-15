/* global React, Icons */
const { createElement: e, useState } = React;

// ---- Logo: geometric tower/condo mark ----
function CondoMark({ size = 22 }) {
  return e('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' },
    // tower (tall) + house (short) abstract — white on teal tile
    e('rect', { x: 4, y: 3, width: 7, height: 18, rx: 1.4, fill: '#fff', opacity: 0.95 }),
    e('path', { d: 'M13 9.2 L17.5 5.6 L22 9.2 V21 H13 Z', fill: '#fff', opacity: 0.78 }),
    e('rect', { x: 6, y: 6, width: 1.6, height: 1.6, rx: 0.4, fill: '#0B7359' }),
    e('rect', { x: 8.4, y: 6, width: 1.6, height: 1.6, rx: 0.4, fill: '#0B7359' }),
    e('rect', { x: 6, y: 9.5, width: 1.6, height: 1.6, rx: 0.4, fill: '#0B7359' }),
    e('rect', { x: 8.4, y: 9.5, width: 1.6, height: 1.6, rx: 0.4, fill: '#0B7359' }),
    e('rect', { x: 6, y: 13, width: 1.6, height: 1.6, rx: 0.4, fill: '#0B7359' }),
    e('rect', { x: 8.4, y: 13, width: 1.6, height: 1.6, rx: 0.4, fill: '#0B7359' }),
    e('rect', { x: 16.4, y: 13.5, width: 2, height: 7.5, rx: 0.4, fill: '#0E8C6F' }),
  );
}

function Logo({ size, onDark }) {
  const lg = size === 'lg';
  return e('div', { className: 'vlogo' + (onDark ? ' vlogo--on-dark' : '') + (lg ? ' vlogo--lg' : '') },
    e('span', { className: 'vlogo__mark' }, e(CondoMark, { size: lg ? 30 : 22 })),
    e('span', { className: 'vlogo__divider' }),
    e('div', { className: 'vlogo__stack' },
      e('span', { className: 'vlogo__name' }, 'Condo'),
      e('span', { className: 'vlogo__byline' }, 'by ', e('strong', null, 'Virtualia')),
    ),
  );
}

// ---- Badge ----
function Badge({ tone = 'slate', children, dot }) {
  return e('span', { className: `badge badge--${tone}` }, dot && e('span', { className: 'badge__dot' }), children);
}

const ESTADO_BADGE = {
  corriente: { tone: 'green', label: 'Al corriente' },
  moroso: { tone: 'red', label: 'Moroso' },
  pendiente: { tone: 'amber', label: 'Por validar' },
};

// ---- Avatar with initials ----
function Avatar({ name, size, tone }) {
  const initials = (name || '?').split(' ').filter(w => /[A-Za-z0-9]/.test(w)).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const cls = 'av' + (size ? ` av--${size}` : '') + (tone ? ` av--${tone}` : '');
  return e('div', { className: cls }, initials || '··');
}

// ---- Icon helper ----
function Ic({ name, size = 18, sw = 1.8, ...rest }) {
  const C = Icons[name];
  return C ? e(C, { size, strokeWidth: sw, ...rest }) : null;
}

// ---- Money ----
function Money({ value, className = '' }) {
  const { fmtMXN } = window.DATA;
  const neg = value < 0;
  return e('span', { className: `money ${neg ? 'money--neg' : ''} ${className}` }, fmtMXN(value));
}

// ---- Sparkline bars ----
function Spark({ data, tallIdx }) {
  return e('div', { className: 'kpi__spark' },
    data.map((v, i) => e('span', { key: i, className: i === tallIdx ? 'tall' : '', style: { height: v + '%' } })),
  );
}

// ---- QR placeholder (deterministic grid) ----
function QR({ seed = 7, size = 120 }) {
  const cells = [];
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const n = 11;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const corner = (x < 3 && y < 3) || (x > n - 4 && y < 3) || (x < 3 && y > n - 4);
    if (corner) continue;
    if (rnd() > 0.52) cells.push(e('rect', { key: `${x}-${y}`, x: x * 9 + 2, y: y * 9 + 2, width: 8, height: 8, rx: 1.5, fill: '#0E2E3A' }));
  }
  const finder = (cx, cy) => e('g', { key: `f${cx}${cy}` },
    e('rect', { x: cx, y: cy, width: 25, height: 25, rx: 4, fill: 'none', stroke: '#0E2E3A', strokeWidth: 3 }),
    e('rect', { x: cx + 7, y: cy + 7, width: 11, height: 11, rx: 2, fill: '#0E8C6F' }),
  );
  return e('svg', { viewBox: '0 0 105 105', width: size, height: size },
    cells, finder(2, 2), finder(78, 2), finder(2, 78),
  );
}

// ---- Toast ----
function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); };
  const node = toast ? e('div', { className: 'toast' }, e('span', { className: 'toast__icon' }, e(Ic, { name: 'CheckCircle', size: 16 })), toast) : null;
  return [show, node];
}

// ---- Page header ----
function PageHeader({ route, actions, crumbs }) {
  const meta = (window.PAGE_META || {})[route] || {};
  return e('div', { className: 'page-header' },
    crumbs && e('div', { className: 'breadcrumb' }, crumbs),
    e('div', { className: 'page-header__row' },
      e('div', null,
        e('h1', null, meta.title),
        meta.sub && e('p', null, meta.sub),
      ),
      actions && e('div', { className: 'page-header__actions' }, actions),
    ),
  );
}

// ---- Card ----
function Card({ title, sub, icon, iconTone = 'teal', headerRight, children, footer, className = '', body = true, style }) {
  return e('div', { className: 'card ' + className, style },
    title && e('div', { className: 'card__header' },
      e('div', { className: 'card__title' },
        icon && e('span', { className: `icon-chip icon-chip--${iconTone}`, style: { width: 30, height: 30 } }, e(Ic, { name: icon, size: 16 })),
        e('div', null, title, sub && e('div', { className: 'card__title-sub' }, sub)),
      ),
      headerRight,
    ),
    body ? e('div', { className: 'card__body' }, children) : children,
    footer && e('div', { className: 'card__footer' }, footer),
  );
}

window.UI = { Logo, CondoMark, Badge, ESTADO_BADGE, Avatar, Ic, Money, Spark, QR, useToast, PageHeader, Card };
