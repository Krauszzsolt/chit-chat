using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services.Helper
{
    public interface IEmailSenderService
    {
        public void sendEmail(string emailAdress, string name);
    }
}
