using BLL.DTOs.Chatroom;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatRoomController : Controller
    {
        // GET: api/<MessageController>
        [HttpGet]
        public IEnumerable<ChatroomDto> Get()
        {
            yield return new ChatroomDto();
        }

        // GET api/<MessageController>/5
        [HttpGet("{id}")]
        public ChatroomDto Get(Guid id)
        {
            return new ChatroomDto();
        }

        // POST api/<MessageController>
        [HttpPost]
        public void Post([FromBody] ChatroomDto value)
        {
        }

        // PUT api/<MessageController>/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] ChatroomDto value)
        {
        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
        }
    }
}
