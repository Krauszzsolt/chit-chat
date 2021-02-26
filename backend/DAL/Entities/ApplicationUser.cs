using Microsoft.AspNetCore.Identity;
using System;

namespace DAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public Guid PictureUrl  { get; set; }

    }
}
