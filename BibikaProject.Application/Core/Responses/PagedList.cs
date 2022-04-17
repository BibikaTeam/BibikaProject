using System.Collections.Generic;

namespace BibikaProject.Application.Core.Responses
{
    public class PagedList<T>
    {
        public List<T> Data { get; set; }

        public int CurrentPage { get; set; }

        public int AllPages { get; set; }
    }
}
