using API.Controllers.Base;
using BLL.DTOs.Message;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : BaseController
    {
        // GET: api/<MessageController>
        [HttpGet]
        public MessageListDto Get()
        {
            return new MessageListDto();
        }

        // GET api/<MessageController>/5
        [HttpGet("{id}")]
        public MessageDto Get(Guid id)
        {
            return new MessageDto();
        }

        // POST api/<MessageController>
        [HttpPost]
        public void Post([FromBody] MessageDto value)
        {
        }

        // PUT api/<MessageController>/5
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] MessageDto value)
        {
        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
        }
    }
}
