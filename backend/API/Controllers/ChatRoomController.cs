using API.Attributes;
using API.Controllers.Base;
using BLL.DTOs.Chatroom;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ChatroomController : BaseController
    {

        private readonly IChatroomService _chatroomService;

        public ChatroomController(IChatroomService chatroomService)
        {
            _chatroomService = chatroomService;
        }

        // GET: api/<MessageController>
        [HttpGet]
        public async Task<List<ChatroomDto>> Get()
        {
            return await _chatroomService.GetChatrooms();
        }

        // GET api/<MessageController>/5
        [HttpGet("{id}")]
        public async Task<ChatroomDto> Get(Guid id)
        {
            return await _chatroomService.GetChatroom(id);
        }

        // POST api/<MessageController>
        [HttpPost]
        public async Task Post([FromBody] ChatroomDto chatroom)
        {
            await _chatroomService.PostChatRoom(chatroom);
        }

        // PUT api/<MessageController>/5
        [HttpPut]
        public async Task Put([FromBody] ChatroomDto chatroom)
        {
            await _chatroomService.PutChatRoom(chatroom);
        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await _chatroomService.DeleteChatRoom(id);
        }
    }
}
