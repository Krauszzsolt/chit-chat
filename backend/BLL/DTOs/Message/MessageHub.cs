
using Microsoft.AspNetCore.SignalR;

namespace BLL.DTOs.Message
{
    public class MessageHub: Hub
    {
        public string Message { get; set; }
    }
}
