
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs.Message
{
    public class MessageHub: Hub
    {
        public string Message { get; set; }
    }
}
