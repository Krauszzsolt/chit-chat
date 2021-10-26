using API.Controllers.Base;
using BLL.DTOs.Generics;
using BLL.Services.Helper;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Http;
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
    public class ProfileController : BaseController
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpPost("invite")]
        public async Task Invite([FromQuery] string emailAdress, [FromQuery] string name)
        {
            await _profileService.SendInvite(emailAdress, name);
        }

        [HttpPost("upload")]
        public async Task Upload([FromForm] FileDTO fileDTO)
        {
            //var userId = GetCurrentUser().Id;
            var userId = "asd";
            await _profileService.Upload(fileDTO.File, userId);
        }


    }
}
