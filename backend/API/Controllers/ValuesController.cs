using BLL.Services.ES;
using Bogus;
using DAL.Entities.ES;
using Microsoft.AspNetCore.Mvc;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/ES")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IElasticClient _elasticClient;
        private readonly IProductService _productService;

        public ValuesController(IElasticClient elasticClient, IProductService productService)
        {
            _elasticClient = elasticClient;
            _productService = productService;


        }
        [HttpGet("Find")]
        public async Task<IReadOnlyCollection<Product>> Find([FromQuery]string query, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var response = await _elasticClient.SearchAsync<Product>
        (
                s => s.Query(q => q.QueryString(d => d.Query(query)))
                    .From((page - 1) * pageSize)
                    .Size(pageSize));

            if (!response.IsValid)
            {
                // We could handle errors here by checking response.OriginalException 
                //or response.ServerError properties
                //_logger.LogError("Failed to search documents");
                //return View("Results", new Product[] { });
            }

            if (page > 1)
            {
                var prev = GetSearchUrl(query, page - 1, pageSize);
            }

            if (response.IsValid && response.Total > page * pageSize)
            {
               var next = GetSearchUrl(query, page + 1, pageSize);
            }

            return response.Documents;
        }

        [HttpGet("GetSearchUrl")]
        private static string GetSearchUrl(string query, int page, int pageSize)
        {
            return $"/search?query={Uri.EscapeDataString(query ?? "")}&page={page}&pagesize={pageSize}/";
        }

        [HttpGet("ReIndex")]
        public async Task<IActionResult> ReIndex()
        {
            await _elasticClient.DeleteByQueryAsync<Product>(q => q.MatchAll());

            var allProducts = (await _productService.GetProducts(int.MaxValue)).ToArray();

            foreach (var product in allProducts)
            {
                await _elasticClient.IndexDocumentAsync(product);
            }

            return Ok($"{allProducts.Length} product(s) reindexed");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            var existing = await _productService.GetProductById(id);

            if (existing != null)
            {
                await _productService.SaveSingleAsync(existing);
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var existing = await _productService.GetProductById(id);

            if (existing != null)
            {
                await _productService.DeleteAsync(existing);
                return Ok();
            }

            return NotFound();
        }

        [HttpGet("fakeimport/{count}")]
        public async Task<ActionResult> Import(int count = 0)
        {
            var productFaker = new Faker<Product>()
                   .CustomInstantiator(f => new Product())
                   .RuleFor(p => p.Id, f => f.IndexFaker)
                   .RuleFor(p => p.Ean, f => f.Commerce.Ean13())
                   .RuleFor(p => p.Name, f => f.Commerce.ProductName())
                   .RuleFor(p => p.Description, f => f.Lorem.Sentence(f.Random.Int(5, 20)))
                   .RuleFor(p => p.Brand, f => f.Company.CompanyName())
                   .RuleFor(p => p.Category, f => f.Commerce.Categories(1).First())
                   .RuleFor(p => p.Price, f => f.Commerce.Price(1, 1000, 2, "€"))
                   .RuleFor(p => p.Quantity, f => f.Random.Int(0, 1000))
                   .RuleFor(p => p.Rating, f => f.Random.Float(0, 1))
                   .RuleFor(p => p.ReleaseDate, f => f.Date.Past(2));


            var products = productFaker.Generate(count);
            await _productService.SaveManyAsync(products.ToArray());

            return Ok();
        }

    }
}
