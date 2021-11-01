using API.Attributes;
using API.Controllers.Base;
using BLL.DTOs.Message;
using BLL.Services.ES;
using BLL.Services.Interfaces;
using Bogus;
using DAL.Entities.ES;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
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
        public async Task<MessageListDto> Get([FromRoute] Guid chatroomId, [FromQuery] int? PageNumber, [FromQuery] int PageSize)
        {
            return await _messageService.GetMessages(chatroomId, PageNumber, PageSize);
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
        [Authorize(Role: "Administrator")]
        public async Task Put([FromRoute] Guid id, [FromBody] MessageDto messageDto)
        {
            messageDto.User.UserId = GetCurrentUser().Id;
            await _messageService.PutMessage(messageDto);
        }

        // DELETE api/<MessageController>/5
        [HttpDelete("{messageId}")]
        [Authorize(Role: "Administrator")]
        public async Task Delete([FromRoute] Guid messageId)
        {
            var userid = GetCurrentUser().Id;
            await _messageService.DeleteMessage(messageId, userid);
        }

        [HttpGet("Search")]
        public async Task<IReadOnlyCollection<MessageES>> SearchMessages([FromQuery] string searchTerm, [FromQuery] int? size, [FromQuery] string? chatroomId)
        {
            var response = await _elasticsearchService.GetMessages(searchTerm, chatroomId, size ?? 100);
            return response;
        }

        [HttpGet("SearchResult")]
        public async Task<MessageListDto> GetMessage([FromQuery] Guid messageId, [FromQuery] Guid chatroomId, [FromQuery] int PageSize)
        {
            var response = await _messageService.GetSearchResultMessages(messageId, chatroomId, PageSize);
            return response;
        }

        [HttpGet("fakeimportmessages/{count}")]
        [Authorize(Role: "Administrator")]
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
