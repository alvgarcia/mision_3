import TeamCrest from './TeamCrest.jsx'

function Header({ equipo }) {
  return (
    <header className="encabezado-sitio">
      <div className="marca">
        <TeamCrest team={equipo} className="escudo-cabecera" />
        <span className="nombre-marca">
          REAL MADRID<span> BALONCESTO</span>
        </span>
      </div>
    </header>
  )
}

export default Header
