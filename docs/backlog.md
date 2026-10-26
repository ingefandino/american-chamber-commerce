# Backlog V1 — American Chamber of Commerce

## Objetivo

Construir el sitio Astro mediante **vertical slices pequeños**. Cada historia debe entregar una capacidad visible, testeable y reversible, sin mezclar varias capacidades de negocio.

## Reglas de trabajo

- Una historia debe poder revisarse, desplegarse y revertirse de forma independiente.
- Una historia debe durar idealmente menos de un día y modificar solo lo necesario.
- No crear tareas genéricas como «hacer frontend», «crear arquitectura» o «migrar todo el sitio».
- TDD obligatorio: **Red → Green → Refactor**.
- Primero se prueba el comportamiento; no los detalles internos.
- Cada PR debe corresponder a una historia pequeña o a historias estrechamente relacionadas.
- Si una historia toca dos capacidades de negocio, se divide antes de implementarla.
- No publicar precios, contactos, promesas, datos legales o traducciones sin aprobación.
- Todo cambio debe dejar `pnpm build` funcionando.

## Estrategia de pruebas

- **Unitarias:** idioma, rutas equivalentes, validación, fechas, slugs y filtros.
- **Componentes:** renderizado Astro, estados vacíos/error y atributos accesibles.
- **Integración:** formularios con `fetch` simulado y respuestas controladas.
- **Smoke:** rutas críticas, navegación principal, idioma y build final.
- Fixtures sin datos personales reales y sin enviar formularios reales desde CI.

## Definición de terminado

- [ ] Prueba escrita antes de la implementación o excepción documentada.
- [ ] Criterios de aceptación cubiertos.
- [ ] Responsive verificado en móvil y escritorio.
- [ ] Teclado, foco, nombre accesible y estados verificados.
- [ ] `pnpm build` pasa.
- [ ] No se publican datos ficticios como reales.
- [ ] El cambio puede revertirse sin afectar historias anteriores.

## Historias verticales

### ACC-001 — Preparar el arnés TDD

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ninguna

Como equipo, quiero ejecutar pruebas de forma reproducible antes de construir funcionalidades.

**Alcance:** Vitest, fixtures seguros y scripts `test`, `test:watch` y `test:coverage`. No agregar E2E todavía.

**Aceptación:**

- Una prueba mínima falla en Red y pasa en Green.
- El runner funciona sin servicios externos.
- El build Astro continúa funcionando.

### ACC-002 — Crear layout base accesible

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-001

Como visitante, quiero una estructura base consistente para navegar el sitio.

**Alcance:** `BaseLayout`, tokens CSS, `main`, skip link, idioma base y metadata mínima.

**Aceptación:**

- La página base tiene `lang`, un `main` y un H1 único.
- El skip link es visible con teclado.
- No hay scroll horizontal en 320, 360 ni 390 px.

### ACC-003 — Resolver idiomas y rutas equivalentes

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-002

Como visitante bilingüe, quiero que cada página tenga una ruta clara en inglés y español.

**Alcance:** `/en/`, `/es/`, `lang.ts`, `routes.ts`, idioma por defecto y `hasRoute`/`localizedHref`.

**Aceptación:**

- Las rutas equivalentes conservan la sección actual.
- Una ruta inexistente no se publica como traducción disponible.
- El fallback al idioma por defecto es explícito y testeado.

### ACC-004 — Añadir selector de idioma

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-003

Como visitante, quiero cambiar de idioma de forma rápida desde desktop y mobile.

**Alcance:** `LanguageSwitcher`, cookie `selectedLanguage` y redirección de `/`.

**Aceptación:**

- El control tiene nombre accesible y apunta a la ruta equivalente.
- No aparece si la traducción no tiene contenido real.
- La preferencia se recuerda durante un año con `SameSite=Lax`.
- La navegación directa por URL funciona sin cookie.

### ACC-005 — Configurar SEO multidioma mínimo

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-003, ACC-004

Como buscador, quiero identificar correctamente cada versión idiomática.

**Alcance:** `Seo`, canonical, `hreflang`, `x-default`, title, description, sitemap y robots.

**Aceptación:**

- Cada ruta publicada tiene canonical propio.
- `hreflang` solo apunta a páginas existentes.
- No se indexa staging.

### ACC-006 — Implementar header y menú móvil

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-004

Como visitante, quiero navegar las secciones principales desde cualquier dispositivo.

**Alcance:** Header, navegación localizada, menú móvil y CTA principal.

**Aceptación:**

- El menú funciona con teclado y Escape.
- El menú no depende de hover.
- Los enlaces funcionan con JavaScript desactivado.
- El idioma se mantiene al navegar.

### ACC-007 — Añadir comportamiento de scroll del header

**Prioridad:** P1 · **Estado:** pendiente · **Dependencias:** ACC-006

Como visitante, quiero que el header facilite la lectura al hacer scroll.

**Alcance:** estado compacto, ocultar al bajar y mostrar al subir, sin rehacer la navegación.

**Aceptación:**

- El header no desaparece con el menú abierto.
- El comportamiento no genera saltos de layout.
- Respeta reduced motion cuando corresponda.

### ACC-008 — Crear sistema global de reveal on-scroll

**Prioridad:** P1 · **Estado:** pendiente · **Dependencias:** ACC-002

Como visitante, quiero transiciones suaves al descubrir contenido.

**Alcance:** `data-reveal`, `IntersectionObserver`, fallback sin JavaScript y `prefers-reduced-motion`.

**Aceptación:**

- Sin JavaScript el contenido permanece visible.
- Con reduced motion no se fuerza animación.
- El sistema no oculta contenido de forma permanente.

### ACC-009 — Mostrar slider responsive

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-002, ACC-008

Como visitante, quiero ver el contenido destacado con la imagen adecuada para mi dispositivo.

**Alcance exclusivo:** `Slider.astro`, datos tipados y assets existentes. No incluir todavía membresías ni formularios.

**Aceptación:**

- Mobile y desktop usan el mismo contrato mediante `Picture` o equivalente.
- El primer slide es visible y las imágenes posteriores son diferidas.
- Flechas, dots y teclado tienen nombres accesibles.
- Autoplay se puede pausar y respeta reduced motion.
- El contenido sigue siendo usable sin autoplay.

### ACC-010 — Publicar home institucional mínima

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-005, ACC-006, ACC-009

Como visitante, quiero entender qué es la cámara y cuál es su propuesta de valor.

**Alcance:** hero, `TrustBar`, beneficios resumidos, `CtaBand` y contenido aprobado. No agregar aún todas las páginas de negocio.

**Aceptación:**

- La página funciona en `/en/` y `/es/`.
- Cada CTA tiene destino real.
- No se publican afirmaciones sin fuente o aprobación.

### ACC-011 — Publicar niveles de membresía

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-010

Como empresa interesada, quiero comparar los niveles de membresía aprobados.

**Alcance:** datos tipados, `PlanCard`, tabla/comparación simple y estados de precio pendiente.

**Aceptación:**

- Los precios coinciden con la fuente local aprobada.
- La información está disponible en ambos idiomas.
- No se mezclan los niveles legacy de WordPress.

### ACC-012 — Validar formulario de interés de membresía

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-011

Como empresa interesada, quiero saber qué datos necesito antes de contactar.

**Alcance:** campos, validación, consentimiento y mensajes accesibles. Sin Web3Forms todavía.

**Aceptación:**

- Cada campo inválido tiene mensaje claro.
- No se ejecuta `fetch` si la validación falla.
- El primer error recibe foco.
- No se persisten datos sensibles en navegador.

### ACC-013 — Enviar formulario de membresía por Web3Forms

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-012

Como equipo operativo, quiero recibir solicitudes válidas de membresía.

**Alcance:** adaptador Web3Forms, loading, éxito, error, timeout, reintento y honeypot.

**Aceptación:**

- Se cubren éxito, rechazo semántico, timeout, red caída y doble clic.
- Solo se muestra éxito con confirmación semántica del proveedor.
- Los datos permanecen en pantalla si falla.
- No se imprimen payloads en consola.

### ACC-014 — Publicar catálogo de servicios

**Prioridad:** P1 · **Estado:** pendiente · **Dependencias:** ACC-010

Como empresa, quiero conocer los servicios que ofrece la cámara.

**Alcance:** colección de servicios, tarjeta, listado y detalle de un servicio.

**Aceptación:**

- Cada servicio tiene slug estable, resumen y CTA.
- Un servicio retirado no se publica.
- El detalle funciona en ambos idiomas o declara `needs-review`.

### ACC-015 — Publicar eventos próximos

**Prioridad:** P1 · **Estado:** pendiente · **Dependencias:** ACC-010

Como miembro, quiero consultar eventos próximos con información verificable.

**Alcance:** colección de eventos, `EventCard`, listado y detalle estático.

**Aceptación:**

- Fechas inválidas o eventos retirados no se publican.
- Zona horaria, fecha, lugar y CTA son visibles en texto.
- Un evento sin traducción no muestra un enlace roto.

### ACC-016 — Añadir registro de evento

**Prioridad:** P1 · **Estado:** pendiente · **Dependencias:** ACC-015

Como visitante, quiero solicitar información o registrarme en un evento.

**Alcance:** formulario independiente, estados y envío simulado antes de conectar Web3Forms.

**Aceptación:**

- La validación comparte primitives con membresía.
- El formulario conserva datos ante error.
- La página muestra un canal alternativo si el proveedor no responde.

### ACC-017 — Publicar directorio básico de miembros

**Prioridad:** P1 · **Estado:** pendiente · **Dependencias:** ACC-010

Como visitante, quiero consultar empresas miembros autorizadas.

**Alcance:** schema público, `MemberCard`, listado, detalle y estado vacío. Sin filtros todavía.

**Aceptación:**

- Solo aparecen miembros activos y autorizados.
- Los datos privados no forman parte del modelo público.
- El detalle inexistente devuelve 404.

### ACC-018 — Añadir búsqueda simple del directorio

**Prioridad:** P2 · **Estado:** pendiente · **Dependencias:** ACC-017

Como visitante, quiero encontrar un miembro por nombre o categoría.

**Alcance:** función pura de normalización, búsqueda y filtros básicos por URL.

**Aceptación:**

- Se cubren mayúsculas, acentos y cero resultados.
- Limpiar filtros restaura la lista.
- Sin JavaScript se puede acceder al listado base.

### ACC-019 — Publicar advocacy y recursos

**Prioridad:** P1 · **Estado:** pendiente · **Dependencias:** ACC-010

Como stakeholder, quiero conocer las prioridades públicas y recursos de la cámara.

**Alcance:** páginas editoriales independientes para advocacy, news y resources.

**Aceptación:**

- Cada afirmación tiene fuente, fecha y estado editorial.
- No se presenta lobby, certificación o alianza no aprobada.
- Las páginas tienen versión localizada o estado explícito de revisión.

### ACC-020 — Publicar contacto y páginas legales

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-002, ACC-005

Como visitante, quiero contactar a la cámara y consultar sus condiciones.

**Alcance:** contacto, privacidad, términos, accesibilidad y 404. El formulario de contacto reutiliza el adaptador aprobado.

**Aceptación:**

- Los datos de contacto coinciden con la fuente aprobada.
- Las páginas legales no contienen texto inventado como definitivo.
- 404 conserva idioma y navegación principal.

### ACC-021 — Endurecer accesibilidad, rendimiento y deploy

**Prioridad:** P0 · **Estado:** pendiente · **Dependencias:** ACC-005, ACC-009, ACC-020

Como responsable técnico, quiero publicar una versión estable y recuperable.

**Alcance:** auditoría final, presupuestos, smoke tests, CI, deploy serializado y rollback.

**Aceptación:**

- Build, rutas principales, idiomas, slider y formularios tienen smoke test.
- No hay errores críticos de accesibilidad ni scroll horizontal.
- Se conserva la versión anterior y el rollback se prueba.

## Orden recomendado

1. ACC-001 a ACC-005: base, pruebas e idiomas.
2. ACC-006 a ACC-010: navegación, animaciones, slider y home.
3. ACC-011 a ACC-013: membresías y primer formulario real.
4. ACC-014 a ACC-020: capacidades editoriales y de comunidad, una por una.
5. ACC-021: endurecimiento y publicación.

## Regla de rollback

Cada historia debe poder revertirse por su propio commit o PR. Si una historia requiere modificar más de una capacidad, toca demasiados archivos o supera el tamaño revisable, se divide antes de comenzar.
