import { CODIGO_REAL_MADRID } from '../utils/constants.js'
import { formatearFecha } from '../utils/formatear-fecha.js'
import TeamCrest from './TeamCrest.jsx'

function SummaryCards({ summary }) {
  const equipo = summary?.equipoMadrid
  const ultimoPartido = summary?.ultimoPartido
  const proximoPartido = summary?.proximoPartido
  const proximoEsLocal = proximoPartido?.local.codigo === CODIGO_REAL_MADRID
  const rivalProximo = proximoPartido
    ? (proximoEsLocal ? proximoPartido.visitante : proximoPartido.local)
    : null

  return (
    <section className="cuadricula-resumen">
      <article className="tarjeta-resumen">
        <div className="encabezado-tarjeta">
          <span className="etiqueta-tarjeta">BALANCE</span>
        </div>
        <p className="valor-metrica">
          <span>{equipo?.victorias ?? '—'}</span>{' '}
          <span className="separador-metrica">/</span>{' '}
          <span>{equipo?.derrotas ?? '—'}</span>
        </p>
        <p className="descripcion-metrica">
          Victorias <span className="punto-separador">·</span> Derrotas
        </p>
      </article>

      <article className="tarjeta-resumen">
        <div className="encabezado-tarjeta">
          <span className="etiqueta-tarjeta">POSICIÓN EN LIGA</span>
        </div>
        <p className="valor-metrica">
          <span>{equipo?.posicion ?? '—'}</span>
          <sup className="sufijo-metrica">º</sup>
        </p>
        <p className="descripcion-metrica">Clasificación general</p>
      </article>

      <article className="tarjeta-resumen">
        <div className="encabezado-tarjeta">
          <span className="etiqueta-tarjeta">ÚLTIMO PARTIDO</span>
        </div>
        <div className="marcador-partido">
          <TeamCrest team={ultimoPartido?.local} className="escudo-partido" />
          <span className="marcador-resultado">
            {ultimoPartido?.local.puntos ?? '—'} <span>:</span>{' '}
            {ultimoPartido?.visitante.puntos ?? '—'}
          </span>
          <TeamCrest team={ultimoPartido?.visitante} className="escudo-partido" />
        </div>
        <p className="descripcion-metrica">
          {ultimoPartido
            ? `${ultimoPartido.local.nombre} · ${ultimoPartido.visitante.nombre} · ${formatearFecha(ultimoPartido.fecha)}`
            : 'Esperando los datos del partido'}
        </p>
      </article>

      <article className="tarjeta-resumen">
        <div className="encabezado-tarjeta">
          <span className="etiqueta-tarjeta">PRÓXIMO ENCUENTRO</span>
        </div>
        <p className="rival-siguiente">
          {rivalProximo?.nombre ?? 'Por confirmar'}
        </p>
        <p className="descripcion-metrica">
          {proximoPartido
            ? `${proximoEsLocal ? 'LOCAL' : 'VISITANTE'} · ${formatearFecha(proximoPartido.fecha, true)}${proximoPartido.sede ? ` · ${proximoPartido.sede}` : ''}`
            : 'Esperando el calendario'}
        </p>
        <div className="datos-siguiente">
          <span>EUROLIGA</span>
          <span className="separador-meta" />
          <span>
            {proximoPartido ? `JORNADA ${proximoPartido.jornada}` : 'JORNADA —'}
          </span>
        </div>
      </article>
    </section>
  )
}

export default SummaryCards
