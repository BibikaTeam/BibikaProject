namespace BibikaProject.Application.Core.Requests
{
    public class PagedGenerationsRequest
    {
        public int Page { get; set; }

        public int CountOnPage { get; set; }

        public string Search { get; set; }

        public int BrandId { get; set; }

        public int ModelId { get; set; }
    }
}
