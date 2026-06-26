# Roadmap oficial de Virtualia Condo

Este roadmap ordena la evolucion de `virtualia-condo-concept`. El producto actual es
un concepto visual Vite + React para vender y validar Virtualia Condo antes de
construir backend, pagos, auth real o integraciones productivas.

Regla principal: separar con claridad lo que ya existe, lo que está en la fase
actual y lo que sigue abierto. Este documento no debe prometer capacidades reales
cuando hoy solo existen como demo visual.

## 1. Convenciones

### 1.1 Estados de fase

- `current`: fase actual de trabajo.
- `planned`: fase futura aprobada como dirección.
- `blocked`: fase detenida por decisión, datos o dependencia externa.
- `done`: fase cerrada y verificable.
- `superseded`: fase reemplazada por una dirección nueva.

### 1.2 Tipos de fase

- `concept`: exploracion visual y narrativa de producto.
- `validation`: feedback, alcance y decisión comercial.
- `prototype`: funcionalidad local controlada, sin producción.
- `mvp`: operación real con datos, usuarios y resguardo.

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
- Objetivo: tener una demo estática, navegable y seria de Virtualia Condo para
  explicar el producto a administradores, comités y clientes potenciales.
- Resultado esperado: una experiencia de alto impacto que comunique como se verian
  las operaciónes de un condominio, sin afirmar que hay infraestructura productiva.

### Alcance implementado o en hardening

- App Vite + React estática con hash routes canonicas.
- Visual operaciónal SaaS: superficies cálidas, acento teal, layout denso y tono
  financiero/administrativo.
- Pantallas demo para dashboard, unidades, estado de cuenta, cobranza, pagos por
  validar, mantenimiento, albercas, amenidades, comunicados, accesos, reportes,
  portal residente y configuración.
- Mock data centralizada, datos ficticios y placeholders no públicos.
- Interacciones solo en memoria: filtros, navegación, seleccion de unidad, modal de
  validación de pago, tabs y toasts demo.
- Documentación base, workflow de GitHub Pages y export original preservado en
  `legacy/claude-export/`.

### Pendiente para cerrar Phase 1

- Recorrido guíado con Luis para confirmar narrativa comercial y orden de pantallas.
- Ajuste fino de copy visible: reforzar "Concepto visual", "Datos ficticios" y
  "Sin conexión productiva" donde el usuario pueda confundirse.
- QA responsive final en desktop, tablet y móvil antes de compartir con terceros.
- Revisión de accesibilidad básica: foco visible, labels de botones icono y contraste.
- Definir lista corta de preguntas para validar con administradores reales.

### Criterios de salida

- `npm install`, `npm run build` y build GitHub Pages pasan.
- Todas las rutas hash cargan directo sin auth real.
- No quedan CDNs React/Babel, globals legacy, datos reales ni texto corrupto.
- La demo se puede mostrar sin explicar errores visuales, overflow o pantallas vacias.
- Luis aprueba que la demo ya comunica el concepto.

### No toca

- Backend, base de datos, auth real, pagos reales, PDFs reales, QR reales, WhatsApp,
  correo transacciónal, IA real, persistencia local o integraciones externas.

## 4. Phase 2: Validacion comercial y operativa

- Tipo: `validation`
- Estado: `planned`
- Objetivo: convertir la demo en una herramienta de decisión: validar dolores,
  prioridades, precio percibido y alcance mínimo con usuarios objetivo.

### Alcance

- Sesiones de feedback con administradores, comités y residentes seleccionados.
- Matriz de módulos: imprescindible, deseable, diferido y descartado.
- Revisión de lenguaje: que entiende un administrador, que entiende un residente y
  que se debe explicar en una demo comercial.
- Definicion de piloto: tipo de condominio, número de unidades, roles y procesos
  reales que se quieren cubrir primero.
- Priorizacion de riesgos: cobranza, morosidad, comprobantes, accesos, documentos,
  mantenimiento, privacidad y soporte.

### Entregables

- Lista priorizada de funcionalidades para prototipo.
- Mapa de roles y permisos esperados: administrador, comité, vigilancia, residente.
- Flujo aprobado de cobranza y validación de pagos.
- Reglas de demo: que se puede prometer y que debe quedar como futuro.
- Decisión explicita de si Phase 3 se construye como app local simple o como base
  técnica cercana al MVP.

### Criterios de salida

- Hay un alcance de piloto escrito y aprobado.
- Se conoce que modulo vende mejor el producto.
- Se identifican datos sensibles y restricciones legales/operativas básicas.
- Se decide si seguir, pausar o redirigir el producto.

### No toca

- Construcción productiva, migración de datos reales, contratos con bancos,
  automatizaciones externas o lanzamiento público.

## 5. Phase 3: Prototipo funcional local

- Tipo: `prototype`
- Estado: `planned`
- Objetivo: pasar de mockup visual a prototipo funcional local con datos controlados,
  flujos reales básicos y arquitectura suficiente para aprender sin cargar
  complejidad productiva.

### Alcance

- Backend local o server simple para unidades, residentes, cargos, pagos, tickets y
  documentos demo.
- Persistencia local controlada para pruebas internas, no producción.
- Auth de prototipo con roles básicos y permisos visibles.
- CRUD mínimo para unidades, cargos, pagos por validar y tickets.
- Generacion demo de estados de cuenta y reportes exportables no fiscales.
- Registro de acciones clave para simular auditoria.

### Entregables

- Prototipo instalable y ejecutable localmente.
- Datos semilla ficticios consistentes.
- Flujos funcionales: crear cargo, reportar pago, validar pago, consultar saldo,
  levantar ticket y emitir comunicado.
- Guia de demo técnica y checklist de QA.
- Decisión técnica para Phase 4: seguir con el stack local, migrar a servicio cloud
  o rediseñar antes de producción.

### Criterios de salida

- Los flujos principales funcionan sin editar código.
- Las reglas financieras básicas son consistentes entre unidad, estado de cuenta y
  cobranza.
- Hay limites claros de seguridad y privacidad documentados.
- El prototipo produce suficiente aprendizaje para justificar un MVP real.

### No toca

- Datos reales de condominios, pagos productivos, facturación fiscal, IA write-capable,
  WhatsApp productivo, QR de acceso productivo o soporte multi-condominio real.

## 6. Phase 4: MVP operativo real

- Tipo: `mvp`
- Estado: `planned`
- Objetivo: lanzar una primera version operativa para un condominio piloto con
  usuarios reales, datos reales y controles mínimos de seguridad, respaldo y soporte.

### Alcance

- Auth real, roles, permisos y separación de datos del condominio piloto.
- Unidades, propietarios/residentes, cargos, saldos, pagos y validación auditada.
- Mantenimiento, comunicados/documentos y portal residente con alcance acotado.
- Backups, restore drill, monitoreo básico y bitácora de cambios.
- PDFs reales solo si el piloto los necesita para operación.
- Integraciones externas solo por decisión explicita y con alcance limitado.

### Entregables

- MVP desplegado y operable por un administrador piloto.
- Import inicial controlado de unidades y saldos.
- Manual corto de operación y soporte.
- Checklist de seguridad, privacidad y respaldo.
- Registro de decisiónes de producto y deuda técnica.

### Criterios de salida

- El condominio piloto puede operar flujos básicos sin depender del desarrollador.
- Hay backups probados y proceso de recuperación documentado.
- Los usuarios entienden que datos son oficiales y que flujos siguen manuales.
- Hay decisión clara sobre continuidad comercial, precio y siguiente inversión.

### No toca por defecto

- Automatizar pagos bancarios, abrir WhatsApp productivo, IA con acciones reales,
  QR de caseta productivo, multi-tenant comercial amplio o contabilidad fiscal
  completa. Todo eso requiere subfase aprobada dentro o después del MVP.
