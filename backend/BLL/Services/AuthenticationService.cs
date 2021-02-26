using BLL.DTOs.Authentication;
using BLL.DTOs.Settings;
using BLL.Exceptions;
using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly JWTSettings _appSettings;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthenticationService(IOptions<JWTSettings> appSettings, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _appSettings = appSettings.Value;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<ApplicationUserDto> AuthenticateAsync(LoginDto model)
        {
            var appUser = await _userManager.FindByNameAsync(model.Username);

            if (appUser != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(appUser, model.Password, false);

                if (result.Succeeded)
                {
                    // get user roles
                    var role = await GetRoleAsync(appUser);

                    // authentication successful so generate jwt token
                    var token = GenerateJwtToken(appUser, role);

                    var userDto = new ApplicationUserDto(appUser)
                    {
                        Token = token,
                        Role = role
                    };

                    return userDto;
                }
            }

            return null;
        }

        public async Task<ApplicationUserDto> RegisterAsync(RegisterDto model)
        {
            var newUser = new ApplicationUser()
            {
                UserName = model.Username
            };

            var result = await _userManager.CreateAsync(newUser, model.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "User");

                var role = await GetRoleAsync(newUser);

                // authentication successful so generate jwt token
                var token = GenerateJwtToken(newUser, role);

                var userDto = new ApplicationUserDto(newUser)
                {
                    Token = token,
                    Role = role
                };

                return userDto;
            }
            else
            {
                throw new RegistrationException(string.Join(" ", result.Errors.Select(e => e.Description)));
            }
        }

        public async Task<ApplicationUserDto> GetByIdAsync(string id)
        {
            var appUser = await _userManager.FindByIdAsync(id);
            var role = await GetRoleAsync(appUser);
            var ret = new ApplicationUserDto(appUser)
            {
                Role = role
            };
            return ret;
        }

        private string GenerateJwtToken(ApplicationUser user, string role)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] 
                { 
                    new Claim("id", user.Id),
                    new Claim("role", role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<string> GetRoleAsync(ApplicationUser user)
        {
            // get user roles
            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Any())
            {
                return roles[0];
            }
            else
            {
                return null;
            }

        }
    }
}
