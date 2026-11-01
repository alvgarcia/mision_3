import { useState } from 'react'

function obtenerUrlEscudo(url) {
  if (!url) return ''

  try {
    const direccion = new URL(url)
    return direccion.protocol === 'https:' ? direccion.href : ''
  } catch {
    return ''
  }
}

function TeamCrest({ team, className }) {
  const [urlFallida, setUrlFallida] = useState('')
  const url = obtenerUrlEscudo(team?.escudo)

  return (
    <span className={`espacio-escudo ${className}`}>
      {url && url !== urlFallida && (
        <img
          className="imagen-escudo"
          src={url}
          alt={`Escudo de ${team.nombre}`}
          onError={() => setUrlFallida(url)}
        />
      )}
    </span>
  )
}

export default TeamCrest
