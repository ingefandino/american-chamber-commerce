# Operación editorial y técnica

## 1. Roles mínimos

| Rol | Responsabilidad |
| --- | --- |
| Owner / aprobador legal | Nombre, entidad, contacto, precios, términos y declaraciones públicas. |
| Membership manager | Solicitudes, niveles, renovaciones y respuestas. |
| Events manager | Fechas, lugar, zona horaria, estado, aforo y registro. |
| Advocacy/content approver | Posiciones, prioridades, fuentes y retiro de contenido sensible. |
| Editor / publicista | Noticias, recursos, perfiles y traducciones. |
| Maintainer técnico | Build, despliegue, headers, formularios, accesibilidad y rollback. |
| Backup owner | Cobertura cuando el maintainer no está disponible. |

## 2. Estados editoriales

| Estado | Significado | Visible |
| --- | --- | --- |
| `approved` | Fuente y aprobador confirmados. | Sí |
| `needs-review` | Contenido de trabajo; no es definitivo. | Solo con etiqueta explícita. |
| `draft` | No publicable. | No |
| `retired` | Retirado de rutas y listados. | No |

Cada publicación debe registrar: autor, aprobador, fuente, fecha de revisión, fecha de expiración (si aplica) y evidencia. Los precios, eventos, perfiles y posiciones no se publican sin ese registro.

## 3. Flujo de cambio de contenido

1. Identifica la fuente y el aprobador.
2. Edita datos tipados o contenido; no dupliques textos entre idiomas.
3. Ejecuta `pnpm test` y `pnpm build`.
4. Revisa `/en/` y `/es/` en 320, 360, 390, 768 y 1440 px.
5. Verifica teclado, foco, mensajes de error y reduced motion.
6. Ejecuta `pnpm validate`, `pnpm smoke` y `pnpm budget`.
7. Revisa el diff y abre un PR pequeño.
8. Despliega con el procedimiento de `DESPLIEGUE.md`.
9. Registra la revisión y el rollback disponible.

## 4. Formularios y Web3Forms

- Destinatario autorizado: confirmar con el owner antes de producción.
- `form_type`: `membership_interest`, `event_registration`, `contact`.
- Cada formulario incluye honeypot, validación cliente, timeout y canal alternativo.
- El éxito solo se muestra con `success: true` del proveedor.
- Si falla, los datos permanecen en pantalla.
- Revisa la cuota de Web3Forms y el correo de destino semanalmente.
- Rota la access key si hay spam o exposición.
- No subas documentos privados por formularios en V1.
- No registres payloads con datos personales en consola ni en analítica.
- El botón de WhatsApp usa `https://wa.me/13473012169`; confirma el número con el owner y evita duplicarlo en otros componentes.

## 5. Contenido sensible

Antes de publicar o actualizar:

- **Precios:** deben coincidir con la tabla local aprobada. No mezclar niveles de WordPress.
- **Contacto:** correo, teléfono y direcciones deben coincidir con la fuente aprobada.
- **Miembros y partners:** solo con autorización y revisión; el directorio vacío es un estado válido.
- **Liderazgo y comité:** no publicar nombres heredados sin verificación.
- **Eventos:** fecha, zona horaria, lugar, estado y fuente. Un evento pasado no se presenta como próximo.
- **Advocacy:** una prioridad no es una posición aprobada; no atribuir lobby o alianzas sin acuerdo.
- **Legal:** los textos marcados como borrador no son definitivos.

## 6. Incidentes

1. Identifica la URL o formulario afectado.
2. Si hay dato privado, precio incorrecto, suplantación o contenido no autorizado, retira la página o el dato de inmediato.
3. Si el problema está en producción, ejecuta rollback a la release anterior.
4. Notifica al owner y al aprobador legal.
5. Registra causa, alcance, corrección y prevención.
6. Si hay datos personales comprometidos, sigue el procedimiento legal aplicable.

## 7. SEO y previews sociales

- `og-image.jpg` debe ser 1200x630, con logo aprobado y texto alternativo localizado.
- Manifest e iconos 192/512 se regeneran con `pnpm assets:social`.
- Antes de publicar, valida previews en:
  - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
  - WhatsApp: prueba manual del enlace en móvil.
- No cambies la URL estable `/og-image.jpg` sin invalidar cachés de redes sociales.
- Mantén `canonical`, `hreflang`, `x-default`, sitemap y robots alineados con las rutas publicadas.
- Staging debe construirse con `PUBLIC_NOINDEX=true` y autenticación del hosting.

## 8. Accesibilidad y rendimiento

Cadencia recomendada:

- En cada PR: pruebas, build, presupuestos, smoke y visual smoke.
- Mensual: teclado, foco, contraste, lector de pantalla básico y 320 px.
- Trimestral: Lighthouse/Core Web Vitals, enlaces, dependencias y headers.
- Semestral: revisión de contenido, derechos de assets, precios y contactos.

Presupuestos actuales (ver `scripts/check-budgets.mjs`):

- JS total < 350 KB; archivo JS < 120 KB.
- HTML < 350 KB por página.
- Imagen individual < 700 KB; total de imágenes < 8 MB.
- Sin scroll horizontal desde 320 px (`pnpm smoke:visual`).
- WCAG 2.2 AA como objetivo.

## 9. Backups y recuperación

- Conserva al menos dos releases completas.
- Backup del docroot y de `.well-known` antes de cada cambio mayor.
- No dependas de `robots.txt` para ocultar staging.
- Prueba el rollback en staging antes del cutover.
- Documenta la fecha y el responsable de cada backup.
