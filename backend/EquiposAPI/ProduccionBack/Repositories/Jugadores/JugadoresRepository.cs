﻿
using ProduccionBack.Models;
using ProduccionBack.Utils;
using System.Data;

namespace ProduccionBack.Repositories.Jugadores
{
    public class JugadoresRepository : IJugadoresRepository
    {
        private readonly Models.EquipoContext _context;

        public JugadoresRepository(Models.EquipoContext context) {
            _context = context;
        }

        public class JugadoresTitulares
        {
            public int NroCamiseta { get; set; }
            public string NombreCompleto { get; set; }
            public string Posicion { get; set; }
            public DateTime FechaNac { get; set; }
            public string NombreEquipo { get; set; }
        }

        public bool Delete(int id)
        {
            Models.Jugadores? j = _context.Jugadores.Find(id);
            if (j != null)
            {
                j.Alta = false;
            }
            return _context.SaveChanges() > 0;
        }

        public List<Models.Jugadores> GetAll()
        {
            return _context.Jugadores.Where(j => j.Alta).ToList();
        }

        public List<JugadoresTitulares> GetStartingPlayers(int equipo)
        {
            List<JugadoresTitulares> lst = new List<JugadoresTitulares>();
            var helper = DataHelper.GetInstance();
            List<ParameterSQL> paramLst = new List<ParameterSQL>();
            paramLst.Add(new ParameterSQL("@id_equipo", equipo));
            DataTable t = helper.ExecuteSPQuery("sp_mostrar_titulares", paramLst);
            foreach (DataRow fila in t.Rows)
            {
                JugadoresTitulares j = new JugadoresTitulares();
                j.NroCamiseta = Convert.ToInt32(fila[0]);
                j.NombreCompleto = fila[1].ToString();
                j.Posicion = fila[2].ToString();
                j.FechaNac = Convert.ToDateTime(fila[3]);
                j.NombreEquipo = fila[4].ToString();
                lst.Add(j);
            }
            return lst;
        }

        public Models.Jugadores GetById(int id)
        {
            return _context.Jugadores.Where(j => j.Alta && j.IdJugador == id).ToList().FirstOrDefault();
        }

        public bool Save(Models.Jugadores jugadores)
        {
            _context.Jugadores.Add(jugadores);
            return _context.SaveChanges() > 0;
        }

        public bool Update(int id, Models.Jugadores jugador)
        {
            Models.Jugadores j = _context.Jugadores.Find(jugador.IdJugador);
            if (j != null)
            {
                j = jugador;
            }
            return _context.SaveChanges() > 0;
        }
    }
}
