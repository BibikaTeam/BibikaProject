using System;

namespace BibikaProject.Application.Core.Requests
{
    public struct Filter
    {
        public DateTime YearMax { get; set; }

        public DateTime YearMin { get; set; }

        public string Location { get; set; }

        public string Color { get; set; }

        public int BrandId { get; set; }

        public int ModelId { get; set; }

        public int GenerationId { get; set; }

        public int EngineId { get; set; }

        public int CarBodyId { get; set; }

        public int CompleteSetId { get; set; }

        public int GearBoxId { get; set; }
    }

    public class PagedPostRequest : PagedRequest
    {
        // public Filter[] Filters { get; set; }

        public int SearchId { get; set; }
    }
}
