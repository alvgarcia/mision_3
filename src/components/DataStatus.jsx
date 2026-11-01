function DataStatus({ loading, error, onRetry }) {
  if (loading) {
    return (
      <div className="estado-datos" aria-live="polite">
        <p className="mensaje-datos" role="status">
          Cargando datos de EuroLeague...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="estado-datos" aria-live="polite">
        <p className="mensaje-datos mensaje-error" role="alert">
          No se pudieron cargar los datos: {error}
        </p>
        <button className="boton-reintento" type="button" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    )
  }

  return null
}

export default DataStatus
