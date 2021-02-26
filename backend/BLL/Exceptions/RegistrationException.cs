using System;

namespace BLL.Exceptions
{
    public class RegistrationException : Exception
    {
        public RegistrationException(string message) : base(message)
        {
        }
    }
}
