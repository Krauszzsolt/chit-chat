using BLL.Services.Helper;
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
    public class InviteController : ControllerBase
    {
        private readonly IEmailSenderService _emailSenderService;

        public InviteController(IEmailSenderService emailSenderService)
        {
            _emailSenderService = emailSenderService;
        }

        // POST api/<InviteController>
        [HttpPost]
        public void Invite([FromQuery] string emailAdress, [FromQuery] string name)
        {
            _emailSenderService.sendEmail(emailAdress, name);
        }


    }
}
