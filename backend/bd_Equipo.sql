CREATE DATABASE db_Equipos
GO
USE db_Equipos
GO
CREATE TABLE Personas(
id_persona int primary key,
nombre_completo varchar(50) not null,
dni int not null,
fecha_nac date not null
)
GO
CREATE TABLE Posiciones(
id_posicion int identity primary key,
posicion varchar(25) not null
)
GO
CREATE TABLE Ligas(
id_liga int primary key,
liga varchar(50)
)
GO
CREATE TABLE Equipos(
id_equipo int primary key,
nombre_equipo varchar(25) not null,
director_tecnico int not null,
id_liga int not null,
CONSTRAINT fk_director_tecnico FOREIGN KEY (director_tecnico) REFERENCES Personas(id_persona),
)
GO
CREATE TABLE EquiposLigasInfo(
id_equipo_liga_info int identity primary key,
id_equipo int not null,
partidos_g smallint,
partidos_p smallint,
puntuacion decimal(5,2),
CONSTRAINT fk_equipo_stats FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo)
)
GO
CREATE TABLE Jugadores(
id_jugador int primary key,
id_persona int not null,
nro_camiseta smallint not null,
id_posicion int not null,
id_equipo int not null,
CONSTRAINT fk_persona FOREIGN KEY (id_persona) REFERENCES Personas(id_persona),
CONSTRAINT fk_posicion FOREIGN KEY (id_posicion) REFERENCES Posiciones(id_posicion),
CONSTRAINT fk_equipo FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo),
)
GO
CREATE TABLE JugadoresLog(
id_jugador_log int identity primary key,
id_jugador int not null,
nro_camiseta smallint not null,
id_posicion int not null,
id_equipo int not null,
fecha_actualizacion date not null,
CONSTRAINT fk_jugador_log FOREIGN KEY (id_jugador) REFERENCES Jugadores(id_jugador),
CONSTRAINT fk_posicion_log FOREIGN KEY (id_posicion) REFERENCES Posiciones(id_posicion),
CONSTRAINT fk_equipo_log FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo)
)
GO
CREATE TABLE Usuarios(
id_usuario int primary key,
usuario varchar(25) not null,
contrasena varchar(25) not null,
rol varchar(15) not null,
id_equipo int,
CONSTRAINT fk_equipo_favorito FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo)
)
GO
CREATE TABLE Partidos(
id_partido int identity primary key,
id_local int not null,
id_visitante int not null,
fecha_partido date not null,
hora_partido time not null,
arbitro int not null,
resultado_local int,
resultado_visitante int,
CONSTRAINT fk_equipo_local FOREIGN KEY (id_local) REFERENCES Equipos(id_equipo),
CONSTRAINT fk_equipo_visitante FOREIGN KEY (id_visitante) REFERENCES Equipos(id_equipo),
CONSTRAINT fk_arbitro FOREIGN KEY (arbitro) REFERENCES Personas(id_persona)
)
GO
SET DATEFORMAT DMY
GO
INSERT INTO Personas VALUES(1, 'Guillermo Farré', 23843387, '16/03/1981')
INSERT INTO Personas VALUES(2, 'Carlos Bianchi', 10225689, '26/04/1949')

INSERT INTO Equipos VALUES(1, 'Club Atlético Belgrano', 1)
INSERT INTO Equipos VALUES(2, 'Boca Juniors', 2)

INSERT INTO Usuarios VALUES(1, 'minimega', '1234', 'Propietario', 1)
INSERT INTO Usuarios VALUES(2, 'normaluser', '1234', 'Hinchada', 2)
GO
CREATE PROC SP_INSERTAR_PERSONA
@id_persona int, @nombre_completo varchar(50), @dni bigint, @fecha_nac date
AS
	INSERT INTO Personas VALUES(@id_persona, @nombre_completo, @dni, @fecha_nac)
GO
CREATE PROC SP_INSERTAR_POSICION
@posicion varchar(25)
AS
	INSERT INTO Posiciones VALUES(@posicion)
GO
CREATE PROC SP_INSERTAR_EQUIPO
@id_equipo int, @nombre_equipo varchar(25), @director_tecnico int
AS
	INSERT INTO Equipos VALUES(@id_equipo, @nombre_equipo, @director_tecnico)
GO
CREATE PROC SP_INSERTAR_JUGADOR
@id_jugador int, @id_persona int, @nro_camiseta smallint, @id_posicion int, @id_equipo int
AS
	INSERT INTO Jugadores VALUES(@id_jugador, @id_persona, @nro_camiseta, @id_posicion, @id_equipo)
GO
CREATE PROC SP_INSERTAR_USUARIO
@id_usuario int, @usuario varchar(25), @contrasena varchar(25), @rol varchar(15), @equipo_favorito int
AS
	INSERT INTO Usuarios VALUES(@id_usuario, @usuario, @contrasena, @rol, @equipo_favorito)
GO
CREATE TRIGGER TG_LOG_JUGADOR
ON Jugadores
AFTER UPDATE
AS BEGIN
	IF UPDATE(id_equipo) OR UPDATE(id_posicion) OR UPDATE(nro_camiseta)
	BEGIN
		DECLARE @fecha_actualizacion date = GETDATE();
		INSERT INTO JugadoresLog
		SELECT id_jugador, nro_camiseta, id_posicion, id_equipo, @fecha_actualizacion
		FROM inserted i
	END
END