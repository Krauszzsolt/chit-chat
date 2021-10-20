using BLL.DTOs.Generics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services.Helper
{
    public interface IPageService
    {
        public Task<PagedResult<T>> PagingList<T>(IQueryable<T> list, int? pageNumber, int pageSize);

    }
}
