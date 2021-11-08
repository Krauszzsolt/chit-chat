
using System.Threading.Tasks;

namespace BLL.Services.Helper
{
    public interface IEmailSenderService
    {
        public Task sendEmail(string emailAdress, string name, string subject, string body);
    }
}
