# Design Audit

## Conservado del diseno Claude

- Estetica SaaS sobria con acento teal y fondos calidos.
- Sidebar operativo, topbar, KPIs, tablas, badges, cards y portal residente movil.
- Modulos diferenciadores: cobranza, validacion de pagos, albercas y reportes para comite.

## Limpieza aplicada

- Migracion de globals/CDN/Babel a ES modules y Vite.
- Rutas hash estables para GitHub Pages.
- Datos mock centralizados y contactos demo no reales.
- Documentacion de alcance y honestidad de demo.

## Refresh visual (pulido tipografico + densidad)

- Tipografia principal: Plus Jakarta Sans (reemplaza Manrope); se conservan Familjen
  Grotesk (byline) y JetBrains Mono (cifras).
- Se conserva la identidad calida y el acento teal #0E8C6F (sin cambio de paleta).
- Densidad equilibrada: base 15px, mas aire y respiracion en page, topbar, nav, cards,
  KPIs y tablas (paddings/gaps mayores) sin sacrificar eficiencia de backoffice.
- Todo via tokens (`tokens.css`, `base.css`, `layout.css`, `components.css`); sin cambios
  de logica, datos ni dependencias npm.

## Modulo Mapa (diorama isometrico interactivo)

- Seccion "Mapa" (`#/mapa`): vista tipo videojuego del condominio. La ilustracion ES el
  mapa (diorama isometrico 3D generado por IA) y encima se superpone una capa interactiva.
- Imagenes en `src/assets/mapa-lago.png` (Privada Lago Azul) y `mapa-cedro.png` (Torre
  Cedro), importadas como modulos (Vite las hashea y respeta el base de GitHub Pages).
- Hotspots (pines) posicionados por porcentaje (`xPct/yPct`) sobre cada render, calibrados
  a mano: techos detectados por analisis de imagen (teja naranja) y centroides de alberca
  turquesa. Es un subconjunto curado (~14-18 por mapa), no todas las unidades.
- Estilo hibrido: pines visibles coloreados por estado + halo/zona que se ilumina al
  hover/focus. Las capas (Cobranza/Mantenimiento/Ocupacion) recolorean los pines en vivo;
  overlays de Amenidades/Accesos. Popover anclado con saldo, estado, propietario,
  incidencias y accesos directos (estado de cuenta, registrar pago).
- Integra las unidades reales del mock (A-204, Casa 37, etc.) para que el mapa cuadre con
  Unidades/Cobranza. Helpers reutilizados: `unitClass`, `legendFor`, `mapSummary`.
- Demo visual: la ilustracion es fija y subida a mano; el sistema no genera ni modifica el
  mapa. Datos ficticios.

## Pendientes de diseno

- Revision fina de pantallas con usuarios reales de negocio.
- Ajustar copy tras feedback del jefe/cliente.
- Definir si el portal residente debe ser responsive completo o mantener metafora movil.
