# Roadmap oficial de Virtualia Condo

Este roadmap ordena la evolucion de `virtualia-condo-concept`. El producto actual es
un concepto visual Vite + React para vender y validar Virtualia Condo antes de
construir backend, pagos, auth real o integraciones productivas.

Regla principal: separar con claridad lo que ya existe, lo que esta en la fase
actual y lo que sigue abierto. Este documento no debe prometer capacidades reales
cuando hoy solo existen como demo visual.

## 1. Convenciones

### 1.1 Estados de fase

- `current`: fase actual de trabajo.
- `planned`: fase futura aprobada como direccion.
- `blocked`: fase detenida por decision, datos o dependencia externa.
- `done`: fase cerrada y verificable.
- `superseded`: fase reemplazada por una direccion nueva.

### 1.2 Tipos de fase

- `concept`: exploracion visual y narrativa de producto.
- `validation`: feedback, alcance y decision comercial.
- `prototype`: funcionalidad local controlada, sin produccion.
- `mvp`: operacion real con datos, usuarios y resguardo.

### 1.3 Reglas del roadmap

- Mantener exactamente 4 fases principales.
- Marcar siempre la fase actual.
- No presentar datos ficticios como datos reales.
- No introducir backend, pagos, PDFs reales, IA real, auth real o integraciones
  sin mover explicitamente el alcance a una fase posterior.
- Cualquier cambio de fase debe actualizar objetivo, estado, entregables y
  criterios de salida.

## 2. Direccion vigente

| Fase | Nombre | Tipo | Estado |
| --- | --- | --- | --- |
| `Phase 1` | Concepto visual navegable | `concept` | `current` |
| `Phase 2` | Validacion comercial y operativa | `validation` | `planned` |
| `Phase 3` | Prototipo funcional local | `prototype` | `planned` |
| `Phase 4` | MVP operativo real | `mvp` | `planned` |

**Fase actual:** `Phase 1 - Concepto visual navegable`.

## 3. Phase 1: Concepto visual navegable

- Tipo: `concept`
- Estado: `current`
- Objetivo: tener una demo estatica, navegable y seria de Virtualia Condo para
  explicar el producto a administradores, comites y clientes potenciales.
- Resultado esperado: una experiencia de alto impacto que comunique como se verian
  las operaciones de un condominio, sin afirmar que hay infraestructura productiva.

### Alcance implementado o en hardening

- App Vite + React estatica con hash routes canonicas.
- Visual operacional SaaS: superficies calidas, acento teal, layout denso y tono
  financiero/administrativo.
- Pantallas demo para dashboard, unidades, estado de cuenta, cobranza, pagos por
  validar, mantenimiento, albercas, amenidades, comunicados, accesos, reportes,
  portal residente y configuracion.
- Mock data centralizada, datos ficticios y placeholders no publicos.
- Interacciones solo en memoria: filtros, navegacion, seleccion de unidad, modal de
  validacion de pago, tabs y toasts demo.
- Documentacion base, workflow de GitHub Pages y export original preservado en
  `legacy/claude-export/`.

### Pendiente para cerrar Phase 1

- Recorrido guiado con Luis para confirmar narrativa comercial y orden de pantallas.
- Ajuste fino de copy visible: reforzar "Concepto visual", "Datos ficticios" y
  "Sin conexion productiva" donde el usuario pueda confundirse.
- QA responsive final en desktop, tablet y movil antes de compartir con terceros.
- Revision de accesibilidad basica: foco visible, labels de botones icono y contraste.
- Definir lista corta de preguntas para validar con administradores reales.

### Criterios de salida

- `npm install`, `npm run build` y build GitHub Pages pasan.
- Todas las rutas hash cargan directo sin auth real.
- No quedan CDNs React/Babel, globals legacy, datos reales ni texto corrupto.
- La demo se puede mostrar sin explicar errores visuales, overflow o pantallas vacias.
- Luis aprueba que la demo ya comunica el concepto.

### No toca

- Backend, base de datos, auth real, pagos reales, PDFs reales, QR reales, WhatsApp,
  correo transaccional, IA real, persistencia local o integraciones externas.

## 4. Phase 2: Validacion comercial y operativa

- Tipo: `validation`
- Estado: `planned`
- Objetivo: convertir la demo en una herramienta de decision: validar dolores,
  prioridades, precio percibido y alcance minimo con usuarios objetivo.

### Alcance

- Sesiones de feedback con administradores, comites y residentes seleccionados.
- Matriz de modulos: imprescindible, deseable, diferido y descartado.
- Revision de lenguaje: que entiende un administrador, que entiende un residente y
  que se debe explicar en una demo comercial.
- Definicion de piloto: tipo de condominio, numero de unidades, roles y procesos
  reales que se quieren cubrir primero.
- Priorizacion de riesgos: cobranza, morosidad, comprobantes, accesos, documentos,
  mantenimiento, privacidad y soporte.

### Entregables

- Lista priorizada de funcionalidades para prototipo.
- Mapa de roles y permisos esperados: administrador, comite, vigilancia, residente.
- Flujo aprobado de cobranza y validacion de pagos.
- Reglas de demo: que se puede prometer y que debe quedar como futuro.
- Decision explicita de si Phase 3 se construye como app local simple o como base
  tecnica cercana al MVP.

### Criterios de salida

- Hay un alcance de piloto escrito y aprobado.
- Se conoce que modulo vende mejor el producto.
- Se identifican datos sensibles y restricciones legales/operativas basicas.
- Se decide si seguir, pausar o redirigir el producto.

### No toca

- Construccion productiva, migracion de datos reales, contratos con bancos,
  automatizaciones externas o lanzamiento publico.

## 5. Phase 3: Prototipo funcional local

- Tipo: `prototype`
- Estado: `planned`
- Objetivo: pasar de mockup visual a prototipo funcional local con datos controlados,
  flujos reales basicos y arquitectura suficiente para aprender sin cargar
  complejidad productiva.

### Alcance

- Backend local o server simple para unidades, residentes, cargos, pagos, tickets y
  documentos demo.
- Persistencia local controlada para pruebas internas, no produccion.
- Auth de prototipo con roles basicos y permisos visibles.
- CRUD minimo para unidades, cargos, pagos por validar y tickets.
- Generacion demo de estados de cuenta y reportes exportables no fiscales.
- Registro de acciones clave para simular auditoria.

### Entregables

- Prototipo instalable y ejecutable localmente.
- Datos semilla ficticios consistentes.
- Flujos funcionales: crear cargo, reportar pago, validar pago, consultar saldo,
  levantar ticket y emitir comunicado.
- Guia de demo tecnica y checklist de QA.
- Decision tecnica para Phase 4: seguir con el stack local, migrar a servicio cloud
  o redisenar antes de produccion.

### Criterios de salida

- Los flujos principales funcionan sin editar codigo.
- Las reglas financieras basicas son consistentes entre unidad, estado de cuenta y
  cobranza.
- Hay limites claros de seguridad y privacidad documentados.
- El prototipo produce suficiente aprendizaje para justificar un MVP real.

### No toca

- Datos reales de condominios, pagos productivos, facturacion fiscal, IA write-capable,
  WhatsApp productivo, QR de acceso productivo o soporte multi-condominio real.

## 6. Phase 4: MVP operativo real

- Tipo: `mvp`
- Estado: `planned`
- Objetivo: lanzar una primera version operativa para un condominio piloto con
  usuarios reales, datos reales y controles minimos de seguridad, respaldo y soporte.

### Alcance

- Auth real, roles, permisos y separacion de datos del condominio piloto.
- Unidades, propietarios/residentes, cargos, saldos, pagos y validacion auditada.
- Mantenimiento, comunicados/documentos y portal residente con alcance acotado.
- Backups, restore drill, monitoreo basico y bitacora de cambios.
- PDFs reales solo si el piloto los necesita para operacion.
- Integraciones externas solo por decision explicita y con alcance limitado.

### Entregables

- MVP desplegado y operable por un administrador piloto.
- Import inicial controlado de unidades y saldos.
- Manual corto de operacion y soporte.
- Checklist de seguridad, privacidad y respaldo.
- Registro de decisiones de producto y deuda tecnica.

### Criterios de salida

- El condominio piloto puede operar flujos basicos sin depender del desarrollador.
- Hay backups probados y proceso de recuperacion documentado.
- Los usuarios entienden que datos son oficiales y que flujos siguen manuales.
- Hay decision clara sobre continuidad comercial, precio y siguiente inversion.

### No toca por defecto

- Automatizar pagos bancarios, abrir WhatsApp productivo, IA con acciones reales,
  QR de caseta productivo, multi-tenant comercial amplio o contabilidad fiscal
  completa. Todo eso requiere subfase aprobada dentro o despues del MVP.
