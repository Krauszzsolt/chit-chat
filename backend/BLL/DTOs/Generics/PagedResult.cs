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
        public int? TotalPages => TotalRecords.HasValue ? (int)Math.Ceiling(TotalRecords.Value / (double)PageSize) : (int?)null;

    }

    public class PagedResult<T>
    {
        public PagedResult(IEnumerable<T> results, int pageNumber, int pageSize, int? totalRecords)
        {
            Results = new List<T>(results);
            PagingInfo = new PaginationViewModel
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalRecords = totalRecords,
            };
        }
        public List<T> Results { get;  set; }
        public PaginationViewModel PagingInfo { get; set; }
    }
}
