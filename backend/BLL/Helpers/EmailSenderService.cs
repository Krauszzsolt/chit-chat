using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System.Threading.Tasks;

namespace BLL.Services.Helper
{
    public class EmailSenderService : IEmailSenderService
    {
        public async Task sendEmail(string emailAdress, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("tesztchitchat@gmail.com"));
            email.To.Add(MailboxAddress.Parse(emailAdress));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = body };

            // send email
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync("tesztchitchat@gmail.com", "Dipterv2020.");
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

    }
}
