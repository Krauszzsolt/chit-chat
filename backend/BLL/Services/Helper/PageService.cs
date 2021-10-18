using BLL.DTOs.Generics;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services.Helper
{
    public class PageService : IPageService
    {
        public async Task<PagedResult<T>> PagingList<T>(IQueryable<T> list, int? pageNumber, int pageSize)
        {
            if (pageNumber < 1)
            {
                throw new ArgumentException($"PageNumber lower than 1");
            }
            if (pageSize < 1)
            {
                throw new ArgumentException($"PageSize lower than 1");
            }

            var count = await list.CountAsync();
            var maxPage = (int)Math.Ceiling(count / (double)pageSize);
            var normPageNumber = pageNumber.HasValue && maxPage > pageNumber ? pageNumber.Value : maxPage;
            var normPageSize = count > pageSize * normPageNumber ? pageSize : count - pageSize * (normPageNumber - 1);

            var result = await list.Skip((normPageNumber - 1) * pageSize).Take(normPageSize).ToListAsync();

            return new PagedResult<T>(result, normPageNumber, normPageSize, count, maxPage);
        }
    }
}
