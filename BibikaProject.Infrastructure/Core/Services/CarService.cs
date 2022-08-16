using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Car;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Infrastructure.Core.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class CarService : ICarService
    {
        public CarService(IMapper mapper, ICarCommand command, ICarQuery query)
        {
            this.command = command;
            this.query = query;
            this.mapper = mapper;
        }

        private readonly ICarCommand command;
        private readonly ICarQuery query;
        private readonly IMapper mapper;

        public async Task AddCarAsync(AddCarDTO addCarDTO)
        {
            await command.AddAsync(mapper.Map<Car>(addCarDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteCarAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<PagedList<CarDTO>> GetPagedCarsAsync(PagedCarsRequest pagedCarRequest)
        {
            IQueryable<Car> cars = query.GetAll()
                                        .Include(x => x.CarBody)
                                        .Include(x => x.CompleteSet)
                                        .Include(x => x.Engine)
                                        .Include(x => x.GearBox)
                                        .Include(x => x.Generation)
                                        .ThenInclude(x => x.Model)
                                        .ThenInclude(x => x.Brand);
                                        

            var response = new PagedList<CarDTO> { CurrentPage = pagedCarRequest.Page };

            if (pagedCarRequest.GenerationId != 0)
            {
                cars = cars.Where(x => x.GenerationId == pagedCarRequest.GenerationId);
            }
            if (pagedCarRequest.CarBodyId != 0)
            {
                cars = cars.Where(x => x.CarBodyId == pagedCarRequest.CarBodyId);
            }
            if (pagedCarRequest.EngineId != 0)
            {
                cars = cars.Where(x => x.EngineId == pagedCarRequest.EngineId);
            }
            if (pagedCarRequest.GearboxId != 0)
            {
                cars = cars.Where(x => x.GearBoxId == pagedCarRequest.GearboxId);
            }
            if (pagedCarRequest.CompleteSetId != 0)
            {
                cars = cars.Where(x => x.CompleteSetId == pagedCarRequest.CompleteSetId);
            }

            response.AllPages = (int)Math.Ceiling((double)await cars.CountAsync() / (double)pagedCarRequest.CountOnPage);

            cars = cars.GetPage(pagedCarRequest.Page, pagedCarRequest.CountOnPage).AsNoTracking();

            response.Data = await cars.Select(x => mapper.Map<CarDTO>(x)).ToListAsync();

            return response;
        }

        public async Task UpdateCarAsync(UpdateCarDTO updateCarDTO)
        {
            command.Update(mapper.Map<Car>(updateCarDTO));

            await command.SaveChangesAsync();
        }

        public async Task<CarDTO> GetCarByParamsAsync(GetCarDTO getCarDTO)
        {
            IQueryable<Car> cars = query.GetAll();

            return await cars.Where(x => x.EngineId == getCarDTO.EngineId &&
                                    x.CarBodyId == getCarDTO.CarBodyId &&
                                    x.CompleteSetId == getCarDTO.CompleteSetId &&
                                    x.GenerationId == getCarDTO.GenerationId &&
                                    x.GearBoxId == getCarDTO.GearBoxId)
                             .Select(x => mapper.Map<CarDTO>(x))
                             .FirstAsync();         
        } 
    }
}
