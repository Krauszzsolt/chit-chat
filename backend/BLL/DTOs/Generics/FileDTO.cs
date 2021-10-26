using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs.Generics
{
    public class FileDTO
    {
        public IFormFile File { get; set; }
    }
}
