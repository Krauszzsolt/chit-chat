using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Helper
{
    public interface IFileService
    {
        public Task<string> Upload(IFormFile file, string filename);
    }
}
