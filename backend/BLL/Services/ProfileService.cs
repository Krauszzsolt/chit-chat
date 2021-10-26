using BLL.Services.Helper;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IEmailSenderService _emailSenderService;
        private readonly IFileService _fileService;
        public ProfileService(IEmailSenderService emailSenderService, IFileService fileService)
        {
            _emailSenderService = emailSenderService;
            _fileService = fileService;
        }
        public async Task SendInvite(string emailAdress, string name)
        {
            var subject = "Chit-Chat invention";
            var body = "<p>Hey " + name + "<p> <p> <b>Seems like one of your friends wanna chat with you here</b></p> <p>Have a good day, <br> The Chit-Chat team</p>";
            await _emailSenderService.sendEmail(emailAdress, name, subject, body);
        }
        public async Task Upload(IFormFile file, string id)
        {
            await _fileService.Upload(file, id.ToString());
        }
    }
}
