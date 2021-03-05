using BLL.DTOs.Authentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs.Chatroom
{
    public class ChatroomDto
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public DateTime? Date { get; set; }
        public PublicUserDto? OwnerUser { get; set; }


    }
}
