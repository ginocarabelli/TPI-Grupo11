const jwtToken = localStorage.getItem('jwt');
const tokenDecoded = jwt_decode(jwtToken);

if(tokenDecoded.rol === 'Propietario'){
  
  mostrarEquipos();
  const div = document.createElement('div');
  const welcomeDashboardDiv = document.getElementById('welcomeDashboard');
  div.innerHTML = `
  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal">
      Crear
  </button>
  <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#myModal">
      Eliminar
  </button>
  `;
  div.classList.add('functions-dashboard');
  welcomeDashboardDiv.appendChild(div);
}

async function mostrarEquipos() {
  const main = document.getElementById('principalMain');
  main.classList.remove(...main.classList);
  main.classList.add('container-fluid');
  main.innerHTML = `
  <div class="welcome-dashboard container-lg" id="welcomeDashboard">
            <div class="text-welcome">
                <h1 id="personalized-message">Bienvenido al Tablero de Equipos</h1>
                <p>¡Aquí encontrarás todos los equipos y funciones habilitadas para tu usuario!</p>
            </div>
            
            <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5 text-dark" id="ModalLabel">Crear Equipo</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="modalBody">
                                <form class="row g-3" id="createTeam" method="POST">
                                    <div class="col-md-6">
                                        <label for="teamName" class="form-label text-dark">Nombre del Equipo</label>
                                        <input type="text" class="form-control" id="teamName" placeholder="Sacachispa" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="selectDt" class="form-label text-dark">Director Técnico</label>
                                        <select class="form-select text-dark" id="selectDt" required>
                                        </select>
                                    </div>
                                    <div class="col-md-5">
                                        <label for="selectLigue" class="form-label text-dark">Liga</label>
                                        <select class="form-select" id="selectLigue" required>
                                        </select>
                                    </div>
                                    <div class="col-md-7 form-check">
                                        <label class="form-check-label text-dark" for="flexCheckDefault">
                                        ¿Actualmente Participando?
                                        </label>
                                        <input type="checkbox" value="alta" id="flexCheckDefault">
                                      </div>
                                      <div class="modal-footer" id="modalFooter">
                                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="btnBefore">Cancelar</button>
                                      <button type="submit" class="btn btn-primary">Guardar</button>
                                      </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    <section class="teams-slider">
        <h2 class="text-light">Equipos</h2>
        <ul class="teams-ul" id="ulTeams">
        </ul>
    </section>
  `;
  fetchTeams();
}

const ul = document.getElementById('ulTeams');

async function fetchTeams(){
  await fetch('https://localhost:44321/api/Equipos')
  .then(response => response.json())
  .then(data => {
      data.forEach(equipo => {
          const teamLi = document.createElement('li');
          teamLi.innerHTML = `
          <img src="/assets/teams-icon/${equipo.idEquipo}.png" alt="${equipo.nombreEquipo} Logo">
          <h3 class="team-name">${equipo.nombreEquipo}</h3>
          `
          ul.appendChild(teamLi);
          teamLi.setAttribute('id', `${equipo.idEquipo}`)
          teamLi.classList.add('team-item');

          teamLi.addEventListener('click', () => CambiarMain(equipo));

          const select = document.getElementById('selectDt');
          const option = document.createElement('option')
          option.value = equipo.directorTecnico;
          option.textContent = equipo.directorTecnicoNavigation.nombreCompleto;

          select.appendChild(option);
      });
      const selectLigue = document.getElementById('selectLigue');
      const optionLigue = document.createElement('option');
      optionLigue.value = data[0].idLiga;
      optionLigue.textContent = data[0].idLigaNavigation.liga1;
      selectLigue.appendChild(optionLigue);
      
  })
  .catch(error => console.error('Error:', error));
}

async function CambiarMain(equipo) {
  const main = document.getElementById('principalMain');

  main.innerHTML = ` 
    <div class="team-dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left text-light mb-2" viewBox="0 0 16 16" style="cursor: pointer" id="btnBack">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
        </svg>
        <img src="/assets/teams-icon/${equipo.idEquipo}.png" alt="${equipo.nombreEquipo} Logo" class="team-logo">
        <h1 class="text-light">${equipo.nombreEquipo}</h1>
        <p class="text-light">${equipo.directorTecnicoNavigation.nombreCompleto}</p>
        <div class="team-position">
            <table>
                <thead>
                    <th>Pos.</th>
                    <th>Nombre</th>
                    <th>PG</th>
                    <th>PP</th>
                    <th>Pts.</th>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-light">${equipo.idEquipo}</td>
                        <td class="text-light"><img src="/assets/teams-icon/${equipo.idEquipo}.png" alt="${equipo.nombreEquipo} Logo">${equipo.nombreEquipo}</td>
                        <td class="text-light">${equipo.equiposLigasInfos[0].partidosG}</td>
                        <td class="text-light">${equipo.equiposLigasInfos[0].partidosG}</td>
                        <td class="text-light">${equipo.equiposLigasInfos[0].puntuacion}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="team-formacion">
        <div class="team-players" id="formaciones">
            
        </div>
    </div>
  `;

  fetchJugadores(equipo.idEquipo)

  // Agregar clase de contenedor
  main.classList.add('container-fluid', 'team-selected');

  // Recuperar el botón de retroceso y agregar el evento para volver
  const backButton = document.getElementById('btnBack');
  backButton.addEventListener('click', function() {
    // No borrar el contenido de main, solo recargar los equipos
    window.location.href = "equipos.html"
  });
};

async function fetchJugadores(id){
  await fetch(`https://localhost:44321/api/Jugadores/${id}`)
  .then(response => response.json())
  .then(data => {
      data.forEach(jugador => {
          const div = document.getElementById('formaciones');
          const span = document.createElement('li');
          span.classList.add('player');
          switch (jugador.posicion) {
            case 'Portero':
              span.style.gridColumn = '10';
              span.style.gridRow = '4';
              break;
            case 'Defensa Central':
              span.style.gridColumn = '8';
              span.style.gridRow = '4';
              break;
            case 'Lateral Derecho':
              span.style.gridColumn = '8';
              span.style.gridRow = '2';
              break;
            case 'Lateral Izquierdo':
              span.style.gridColumn = '8';
              span.style.gridRow = '6';
              break;
            case 'Mediocentro Defensivo':
              span.style.gridColumn = '6';
              span.style.gridRow = '3';
              break;
            case 'Mediocentro':
              span.style.gridColumn = '6';
              span.style.gridRow = '5';
            break;
            case 'Mediocentro Ofensivo':
              span.style.gridColumn = '4';
              span.style.gridRow = '4';
            break;
            case 'Extremo Derecho':
              span.style.gridColumn = '4';
              span.style.gridRow = '2';
            break;
            case 'Extremo Izquierdo':
              span.style.gridColumn = '4';
              span.style.gridRow = '6';
            break;
            case 'Segundo Delantero':
              span.style.gridColumn = '2';
              span.style.gridRow = '2';
            break;
            case 'Delantero Centro':
              span.style.gridColumn = '2';
              span.style.gridRow = '4';
            break;
            default:
              // Bloque de código que se ejecuta si no se encuentra un caso que coincida
              break;
          }
          span.textContent = jugador.nroCamiseta;
          div.appendChild(span);
      });
  })
  .catch(error => console.error('Error:', error));
}

const formCreate = document.getElementById('createTeam');

formCreate.addEventListener('submit', async function(e) {
    e.preventDefault();

    const teamName = document.getElementById('teamName').value;
    const technicalDirector = document.getElementById('selectDt').value;
    const ligue = document.getElementById('selectLigue').value;
    const isPlaying = document.getElementById('flexCheckDefault').checked;

    const data = {
        nombreEquipo: teamName,
        directorTecnico: technicalDirector,
        idLiga: ligue,
        alta: isPlaying
    };

    await fetch('https://localhost:44321/api/Equipos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
          return response.text();  // Esto retorna otra promesa
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(data => {
        const div = document.createElement('div');
        div.innerHTML = `
        <hp class="text-dark">${data}</p>
        `
        div.classList.add('col-md-12');
        const modalFooter = document.getElementById('modalFooter')
        formCreate.insertBefore(div, modalFooter);
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
      });

    //   
});

fetchTeams();

