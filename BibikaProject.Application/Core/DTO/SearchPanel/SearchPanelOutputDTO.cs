using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Application.Core.DTO.CarBody;
using BibikaProject.Application.Core.DTO.CompleteSet;
using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Application.Core.DTO.GearBox;
using BibikaProject.Application.Core.DTO.Generation;
using BibikaProject.Application.Core.DTO.Model;
using System.Collections.Generic;

namespace BibikaProject.Application.Core.DTO.SearchPanel
{
    public class SearchPanelOutputDTO
    {
        public List<BrandDTO> Brands { get; set; }

        public List<ModelDTO> Models { get; set; }

        public List<GenerationDTO> Generations { get; set; }

        public List<CompleteSetDTO> CompleteSets { get; set; }

        public List<CarBodyDTO> CarBodies { get; set; }

        public List<string> FuelTypes { get; set; }

        public List<GearBoxDTO> GearBoxes { get; set; }
        
        public List<EngineDTO> Engines { get; set; }

        public int YearMin { get; set; }

        public int YearMax { get; set; }

        public int PriceMin { get; set; }

        public int PriceMax { get; set; }
    }
}
