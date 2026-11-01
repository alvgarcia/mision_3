import { CODIGO_REAL_MADRID } from '../utils/constants.js'
import { ordenarClasificacion } from '../utils/transformar-datos.js'

function StandingsTable({ equipos, jornada }) {
  return (
    <section id="clasificacion" className="panel">
      <div className="encabezado-seccion">
        <div>
          <p className="texto-auxiliar">
            {jornada ? `JORNADA ${jornada} · EUROLIGA` : 'CLASIFICACIÓN ACTUAL'}
          </p>
          <h2>Clasificación</h2>
        </div>
      </div>
      <div className="envoltorio-tabla">
        <table className="tabla-clasificacion">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">EQUIPO</th>
              <th scope="col">PJ</th>
              <th scope="col">V</th>
              <th scope="col">D</th>
              <th scope="col">+/−</th>
            </tr>
          </thead>
          <tbody>
            {ordenarClasificacion(equipos).map((equipo) => (
              <tr
                key={equipo.codigo}
                className={equipo.codigo === CODIGO_REAL_MADRID ? 'fila-real-madrid' : ''}
              >
                <td>{equipo.posicion}</td>
                <td>{equipo.nombre}</td>
                <td>{equipo.jugados}</td>
                <td>{equipo.victorias}</td>
                <td>{equipo.derrotas}</td>
                <td>{equipo.diferencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default StandingsTable
