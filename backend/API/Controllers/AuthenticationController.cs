using API.Controllers.Base;
using BLL.DTOs.Authentication;
using BLL.Exceptions;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : BaseController

    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("Authenticate")]
        public async Task<ActionResult<ApplicationUserDto>> Authenticate(LoginDto model)
        {
            var response = await _authenticationService.AuthenticateAsync(model);

            if (response == null)
            {
                return BadRequest(new { message = "Username or password is incorrect." });
            }

            return Ok(response);
        }


        [HttpPost("Register")]
        public async Task<ActionResult<ApplicationUserDto>> Register(RegisterDto model)
        {
            try
            {
                var response = await _authenticationService.RegisterAsync(model);

                return Ok(response);
            }
            catch (RegistrationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Registration failed." });
            }
        }

    }
}
