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
    public class UsersController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public UsersController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        /// <summary>
        /// Authenticate user with username and password
        /// </summary>
        /// <param name="model">Username and password</param>
        /// <returns>User DTO with JWT token</returns>
        [HttpPost("authenticate")]
        public async Task<ActionResult<ApplicationUserDto>> Authenticate(LoginDto model)
        {
            var response = await _authenticationService.AuthenticateAsync(model);

            if (response == null)
            {
                return BadRequest(new { message = "Username or password is incorrect." });
            }

            return Ok(response);
        }

        /// <summary>
        /// Register new user
        /// </summary>
        /// <param name="model">New user</param>
        /// <returns>User DTO with JWT token</returns>
        [HttpPost("register")]
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
