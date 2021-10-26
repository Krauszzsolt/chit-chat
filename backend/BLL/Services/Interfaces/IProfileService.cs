using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IProfileService
    {
        public Task Upload(IFormFile file, string id);
        public Task SendInvite(string emailAdress, string name);
    }
}
