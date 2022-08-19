using AutoMapper;
using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Application.Core.DTO.CarBody;
using BibikaProject.Application.Core.DTO.CompleteSet;
using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Application.Core.DTO.GearBox;
using BibikaProject.Application.Core.DTO.Generation;
using BibikaProject.Application.Core.DTO.Model;
using BibikaProject.Application.Core.DTO.SearchPanel;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class SearchPanelService : ISearchPanelService
    {
        public SearchPanelService(IGearBoxQuery gearBoxQuery,
                                  IEngineQuery engineQuery,
                                  ICarBodyQuery carBodyQuery,
                                  ICompleteSetQuery completeSetQuery,
                                  IGenerationQuery generationQuery,
                                  IModelQuery modelQuery,
                                  IBrandQuery brandQuery,
                                  IMapper mapper,
                                  IPostQuery postQuery)
        {
            this.gearBoxQuery = gearBoxQuery;
            this.engineQuery = engineQuery;
            this.carBodyQuery = carBodyQuery;
            this.completeSetQuery = completeSetQuery;
            this.generationQuery = generationQuery;
            this.modelQuery = modelQuery;
            this.brandQuery = brandQuery;
            this.mapper = mapper;
            this.postQuery = postQuery;
        }

        private readonly IBrandQuery brandQuery;
        private readonly IModelQuery modelQuery;
        private readonly IGenerationQuery generationQuery;
        private readonly ICompleteSetQuery completeSetQuery;
        private readonly ICarBodyQuery carBodyQuery;
        private readonly IEngineQuery engineQuery;
        private readonly IGearBoxQuery gearBoxQuery;
        private readonly IPostQuery postQuery;
        private readonly IMapper mapper;

        public async Task<SearchPanelOutputDTO> GetMissingData(SearchPanelInputDTO data)
        {
            var result = new SearchPanelOutputDTO();

            if (data.BrandId == 0)
            {
                var brands = brandQuery.GetAll();

                if (data.ModelId > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .Where(x => x.Models.Any(x => x.Id == data.ModelId));
                }

                if (data.GenerationId > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Id == data.GenerationId)));
                }

                if (data.CompleteSetId > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.CompleteSetId == data.CompleteSetId))));
                }

                if (data.CarBodyId > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.CarBodyId == data.CarBodyId))));
                }

                if (!string.IsNullOrEmpty(data.Fuel))
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Engine)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.Engine.Fuel == data.Fuel))));
                }

                if (data.EngineId > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.EngineId == data.EngineId))));
                }

                if (data.GearBoxId > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.GearBoxId == data.GearBoxId))));
                }

                if (data.YearMin > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year >= data.YearMin)))));
                }

                if (data.YearMax > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year <= data.YearMax)))));
                }

                if (data.PriceMin > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Price >= data.PriceMin)))));
                }

                if (data.PriceMax > 0)
                {
                    brands = brands.Include(x => x.Models)
                                   .ThenInclude(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Models.Any(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Price <= data.PriceMax)))));
                }

                result.Brands = mapper.Map<List<BrandDTO>>(await brands.ToArrayAsync());
            }

            if (data.ModelId == 0)
            {
                var models = modelQuery.GetAll();

                models = models.Include(x => x.Brand);

                if (data.GenerationId > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .Where(x => x.Generations.Any(x => x.Id == data.GenerationId));
                }

                if (data.BrandId > 0)
                {
                    models = models.Where(x => x.BrandId == data.BrandId);
                }

                if (data.CompleteSetId > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.CompleteSetId == data.CompleteSetId)));
                }

                if (data.CarBodyId > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Generations.Any(x=> x.Cars.Any(x => x.CarBodyId == data.CarBodyId)));
                }

                if (!string.IsNullOrEmpty(data.Fuel))
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Engine)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.Engine.Fuel == data.Fuel)));
                }

                if (data.EngineId > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.EngineId == data.EngineId)));
                }

                if (data.GearBoxId > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.GearBoxId == data.GearBoxId)));
                }

                if (data.YearMin > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year >= data.YearMin))));
                }

                if (data.YearMax > 0)
                {
                    models = models.Include(x => x.Generations) 
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year <= data.YearMax))));
                }

                if (data.PriceMin > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Price >= data.PriceMin))));
                }

                if (data.PriceMax > 0)
                {
                    models = models.Include(x => x.Generations)
                                   .ThenInclude(x => x.Cars)
                                   .ThenInclude(x => x.Posts)
                                   .Where(x => x.Generations.Any(x => x.Cars.Any(x => x.Posts.Any(x => x.Price <= data.PriceMax))));
                }

                result.Models = mapper.Map<List<ModelDTO>>(await models.ToListAsync());
            }

            if (data.GenerationId == 0)
            {
                var generations = generationQuery.GetAll();

                generations = generations.Include(x => x.Model)
                                         .ThenInclude(x => x.Brand);

                if (data.ModelId > 0)
                {
                    generations = generations.Where(x => x.ModelId == data.ModelId);
                }

                if (data.BrandId > 0)
                {                 
                    generations = generations.Where(x => x.Model.BrandId == data.BrandId);
                }

                if (data.CompleteSetId > 0)
                {
                    generations = generations.Include(x => x.Cars)
                                             .Where(x => x.Cars.Any(x => x.CompleteSetId == data.CompleteSetId));
                }

                if (data.CarBodyId > 0)
                {
                    generations = generations.Include(x => x.Cars)
                                             .Where(x => x.Cars.Any(x => x.CarBodyId == data.CarBodyId));
                }

                if (!string.IsNullOrEmpty(data.Fuel))
                {
                    generations = generations.Include(x => x.Cars)
                                             .ThenInclude(x => x.Engine)
                                             .Where(x => x.Cars.Any(x => x.Engine.Fuel == data.Fuel));
                }

                if (data.EngineId > 0)
                {
                    generations = generations.Include(x => x.Cars)
                                             .Where(x => x.Cars.Any(x => x.EngineId == data.EngineId));
                }

                if (data.GearBoxId > 0)
                {
                    generations = generations.Include(x => x.Cars)
                                             .Where(x => x.Cars.Any(x => x.GearBoxId == data.GearBoxId));
                }

                if (data.YearMin > 0)
                {
                    generations = generations.Include(x => x.Cars)  
                                             .ThenInclude(x => x.Posts)
                                             .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year >= data.YearMin)));
                }

                if (data.YearMax > 0)
                {
                    generations = generations.Include(x => x.Cars)
                                             .ThenInclude(x => x.Posts)
                                             .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year <= data.YearMax)));
                }

                if (data.PriceMin > 0)
                {
                    generations = generations.Include(x => x.Cars)
                                             .ThenInclude(x => x.Posts)
                                             .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price >= data.PriceMin)));
                }

                if (data.PriceMax > 0)
                {
                    generations = generations.Include(x => x.Cars)
                                             .ThenInclude(x => x.Posts)
                                             .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price <= data.PriceMax)));
                }


                result.Generations = mapper.Map<List<GenerationDTO>>(await generations.ToListAsync());
            }

            if (data.CompleteSetId == 0)
            {
                var completeSets = completeSetQuery.GetAll();

                if (data.BrandId > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .ThenInclude(x => x.Generation)
                                               .ThenInclude(x => x.Model)
                                               .Where(x => x.Cars.Any(x => x.Generation.Model.BrandId == data.BrandId));
                }

                if (data.ModelId > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .ThenInclude(x => x.Generation)
                                               .Where(x => x.Cars.Any(x => x.Generation.ModelId == data.ModelId));
                }

                if (data.GenerationId > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .Where(x => x.Cars.Any(x => x.GenerationId == data.GenerationId));
                }

                if (data.CarBodyId > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .Where(x => x.Cars.Any(x => x.CarBodyId == data.CarBodyId));
                }

                if (!string.IsNullOrEmpty(data.Fuel))
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .ThenInclude(x => x.Engine)
                                               .Where(x => x.Cars.Any(x => x.Engine.Fuel == data.Fuel));
                }

                if (data.EngineId > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .Where(x => x.Cars.Any(x => x.EngineId == data.EngineId));
                }

                if (data.GearBoxId > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .Where(x => x.Cars.Any(x => x.GearBoxId == data.GearBoxId));
                }

                if (data.YearMin > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .ThenInclude(x => x.Posts)
                                               .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year >= data.YearMin)));
                }

                if (data.YearMax > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .ThenInclude(x => x.Posts)
                                               .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year <= data.YearMax)));
                }

                if (data.PriceMin > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .ThenInclude(x => x.Posts)
                                               .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price >= data.PriceMin)));
                }

                if (data.PriceMax > 0)
                {
                    completeSets = completeSets.Include(x => x.Cars)
                                               .ThenInclude(x => x.Posts)
                                               .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price <= data.PriceMax)));
                }

                result.CompleteSets = mapper.Map<List<CompleteSetDTO>>(await completeSets.ToListAsync());
            }

            if (data.CarBodyId == 0)
            {
                var carBodies = carBodyQuery.GetAll();

                if (data.BrandId > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .ThenInclude(x => x.Generation)
                                         .ThenInclude(x => x.Model)
                                         .Where(x => x.Cars.Any(x => x.Generation.Model.BrandId == data.BrandId));
                }

                if (data.ModelId > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .ThenInclude(x => x.Generation)
                                         .Where(x => x.Cars.Any(x => x.Generation.ModelId == data.ModelId));
                }

                if (data.GenerationId > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.GenerationId == data.GenerationId));
                }

                if (data.CompleteSetId > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.CompleteSetId == data.CompleteSetId));
                }

                if (!string.IsNullOrEmpty(data.Fuel))
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .ThenInclude(x => x.Engine)
                                         .Where(x => x.Cars.Any(x => x.Engine.Fuel == data.Fuel));
                }

                if (data.EngineId > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.EngineId == data.EngineId));
                }

                if (data.GearBoxId > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.GearBoxId == data.GearBoxId));
                }

                if (data.YearMin > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year >= data.YearMin)));
                }

                if (data.YearMax > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year <= data.YearMax)));
                }

                if (data.PriceMin > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price >= data.PriceMin)));
                }

                if (data.PriceMax > 0)
                {
                    carBodies = carBodies.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price <= data.PriceMax)));
                }

                result.CarBodies = mapper.Map<List<CarBodyDTO>>(await carBodies.ToListAsync());
            }

            if (data.GearBoxId == 0)
            {
                var gearBoxes = gearBoxQuery.GetAll();

                if (data.BrandId > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .ThenInclude(x => x.Generation)
                                         .ThenInclude(x => x.Model)
                                         .Where(x => x.Cars.Any(x => x.Generation.Model.BrandId == data.BrandId));
                }

                if (data.ModelId > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .ThenInclude(x => x.Generation)
                                         .Where(x => x.Cars.Any(x => x.Generation.ModelId == data.ModelId));
                }

                if (data.GenerationId > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.GenerationId == data.GenerationId));
                }

                if (data.CompleteSetId > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.CompleteSetId == data.CompleteSetId));
                }

                if (!string.IsNullOrEmpty(data.Fuel))
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .ThenInclude(x => x.Engine)
                                         .Where(x => x.Cars.Any(x => x.Engine.Fuel == data.Fuel));
                }

                if (data.EngineId > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.EngineId == data.EngineId));
                }

                if (data.CarBodyId > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .Where(x => x.Cars.Any(x => x.CarBodyId == data.CarBodyId));
                }

                if (data.YearMin > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year >= data.YearMin)));
                }

                if (data.YearMax > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year <= data.YearMax)));
                }

                if (data.PriceMin > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price >= data.PriceMin)));
                }

                if (data.PriceMax > 0)
                {
                    gearBoxes = gearBoxes.Include(x => x.Cars)
                                         .ThenInclude(x => x.Posts)
                                         .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price <= data.PriceMax)));
                }

                result.GearBoxes = mapper.Map<List<GearBoxDTO>>(await gearBoxes.ToListAsync());
            }

            if (data.EngineId == 0)
            {
                var engines = engineQuery.GetAll();

                if (data.BrandId > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .ThenInclude(x => x.Generation)
                                     .ThenInclude(x => x.Model)
                                     .Where(x => x.Cars.Any(x => x.Generation.Model.BrandId == data.BrandId));
                }

                if (data.ModelId > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .ThenInclude(x => x.Generation)
                                     .Where(x => x.Cars.Any(x => x.Generation.ModelId == data.ModelId));
                }

                if (data.GenerationId > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .Where(x => x.Cars.Any(x => x.GenerationId == data.GenerationId));
                }

                if (data.CompleteSetId > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .Where(x => x.Cars.Any(x => x.CompleteSetId == data.CompleteSetId));
                }

                if (!string.IsNullOrEmpty(data.Fuel))
                {
                    engines = engines.Where(x => x.Fuel == data.Fuel);
                }

                if (data.GearBoxId > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .Where(x => x.Cars.Any(x => x.GearBoxId == data.GearBoxId));
                }

                if (data.CarBodyId > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .Where(x => x.Cars.Any(x => x.CarBodyId == data.CarBodyId));
                }

                if (data.YearMin > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .ThenInclude(x => x.Posts)
                                     .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year >= data.YearMin)));
                }

                if (data.YearMax > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .ThenInclude(x => x.Posts)
                                     .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Year.Year <= data.YearMax)));
                }

                if (data.PriceMin > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .ThenInclude(x => x.Posts)
                                     .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price >= data.PriceMin)));
                }

                if (data.PriceMax > 0)
                {
                    engines = engines.Include(x => x.Cars)
                                     .ThenInclude(x => x.Posts)
                                     .Where(x => x.Cars.Any(x => x.Posts.Any(x => x.Price <= data.PriceMax)));
                }

                result.Engines = mapper.Map<List<EngineDTO>>(await engines.ToListAsync());
            }

            if (string.IsNullOrEmpty(data.Fuel))
            {
                var fuelTypes = engineQuery.GetAll().Select(x => x.Fuel);

                result.FuelTypes = await fuelTypes.ToListAsync();
            }

            if (data.YearMin == 0)
            {
                int yearMin = 0;

                if (data.GenerationId > 0)
                {
                    yearMin = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .Where(x => x.Car.GenerationId == data.GenerationId)
                                       .Min(x => x.Year.Year);
                }
                else if (data.ModelId > 0)
                {
                    yearMin = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .Where(x => x.Car.Generation.ModelId == data.ModelId)
                                       .Min(x => x.Year.Year);
                }
                else if (data.BrandId > 0)
                {
                    yearMin = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .ThenInclude(x => x.Model)
                                       .Where(x => x.Car.Generation.Model.BrandId == data.BrandId)
                                       .Min(x => x.Year.Year);
                }

                result.YearMin = yearMin;
            }

            if (data.YearMax == 0)
            {
                int yearMax = 0;

                if (data.GenerationId > 0)
                {
                    yearMax = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .Where(x => x.Car.GenerationId == data.GenerationId)
                                       .Max(x => x.Year.Year);
                }
                else if (data.ModelId > 0)
                {
                    yearMax = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .Where(x => x.Car.Generation.ModelId == data.ModelId)
                                       .Max(x => x.Year.Year);
                }
                else if (data.BrandId > 0)
                {
                    yearMax = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .ThenInclude(x => x.Model)
                                       .Where(x => x.Car.Generation.Model.BrandId == data.BrandId)
                                       .Max(x => x.Year.Year);
                }

                result.YearMax = yearMax;
            }

            if (data.PriceMin == 0)
            {
                int priceMin = 0;

                if (data.GenerationId > 0)
                {
                    priceMin = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .Where(x => x.Car.GenerationId == data.GenerationId)
                                       .Min(x => x.Price);
                }
                else if (data.ModelId > 0)
                {
                    priceMin = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .Where(x => x.Car.Generation.ModelId == data.ModelId)
                                       .Min(x => x.Price);
                }
                else if (data.BrandId > 0)
                {
                    priceMin = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .ThenInclude(x => x.Model)
                                       .Where(x => x.Car.Generation.Model.BrandId == data.BrandId)
                                       .Min(x => x.Price);
                }

                result.PriceMin = priceMin;
            }

            if (data.PriceMax == 0)
            {
                int priceMax = 0;

                if (data.GenerationId > 0)
                {
                    priceMax = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .Where(x => x.Car.GenerationId == data.GenerationId)
                                       .Max(x => x.Price);
                }
                else if (data.ModelId > 0)
                {
                    priceMax = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .Where(x => x.Car.Generation.ModelId == data.ModelId)
                                       .Max(x => x.Price);
                }
                else if (data.BrandId > 0)
                {
                    priceMax = postQuery.GetAll()
                                       .Include(x => x.Car)
                                       .ThenInclude(x => x.Generation)
                                       .ThenInclude(x => x.Model)
                                       .Where(x => x.Car.Generation.Model.BrandId == data.BrandId)
                                       .Max(x => x.Price);
                }

                result.PriceMax = priceMax;
            }

            return result;
        }
    }
}
