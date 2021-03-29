using BLL.DTOs.Message;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MessageHubController : ControllerBase
    {
        private readonly IHubContext<MessageHub> _hub;

        public MessageHubController(IHubContext<MessageHub> hub)
        {
            _hub = hub;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _hub.Clients.All.SendAsync("SendMessage",
                new
                {
                    val1 = "Teszt",
                    val2 = "Teszt",
                    val3 = "Teszt",
                    val4 = "Teszt"
                });
            return Ok(new { Message = "Request Completed" });

            //_myHub.Clients.All.SendAsync("transfermessage", msg);
            //return msg;
        }

    }
}
