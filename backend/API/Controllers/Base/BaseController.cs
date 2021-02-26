using BLL.DTOs.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Base
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController : ControllerBase
    {
        protected ApplicationUserDto CurrentUser { get => GetCurrentUser(); }

        protected ApplicationUserDto GetCurrentUser()
        {
            return (ApplicationUserDto)HttpContext.Items["User"];
        }
    }
}
