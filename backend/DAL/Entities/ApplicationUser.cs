using Microsoft.AspNetCore.Identity;
using System;

namespace DAL.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Id { get; set; }

        public Guid PictureUrl  { get; set; }

    }
}
