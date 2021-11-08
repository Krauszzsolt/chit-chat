using BLL.Services.Helper;
using BLL.Services.Interfaces;
using DAL.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ProfileService : IProfileService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IFileService _fileService;
        public ProfileService(ApplicationDbContext context, IEmailSenderService emailSenderService, IFileService fileService)
        {
            _context = context;
            _emailSenderService = emailSenderService;
            _fileService = fileService;
        }
        public async Task SendInvite(string emailAdress, string name)
        {
            var subject = "Chit-Chat invention";
            var body = "<p>Hey " + name + "<p> <p> <b>Seems like one of your friends wanna chat with you here</b></p> <p>Have a good day, <br> The Chit-Chat team</p>";
            await _emailSenderService.sendEmail(emailAdress, subject, body);
        }
        public async Task Upload(IFormFile file, string id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
            var fileName = await _fileService.Upload(file, id.ToString());
            user.PictureUrl = "https://localhost:44364/profilepicture/" + fileName;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
