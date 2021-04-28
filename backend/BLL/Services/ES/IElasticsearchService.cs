using DAL.Entities.ES;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.ES
{
    public interface IElasticsearchService
    {
        public Task<IReadOnlyCollection<MessageES>> GetMessages(string searchTerm, int size = 100);
        public Task SaveManyAsync(MessageES[] products);


    }
}
