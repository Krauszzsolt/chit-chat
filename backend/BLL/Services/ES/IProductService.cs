﻿using DAL.Entities.ES;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.ES
{
    public interface IProductService
    {

        Task<IEnumerable<Product>> GetProducts(int count, int skip = 0);
        Task<Product> GetProductById(int id);
        Task<IEnumerable<Product>> GetProductsByCategory(string category);
        Task<IEnumerable<Product>> GetProductsByBrand(string category);
        Task DeleteAsync(Product product);
        Task SaveSingleAsync(Product product);
        Task SaveManyAsync(Product[] products);
        Task SaveBulkAsync(Product[] products);

    }
}
