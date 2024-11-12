using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProduccionBack.Models;
using ProduccionBack.Repositories.Equipos;

namespace ProduccionBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquiposController : ControllerBase
    {
        public IEquiposRepository _repo;
        public EquiposController(IEquiposRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_repo.GetAll());
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var entity = _repo.GetById(id);
            if(entity != null)
            return Ok(entity);
            return BadRequest();
        }
        [HttpPost]
        public IActionResult Create([FromBody] Equipos equipo)
        {
            if (_repo.Save(equipo))
            return Ok("Equipo Creado!");
            return StatusCode(500, "ERROR INTERNO");
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Equipos equipo)
        {
            if (_repo.Update(id, equipo))
                return Ok("Equipo Editado!");
            return StatusCode(500, "ERROR INTERNO");
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (_repo.Delete(id))
                return Ok("Equipo Eliminado!");
            return StatusCode(500, "ERROR INTERNO");
        }
    }
}
