
namespace ProduccionBack.Repositories.Personas
{
    public class PersonasRepository : IPersonasRepository
    {
        private readonly Models.EquipoContext _context;

        public PersonasRepository(Models.EquipoContext context)
        {
            _context = context;
        }
        public bool Delete(int id)
        {
            Models.Personas? p = _context.Personas.Find(id);
            if (p != null)
            {
                p.Alta = false;
            }
            return _context.SaveChanges() > 0;
        }

        public List<Models.Personas> GetAll()
        {
            return _context.Personas.Where(p => p.Alta).ToList();
        }

        public Models.Personas GetById(int id)
        {
            return _context.Personas.Where(p => p.Alta && p.IdPersona == id).ToList().FirstOrDefault();
        }

        public bool Save(Models.Personas personas)
        {
            _context.Personas.Add(personas);
            return _context.SaveChanges() > 0;
        }

        public bool Update(int id, Models.Personas personas)
        {
            Models.Personas? p = _context.Personas.Find(personas.IdPersona);
            if (p != null)
            {
                p = personas;
            }
            return _context.SaveChanges() > 0;
        }
    }
}
