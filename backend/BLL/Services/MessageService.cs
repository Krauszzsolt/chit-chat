using BLL.DTOs.Authentication;
using BLL.DTOs.Chatroom;
using BLL.DTOs.Generics;
using BLL.DTOs.Message;
using BLL.Services.ES;
using BLL.Services.Helper;
using BLL.Services.Interfaces;
using DAL.Data;
using DAL.Entities;
using DAL.Entities.ES;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class MessageService : IMessageService
    {
        private readonly ApplicationDbContext _context;
        private readonly IElasticsearchService _elasticsearchService;
        private readonly IPageService _pageService;

        public MessageService(ApplicationDbContext context, IElasticsearchService elasticsearchService, IPageService pageService)
        {
            _context = context;
            _elasticsearchService = elasticsearchService;
            _pageService = pageService;

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

        public async Task<MessageListDto> GetMessages(Guid chatroomId, int pageNumber, int pageSize)
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

            var messagesDto = new List<MessageDto>(messages.Select(message => new MessageDto()
            {
                Id = message.Id,
                Content = message.Content,
                Date = message.Date,
                User = new PublicUserDto()
                {
                    UserId = message.User.Id,
                    Username = message.User.UserName
                }
            }).ToList());

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
                Messages = _pageService.PagingList(messagesDto, 1, 5)
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

            #region ES Service

            var messageEntity = await _context.Messages.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == message.Id);

            var messageES = new MessageES()
            {
                Id = messageEntity.Id,
                ChatRoomId = messageEntity.ChatRoomId,
                Content = messageEntity.Content,
                UserId = messageEntity.UserId,
                UserName = messageEntity.User.UserName,
                Date = messageEntity.Date,
                ChatRoomName = messageEntity.Chatroom.Name
            };

            await _elasticsearchService.SaveSingleAsync(messageES);
            #endregion

        }

        public async Task PutMessage(MessageDto messageDto)
        {
            var message = await _context.Messages.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == messageDto.Id.Value);

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

            #region ES Service

            var messageEntity = await _context.Messages.FirstOrDefaultAsync(x => x.Id == message.Id);

            var messageES = new MessageES()
            {
                Id = messageEntity.Id,
                ChatRoomId = messageEntity.ChatRoomId,
                Content = messageEntity.Content,
                UserId = messageEntity.UserId,
                UserName = messageEntity.User.UserName,
                Date = messageEntity.Date,
                ChatRoomName = messageEntity.Chatroom.Name
            };

            await _elasticsearchService.UpdateSingleAsync(messageES);

            #endregion

        }

        public async Task DeleteMessage(Guid id, string userId)
        {
            var message = await _context.Messages.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);

            if (message == null)
            {
                throw new ArgumentException($"Message not found");
            }

            if (userId != message.UserId)
            {
                throw new ArgumentException($"Permisson denied");
            }

            #region ES Service

            var messageES = new MessageES()
            {
                Id = message.Id,
                ChatRoomId = message.ChatRoomId,
                Content = message.Content,
                UserId = message.UserId,
                UserName = message.User.UserName,
                Date = message.Date,
                ChatRoomName = message.Chatroom.Name
            };

            await _elasticsearchService.DeleteAsync(messageES);
            #endregion


            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

        }
    }
}
