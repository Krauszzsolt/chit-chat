using DAL.Entities.ES;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.ES
{
    public interface IElasticsearchService
    {
        public Task<IReadOnlyCollection<MessageES>> GetMessages(string searchTerm, string? chatroomId, int size);
        public Task SaveManyAsync(MessageES[] products);
        public Task DeleteAsync(MessageES message);
        public Task SaveSingleAsync(MessageES message);
        public Task UpdateSingleAsync(MessageES message);
        public Task SaveBulkAsync(MessageES[] messages);
    }
}
