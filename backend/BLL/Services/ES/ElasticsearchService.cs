using DAL.Entities.ES;
using Microsoft.Extensions.Logging;
using Nest;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services.ES
{
    public class ElasticsearchService : IElasticsearchService
    {
        private readonly ILogger _logger;
        private IElasticClient _elasticClient;

        public ElasticsearchService(IElasticClient elasticClient, ILogger<MessageES> logger)
        {
            _logger = logger;
            _elasticClient = elasticClient;
        }

        public async Task<IReadOnlyCollection<MessageES>> GetMessages(string searchTerm, int size = 100)
        {
            var messages = await _elasticClient.SearchAsync<MessageES>
            (
               s => s.Query(q => q.QueryString(d => d.Query(searchTerm)))
                   .Size(size));

            return messages.Documents;
        }

        public async Task SaveManyAsync(MessageES[] messages)
        {
            var result = await _elasticClient.IndexManyAsync(messages);
            if (result.Errors)
            {
                // the response can be inspected for errors
                foreach (var itemWithError in result.ItemsWithErrors)
                {
                    _logger.LogError("Failed to index document {0}: {1}",
                        itemWithError.Id, itemWithError.Error);
                }
            }
        }

        public async Task DeleteAsync(MessageES message)
        {
            await _elasticClient.DeleteAsync<MessageES>(message);
        }

        public async Task SaveSingleAsync(MessageES message)
        {
            await _elasticClient.IndexDocumentAsync<MessageES>(message);
        }
        public async Task UpdateSingleAsync(MessageES message)
        {
            await _elasticClient.UpdateAsync<MessageES>(message, u => u.Doc(message));
        }


        public async Task SaveBulkAsync(MessageES[] messages)
        {
            var result = await _elasticClient.BulkAsync(b => b.Index("messages").IndexMany(messages));
            if (result.Errors)
            {
                // the response can be inspected for errors
                foreach (var itemWithError in result.ItemsWithErrors)
                {
                    _logger.LogError("Failed to index document {0}: {1}",
                        itemWithError.Id, itemWithError.Error);
                }
            }
        }
    }
}
