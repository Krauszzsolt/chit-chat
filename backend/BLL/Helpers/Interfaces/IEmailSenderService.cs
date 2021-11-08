
using System.Threading.Tasks;

namespace BLL.Services.Helper
{
    public interface IEmailSenderService
    {
        public Task sendEmail(string emailAdress, string subject, string body);
    }
}
