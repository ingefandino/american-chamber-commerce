# Despliegue — American Chamber of Commerce

Este documento describe el build reproducible, la publicación en cPanel y el rollback. El sitio es estático: no hay base de datos ni migraciones.

## 1. Entornos

| Entorno | Dominio | Indexación | Protección |
| --- | --- | --- | --- |
| Local | `localhost:4321` | No relevante | Ninguna |
| Staging | Subdominio o ruta protegida | `noindex` | Basic Auth + `PUBLIC_NOINDEX=true` |
| Producción | `https://americanchamberofcommerce.us` | Indexable | HTTPS + headers |

Staging nunca se protege solo con `robots.txt`. Usa autenticación del hosting y mantén `PUBLIC_NOINDEX=true` en el build.

## 2. Variables de entorno

Crea `.env` a partir de `.env.example`.

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `PUBLIC_WEB3FORMS_KEY` | Sí, para formularios reales | Access key de Web3Forms. Sin ella, el formulario muestra un error honesto y el canal alternativo por correo. |
| `PUBLIC_NOINDEX` | No | `true` en staging/preview para emitir `noindex`. |

La access key es pública por diseño de Web3Forms; aun así, no la imprimas en logs ni la incluyas en capturas. Rótala si hay abuso.

## 3. Precondiciones

1. Node 22.23.4 o superior.
2. pnpm 12.15.0 (`packageManager` fijado en `package.json`).
3. Acceso SSH/SFTP/FTPS al hosting; nunca FTP plano.
4. Certificado HTTPS activo y DNS validado.
5. Destinatario de Web3Forms confirmado por el owner.
6. Backup del sitio WordPress anterior y mapa de URLs para redirects.

## 4. Build y verificación local

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm validate
pnpm smoke
pnpm budget
```

`pnpm ci` ejecuta la secuencia completa. El artefacto es `dist/` y debe publicarse sin modificarlo.

## 5. Publicación en cPanel (SSH + rsync)

Publica solo el artefacto aprobado y serializa los despliegues. El ejemplo usa releases y un enlace `current`.

```bash
RELEASE=$(date -u +%Y%m%d%H%M%S)
HOST=user@example.com
APP=~/american-chamber-commerce

ssh "$HOST" "mkdir -p $APP/releases/$RELEASE"
rsync -az --delete --exclude '.well-known' dist/ "$HOST:$APP/releases/$RELEASE/"
ssh "$HOST" "ln -sfn $APP/releases/$RELEASE $APP/current"
```

Si el hosting no permite symlinks en el docroot:

```bash
ssh "$HOST" "cp -a $APP/current $APP/previous"
rsync -az --delete --exclude '.well-known' dist/ "$HOST:$APP/current/"
```

Reglas:

- Conserva `.well-known` en la raíz de la cuenta.
- Conserva al menos una release anterior completa.
- No borres `.htaccess`; forma parte de `public/` y se publica con el build.
- Serializa con el `concurrency` de GitHub Actions o `flock` en el servidor.
- Si el hosting sirve desde `public_html`, ajusta rutas sin cambiar el contenido de `dist/`.

## 6. Smoke test posterior

```bash
curl -sI https://americanchamberofcommerce.us/ | grep -iE 'HTTP/|location|strict-transport'
curl -s https://americanchamberofcommerce.us/en/ | grep -o '<title>[^<]*'
curl -s https://americanchamberofcommerce.us/es/membership/plans/ | grep -o 'href="/es/membership/apply/"'
curl -s https://americanchamberofcommerce.us/en/contact/ | grep -o 'data-contact-form'
curl -s https://americanchamberofcommerce.us/404.html | grep -o 'data-lang-block'
```

Comprueba manualmente:

- `/` redirige según cookie o a `/en/`.
- `/en/` y `/es/` cargan con header, footer y selector.
- El slider responde a flechas, dots, teclado y pausa.
- Un formulario inválido enfoca el primer error.
- Sin `PUBLIC_WEB3FORMS_KEY`, el formulario falla de forma visible y conserva datos.
- Un evento sin traducción no muestra enlace al otro idioma.
- No hay scroll horizontal a 320, 360 y 390 px.

No envíes formularios reales desde CI.

## 7. Rollback

1. Identifica la release anterior.
2. Cambia el enlace `current` o restaura el backup.

```bash
ssh "$HOST" "ln -sfn $APP/releases/<RELEASE_ANTERIOR> $APP/current"
```

3. Repite el smoke test.
4. Registra la causa y el cambio en el historial operativo.

El rollback debe probarse en staging antes del primer despliegue a producción.

## 8. Headers y HSTS

`public/.htaccess` publica:

- `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- `X-Frame-Options` y `frame-ancestors`.
- CSP con `api.web3forms.com` y Google Fonts permitidos.
- Compresión y caché de assets con hash.

Activa HSTS solo después de validar HTTPS en todos los hostnames:

```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

Confirma que el proveedor permite CSP y headers. Si no, configura los headers en el panel del hosting.

## 9. Redirects de WordPress

Antes del cutover:

1. Inventaria URLs públicas del WordPress y su tráfico.
2. Mapea cada URL a la nueva ruta equivalente.
3. Implementa redirects 301 en `.htaccess` o en el panel del hosting.
4. Verifica que no existan cadenas de redirects ni destinos 404.
5. Mantén el WordPress accesible en staging hasta confirmar el rollback.
