﻿namespace ProduccionBack.Repositories.Jugadores
{
    public interface IJugadoresRepository
    {
        public List<Models.Jugadores> GetAll();
        public List<JugadoresRepository.JugadoresTitulares> GetStartingPlayers(int equipo);
        public Models.Jugadores GetById(int id);
        public bool Save(Models.Jugadores jugadores);
        public bool Update(int id, Models.Jugadores jugadores);
        public bool Delete(int id);
    }
}
