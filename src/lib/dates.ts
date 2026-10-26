/**
 * Construye una fecha ISO 8601 con el offset de la zona horaria indicada.
 * Se usa para datos estructurados de eventos.
 */
export function zonedIso(
  date: string,
  time: string,
  timeZone: string,
): string {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  });
  const offsetPart = formatter
    .formatToParts(new Date(utcGuess))
    .find((part) => part.type === "timeZoneName")?.value;
  const offset = offsetPart?.replace("GMT", "") || "+00:00";
  const normalizedOffset = offset === "" ? "+00:00" : offset;

  return `${date}T${time}:00${normalizedOffset}`;
}
