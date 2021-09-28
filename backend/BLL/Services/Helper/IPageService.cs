using BLL.DTOs.Generics;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Services.Helper
{
    public interface IPageService
    {
        public PagedResult<T> PagingList<T>(List<T> list, int pageNumber, int pageSize);

    }
}
