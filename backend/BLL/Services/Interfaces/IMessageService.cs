using BLL.DTOs.Message;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IMessageService
    {
        public Task<MessageDto> GetMessage(Guid id);

        public Task<MessageListDto> GetMessages(Guid chatroomId, int pageNumber, int pageSize);

        public Task PostMessage(MessageDto messageDto);

        public Task PutMessage(MessageDto messageDto);

        public Task DeleteMessage(Guid id, string userId);

    }
}
