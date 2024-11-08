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
            throw new NotImplementedException();
        }

        public List<Models.Usuarios> GetAll()
        {
            throw new NotImplementedException();
        }

        public Models.Usuarios GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Models.Usuarios LogInUser(string username, string password)
        {
            return _context.Usuarios.FirstOrDefault(x => x.Usuario == username && x.Contrasena == password);
        }

        public bool Save(Models.Usuarios usuario)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, Models.Usuarios usuario)
        {
            throw new NotImplementedException();
        }
    }
}
