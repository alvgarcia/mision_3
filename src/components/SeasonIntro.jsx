function SeasonIntro({ season }) {
  return (
    <section className="fila-bienvenida">
      <div>
        <p className="texto-auxiliar">
          TEMPORADA <span>{season ?? '—'}</span>{' '}
          <span className="separador-auxiliar">/</span> EUROLIGA
        </p>
        <h1>
          El camino a la <span className="acento-titulo">gloria.</span>
        </h1>
        <p className="texto-bienvenida">
          Toda la actualidad del Real Madrid en Europa, en un solo lugar.
        </p>
      </div>
    </section>
  )
}

export default SeasonIntro
