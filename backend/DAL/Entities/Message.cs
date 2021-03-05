using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class Message
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public Guid ChatRoomId { get; set; }
        public string Content { get; set; }


        #region navigation properties
        public ApplicationUser User { get; set; }
        public Chatroom Chatroom { get; set; }
        #endregion


    }
}
