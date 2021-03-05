using API.Controllers.Base;
using BLL.DTOs.Message;
using BLL.Services.Interfaces;
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
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        // GET: api/<MessageController>
        [HttpGet("{chatroomId}")]
        public async Task<MessageListDto> Get(Guid chatroomId)
        {
            return await _messageService.GetMessages(chatroomId);
        }

        // POST api/<MessageController>
        [HttpPost]
        public async Task Post([FromBody] MessageDto messageDto)
        {
            messageDto.User.UserId = GetCurrentUser().Id;
            await _messageService.PostMessage(messageDto);
        }

        // PUT api/<MessageController>/5
        [HttpPut("{id}")]
        public async Task Put(Guid id, [FromBody] MessageDto messageDto)
        {
            messageDto.User.UserId = GetCurrentUser().Id;
            await _messageService.PutMessage(messageDto);
        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public async Task Delete(Guid messageId)
        {
            var userid = GetCurrentUser().Id;
            await _messageService.DeleteMessage(messageId, userid);
        }
    }
}
