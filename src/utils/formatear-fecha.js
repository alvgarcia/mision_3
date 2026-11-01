export function formatearFecha(fecha, incluirHora = false) {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    ...(incluirHora ? { hour: '2-digit', minute: '2-digit' } : {}),
    timeZone: 'Europe/Madrid',
  }).format(new Date(fecha))
}
