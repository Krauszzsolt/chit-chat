﻿using BLL.DTOs.Authentication;
using BLL.DTOs.Chatroom;
using BLL.DTOs.Message;
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
    public class MessageService : IMessageService
    {
        private readonly ApplicationDbContext _context;

        public MessageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageDto> GetMessage(Guid id)
        {
            var message = await _context.Messages.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);

            if (message == null)
            {
                throw new ArgumentException($"Message not found"); ;
            }

            return new MessageDto()
            {
                Id = message.Id,
                Content = message.Content,
                Date = message.Date,
                User = new PublicUserDto()
                {
                    UserId = message.User.Id,
                    Username = message.User.UserName
                }
            };
        }

        public async Task<MessageListDto> GetMessages(Guid chatroomId)
        {
            var chatroom = await _context.Chatrooms.Include(x => x.OwnerUser).FirstOrDefaultAsync(x => x.Id == chatroomId);

            if (chatroom == null)
            {
                throw new ArgumentException($"Chatroom not found");
            }

            var messages = await _context.Messages.Include(x => x.User).Where(x => x.ChatRoomId == chatroomId).ToListAsync();

            if (!messages.Any())
            {
                throw new ArgumentException($"There is no message yet.");
            }

            return new MessageListDto()
            {
                ChatRoom = new ChatroomDto()
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
                },
                Messages = messages.Select(message =>
                new MessageDto()
                {
                    Id = message.Id,
                    Content = message.Content,
                    Date = message.Date,
                    User = new PublicUserDto()
                    {
                        UserId = message.User.Id,
                        Username = message.User.UserName
                    }
                }).ToList()
            };

        }

        public async Task PostMessage(MessageDto messageDto)
        {
            var isChatroom = await _context.Chatrooms.FirstOrDefaultAsync(x => x.Id == messageDto.ChatroomId.Value);

            if (isChatroom == null)
            {
                throw new ArgumentException($"There is no chatroom yet."); ;
            }

            var message = new Message()
            {
                ChatRoomId = messageDto.ChatroomId.Value,
                Content = messageDto.Content,
                UserId = messageDto.User.UserId,
                Date = new DateTime()
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
        }

        public async Task PutMessage(MessageDto messageDto)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(x => x.Id == messageDto.Id.Value);

            if (message == null)
            {
                throw new ArgumentException($"Message not found");
            }

            if (messageDto.User.UserId != message.UserId)
            {
                throw new ArgumentException($"Permisson denied");
            }

            message.Content = messageDto.Content ?? message.Content;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteMessage(Guid id, string userId)
        {
            var message = await _context.Messages.FirstOrDefaultAsync(x => x.Id == id);

            if (message == null)
            {
                throw new ArgumentException($"Message not found");
            }

            if (userId != message.UserId)
            {
                throw new ArgumentException($"Permisson denied");
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();
        }
    }
}
