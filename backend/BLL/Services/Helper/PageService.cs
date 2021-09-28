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
            return new PagedResult<T>(list.GetRange(pageNumber * pageSize, pageSize), pageNumber, pageSize, list.Count);
        }
    }
}
