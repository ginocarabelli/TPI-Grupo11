using ProduccionBack.Models;
using ProduccionBack.Utils;

namespace ProduccionBack.Repositories.Usuarios
{
    public class UsuariosRepositories : IUsuariosRepositories
    {
        public EquipoContext _context;
        public UsuariosRepositories(EquipoContext context)
        {
            _context = context;
        }

        public bool Delete(int id)
        {
            Models.Usuarios? u = _context.Usuarios.Find(id);
            if (u != null)
            {
                _context.Usuarios.Remove(u);
            }
            return _context.SaveChanges() < 0;
        }

        public List<Models.Usuarios> GetAll()
        {
            return _context.Usuarios.ToList();
        }

        public Models.Usuarios GetById(int id)
        {
            return _context.Usuarios.Find(id);
        }

        public Models.Usuarios LogInUser(string username, string password)
        {
            return _context.Usuarios.Where(x => x.Usuario == username && x.Contrasena == password).FirstOrDefault();
        }

        public bool Save(Models.Usuarios usuario)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, Models.Usuarios usuario)
        {
            Models.Usuarios u = _context.Usuarios.Find(id);
            if (u == null)
            {
                u = usuario;
            }
            return _context.SaveChanges() > 0;
        }
    }
}
