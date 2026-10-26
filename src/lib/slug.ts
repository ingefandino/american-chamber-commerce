/**
 * Normaliza un texto a un slug estable y seguro para URLs.
 * Elimina diacríticos, colapsa separadores y recorta guiones sobrantes.
 */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
