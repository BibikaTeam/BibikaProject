namespace BibikaProject.Application.Core.Requests
{
    public class PagedCarsRequest : PagedRequest
    {
        public int GenerationId { get; set; }
        public int EngineId { get; set; }
        public int CarBodyId { get; set; }
        public int GearboxId { get; set; }
        public int CompleteSetId { get; set; }
    }
}
