using System;

namespace BibikaProject.Application.Core.Requests
{
    public struct Filter
    {
        public int YearMax { get; set; }

        public int YearMin { get; set; }

        public int PriceMin { get; set; }

        public int PriceMax { get; set; }

        public string Location { get; set; }

        public string Color { get; set; }

        public int BrandId { get; set; }

        public int ModelId { get; set; }

        public int GenerationId { get; set; }

        public int EngineId { get; set; }

        public int CarBodyId { get; set; }

        public int CompleteSetId { get; set; }

        public int GearBoxId { get; set; }

        public bool? WasInUse { get; set; }
    }

    public class PagedPostRequest : PagedRequest
    {
        public Filter[] Filters { get; set; }
    }
}
