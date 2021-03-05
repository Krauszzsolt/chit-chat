using BLL.DTOs.Authentication;
using BLL.DTOs.Chatroom;
using BLL.Services.Interfaces;
using DAL.Data;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ChatroomService : IChatroomService

    {
        private readonly ApplicationDbContext _context;

        public ChatroomService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<ChatroomDto> GetChatroom(Guid id)
        {
            var chatroom = await _context.Chatrooms.Include(x => x.OwnerUser).FirstOrDefaultAsync(x => x.Id == id);
            if(chatroom == null)
            {
                throw new ArgumentException($"Chatroom not found"); ;
            }
            return new ChatroomDto()
            {
                Id = chatroom.Id,
                Name = chatroom.Name,
                Date = chatroom.Date,
                Details = chatroom.Details,
                OwnerUser = new PublicUserDto()
                {
                    UserId = chatroom.OwnerUser.Id,
                    Username = chatroom.OwnerUser.UserName
                }
            };
        }

        public async Task<List<ChatroomDto>> GetChatrooms()
        {
            var chatrooms = await _context.Chatrooms.Include(x => x.OwnerUser).Select(chatroom =>
                new ChatroomDto()
                {
                    Id = chatroom.Id,
                    Name = chatroom.Name,
                    Date = chatroom.Date,
                    Details = chatroom.Details,
                    OwnerUser = new PublicUserDto()
                    {
                        UserId = chatroom.OwnerUser.Id,
                        Username = chatroom.OwnerUser.UserName
                    }
                }
            ).ToListAsync();

            if (chatrooms == null)
            {
                throw new ArgumentException($"There is no chatroom yet."); ;
            }

            return chatrooms;
        }

        public async Task PostChatRoom(ChatroomDto chatroomDto)
        {
            var chatroom = new Chatroom()
            {
                Name = chatroomDto.Name,
                Details = chatroomDto.Details,
                OwnerUserId = chatroomDto.OwnerUser.UserId,
                Date = new DateTime()
            };

            _context.Chatrooms.Add(chatroom);
            await _context.SaveChangesAsync();
            
        }

        public async Task PutChatRoom(ChatroomDto chatroomDto)
        {
            var chatroom = await _context.Chatrooms.FirstOrDefaultAsync(x => x.Id == chatroomDto.Id.Value);

            if(chatroom == null)
            {
                throw new ArgumentException($"Chatroom not found");
            }

            chatroom.Name = chatroomDto.Name ?? chatroom.Name;
            chatroom.Details = chatroomDto.Details ?? chatroom.Details;
            chatroom.OwnerUserId = chatroomDto.OwnerUser.UserId ?? chatroom.OwnerUserId;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteChatRoom(Guid id)
        {
            var chatroom = await _context.Chatrooms.FirstOrDefaultAsync(x => x.Id == id);

            if (chatroom == null)
            {
                throw new ArgumentException($"Chatroom not Found"); ;
            }

            _context.Chatrooms.Remove(chatroom);
            await _context.SaveChangesAsync();

        }

    }
}
