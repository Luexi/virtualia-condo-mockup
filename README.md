# Virtualia Condo Concept

Mockup estático high-fidelity de una app web para gestión de condominios en México.

## Aviso de demo

- Demo visual.
- Datos ficticios.
- Sin backend.
- Sin autenticación real.
- Sin pagos reales.
- Sin conexión bancaria.
- Sin SQLite.
- Sin Better Auth.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deploy en GitHub Pages

1. En GitHub, abrir Settings > Pages.
2. En Source, elegir GitHub Actions.
3. Hacer push a `main`.
4. Revisar la URL publicada por el workflow.

La app usa navegación hash, por ejemplo `#/dashboard`, para evitar 404 al refrescar en GitHub Pages.

## Estructura

- `src/components`: shell, navegación, topbar y componentes reutilizables.
- `src/screens`: pantallas de la demo.
- `src/data/mockData.js`: datos ficticios seguros.
- `src/lib`: rutas, formato y estado demo.
- `src/styles`: tokens, base, layout, componentes y pantallas.
- `legacy/claude-export`: export original conservado como referencia.

## Editar pantallas

Cada pantalla tiene un archivo público en `src/screens`. Algunas pantallas comparten módulos internos para preservar el mockup original con cambios controlados.

## Editar datos mock

Edita `src/data/mockData.js`. No uses nombres, teléfonos, correos, cuentas bancarias, RFC, CLABE, secretos ni tokens reales.
