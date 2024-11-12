using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProduccionBack.Repositories.Jugadores;

namespace ProduccionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JugadoresController : ControllerBase
    {
        public IJugadoresRepository _repo;
        public JugadoresController(IJugadoresRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repo.GetAll());
        }
        [HttpGet("{idEquipo}")]
        public IActionResult Get(int idEquipo)
        {
            return Ok(_repo.GetStartingPlayers(idEquipo));
        }
    }
}
