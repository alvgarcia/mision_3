import { CODIGO_REAL_MADRID } from '../utils/constants.js'
import { formatearFecha } from '../utils/formatear-fecha.js'
import { obtenerPartidosDisputadosDelMadrid } from '../utils/transformar-datos.js'

function MatchList({ partidos }) {
  const partidosMadrid = obtenerPartidosDisputadosDelMadrid(partidos)

  return (
    <section id="partidos" className="panel">
      <div className="encabezado-seccion">
        <div>
          <p className="texto-auxiliar">RESULTADOS RECIENTES</p>
          <h2>Partidos disputados</h2>
        </div>
      </div>
      <div className="lista-partidos">
        {partidos.length > 0 && partidosMadrid.length === 0 ? (
          <p className="mensaje-vacio">
            Todavía no hay partidos disputados del Real Madrid.
          </p>
        ) : partidosMadrid.map((partido) => {
          const madridJuegaEnCasa = partido.local.codigo === CODIGO_REAL_MADRID
          const madrid = madridJuegaEnCasa ? partido.local : partido.visitante
          const rival = madridJuegaEnCasa ? partido.visitante : partido.local
          const victoria = madrid.puntos > rival.puntos

          return (
            <article className="fila-partido" key={partido.codigo}>
              <div className="detalles-partido">
                <span className="jornada-partido">J{partido.jornada}</span>
                <span className="sede-partido">
                  {madridJuegaEnCasa ? 'LOCAL' : 'VISITANTE'}
                </span>
                <p className="rival-partido">{rival.nombre}</p>
                <span className="fecha-partido">
                  {formatearFecha(partido.fecha)}
                </span>
              </div>
              <div className="resultado-partido">
                <span className="marcador-lista">
                  {partido.local.puntos}–{partido.visitante.puntos}
                </span>
                <span className={`estado-partido ${victoria ? 'victoria' : 'derrota'}`}>
                  {victoria ? 'V' : 'D'}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default MatchList
