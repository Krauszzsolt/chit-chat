using BLL.DTOs.Generics;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services.Helper
{
    public class PageService : IPageService
    {
        public PagedResult<T> PagingList<T>(List<T> list, int pageNumber, int pageSize)
        {
            if (pageNumber < 1)
            {
                throw new ArgumentException($"PageNumber lower than 1");
            }
            if (pageSize < 1)
            {
                throw new ArgumentException($"PageSize lower than 1");
            }
            var maxPageSize = (int)Math.Ceiling(list.Count / (double)pageSize);
            var normPageNumber = maxPageSize > pageNumber ? pageNumber : maxPageSize;
            var normPageSize = list.Count > pageSize * normPageNumber ? pageSize : list.Count - pageSize * (normPageNumber - 1);
            return new PagedResult<T>(list.GetRange((normPageNumber - 1) * normPageSize, normPageSize), normPageNumber, normPageSize, list.Count);
        }
    }
}
