namespace BibikaProject.Application.Core.Requests
{
    public abstract class PagedRequest
    {
        public int Page { get; set; }

        public int CountOnPage { get; set; }

        public string Search { get; set; }
    }
}
