const ul = document.getElementById('ulTeams');
const jwtToken = localStorage.getItem('jwt');
const tokenDecoded = jwt_decode(jwtToken);

if(tokenDecoded.rol === 'Propietario'){
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
  welcomeDashboardDiv.appendChild(div)
}

async function fetchTeams(){
    await fetch('https://localhost:44321/api/Equipos')
    .then(response => response.json())
    .then(data => {
        data.forEach(equipo => {
            const li = document.createElement('li');
            li.innerHTML = `
            <img src="/assets/teams-icon/${equipo.idEquipo}.png" alt="${equipo.nombreEquipo} Logo">
            <h3 class="team-name">${equipo.nombreEquipo}</h3>
            `
            ul.appendChild(li);
            li.setAttribute('id', `${equipo.idEquipo}`)
            li.classList.add('team-item');
            
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


let isTeamSelected = false;

const equipo = document.getElementsByClassName('team-item');
equipo.addEventListener('click', () =>{
  

  const main = document.createElement('main');
  main.innerHTML = `
    <div class="team-dashboard">
            <img src="/assets/teams-icon/1.png" alt="Arsenal Logo" class="team-logo">
            <h1 class="text-light">Nombre del Equipo</h1>
            <p class="text-light">Director Técnico</p>
            <div class="team-position">
                <table>
                    <thead>
                        <th>Pos.</th>
                        <th>Nombre</th>
                        <th>Pts.</th>
                        <th>PG</th>
                        <th>PJ</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-light">1</td>
                            <td class="text-light"><img src="./assets/teams-icon/1.png" alt="Arsenal Logo">Arsenal</td>
                            <td class="text-light">20</td>
                            <td class="text-light">3</td>
                            <td class="text-light">5</td>
                        </tr>
                    </tbody>
                </table>
                </table>
            </div>
        </div>
        <div class="team-formacion">
            <div class="team-players">
                <span class="player" style="grid-column: 10; grid-row: 4;">1</span> <!-- Portero -->
                <span class="player" style="grid-column: 8; grid-row: 2;">2</span> <!-- Defensa -->
                <span class="player" style="grid-column: 8; grid-row: 4;">3</span> <!-- Defensa -->
                <span class="player" style="grid-column: 8; grid-row: 6;">4</span> <!-- Defensa -->
                <span class="player" style="grid-column: 6; grid-row: 2;">5</span> <!-- Defensa -->
                <span class="player" style="grid-column: 6; grid-row: 4;">6</span> <!-- Centrocampista -->
                <span class="player" style="grid-column: 6; grid-row: 6;">7</span> <!-- Centrocampista -->
                <span class="player" style="grid-column: 4; grid-row: 3;">8</span> <!-- Centrocampista -->
                <span class="player" style="grid-column: 4; grid-row: 3;">9</span> <!-- Centrocampista -->
                <span class="player" style="grid-column: 4; grid-row: 5;">10</span> <!-- Delantero -->
                <span class="player" style="grid-column: 2; grid-row: 4;">11</span> <!-- Delantero -->
            </div>
        </div>
  `
})

