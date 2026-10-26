# American Chamber of Commerce — PLAN V1 Astro

> Documento de descubrimiento, alcance, arquitectura, operación y aceptación.
> Estado: **borrador para validación del cliente**.
> Fecha de investigación: 26 de octubre de 2026.
> V1 propuesta: **Astro estático + Web3Forms**.
> V2 propuesta: **backend con administración, membresías, eventos, directorio y operación de la Cámara**.

## 0. Resumen ejecutivo

El objetivo es retirar el sitio WordPress actual y reemplazarlo directamente por un sitio Astro rápido, mantenible y preparado para evolucionar hacia una plataforma operativa de una cámara de comercio.

La V1 no intentará resolver el backend completo. Publicará información institucional, servicios, membresías, eventos, advocacy, directorio y formularios de interés mediante contenido versionado en Git y Web3Forms. La V2 añadirá autenticación, administración, pagos, CRM, eventos, membresías, documentos, comunicaciones y métricas.

La fuente de verdad no se asumirá automáticamente:

1. La identidad, datos legales, contactos y promesas del cliente requieren aprobación. Los precios se toman del proyecto local indicado por el cliente.
2. El proyecto Angular local sirve como inventario histórico y fuente de contenidos candidatos.
3. El sitio WordPress actual sirve como referencia pública de contenido y experiencia actual.
4. La investigación de otras cámaras sirve para detectar patrones de servicio, no para copiar ofertas ni afirmar beneficios no aprobados.

## 1. Decisiones pendientes antes de publicar

Estas decisiones deben quedar documentadas antes de cerrar el contenido definitivo:

1. ¿La entidad se presentará públicamente como **American Chamber of Commerce**, **American Chamber of Commerce USA** u otro nombre legal/comercial?
2. ¿El modelo es nonprofit/501(c)(6), for-profit, asociación estatal u otra figura? No se debe publicar una clasificación tributaria sin evidencia del cliente.
3. ¿El contenido canónico será solo inglés o se mantendrá inglés/español como en el prototipo Angular?
4. **Precio canónico confirmado:** se usará la tabla del proyecto local `/Users/jf/efa/WUT/american-chamber-commerce/public/assets/data/en-memberships.json` y su equivalente en español: **Silver USD 150/año, Gold USD 220/año, Platinum USD 500/año y Diamond USD 700/año**. Los niveles mostrados actualmente en WordPress se consideran contenido legado y no se deben mezclar con la tabla local.
5. El sitio público muestra `(202) 555-0148` y un enlace `mailto:vitamobilecare@gmail.com` aunque el texto visible dice `info@americanchamberofcommerce.us`. ¿Cuál es el teléfono y correo oficiales?
6. ¿Los nombres de miembros, comité, equipo, empresas, logos, fotos y eventos del proyecto local tienen autorización vigente de publicación?
7. ¿Qué funciones estarán disponibles en V1 con Web3Forms: contacto, solicitud de membresía, registro a eventos, sponsorships, partnerships o todas?
8. ¿Se cobrará la membresía dentro de V1 o solo se captará una solicitud para contacto manual?

Mientras estas preguntas no estén cerradas, el contenido se marcará como `draft`, `needs-review` o `not-publishable`; nunca se rellenará con datos inventados.

## 2. Evidencia y jerarquía de fuentes

### 2.1 Fuentes del cliente

| Fuente | Uso | Confianza inicial |
| --- | --- | --- |
| `/Users/jf/efa/WUT/american-chamber-commerce/**` | Inventario técnico, contenidos históricos y assets | Media; requiere validación |
| `https://americanchamberofcommerce.us/` | Contenido público vigente del WordPress; referencia visual y editorial | Alta para lo visible, no sustituye precios ni datos canónicos del proyecto local |
| Documentos legales entregados por el cliente | Nombre legal, registro, autoridad, políticas y datos oficiales | Alta, pendiente de recepción y revisión |
| `/Users/jf/efa/CreceSer/creceser/**` | Referencia de estructura Astro, componentes y rendimiento | Alta como patrón técnico |
| `/Users/jf/efa/colombia-es-de-todos/**` | Referencia de plan, vertical slices y operación estática | Alta como patrón de proceso |

### 2.2 Hallazgos del sitio WordPress observado

La página pública consultada muestra:

- Hero con los mensajes «Empower Your Business», «Build your Network» y «Grow The Economy».
- CTA «Become a Member».
- Secciones Membership, Advocacy y News.
- Misión centrada en red empresarial, conocimiento y advocacy.
- Membership levels: Solopreneur, Small Business, Corporate y Major Investor.
- Beneficios visibles: website spotlight, social media posts, e-newsletter, comités, conexión con autoridades, seminarios, talleres y networking.
- Advocacy sobre tax & fiscal policy, infraestructura, workforce development y trade.
- Formulario público de nombre, email, teléfono y mensaje.
- Footer con datos de contacto inconsistentes que deben confirmarse.

La página actual no es evidencia suficiente para publicar nombres de empresas, historia, estatus legal o promesas de servicios sin validación. Sus niveles de membresía no sustituyen la tabla de precios del proyecto local.

### 2.3 Hallazgos del proyecto Angular local

El prototipo local es Angular standalone 19 con Angular Material/CDK, RxJS, SCSS, rutas hash y datos JSON. Contiene rutas candidatas para home, about, services, events, memberships, contact y how-to-apply.

Contenidos candidatos:

- Misión, visión y valores.
- Servicios de market research, market information, business center, promotion/marketing, trade missions, trade fairs, FDA agent y publications.
- Eventos con fecha, lugar, modalidad, speakers, sponsors y tickets.
- Membresías bilingües y beneficios.
- Miembros, equipo y committee structure.
- Slider de 9 imágenes, logos e imágenes institucionales.

Riesgos detectados antes de migrar:

- Parte del contenido parece corresponder a una **Spain–U.S. Chamber of Commerce**, no necesariamente a la entidad actual.
- Hay dos fuentes de servicios y dos estructuras de eventos.
- Hay rutas y configuraciones inconsistentes, endpoints antiguos, placeholders, datos ficticios o no verificados.
- Los formularios muestran éxito localmente con POST comentado.
- Las imágenes declaradas de eventos no existen.
- Los datos de equipo, comité, socios, teléfonos, correos, identificadores y documentos no deben publicarse automáticamente.

## 3. Objetivo del producto

Crear una presencia digital institucional que permita a una cámara de comercio:

- Explicar claramente quién es, a quién representa y qué problemas resuelve.
- Convertir visitantes en miembros, prospectos, asistentes, sponsors y partners.
- Exponer servicios y beneficios con condiciones verificables.
- Publicar eventos y facilitar registro o solicitud de información.
- Dar visibilidad a miembros autorizados mediante un directorio.
- Comunicar advocacy, policy priorities, research, news e insights.
- Preparar datos y URLs para migrar a un backend sin rehacer el sitio.

## 4. Principios de producto

- **Trust first:** no mostrar datos ficticios, logos sin permiso, cifras sin fecha ni testimonios no aprobados.
- **Membership value:** cada nivel debe explicar quién se beneficia, qué incluye, límites y cómo se mide.
- **Chamber, not marketplace:** diferenciar advocacy y comunidad de servicios comerciales de partners.
- **Public/private boundary:** el directorio público no expone solicitudes, documentos de verificación ni datos privados.
- **Multilingual only if real:** cada idioma debe tener contenido localizado, responsable de traducción y revisión; nunca se publican rutas vacías o traducciones incompletas como si fueran definitivas.
- **Static first, backend ready:** V1 mantiene Astro estático; los IDs, slugs, fechas y relaciones se diseñan para V2.
- **Evidence-based content:** cada afirmación sensible debe tener fuente, fecha de revisión y responsable.

## 5. Personas y recorridos

| Persona | Necesidad principal | Recorrido V1 |
| --- | --- | --- |
| Visitante empresarial | Entender valor y credibilidad | Home → benefits/services → membership → contact |
| Empresa interesada | Comparar niveles y solicitar ingreso | Membership → benefits → application/contact |
| Miembro actual | Ver eventos, noticias y recursos | Events/news/resources → registration |
| Sponsor/partner | Presentar una propuesta | Partnerships/sponsorship → contact |
| Autoridad o stakeholder | Conocer la agenda de advocacy | Advocacy → policy priorities → contact |
| Periodista/investigador | Encontrar postura y contacto | About/advocacy/news → press contact |
| Administrador futuro | Gestionar contenido y relaciones | V2 authenticated dashboard |

## 6. Alcance V1

### Incluido

- Home institucional.
- About, mission, vision, values, leadership y governance solo con datos aprobados.
- Services y member benefits.
- Membership levels y comparación.
- Formulario de interés/membresía con Web3Forms.
- Events: próximos, pasados y detalle cuando haya contenido real.
- Registro o solicitud de información de evento mediante Web3Forms.
- Member directory con perfiles autorizados.
- Advocacy, policy priorities y public affairs.
- News/insights/resources como contenido estático.
- Sponsors/partners como sección editorial separada del directorio.
- Contact, privacy, terms, accessibility y 404.
- SEO, sitemap, metadata social, rendimiento y accesibilidad.
- CI, build reproducible, despliegue seguro y rollback.

### Fuera de V1

- Login, panel de miembros y roles.
- Pago automático y renovación de membresías.
- CRM, pipeline comercial y scoring.
- Gestión de documentos privados o verificación automática de entidades.
- Calendario con disponibilidad en tiempo real.
- Tickets, cupones, check-in y emisión de certificados.
- Advocacy workflow interno y votaciones privadas.
- Newsletter transaccional y automatizaciones complejas.
- Chat, app móvil y multi-tenant.

## 7. Propuesta de servicios y contenidos

Los siguientes grupos aparecen de forma recurrente en cámaras de comercio investigadas. Se incorporan al plan como **catálogo candidato**, no como promesa definitiva:

1. Membership & business directory.
2. Networking, introductions and referrals.
3. Events, seminars, workshops, roundtables and conferences.
4. Business promotion, member spotlights, newsletter and sponsorships.
5. Advocacy, policy alerts, legislative briefings and government relations.
6. Workforce development, education and professional training.
7. Market intelligence, research, publications and business resources.
8. International trade, trade missions and market-entry support.
9. Business formation, compliance, capital and professional referrals through vetted partners.
10. Community/economic development and partnerships.

Cada servicio debe indicar: para quién es, si está incluido en la membresía, si tiene costo adicional, modalidad, frecuencia, responsable, limitaciones y CTA.

## 8. Membership model

### 8.1 Datos mínimos de un nivel

- `id`, `slug`, `name`, `audience`, `description`.
- `price`, `currency`, `billingCycle`, `priceEffectiveAt`.
- `benefits`, `limits`, `eligibility`, `includedEvents`.
- `featured`, `displayOrder`, `status`, `updatedAt`.
- CTA: apply, request information o contact sales.

### 8.2 Reglas

- No mostrar un precio antiguo como vigente.
- Diferenciar annual, monthly, custom, founding, sponsor e investor.
- No decir «incluido» si depende de disponibilidad o aprobación.
- Definir si el beneficio aplica a la empresa, al titular o a todos sus empleados.
- Aclarar renovaciones, cancelación, reembolsos, impuestos y costos de eventos.
- No confundir member dues con sponsorship, donation o payment for a specific service.

## 9. Events y programación

### V1

- Listado de upcoming y past events.
- Filtros por fecha, tipo, modalidad y ubicación.
- Página de detalle con agenda, speakers, sponsors, precio, aforo, zona horaria y CTA.
- Estado draft, published, sold-out, cancelled, postponed y past.
- Registro mediante Web3Forms o enlace aprobado a proveedor externo.

### V2

- Recurrence, ticketing, capacity, waitlist, check-in, payments, refunds, attendance and member pricing.

Todos los eventos deben tener una fuente editorial, zona horaria explícita y responsable de actualización. Los eventos pasados no se deben presentar como próximos por un filtro basado únicamente en la fecha del navegador.

## 10. Advocacy, policy e investigación

La sección debe diferenciar:

- Posición oficial de la Cámara.
- Prioridad de política pública.
- Comentario o análisis editorial.
- Evento/briefing informativo.
- Documento externo enlazado.

Cada policy item debe tener título, resumen, nivel geográfico, estado, fecha, fuente, posición aprobada y contacto. No se atribuyen opiniones a la Cámara sin aprobación del órgano responsable.

## 11. Directorio público y member profiles

### Datos públicos

- Nombre legal/comercial autorizado.
- Logo autorizado y descripción.
- Sector, tamaño/categoría y ubicación pública.
- Website, redes y canales públicos.
- Servicios/productos y mercados atendidos.
- Nivel de membresía solo si la Cámara decide hacerlo público.
- Fecha de última revisión.

### Datos privados

- Documentos de constitución, EIN, DUNS, verificaciones, contratos, solicitudes y notas internas.
- Datos personales de representantes salvo consentimiento y finalidad.
- Credenciales, pagos y comunicaciones internas.

V1 usa contenido editorial aprobado. V2 deberá añadir consentimiento, edición por miembro, moderación, auditoría, reclamos, baja, historial y control de cambios.

## 12. Information architecture

```text
/
 /about/
 /about/mission/
 /about/leadership/
 /about/governance/
 /membership/
 /membership/benefits/
 /membership/plans/
 /membership/apply/
 /services/
 /services/[slug]/
 /events/
 /events/[slug]/
 /members/
 /members/[slug]/
 /advocacy/
 /advocacy/[slug]/
 /news/
 /news/[slug]/
 /resources/
 /partners/
 /sponsorship/
 /contact/
 /privacy/
 /terms/
 /accessibility/
 /404/
```

Cada página pública tendrá una variante localizada por idioma bajo `/en/` y `/es/`. La raíz `/` redirigirá al idioma por defecto o a la preferencia persistida del usuario, sin depender exclusivamente de `localStorage`.

### Estrategia de internacionalización

- Usar rutas estáticas explícitas y equivalentes: `/en/about/` y `/es/about/`, `/en/membership/` y `/es/membership/`.
- Mantener una sola definición estructural de la navegación y localizar labels, URLs y textos desde datos tipados; no duplicar manualmente el menú.
- Implementar un `LanguageSwitcher` visible en desktop y mobile, con label accesible y cambio directo a la ruta equivalente.
- Mostrar el selector solo cuando la traducción tenga contenido real; si todavía no existe, hacer fallback controlado al idioma por defecto sin generar enlaces rotos.
- Persistir la preferencia mediante cookie `selectedLanguage` con `SameSite=Lax`; no usar la cookie como única fuente de verdad.
- Generar `canonical`, `hreflang` para `en` y `es`, y `x-default` solo para rutas disponibles.
- Mantener títulos, descripciones, Open Graph, mensajes de formularios, navegación, 404 y textos de accesibilidad localizados.
- Validar en build que cada ruta pública tenga traducción, que los enlaces internos no mezclen idiomas y que no existan páginas vacías o stubs publicados.
- La traducción parcial debe declararse editorialmente como `needs-review`; no se presenta como contenido final.

## 13. Astro architecture

```text
src/
  assets/
    slider/
    brand/
    events/
    members/
  components/
    ui/                 # Button, Badge, Card, Container, FormField
    shared/             # Header, Footer, Seo, LanguageSwitcher, Breadcrumbs
    sections/           # Hero, TrustBar, Benefits, FAQ, CTA, Stats
      Slider.astro
      TrustBar.astro
      CtaBand.astro
      FAQ.astro
      SectionHeading.astro
    membership/         # PlanCard, BenefitsTable, MembershipCTA
    events/             # EventCard, EventFilters, EventDetail
    directory/          # MemberCard, MemberFilters, MemberProfile
    advocacy/           # PolicyCard, PolicyTimeline
    forms/              # Contact, Membership, EventRegistration
  data/                 # Fuente global tipada
    site.ts
    navigation.ts
    navigationLabels.en.ts
    languages.ts
    memberships.ts
    services.ts
    events.ts
    policies.ts
    faqs.ts
  content/              # Colecciones con schema y estados editoriales
    events/
    members/
    news/
    resources/
    policies/
  layouts/
    BaseLayout.astro
  lib/                  # Funciones puras: dates, filters, slugs, validation
    lang.ts             # Idioma actual, idioma por defecto y preferencia
    routes.ts           # Rutas equivalentes, hasRoute y localizedHref
    seo.ts              # canonical, hreflang y metadata localizada
  scripts/              # Adaptadores de navegador y formularios
  styles/
    global.css
    header.css
    slider.css
    language-switcher.css
public/
  robots.txt
  favicon.svg
scripts/
  validate-content.mjs
docs/
  OPERACION.md
  DESPLIEGUE.md
  CONTENT.md
```

Principios:

- Atomicidad pragmática: `ui` → componentes de dominio → secciones → páginas.
- Las páginas orquestan; no contienen reglas duplicadas.
- Datos y contenido están separados de la presentación.
- JavaScript solo para menú, filtros, formularios y mejoras no esenciales.
- `astro:assets`/`Picture`, dimensiones declaradas, AVIF/WebP y carga diferida.
- Aliases consistentes y dependencias fijadas como en CreceSer/Colombia.
- Reutilizar el mismo sistema visual probado en CreceSer/Colombia: `Slider.astro`, `Header` con estado al hacer scroll, `TrustBar`, `CtaBand`, `FAQ` y componentes de sección con props tipadas.
- Las animaciones de entrada de textos y tarjetas usarán el patrón `data-reveal="up|left|right|zoom"` + `IntersectionObserver`, sin AOS/WOW.js ni dependencias externas.
- El sistema de reveal debe tener fallback sin JavaScript, respetar `prefers-reduced-motion` y usar delays escalonados solo como mejora visual.
- El slider conservará la interacción de referencia: autoplay controlado, navegación por flechas/dots, pausa al interactuar, clones para loop continuo, `aria` correcto y carga prioritaria únicamente del primer slide.
- No duplicar el markup para móvil y escritorio; usar `Picture`/`<source>` y CSS responsive con el mismo contrato de datos.

## 14. V1 Forms con Web3Forms

### Formularios

- Membership interest/application.
- Contact.
- Event registration/request information.
- Sponsorship/partnership inquiry.
- Press/media inquiry si el cliente lo requiere.

### Reglas

- Web3Forms solo recibe datos públicos mínimos y los entrega al correo autorizado.
- No subir documentos privados en V1.
- Cada formulario tiene asunto, destinatario y `form_type` identificable.
- Validar browser y mostrar mensajes accesibles.
- Confirmar éxito por respuesta semántica, no solo HTTP 200.
- Mantener datos en pantalla cuando falle el envío.
- No enviar formularios reales desde CI.
- Definir captcha, honeypot, cuota, fallback, monitorización y responsables.

V2 debe migrar estos envíos a un backend con persistencia, estados, auditoría, asignación y notificaciones sin cambiar los contratos públicos de los formularios.

## 15. V2 backend: capacidad futura

El diseño V1 debe dejar preparados estos bounded contexts:

1. **Identity & access:** usuarios, organizaciones, roles, MFA, sesiones y recuperación.
2. **Organizations:** entidad legal, contactos, sedes, sectores, documentos y verificación.
3. **Memberships:** planes, aplicaciones, aprobación, contratos, estado, renovación y cancelación.
4. **Billing:** precios, impuestos, invoices, pagos, reembolsos y reconciliación.
5. **Directory:** perfil público, consentimiento, moderación, publicación y SEO.
6. **Events:** eventos, sesiones, speakers, sponsors, tickets, cupos, check-in y attendance.
7. **Advocacy:** issues, posiciones, aprobaciones, comités, evidencias y publicaciones.
8. **Content:** noticias, recursos, traducciones, media y workflow editorial.
9. **Communications:** email, newsletters, templates, preferences y logs.
10. **Support & audit:** tickets, reclamos, activity log, exports y retention.

Requisitos de migración:

- IDs estables desde V1.
- Slugs y URLs con mapa de redirecciones.
- Fechas ISO 8601 y zona horaria explícita.
- Schemas versionados.
- Exportación de contenido a JSON/CSV o formato definido.
- No mezclar datos públicos con datos privados.
- Migración de prueba, validación, cutover y rollback.

## 16. Performance, accessibility y SEO

- HTML estático para contenido público.
- Mobile-first y responsive desde 320/360 px.
- WCAG 2.2 AA como objetivo, con teclado, foco, contraste, labels, mensajes y reduced motion.
- Metadata por página, canonical, Open Graph, sitemap y robots.
- Datos estructurados solo cuando correspondan y con hechos confirmados.
- Imágenes responsive, `width/height`, `aspect-ratio`, `loading`, `sizes` y formatos modernos.
- No cargar el directorio completo si crece: generar páginas estáticas y filtrar progresivamente.
- Presupuestos documentados para JS, imágenes, HTML y Core Web Vitals.
- Staging protegido por autenticación; `robots.txt` por sí solo no protege contenido.
- Las animaciones de scroll son progresivas: si `IntersectionObserver` o JavaScript no están disponibles, el contenido permanece visible y usable.
- Probar el slider y los reveals con movimiento reducido, teclado, lector de pantalla básico y viewport móvil/escritorio.

## 17. Seguridad, privacidad y legal

- Confirmar entidad, jurisdicción, nombre legal, términos de membresía y autoridad que aprueba contenido.
- Definir privacy policy, consent, retention, deletion, rights requests e incident response.
- Separar información pública de documentos de verificación.
- No publicar EIN, DUNS, documentos, contactos privados o credenciales.
- Formularios con minimización de datos, CAPTCHA/honeypot y límites.
- Cuentas de GitHub, hosting, dominio, correo y Web3Forms con MFA cuando esté disponible.
- Secrets solo en gestores/Actions secrets; no en Astro público.
- Headers: HTTPS, HSTS después de validar, CSP, Referrer-Policy, Permissions-Policy, X-Content-Type-Options y frame protections.
- Revisar licencias de logos, fotografías, iconos, testimonios, speakers y contenido de terceros.
- Confirmar con asesoría profesional la relación entre estructura legal, dues, sponsorships, lobbying, publicidad, partners y servicios.

La existencia de documentos en regla no autoriza al sitio a publicar su contenido ni determina por sí sola el texto tributario o legal.

## 18. Git, CI/CD y hosting cPanel

### CI

1. Checkout con commit fijado.
2. Node y pnpm fijados.
3. `pnpm install --frozen-lockfile`.
4. Tests TDD, validación de contenido y `pnpm build`.
5. Validación de enlaces, rutas, imágenes, sitemap y datos privados.
6. Artefacto `dist/` retenido para revisión.

### Deploy

- Publicar solo el artefacto aprobado.
- Usar SSH/SFTP/FTPS seguro, nunca FTP plano.
- Proteger credenciales y verificar host cuando aplique.
- Serializar deploys y conservar versión anterior.
- Definir limpieza de archivos eliminados y preservación de `.well-known`.
- Smoke test de home, membership, event, form, canonical y HTTPS.
- Rollback probado en entorno controlado.

## 19. TDD y vertical slices

El backlog futuro debe dividirse por capacidades completas, no por «hacer todo el frontend»:

1. Test harness.
2. Base layout y SEO mínimo.
3. Sistema de idiomas, rutas equivalentes y `LanguageSwitcher`.
4. Header y navegación localizada con comportamiento de scroll.
5. Sistema global de reveal on-scroll.
6. Slider responsive con assets existentes.
7. Home institucional con TrustBar/CtaBand.
8. Membership plans y comparación.
9. Membership interest form.
10. Services catalog.
11. Events listing/detail.
12. Event registration form.
13. Member directory/profile.
14. Advocacy/policy page.
15. News/resources.
16. Contact/partnership forms.
17. SEO/accessibility/performance multidioma.
18. CI/deploy/rollback.

Cada slice debe incluir datos, componente, página, estados, pruebas, accesibilidad, responsive y aceptación. No se permite una historia que abarque a la vez membership, events, directory y forms.

## 20. Operación editorial

Roles mínimos:

- Owner/legal approver.
- Membership manager.
- Events manager.
- Advocacy/content approver.
- Publicist/content editor.
- Technical maintainer.
- Backup owner.

Cada publicación debe registrar autor, aprobador, fuente, fecha de revisión, expiración y evidencia. Debe existir un procedimiento para corregir o retirar en forma urgente un precio, evento, persona, logo, contacto o policy statement.

## 21. Matriz inicial de aceptación

| Caso | Resultado |
| --- | --- |
| Home en móvil/escritorio | Sin scroll horizontal; CTA y navegación usables |
| Membership price | Coincide con tabla aprobada y fecha de vigencia |
| Formulario válido | Web3Forms confirma semánticamente y se muestra resultado claro |
| Web3Forms caído | No se simula éxito; datos permanecen y existe canal alternativo |
| Evento vencido | No aparece como upcoming |
| Evento cancelado | Estado visible y registro deshabilitado o actualizado |
| Dato de miembro no autorizado | No se publica |
| Documento privado | Nunca llega al build ni al HTML |
| Directorio vacío | Estado honesto, no perfiles inventados |
| Español no aprobado | No mostrar selector que conduzca a traducción incompleta |
| Staging | No indexable y protegido |
| Build inválido | Deploy bloqueado |
| Deploy parcial | Versión anterior recuperable |
| V2 migration | IDs, slugs y fechas importables sin pérdida |

## 22. Fases propuestas

### Fase 0 — Validación de identidad y fuentes

- Confirmar nombre, entidad, jurisdicción, idioma, contacto, precios y estatus legal.
- Clasificar cada dato local como `verified`, `needs-review`, `placeholder` o `discard`.
- Confirmar derechos de assets y autorización de personas/empresas.

### Fase 1 — Fundación Astro

- Crear/ajustar Astro, pnpm, aliases, layout, tokens, tests y CI.
- Migrar assets aprobados y eliminar placeholders.

### Fase 2 — Presencia institucional

- Home, about, mission, leadership, services y contact.

### Fase 3 — Conversión de membresías

- Plans, benefits, comparison, CTA y membership form.

### Fase 4 — Comunidad y autoridad

- Events, directory, news, resources, advocacy y sponsorships.

### Fase 5 — Publicación y operación

- SEO, accessibility, performance, deploy, rollback, smoke test y manual editorial.

### Fase 6 — V2 backend

- Diseñar y construir backend solo cuando existan volumen, procesos, responsables y requisitos confirmados.

## 23. Riesgos y mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| Contenido local pertenece a otra cámara | Clasificar y pedir aprobación antes de migrar |
| Precios distintos entre WordPress y local | Usar como canónica la tabla del proyecto local y no mezclar niveles durante la migración |
| Contacto incorrecto | Prueba end-to-end y confirmación del owner |
| Datos nominales falsos o no autorizados | No publicar hasta verificar fuente y permiso |
| Web3Forms sin persistencia | Registro operativo y fallback manual; backend en V2 |
| Eventos obsoletos | Estados, zona horaria, expiración y revisión editorial |
| Sobrearquitectura | V1 estática, slices pequeños, sin backend prematuro |
| Pérdida de SEO al migrar WordPress | Inventario de URLs, redirects, canonicals y sitemap |
| Licencias de assets | Registro de licencia/permiso por asset |
| Confusión entre Cámara y proveedor | Separar partner, sponsor, vendor y servicio de la Cámara |

## 24. Fuentes y benchmark consultado

### Fuentes del proyecto

- WordPress actual: https://americanchamberofcommerce.us/
- Prototipo local: `/Users/jf/efa/WUT/american-chamber-commerce/`
- Referencia técnica Astro: `/Users/jf/efa/CreceSer/creceser/`
- Referencia de planificación: `/Users/jf/efa/colombia-es-de-todos/`

### Fuentes externas

- IRS — Chamber of Commerce and Board of Trade: https://www.irs.gov/charities-non-profits/other-non-profits/chamber-of-commerce-and-board-of-trade
- IRS — Business leagues / 501(c)(6): https://www.irs.gov/charities-non-profits/other-non-profits/business-leagues
- U.S. Chamber — Accreditation: https://www.uschamber.com/program/federation-relations/chamber-accreditation
- U.S. Chamber — Accreditation FAQs: https://www.uschamber.com/chambers-of-commerce/accreditation-faqs
- U.S. Chamber — Membership benefits: https://www.uschamber.com/join/benefits-of-membership
- U.S. Chamber — Chamber directory examples: https://www.uschamber.com/co/chambers/florida
- ACCE — Chamber terms and operating areas: https://secure.acce.org/clientuploads/BoardSite/Glossary_of_ACCE_Terms_Jan._2025.pdf
- ACCE — Impact and value of chambers: https://secure.acce.org/clientuploads/Public_Opinion_Poll/ACCE_-_The_Impact_and_Value_of_Chambers_of_Commerce_-_2024_FINAL.pdf
- Chicagoland Chamber — membership benefits: https://www.chicagolandchamber.org/benefits-and-investments/
- Greater New York Chamber — membership benefits: https://www.chamber.nyc/chamber/benefits
- Lake Havasu Chamber — member benefits: https://www.havasuchamber.com/membership-benefits/
- Tampa Bay Chamber — benefits and advocacy: https://www.tampabaychamber.com/pages/benefits/
- Boston Chamber — benefits and advocacy: https://bostonchamber.com/membership/benefits
- U.S. Hispanic Chamber of Commerce — local chamber benefits: https://www.ushcc.com/wp-content/uploads/2023/09/local-chamber-benefits.pdf
- American Chamber of Commerce in Australia — events, advocacy, insights and resources: https://www.amcham.com.au/
- Spain–U.S. Chamber of Commerce — services and memberships benchmark: https://spainuschamber.com/services/

## 25. Criterio de cierre del PLAN

Este PLAN se considera listo para implementación cuando:

- Las siete decisiones pendientes de la sección 1 tienen respuesta.
- La entidad y la tabla de membresías local están identificadas y se usan como fuente canónica de precios.
- El contenido local queda clasificado y aprobado.
- La navegación V1 y el idioma están definidos.
- Web3Forms, correo, fallback y responsables están definidos.
- La fuente editorial, derechos, expiración y revisión de cada contenido están documentados.
- El backlog de vertical slices se deriva sin historias grandes.

Este documento no afirma que la organización, sus miembros, precios, servicios, cifras o documentos hayan sido verificados por el desarrollador. Las referencias externas son benchmarks de diseño de servicios y no autorizan a copiar claims ni beneficios.

