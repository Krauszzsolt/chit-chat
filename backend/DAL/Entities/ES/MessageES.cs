using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities.ES
{
    public class MessageES
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }

        public Guid ChatRoomId { get; set; }
        public string ChatRoomName { get; set; }
        public string Content { get; set; }
    }
}
