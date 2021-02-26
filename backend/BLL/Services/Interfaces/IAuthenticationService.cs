using BLL.DTOs.Authentication;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IAuthenticationService
    {
        Task<ApplicationUserDto> AuthenticateAsync(LoginDto model);

        Task<ApplicationUserDto> RegisterAsync(RegisterDto model);

        Task<ApplicationUserDto> GetByIdAsync(string id);
    }
}
