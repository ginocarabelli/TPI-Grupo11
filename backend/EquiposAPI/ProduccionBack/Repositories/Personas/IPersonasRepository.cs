namespace ProduccionBack.Repositories.Personas
{
    public interface IPersonasRepository
    {
        public List<Models.Personas> GetAll();
        public Models.Personas GetById(int id);
        public bool Save(Models.Personas personas);
        public bool Update(int id, Models.Personas personas);
        public bool Delete(int id);
    }
}
