using BibikaProject.Application.Core.DTO.Engine;

namespace BibikaProject.Application.Core.DTO.Car
{
    public class CarDTO
    {
        public int Id { get; set; }

        public EngineDTO Engine { get; set; } 

        public string CarBodyTitle { get; set; }

        public string CompleteSetTitle { get; set; }

        public string GearBoxTitle { get; set; }

        public string Title { get; set; }
    }
}
