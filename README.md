# Real Madrid Baloncesto | Euroliga

Aplicación web con información del Real Madrid en la Euroliga. Muestra el balance y la posición en la clasificación, el último partido, el próximo encuentro y los resultados disputados.

La interfaz está desarrollada con React 19 y Vite. Los datos se consultan en la API de EuroLeague.

## Requisitos

- Node.js y npm.
- Conexión a Internet para consultar la API de EuroLeague.

## Instalación y ejecución

Desde la carpeta del proyecto, instala las dependencias y arranca el servidor de desarrollo:

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal. Ábrela en el navegador para usar el dashboard.

## Organización del código

```text
src/
├── App.jsx
├── main.jsx
├── style.css
├── components/
│   ├── DataStatus.jsx
│   ├── Header.jsx
│   ├── MatchList.jsx
│   ├── SeasonIntro.jsx
│   ├── StandingsTable.jsx
│   ├── SummaryCards.jsx
│   └── TeamCrest.jsx
├── services/
│   └── servicio-euroliga.js
└── utils/
    ├── constants.js
    ├── formatear-fecha.js
    └── transformar-datos.js
```

- `App.jsx` gestiona la carga, los errores, el reintento y el estado compartido.
- `components/` contiene los componentes de interfaz reutilizables.
- `services/servicio-euroliga.js` consulta la API y coordina la obtención de temporadas, partidos y clasificación.
- `utils/transformar-datos.js` valida, normaliza y ordena la información recibida.
- `utils/formatear-fecha.js` proporciona el formato de fecha en español.
- `style.css` contiene los estilos del dashboard.

## Uso de IA

He utilizado GitHub Copilot como apoyo para migrar progresivamente la interfaz del proyecto de M2 a React 19, organizarla en componentes y módulos, revisar la estructura de carpetas y redactar este README. Estos son ejemplos representativos de prompts que utilicé, redactados para resumir las peticiones:

1. **Planificar la migración:**  
   > Quiero adaptar este proyecto a React 19 paso a paso usando el código existente. Inspecciona primero los archivos y explícame cómo migrarías la interfaz.

2. **Organizar los archivos:**  
   > Separa los componentes JSX de los módulos JavaScript de lógica. Coloca las utilidades en `utils` y el acceso a la API en `services`, actualizando las importaciones sin cambiar el comportamiento.

## Decisiones de implementación

### Decisión 1: Reutilizar el servicio y las transformaciones existentes

Decidí reutilizar `servicio-euroliga.js` y `transformar-datos.js` del proyecto anterior, en lugar de volver a escribir la consulta, la normalización y el ordenamiento dentro de los componentes.

### Decisión 2: Separar la interfaz en componentes

Decidí dividir el dashboard en componentes como `Header`, `SummaryCards`, `StandingsTable` y `MatchList`, en vez de construir toda la interfaz desde `App.jsx`.

Así, `App` mantiene la carga y coordina las secciones principales, mientras que cada componente se responsabiliza de una parte concreta de la presentación y recibe los datos que necesita mediante props. También extraje `TeamCrest` porque la visualización del escudo se repite en distintas zonas.

### Decisión 3: Calcular el resumen a partir de los datos

Decidí derivar el balance, la posición, el último partido, el próximo encuentro y la jornada de los datos cargados, en lugar de guardar cada resultado en un `useState` independiente.

Estos valores se pueden obtener de la clasificación y los partidos. Mantenerlos como estados separados duplicaría información y obligaría a sincronizarla cada vez que cambiasen los datos.

### Decisión 4: Usar un único efecto para la carga y el reintento

Decidí realizar la carga inicial y los reintentos mediante el mismo `useEffect`, que depende de un contador de reintentos. Al cambiar el contador, el efecto vuelve a consultar el servicio sin duplicar la lógica de carga y manejo de errores.

La limpieza del efecto marca como obsoleta la ejecución anterior para evitar que actualice el estado cuando ya no corresponde. Esta limpieza evita la actualización obsoleta en React, aunque no cancela la petición de red.

### Decisión 5: Usar claves estables en las listas

Decidí identificar las filas de clasificación con el código del equipo y los encuentros con el código del partido, en vez de usar la posición del elemento en la lista.

Estos códigos representan de forma estable cada elemento aunque cambie el orden de los datos.

### Decisión 6: Mantener el diseño y los estilos
Decidí conservar `style.css`, el diseño existente, la consulta real a la API y el proxy de Vite. El objetivo de la migración es cambiar la forma de construir la interfaz, no rediseñar el dashboard ni alterar la información que presenta.

Si la API devuelve un error o no se puede consultar, la aplicación muestra el mensaje y permite reintentar.

## API y proxy de desarrollo

El servicio consulta rutas bajo `/api/euroliga`. Durante el desarrollo, la configuración de Vite en `vite.config.js` reenvía esas peticiones a `https://api-live.euroleague.net`, quitando el prefijo `/api/euroliga`.

Si la API no está disponible o devuelve una respuesta inválida, la interfaz muestra el error y permite volver a intentarlo. No se cargan datos ficticios como alternativa.
