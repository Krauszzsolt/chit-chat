using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Text;
namespace BLL.Services.Helper
{
    public class EmailSenderService : IEmailSenderService
    {
        public void sendEmail(string emailAdress, string name)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("tesztchitchat@gmail.com"));
            email.To.Add(MailboxAddress.Parse(emailAdress));
            email.Subject = "Chit-Chat invention";
            email.Body = new TextPart(TextFormat.Html) { Text = "<p>Hey " + name + "<p> <p> <b>Seems like one of your friends wanna chat with you here</b></p> <p>Have a good day, <br> The %0D0A Chit-Chat team</p>" };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("tesztchitchat@gmail.com", "Dipterv2020.");
            smtp.Send(email);
            smtp.Disconnect(true);
        }

    }
}
