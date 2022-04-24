namespace BibikaProject.Application.Core.Requests
{
    public class PagedCarsRequest
    {
        public int Page { get; set; }

        public int CountOnPage { get; set; }

        public int GenerationId { get; set; }
    }
}
