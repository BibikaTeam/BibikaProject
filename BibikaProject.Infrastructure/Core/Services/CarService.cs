using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Car;
using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
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
            await command.AddCarAsync(mapper.Map<Car>(addCarDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteCarAsync(int id)
        {
            command.DeleteCar(id);

            await command.SaveChangesAsync();
        }

        public async Task<PagedList<CarDTO>> GetPagedCarsAsync(PagedCarsRequest pagedCarRequest)
        {
            IQueryable<Car> cars = query.GetAllCarsAsync()
                                        .Include(x => x.CarBody)
                                        .Include(x => x.CompleteSet)
                                        .Include(x => x.Engine)
                                        .Include(x => x.GearBox)
                                        .Include(x => x.Generation);
                                        

            var response = new PagedList<CarDTO> { CurrentPage = pagedCarRequest.Page };

            if (pagedCarRequest.GenerationId != 0)
            {
                cars = cars.Where(x => x.GenerationId == pagedCarRequest.GenerationId);
            }

            response.AllPages = (int)Math.Ceiling((double)await cars.CountAsync() / (double)pagedCarRequest.CountOnPage);

            cars = cars.Skip((pagedCarRequest.Page - 1) * pagedCarRequest.CountOnPage)
                                     .Take(pagedCarRequest.CountOnPage)
                                     .AsNoTracking();

            foreach (var item in await cars.ToListAsync())
            {
                var carDto = mapper.Map<CarDTO>(item);

                carDto.Engine = mapper.Map<EngineDTO>(item.Engine);

                response.Data.Add(carDto);
            }

            return response;
        }

        public async Task UpdateCarAsync(UpdateCarDTO updateCarDTO)
        {
            command.UpdateCar(mapper.Map<Car>(updateCarDTO));

            await command.SaveChangesAsync();
        }
    }
}
