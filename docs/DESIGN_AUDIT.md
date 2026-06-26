# Design Audit

## Conservado del diseño Claude

- Estética SaaS sobria con acento teal y fondos cálidos.
- Sidebar operativo, topbar, KPIs, tablas, badges, cards y portal residente móvil.
- Modulos diferenciadores: cobranza, validación de pagos, albercas y reportes para comité.

## Limpieza aplicada

- Migración de globals/CDN/Babel a ES modules y Vite.
- Rutas hash estables para GitHub Pages.
- Datos mock centralizados y contactos demo no reales.
- Documentación de alcance y honestidad de demo.

## Refresh visual (pulido tipográfico + densidad)

- Tipografía principal: Plus Jakarta Sans (reemplaza Manrope); se conservan Familjen
  Grotesk (byline) y JetBrains Mono (cifras).
- Se conserva la identidad cálida y el acento teal #0E8C6F (sin cambio de paleta).
- Densidad equilibrada: base 15px, mas aire y respiracion en page, topbar, nav, cards,
  KPIs y tablas (paddings/gaps mayores) sin sacrificar eficiencia de backoffice.
- Todo vía tokens (`tokens.css`, `base.css`, `layout.css`, `components.css`); sin cambios
  de lógica, datos ni dependencias npm.

## Modulo Mapa (diorama isométrico interactivo)

- Sección "Mapa" (`#/mapa`): vista tipo videojuego del condominio. La ilustración ES el
  mapa (diorama isométrico 3D generado por IA) y encima se superpone una capa interactiva.
- Imágenes en `src/assets/mapa-lago.png` (Privada Lago Azul) y `mapa-cedro.png` (Torre
  Cedro), importadas como módulos (Vite las hashea y respeta el base de GitHub Pages).
- Hotspots (pines) posicionados por porcentaje (`xPct/yPct`) sobre cada render, calibrados
  a mano: techos detectados por análisis de imagen (teja naranja) y centroides de alberca
  turquesa. Es un subconjunto curado (~14-18 por mapa), no todas las unidades.
- Estilo híbrido: pines visibles coloreados por estado + halo/zona que se ilumina al
  hover/focus. Las capas (Cobranza/Mantenimiento/Ocupación) recolorean los pines en vivo;
  overlays de Amenidades/Accesos. Popover anclado con saldo, estado, propietario,
  incidencias y accesos directos (estado de cuenta, registrar pago).
- Integra las unidades reales del mock (A-204, Casa 37, etc.) para que el mapa cuadre con
  Unidades/Cobranza. Helpers reutilizados: `unitClass`, `legendFor`, `mapSummary`.
- Demo visual: la ilustración es fija y subida a mano; el sistema no genera ni modifica el
  mapa. Datos ficticios.

## Pendientes de diseño

- Revisión fina de pantallas con usuarios reales de negocio.
- Ajustar copy tras feedback del jefe/cliente.
- Definir si el portal residente debe ser responsive completo o mantener metáfora móvil.
