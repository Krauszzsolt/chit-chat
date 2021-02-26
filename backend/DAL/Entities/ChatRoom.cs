using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Entities
{
    public class ChatRoom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public DateTime Date { get; set; }
        public string OwnerUserId { get; set; }



        #region navigation properties

        public ApplicationUser OwnerUser { get; set; }

        #endregion  
    }
}
