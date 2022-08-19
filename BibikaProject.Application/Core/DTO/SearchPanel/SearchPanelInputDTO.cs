namespace BibikaProject.Application.Core.DTO.SearchPanel
{
    public class SearchPanelInputDTO
    {
        public int BrandId { get; set; }

        public int ModelId { get; set; }

        public int GenerationId { get; set; }

        public int CompleteSetId { get; set; }

        public int CarBodyId { get; set; }

        public string Fuel { get; set; }

        public int EngineId { get; set; }

        public int GearBoxId { get; set; }

        public int YearMin { get; set; }

        public int YearMax { get; set; }

        public int PriceMin { get; set; }

        public int PriceMax { get; set; }
    }
}
