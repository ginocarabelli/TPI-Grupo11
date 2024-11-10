
namespace ProduccionBack.Repositories.Jugadores
{
    public class JugadoresRepository : IJugadoresRepository
    {
        private readonly Models.EquipoContext _context;

        public JugadoresRepository(Models.EquipoContext context) {
            _context = context;
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
