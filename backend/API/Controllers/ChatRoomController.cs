using API.Attributes;
using API.Controllers.Base;
using BLL.DTOs.Chatroom;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult<List<ChatroomDto>>> Get()
        {
            var chatrooms = await _chatroomService.GetChatrooms();
            return Ok(chatrooms);
        }

        // GET api/<MessageController>/5
        [HttpGet("{id}")]
        public async Task<ChatroomDto> Get(Guid id)
        {
            return await _chatroomService.GetChatroom(id);
        }

        // POST api/<MessageController>
        [HttpPost]
        [Authorize(Role: "Administrator")]
        public async Task Post([FromBody] ChatroomDto chatroom)
        {
            var userId = new Guid(GetCurrentUser().Id);
            await _chatroomService.PostChatRoom(chatroom, userId);
        }

        // PUT api/<MessageController>/5
        [HttpPut]
        [Authorize(Role: "Administrator")]
        public async Task Put([FromBody] ChatroomDto chatroom)
        {
            await _chatroomService.PutChatRoom(chatroom);
        }

        // DELETE api/<MessageController>/5
        [Authorize(Role: "Administrator")]
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await _chatroomService.DeleteChatRoom(id);
        }
    }
}
