import { useEffect, useState } from 'react'
import { CODIGO_REAL_MADRID } from './utils/constants.js'
import DataStatus from './components/DataStatus.jsx'
import Header from './components/Header.jsx'
import MatchList from './components/MatchList.jsx'
import SeasonIntro from './components/SeasonIntro.jsx'
import StandingsTable from './components/StandingsTable.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import {
  obtenerPartidosDisputadosDelMadrid,
} from './utils/transformar-datos.js'
import { obtenerDatosEuroliga } from './services/servicio-euroliga.js'
import './style.css'

function obtenerResumen(datos) {
  if (!datos) return null

  const equipoMadrid = datos.clasificacion.find(
    (equipo) => equipo.codigo === CODIGO_REAL_MADRID,
  )
  const partidosMadridDisputados = obtenerPartidosDisputadosDelMadrid(datos.partidos)
  const partidoConEscudoMadrid = datos.partidos.find(
    (partido) => (
      partido.local.codigo === CODIGO_REAL_MADRID
      || partido.visitante.codigo === CODIGO_REAL_MADRID
    ),
  )
  const proximosPartidos = datos.partidos
    .filter((partido) => (
      !partido.disputado
      && Date.parse(partido.fecha) >= Date.now()
      && (
        partido.local.codigo === CODIGO_REAL_MADRID
        || partido.visitante.codigo === CODIGO_REAL_MADRID
      )
    ))
    .sort((partidoA, partidoB) => Date.parse(partidoA.fecha) - Date.parse(partidoB.fecha))

  return {
    equipoMadrid,
    ultimoPartido: partidosMadridDisputados[0],
    proximoPartido: proximosPartidos[0],
    partidoConEscudoMadrid,
    jornadaActual: Math.max(
      ...partidosMadridDisputados.map((partido) => partido.jornada),
      0,
    ),
  }
}

function App() {
  const [datos, setDatos] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [numeroReintento, setNumeroReintento] = useState(0)
  const resumen = obtenerResumen(datos)
  const equipoCabecera = resumen?.partidoConEscudoMadrid?.local.codigo === CODIGO_REAL_MADRID
    ? resumen.partidoConEscudoMadrid.local
    : resumen?.partidoConEscudoMadrid?.visitante

  useEffect(() => {
    let cancelado = false

    async function cargarDatos() {
      setCargando(true)
      setError('')

      try {
        const nuevosDatos = await obtenerDatosEuroliga()
        if (!cancelado) setDatos(nuevosDatos)
      } catch (errorCarga) {
        if (!cancelado) {
          setError(errorCarga instanceof Error ? errorCarga.message : String(errorCarga))
        }
      } finally {
        if (!cancelado) setCargando(false)
      }
    }

    void cargarDatos()

    return () => {
      cancelado = true
    }
  }, [numeroReintento])

  return (
    <div id="aplicacion">
      <Header equipo={equipoCabecera} />
      <main id="inicio" className="contenedor-pagina">
        <SeasonIntro season={datos?.temporada} />
        <DataStatus
          loading={cargando}
          error={error}
          onRetry={() => setNumeroReintento((intento) => intento + 1)}
        />
        <SummaryCards summary={resumen} />
        <div className="cuadricula-contenido">
          <StandingsTable
            equipos={datos?.clasificacion ?? []}
            jornada={resumen?.jornadaActual ?? 0}
          />
          <MatchList partidos={datos?.partidos ?? []} />
        </div>
      </main>
    </div>
  )
}

export default App
