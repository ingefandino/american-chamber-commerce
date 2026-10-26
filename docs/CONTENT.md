# Inventario y estado del contenido

Este documento evita publicar datos heredados como si fueran definitivos. La fuente canónica se indica por tipo.

## 1. Fuentes

| Fuente | Uso | Estado |
| --- | --- | --- |
| `/Users/jf/efa/WUT/american-chamber-commerce/` | Datos, textos, imágenes históricas | `needs-review` |
| `https://americanchamberofcommerce.us/` | Referencia pública de contenido | `needs-review` |
| Documentos del cliente | Identidad, legal, contacto, precios, permisos | Pendientes |
| `/Users/jf/efa/CreceSer/creceser/` | Patrón técnico Astro | Referencia |
| `/Users/jf/efa/colombia-es-de-todos/` | Patrón de planificación | Referencia |

## 2. Estado por tipo de contenido

| Contenido | Fuente usada | Estado | Nota |
| --- | --- | --- | --- |
| Nombre público | “American Chamber of Commerce” | `needs-review` | Confirmar nombre legal/comercial. |
| Misión, visión, valores | Proyecto local | `needs-review` | Revisión del owner. |
| Precios de membresía | JSON local EN/ES | `approved` como tabla canónica | Silver 150, Gold 220, Platinum 500, Diamond 700 USD/año. No mezclar con WordPress. |
| Beneficios de membresía | JSON local EN/ES | `needs-review` | El texto bilingüe proviene del proyecto local. |
| Servicios | JSON local | `needs-review` | No afirmar disponibilidad ni resultados garantizados. |
| Eventos | JSON local | `needs-review` | Todos son pasados. No hay eventos próximos verificados. |
| Miembros | Sin fuente autorizada | `empty` | El directorio vacío es intencional. |
| Partners y sponsors | Sin fuente autorizada | `empty` | No se reutilizan nombres de otras cámaras. |
| Liderazgo, comité, equipo | Proyecto local | `do-not-publish` | Nombres y cargos sin autorización verificada. |
| Advocacy | Sitio público, observado 2026-10-26 | `needs-review` | Temas, no posiciones legislativas aprobadas. |
| Noticias | Sin fuente verificada | `empty` | No se inventan artículos. |
| Recursos | Servicios publicados | `needs-review` | Enlaces navegacionales, sin promesas. |
| Privacidad y términos | Borrador técnico | `needs-review` | Requieren revisión legal. |
| Accesibilidad | Compromiso técnico | `approved` como declaración operativa | Revisar tras auditoría externa. |

## 3. Contacto publicado

Fuente: proyecto local (`src/data/site.ts`).

- Email: `info@americanchamberofcommerce.us`
- Teléfono: `+1 (904) 397-3437`
- Dirección: `753 East Tremont, Bronx, New York 10457, USA`
- Dirección secundaria: `111 E Monument Ave Ste 327, Bronx, New York, USA`

El sitio WordPress muestra un teléfono y un `mailto` distintos. **Debe confirmarse el dato oficial antes de producción.** Mientras no se confirme, este contenido queda `needs-review`.

## 4. Assets

- Slider: 9 imágenes WebP del proyecto local.
- Logos: `logo-acc.png` y `logo_blanco.png`.
- Imagen de Nueva York: `about/new-york.webp`.
- Imagen social: `public/og-image.jpg` (1200x630, generada desde New York + logo blanco).
- Iconos de manifest: `public/icons/icon-192.png`, `icon-512.png` y `public/apple-touch-icon.png`.
- No se publicaron logos de miembros, partners, comité o equipo.
- Registrar licencia, autor, fecha y permiso de cada asset antes de producción.
- No publicar fotos de personas sin consentimiento vigente.

## 5. Datos que nunca se publican

- EIN, DUNS, documentos de constitución, contratos, verificaciones.
- Datos personales de representantes sin consentimiento.
- Credenciales, access keys, documentos privados y notas internas.
- Nombres de empresas o personas sin autorización.
- Cifras, testimonios o alianzas no aprobadas.

## 6. Decisiones pendientes (PLAN §1)

1. Nombre público y legal.
2. Figura legal/tributaria.
3. Idiomas definitivos (hoy EN/ES).
4. Confirmación de precios y vigencia.
5. Teléfono y correo oficiales.
6. Autorización de miembros, comité, equipo, logos, fotos y eventos.
7. Alcance de Web3Forms (contacto, membresía, eventos, sponsorship, prensa).
8. Cobro de membresía dentro de V1 (hoy: solicitud y contacto manual).

## 7. Reglas editoriales

- Un dato sin fuente no se publica.
- Un texto heredado se etiqueta como `needs-review` hasta aprobación.
- Un idioma sin traducción real no genera enlaces ni selector.
- Un evento pasado no se presenta como próximo.
- Un precio antiguo no se presenta como vigente.
- Un servicio retirado no se publica.
- El directorio vacío es preferible a perfiles inventados.
