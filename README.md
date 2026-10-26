# American Chamber of Commerce — Astro

Sitio institucional estático y bilingüe (inglés/español) para la American Chamber of Commerce. V1 usa Astro, contenido versionado en Git y Web3Forms. No incluye backend, pagos ni área de miembros.

## Requisitos

- Node >= 22.23.4
- pnpm 12.15.0

## Comandos

```bash
pnpm install
pnpm dev                 # servidor local
pnpm test                # Vitest (unitarias y componentes)
pnpm test:coverage       # cobertura
pnpm build               # build estático en dist/
pnpm validate            # rutas, enlaces, hreflang, sitemap y datos privados
pnpm smoke               # smoke test de páginas críticas
pnpm smoke:visual        # Chrome local: overflow 320–1440, slider, formularios, idioma y 404
pnpm assets:social       # regenera og-image.jpg e iconos del manifest
pnpm budget              # presupuestos de JS, HTML e imágenes
pnpm ci                  # test + build + validate + smoke + budget
```

## Estructura

```text
src/
  assets/                # imágenes y datos heredados
  components/            # ui, shared, sections, membership, events, directory, advocacy, forms
  data/                  # contenido tipado y bilingüe
  layouts/BaseLayout.astro
  lib/                   # idioma, rutas, SEO, formularios, filtros, fechas
  pages/[lang]/          # rutas EN/ES
  scripts/               # adaptadores de navegador
  styles/                # tokens y estilos globales
scripts/                 # validación, smoke test y presupuestos
docs/                    # plan, backlog, operación, despliegue y contenido
public/                  # favicon, robots.txt y .htaccess
```

## Configuración

Copia `.env.example` a `.env`:

```bash
PUBLIC_WEB3FORMS_KEY=       # requerido para envíos reales
PUBLIC_NOINDEX=false        # true en staging
```

Sin `PUBLIC_WEB3FORMS_KEY`, los formularios muestran un error controlado y un canal alternativo por correo; nunca simulan éxito.

## Rutas principales

- `/` redirige a `/en/` o `/es/` según la cookie `selectedLanguage`.
- `/en/`, `/es/`
- `/{lang}/about/`, `/{lang}/membership/`, `/{lang}/services/`, `/{lang}/events/`
- `/{lang}/members/`, `/{lang}/advocacy/`, `/{lang}/news/`, `/{lang}/resources/`
- `/{lang}/partners/`, `/{lang}/sponsorship/`, `/{lang}/contact/`
- `/{lang}/privacy/`, `/{lang}/terms/`, `/{lang}/accessibility/`
- `/404.html`

## Estado del contenido

El contenido heredado está clasificado en `docs/CONTENT.md`. Precios de membresía: Silver 150, Gold 220, Platinum 500 y Diamond 700 USD/año, desde la tabla local aprobada. No se publican miembros, partners, liderazgo, comité ni noticias sin autorización verificada.

## Despliegue

Consulta `docs/DESPLIEGUE.md` para build reproducible, cPanel, headers, smoke test y rollback. La operación editorial está en `docs/OPERACION.md`.
