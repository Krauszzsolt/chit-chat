using DAL.Entities;

namespace BLL.DTOs.Authentication
{
    public class ApplicationUserDto
    {
        // default constructor for JSON parse
        public ApplicationUserDto()
        {

        }

        public ApplicationUserDto(ApplicationUser applicationUser)
        {
            Id = applicationUser.Id;
            UserName = applicationUser.UserName;
            PictureUrl = applicationUser.PictureUrl;
        }

        public string Id { get; set; }

        public string UserName { get; set; }

        public string Role { get; set; }

        public string Token { get; set; }

        public string? PictureUrl { get; set; }

    }
}
