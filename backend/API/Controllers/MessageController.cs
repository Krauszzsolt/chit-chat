using API.Attributes;
using API.Controllers.Base;
using BLL.DTOs.Authentication;
using BLL.DTOs.Message;
using BLL.Services.ES;
using BLL.Services.Interfaces;
using Bogus;
using DAL.Entities.ES;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : BaseController
    {
        private readonly IMessageService _messageService;
        private readonly IElasticsearchService _elasticsearchService;
        private readonly IHubContext<MessageHub> _hub;

        public MessageController(IMessageService messageService, IHubContext<MessageHub> hub, IElasticsearchService elasticsearchService)
        {
            _hub = hub;
            _elasticsearchService = elasticsearchService;
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
            await _hub.Clients.All.SendAsync("SendMessage", messageDto.ChatroomId);
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

        [HttpGet("Search")]
        public async Task<IReadOnlyCollection<MessageES>> GetMessages([FromQuery] string searchTerm, [FromQuery] int? size)
        {
            var response = await _elasticsearchService.GetMessages(searchTerm, size ?? 100);
            return response;
        }

        [HttpGet("fakeimportmessages/{count}")]
        public async Task<ActionResult> Import(int count = 0)
        {
            var messageFaker = new Faker<MessageES>()
                   .CustomInstantiator(f => new MessageES())
                   .RuleFor(p => p.Id, f => Guid.NewGuid())
                   .RuleFor(p => p.ChatRoomId, f => Guid.NewGuid())
                   .RuleFor(p => p.UserId, f => f.Commerce.ProductName())
                   .RuleFor(p => p.UserName, f => f.Commerce.ProductName())
                   .RuleFor(p => p.ChatRoomName, f => f.Commerce.ProductName())
                   .RuleFor(p => p.Content, f => f.Lorem.Sentence(f.Random.Int(5, 20)))
                   .RuleFor(p => p.Date, f => f.Date.Past(2));


            var products = messageFaker.Generate(count);
            await _elasticsearchService.SaveManyAsync(products.ToArray());

            return Ok();
        }
    }
}
