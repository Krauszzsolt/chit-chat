using BLL.DTOs.Chatroom;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Interfaces
{
    public interface IChatroomService
    {
        public Task<ChatroomDto> GetChatroom(Guid id);

        public Task<List<ChatroomDto>> GetChatrooms();

        public Task PostChatRoom(ChatroomDto chatroomDto, Guid UserId);

        public Task PutChatRoom(ChatroomDto chatroomDto);

        public Task DeleteChatRoom(Guid id);

    }
}
