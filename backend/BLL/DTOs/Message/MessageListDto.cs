using BLL.DTOs.Authentication;
using BLL.DTOs.Chatroom;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs.Message
{
    public class MessageListDto
    {
        public List<MessageDto> Messages { get; set; }
        public ChatroomDto ChatRoom { get; set; }
    }
}
