﻿namespace BibikaProject.Application.Core.Requests
{
    public class PagedBrandsRequest
    {
        public int Page { get; set; }

        public int CountOnPage { get; set; }

        public string Search { get; set; }
    }
}
