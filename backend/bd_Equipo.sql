CREATE DATABASE Equipo
GO
USE Equipo
GO
CREATE TABLE Personas(
id_persona int primary key,
nombre_completo varchar(50),
dni int,
fecha_nac date
)
GO
CREATE TABLE Posiciones(
id_posicion int identity primary key,
posicion varchar(25)
)
GO
CREATE TABLE Equipos(
id_equipo int primary key,
nombre_equipo varchar(25),
director_tecnico int,
CONSTRAINT fk_director_tecnico FOREIGN KEY (director_tecnico) REFERENCES Personas(id_persona),
)
CREATE TABLE Jugadores(
id_jugador int primary key,
id_persona int,
nro_camiseta int,
id_posicion int,
id_equipo int,
CONSTRAINT fk_persona FOREIGN KEY (id_persona) REFERENCES Personas(id_persona),
CONSTRAINT fk_posicion FOREIGN KEY (id_posicion) REFERENCES Posiciones(id_posicion),
CONSTRAINT fk_equipo FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo),
)
GO
SET DATEFORMAT DMY
GO