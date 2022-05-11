namespace BibikaProject.Application.Core.Requests
{
    public class PagedGenerationsRequest : PagedRequest
    {
        public int BrandId { get; set; }

        public int ModelId { get; set; }
    }
}
