const token = localStorage.getItem('jwt')
const tokenDecoded = jwt_decode(token);

if(token === null){
    window.location.href = 'index.html';
}

const ul = document.getElementById('ulNavbar');
const firstLi = document.querySelector('li');
if(tokenDecoded.rol === 'Propietario'){
    const equiposLi = document.createElement('li');
    const jugadoresLi = document.createElement('li');
    equiposLi.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Equipos
    </a>
    <ul class="dropdown-menu">
    <li class="dropdown-item">Funciones</li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Crear</a></li>
    <li><a class="dropdown-item" href="#">Editar</a></li>
    <li><a class="dropdown-item" href="#">Eliminar</a></li>
    </ul>
    `
    jugadoresLi.innerHTML = `
    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Jugadores
    </a>
    <ul class="dropdown-menu">
    <li class="dropdown-item">Funciones</li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Crear</a></li>
    <li><a class="dropdown-item" href="#">Editar</a></li>
    <li><a class="dropdown-item" href="#">Eliminar</a></li>
    </ul>
    `
    equiposLi.classList.add('nav-item', 'dropdown')
    jugadoresLi.classList.add('nav-item', 'dropdown')
    ul.insertBefore(equiposLi, firstLi);
    ul.insertBefore(jugadoresLi, equiposLi);
}
else{
    const equiposLi = document.createElement('li');
    const jugadoresLi = document.createElement('li');
    equiposLi.innerHTML = `
    <li class="nav-item">
        <a href="dashboard.html" class="nav-link active text-light" aria-current="page">
            <button class="btn btn-dark">Ver Equipos</button>
        </a>
    </li>
    `
    jugadoresLi.innerHTML = `
    <li class="nav-item">
        <a href="dashboard.html" class="nav-link active text-light" aria-current="page">
            <button class="btn btn-dark">Ver Jugadores</button>
        </a>
    </li>
    `
    ul.insertBefore(equiposLi, firstLi);
    ul.insertBefore(jugadoresLi, equiposLi);
}