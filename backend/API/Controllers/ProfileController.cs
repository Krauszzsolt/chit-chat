using API.Controllers.Base;
using BLL.DTOs.Authentication;
using BLL.DTOs.Generics;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("User")]
        public ApplicationUserDto GetUser()
        {
            return GetCurrentUser();
        }

        [HttpPost("Invite")]
        public async Task Invite([FromQuery] string emailAdress, [FromQuery] string name)
        {
            await _profileService.SendInvite(emailAdress, name);
        }

        [HttpPost("Upload")]
        public async Task Upload([FromForm] FileDTO fileDTO)
        {
            var userId = GetCurrentUser().Id;
            await _profileService.Upload(fileDTO.File, userId);
        }


    }
}
