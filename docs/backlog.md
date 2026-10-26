# Backlog V1 — American Chamber of Commerce

> Implementado en la rama `dev` el 26 de octubre de 2026. Cada historia tiene su commit `feat: ACC-XXX — …`.

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

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ninguna

Como equipo, quiero ejecutar pruebas de forma reproducible antes de construir funcionalidades.

**Alcance:** Vitest, fixtures seguros y scripts `test`, `test:watch` y `test:coverage`. No agregar E2E todavía.

**Aceptación:**

- Una prueba mínima falla en Red y pasa en Green.
- El runner funciona sin servicios externos.
- El build Astro continúa funcionando.

### ACC-002 — Crear layout base accesible

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-001

Como visitante, quiero una estructura base consistente para navegar el sitio.

**Alcance:** `BaseLayout`, tokens CSS, `main`, skip link, idioma base y metadata mínima.

**Aceptación:**

- La página base tiene `lang`, un `main` y un H1 único.
- El skip link es visible con teclado.
- No hay scroll horizontal en 320, 360 ni 390 px.

### ACC-003 — Resolver idiomas y rutas equivalentes

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-002

Como visitante bilingüe, quiero que cada página tenga una ruta clara en inglés y español.

**Alcance:** `/en/`, `/es/`, `lang.ts`, `routes.ts`, idioma por defecto y `hasRoute`/`localizedHref`.

**Aceptación:**

- Las rutas equivalentes conservan la sección actual.
- Una ruta inexistente no se publica como traducción disponible.
- El fallback al idioma por defecto es explícito y testeado.

### ACC-004 — Añadir selector de idioma

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-003

Como visitante, quiero cambiar de idioma de forma rápida desde desktop y mobile.

**Alcance:** `LanguageSwitcher`, cookie `selectedLanguage` y redirección de `/`.

**Aceptación:**

- El control tiene nombre accesible y apunta a la ruta equivalente.
- No aparece si la traducción no tiene contenido real.
- La preferencia se recuerda durante un año con `SameSite=Lax`.
- La navegación directa por URL funciona sin cookie.

### ACC-005 — Configurar SEO multidioma mínimo

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-003, ACC-004

Como buscador, quiero identificar correctamente cada versión idiomática.

**Alcance:** `Seo`, canonical, `hreflang`, `x-default`, title, description, sitemap y robots.

**Aceptación:**

- Cada ruta publicada tiene canonical propio.
- `hreflang` solo apunta a páginas existentes.
- No se indexa staging.

### ACC-006 — Implementar header y menú móvil

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-004

Como visitante, quiero navegar las secciones principales desde cualquier dispositivo.

**Alcance:** Header, navegación localizada, menú móvil y CTA principal.

**Aceptación:**

- El menú funciona con teclado y Escape.
- El menú no depende de hover.
- Los enlaces funcionan con JavaScript desactivado.
- El idioma se mantiene al navegar.

### ACC-007 — Añadir comportamiento de scroll del header

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-006

Como visitante, quiero que el header facilite la lectura al hacer scroll.

**Alcance:** estado compacto, ocultar al bajar y mostrar al subir, sin rehacer la navegación.

**Aceptación:**

- El header no desaparece con el menú abierto.
- El comportamiento no genera saltos de layout.
- Respeta reduced motion cuando corresponda.

### ACC-008 — Crear sistema global de reveal on-scroll

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-002

Como visitante, quiero transiciones suaves al descubrir contenido.

**Alcance:** `data-reveal`, `IntersectionObserver`, fallback sin JavaScript y `prefers-reduced-motion`.

**Aceptación:**

- Sin JavaScript el contenido permanece visible.
- Con reduced motion no se fuerza animación.
- El sistema no oculta contenido de forma permanente.

### ACC-009 — Mostrar slider responsive

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-002, ACC-008

Como visitante, quiero ver el contenido destacado con la imagen adecuada para mi dispositivo.

**Alcance exclusivo:** `Slider.astro`, datos tipados y assets existentes. No incluir todavía membresías ni formularios.

**Aceptación:**

- Mobile y desktop usan el mismo contrato mediante `Picture` o equivalente.
- El primer slide es visible y las imágenes posteriores son diferidas.
- Flechas, dots y teclado tienen nombres accesibles.
- Autoplay se puede pausar y respeta reduced motion.
- El contenido sigue siendo usable sin autoplay.

### ACC-010 — Publicar home institucional mínima

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-005, ACC-006, ACC-009

Como visitante, quiero entender qué es la cámara y cuál es su propuesta de valor.

**Alcance:** hero, `TrustBar`, beneficios resumidos, `CtaBand` y contenido aprobado. No agregar aún todas las páginas de negocio.

**Aceptación:**

- La página funciona en `/en/` y `/es/`.
- Cada CTA tiene destino real.
- No se publican afirmaciones sin fuente o aprobación.

### ACC-011 — Publicar niveles de membresía

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-010

Como empresa interesada, quiero comparar los niveles de membresía aprobados.

**Alcance:** datos tipados, `PlanCard`, tabla/comparación simple y estados de precio pendiente.

**Aceptación:**

- Los precios coinciden con la fuente local aprobada.
- La información está disponible en ambos idiomas.
- No se mezclan los niveles legacy de WordPress.

### ACC-012 — Validar formulario de interés de membresía

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-011

Como empresa interesada, quiero saber qué datos necesito antes de contactar.

**Alcance:** campos, validación, consentimiento y mensajes accesibles. Sin Web3Forms todavía.

**Aceptación:**

- Cada campo inválido tiene mensaje claro.
- No se ejecuta `fetch` si la validación falla.
- El primer error recibe foco.
- No se persisten datos sensibles en navegador.

### ACC-013 — Enviar formulario de membresía por Web3Forms

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-012

Como equipo operativo, quiero recibir solicitudes válidas de membresía.

**Alcance:** adaptador Web3Forms, loading, éxito, error, timeout, reintento y honeypot.

**Aceptación:**

- Se cubren éxito, rechazo semántico, timeout, red caída y doble clic.
- Solo se muestra éxito con confirmación semántica del proveedor.
- Los datos permanecen en pantalla si falla.
- No se imprimen payloads en consola.

### ACC-014 — Publicar catálogo de servicios

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-010

Como empresa, quiero conocer los servicios que ofrece la cámara.

**Alcance:** colección de servicios, tarjeta, listado y detalle de un servicio.

**Aceptación:**

- Cada servicio tiene slug estable, resumen y CTA.
- Un servicio retirado no se publica.
- El detalle funciona en ambos idiomas o declara `needs-review`.

### ACC-015 — Publicar eventos próximos

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-010

Como miembro, quiero consultar eventos próximos con información verificable.

**Alcance:** colección de eventos, `EventCard`, listado y detalle estático.

**Aceptación:**

- Fechas inválidas o eventos retirados no se publican.
- Zona horaria, fecha, lugar y CTA son visibles en texto.
- Un evento sin traducción no muestra un enlace roto.

### ACC-016 — Añadir registro de evento

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-015

Como visitante, quiero solicitar información o registrarme en un evento.

**Alcance:** formulario independiente, estados y envío simulado antes de conectar Web3Forms.

**Aceptación:**

- La validación comparte primitives con membresía.
- El formulario conserva datos ante error.
- La página muestra un canal alternativo si el proveedor no responde.

### ACC-017 — Publicar directorio básico de miembros

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-010

Como visitante, quiero consultar empresas miembros autorizadas.

**Alcance:** schema público, `MemberCard`, listado, detalle y estado vacío. Sin filtros todavía.

**Aceptación:**

- Solo aparecen miembros activos y autorizados.
- Los datos privados no forman parte del modelo público.
- El detalle inexistente devuelve 404.

### ACC-018 — Añadir búsqueda simple del directorio

**Prioridad:** P2 · **Estado:** completado · **Dependencias:** ACC-017

Como visitante, quiero encontrar un miembro por nombre o categoría.

**Alcance:** función pura de normalización, búsqueda y filtros básicos por URL.

**Aceptación:**

- Se cubren mayúsculas, acentos y cero resultados.
- Limpiar filtros restaura la lista.
- Sin JavaScript se puede acceder al listado base.

### ACC-019 — Publicar advocacy y recursos

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-010

Como stakeholder, quiero conocer las prioridades públicas y recursos de la cámara.

**Alcance:** páginas editoriales independientes para advocacy, news y resources.

**Aceptación:**

- Cada afirmación tiene fuente, fecha y estado editorial.
- No se presenta lobby, certificación o alianza no aprobada.
- Las páginas tienen versión localizada o estado explícito de revisión.

### ACC-020 — Publicar contacto y páginas legales

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-002, ACC-005

Como visitante, quiero contactar a la cámara y consultar sus condiciones.

**Alcance:** contacto, privacidad, términos, accesibilidad y 404. El formulario de contacto reutiliza el adaptador aprobado.

**Aceptación:**

- Los datos de contacto coinciden con la fuente aprobada.
- Las páginas legales no contienen texto inventado como definitivo.
- 404 conserva idioma y navegación principal.

### ACC-021 — Endurecer accesibilidad, rendimiento y deploy

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-005, ACC-009, ACC-020

Como responsable técnico, quiero publicar una versión estable y recuperable.

**Alcance:** auditoría final, presupuestos, smoke tests, CI, deploy serializado y rollback.

**Aceptación:**

- Build, rutas principales, idiomas, slider y formularios tienen smoke test.
- No hay errores críticos de accesibilidad ni scroll horizontal.
- Se conserva la versión anterior y el rollback se prueba.

### ACC-022 — Mostrar rango dinámico de copyright en el footer

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-020

Como visitante, quiero ver el período de vigencia del sitio en el footer.

**Alcance exclusivo:** mostrar `© 2024-{año actual}` en inglés y español. No modificar navegación, contacto ni textos legales.

**TDD / aceptación:**

- La prueba verifica que el footer muestra `© 2024-` seguido del año actual.
- El año se calcula dinámicamente y no queda fijado manualmente en el HTML.
- Si el año actual es 2024, se muestra `© 2024` sin repetir el año.
- El cambio funciona en ambas versiones de idioma.
- La historia queda lista para `Done` después de ejecutar tests y build.

### ACC-023 — Implementar SEO completo y previews sociales

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-005, ACC-010

Como propietario del sitio, quiero que cada página sea correctamente indexable y compartible para que los buscadores y redes sociales muestren información completa, imágenes y enlaces correctos.

**Alcance exclusivo:** SEO técnico, metadata social y datos estructurados. No modificar el contenido editorial ni la identidad visual aprobada.

**Aceptación:**

- Cada página tiene `title`, `description`, `canonical`, idioma y URL absoluta únicos.
- Cada página tiene Open Graph completo: `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale` y `og:image`.
- La imagen social se visualiza correctamente al compartir el enlace por WhatsApp, Facebook, LinkedIn y otras plataformas, incluyendo logo o imagen aprobada, dimensiones y `og:image:alt`.
- Se incluyen metadatos de Twitter/X con `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` y texto alternativo cuando corresponda.
- Se generan `hreflang` para inglés, español y `x-default` únicamente cuando la ruta traducida existe.
- Se implementan `sitemap.xml`, `robots.txt`, favicon, manifest y exclusión de staging/404 de indexación.
- Se agregan datos estructurados JSON-LD válidos para la organización, sitio web, breadcrumbs, eventos y páginas aplicables, sin inventar datos.
- Las imágenes relevantes tienen `alt`, URL absoluta para compartir y formato/tamaño apropiado para previews sociales.
- Se agregan pruebas automatizadas para metadata, rutas, imágenes sociales, JSON-LD y exclusiones de indexación.
- Se valida el resultado con build, smoke tests y herramientas de preview social antes de marcar la tarea como `Done`.

### ACC-024 — Añadir botón flotante de WhatsApp

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-006, ACC-021

Como visitante, quiero contactar rápidamente a la cámara por WhatsApp desde cualquier página.

**Alcance exclusivo:** botón flotante fijo en la esquina inferior derecha, enlazado al número oficial `+1 (347) 301-2169`, con animación visual de ondas expansivas que se desvanecen progresivamente. No modificar formularios ni el contenido del footer.

**Aceptación:**

- El botón usa el enlace oficial `https://wa.me/13473012169`.
- El enlace funciona en desktop y mobile, abre WhatsApp de forma segura y tiene `rel="noopener noreferrer"` cuando corresponda.
- El botón tiene nombre accesible, foco visible y tamaño táctil adecuado.
- La animación muestra ondas concéntricas tipo piedra sobre el agua, se desvanece sin bloquear la interacción y no genera scroll horizontal.
- La animación se desactiva cuando el usuario solicita `prefers-reduced-motion: reduce`.
- El botón mantiene contraste suficiente sobre fondos claros y oscuros.
- Se valida que no cubra controles críticos en móvil, formularios ni el botón de volver arriba.
- Se agregan pruebas del número, enlace, accesibilidad y estado reduced motion.
- La historia queda lista para `Done` después de ejecutar tests, build y smoke test responsive.

### ACC-025 — Añadir botón para volver al inicio

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-008, ACC-021

Como visitante, quiero volver rápidamente al inicio de la página después de hacer scroll.

**Alcance exclusivo:** botón flotante de volver arriba usando el icono existente `/Users/jf/efa/american-chamber-commerce/src/assets/icons/arrow_top.svg`. No modificar el botón de WhatsApp ni la navegación principal.

**Aceptación:**

- El botón aparece únicamente después de superar un umbral razonable de scroll.
- Al activarlo, devuelve el foco y la vista al inicio de la página.
- Tiene nombre accesible, foco visible y funciona con teclado.
- Usa el icono `arrow_top.svg` con texto alternativo o etiqueta accesible correcta.
- El desplazamiento suave respeta `prefers-reduced-motion: reduce`.
- No genera scroll horizontal ni cubre el botón de WhatsApp, formularios u otros controles críticos.
- Se valida en móvil y escritorio.
- Se agregan pruebas del umbral, activación, accesibilidad y reduced motion.
- La historia queda lista para `Done` después de ejecutar tests, build y smoke test responsive.

### ACC-026 — Agregar favicon institucional

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-002, ACC-005

Como visitante, quiero identificar la web de American Chamber en la pestaña y favoritos del navegador.

**Alcance exclusivo:** agregar el favicon institucional aprobado y conectarlo al layout base. No modificar el logo del header, el logo social ni la identidad visual.

**Aceptación:**

- El favicon utiliza un asset institucional aprobado.
- Se configura mediante `<link rel="icon">` en el layout base.
- Se incluye formato compatible con navegadores modernos y fallback `.ico` cuando corresponda.
- Se agrega `apple-touch-icon` si existe un asset aprobado para dispositivos Apple.
- La referencia funciona desde las rutas `/en/`, `/es/`, 404 y páginas internas.
- No se publican rutas rotas ni assets inexistentes.
- Se agrega una prueba o smoke test que verifique la referencia del favicon.
- La historia queda lista para `Done` después de ejecutar tests y build.

### ACC-027 — Preservar la posición de scroll al cambiar de idioma

**Prioridad:** P0 · **Estado:** completado · **Dependencias:** ACC-004, ACC-006

Como visitante, quiero conservar mi posición de lectura cuando cambio entre inglés y español.

**Alcance exclusivo:** preservar y restaurar la posición de scroll al usar `LanguageSwitcher`, incluyendo navegación normal y transiciones de Astro. No modificar el contenido ni la estructura de las páginas.

**Aceptación:**

- Si el usuario cambia de idioma desde el footer, permanece aproximadamente en la misma zona equivalente de la página.
- Si cambia desde cualquier otra posición, la nueva página restaura la posición correspondiente sin enviarlo automáticamente al inicio.
- Si la página equivalente no existe o tiene una estructura incompatible, se aplica un fallback seguro y se documenta el comportamiento.
- El cambio de idioma sigue funcionando con JavaScript desactivado, aunque la restauración avanzada de scroll dependa de JavaScript.
- La restauración no genera saltos visibles, loops de navegación ni pérdida del foco del control activado.
- Se respeta `prefers-reduced-motion`; no se fuerza desplazamiento animado cuando está activo.
- Se cubren con pruebas la navegación desde la parte superior, mitad de página y footer, en inglés y español.
- La historia queda lista para `Done` después de ejecutar tests, build y smoke test de navegación multidioma.

### ACC-028 — Añadir marquee de empresas miembro de confianza

**Prioridad:** P1 · **Estado:** completado · **Dependencias:** ACC-010, ACC-017

Como visitante, quiero identificar empresas miembro de distintos sectores para reforzar la confianza en la cámara.

**Alcance exclusivo:** agregar debajo de la sección **“TRUSTED BY MEMBER COMPANIES ACROSS INDUSTRIES”** una franja horizontal animada tipo marquee, donde los nombres avanzan de derecha a izquierda y se repiten de forma continua. No incluir logos ni modificar el directorio de miembros.

**Listado inicial para validar:** `Harbor & Co.`, `Meridian Group`, `Union Steelworks`, `Ashford Partners`, `Beacon Logistics`, `Northgate Foods`, `Sterling Capital` y `Willow Creek Bank`.

**Aceptación:**

- La animación reproduce el comportamiento observado en el sitio desplegado: entrada por la derecha, desplazamiento continuo hacia la izquierda y repetición sin salto visible.
- El listado final se define desde datos estructurados y se puede actualizar sin modificar el componente.
- Solo se publican empresas miembro reales, autorizadas y verificadas; los nombres iniciales se consideran pendientes de aprobación y no deben presentarse como miembros reales sin evidencia.
- Se prioriza diversidad sectorial relevante para Estados Unidos, sin inventar compañías, logos, certificaciones ni relaciones comerciales.
- La franja no produce scroll horizontal en la página ni afecta la lectura del contenido principal.
- La animación respeta `prefers-reduced-motion: reduce`, dejando los nombres visibles en una presentación estática o pausada.
- La información permanece disponible para lectores de pantalla sin depender de la animación.
- La sección funciona correctamente en inglés y español, con el texto localizado.
- Se agregan pruebas de contenido, duplicación controlada, pausa/reduced motion y responsive.
- La historia queda lista para `Done` después de ejecutar tests, build y smoke test visual.

**Nota de implementación:** la franja se renderiza solo cuando `TRUSTED_MEMBERS` contiene empresas con `approved`, `authorized`, `source` y `reviewedAt`. Los ocho nombres de esta historia fueron confirmados por el cliente como miembros reales el 2026-10-26.

## Orden recomendado

1. ACC-001 a ACC-005: base, pruebas e idiomas.
2. ACC-006 a ACC-010: navegación, animaciones, slider y home.
3. ACC-011 a ACC-013: membresías y primer formulario real.
4. ACC-014 a ACC-020: capacidades editoriales y de comunidad, una por una.
5. ACC-021 a ACC-028: endurecimiento, SEO, accesos rápidos, identidad, confianza, experiencia multidioma y publicación.

## Regla de rollback

Cada historia debe poder revertirse por su propio commit o PR. Si una historia requiere modificar más de una capacidad, toca demasiados archivos o supera el tamaño revisable, se divide antes de comenzar.
