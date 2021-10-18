using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs.Generics
{
    public class PaginationViewModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int? TotalRecords { get; set; }
        public int? TotalPages { get; set; }

    }

    public class PagedResult<T>
    {
        public PagedResult(IEnumerable<T> results, int pageNumber, int pageSize, int? totalRecords, int? totalPages)
        {
            Results = new List<T>(results);
            PagingInfo = new PaginationViewModel
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages
            };
        }
        public List<T> Results { get; set; }
        public PaginationViewModel PagingInfo { get; set; }
    }
}
