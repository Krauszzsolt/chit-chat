using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using System.Linq;

namespace BLL.Services.Helper
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment env;

        public FileService(IHostingEnvironment env)
        {
            this.env = env;
        }

        public async Task<string> Upload(IFormFile file, string filename)
        {
            var uploadDirecotroy = "profilepicture/";
            var uploadPath = Path.Combine(env.WebRootPath, uploadDirecotroy);

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);
            var fileName = filename;
            var type = file.FileName.Split(".").Last();
            var filePath = Path.Combine(uploadPath, fileName + "." + type);

            using (var strem = File.Create(filePath))
            {
                await file.CopyToAsync(strem);
            }
            return fileName;
        }


    }
}
