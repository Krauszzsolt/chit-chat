using BLL.DTOs.Authentication;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs.Message
{
    public class MessageDto
    {
        public Guid? Id { get; set; }
        public Guid? ChatroomId { get; set; }
        public DateTime? Date { get; set; }
        public string Content { get; set; }
        public PublicUserDto? User { get; set; }

        public MessageDto()
        {
            User = new PublicUserDto();
        }

    }
}
