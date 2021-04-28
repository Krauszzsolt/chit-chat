using DAL.Entities.ES;
using Microsoft.Extensions.Logging;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.ES
{
    public class ElasticsearchService: IElasticsearchService
    {
        private readonly ILogger _logger;
        //private List<MessageES> _cache = new List<MessageES>();
        private IElasticClient _elasticClient;

        public ElasticsearchService(IElasticClient elasticClient, ILogger<Product> logger)
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
            //_cache.AddRange(products);
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
    }
}
