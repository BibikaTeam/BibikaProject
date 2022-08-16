using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.CarBody;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class CarBodyService : ICarBodyService
    {
        public CarBodyService(IMapper mapper, ICarBodyCommand command, ICarBodyQuery query)
        {
            this.mapper = mapper;
            this.command = command;
            this.query = query;
        }

        private readonly IMapper mapper;
        private readonly ICarBodyCommand command;
        private readonly ICarBodyQuery query;

        public async Task AddCarBodyAsync(AddCarBodyDTO addCarBodyDTO)
        {
            await command.AddAsync(mapper.Map<CarBody>(addCarBodyDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteCarBodyAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<List<CarBodyDTO>> GetAllCarBodies()
        {
            return await query.GetAll().Select(x => mapper.Map<CarBodyDTO>(x)).ToListAsync();
        }

        public async Task UpdateCarBodyAsync(UpdateCarBodyDTO updateCarBodyDTO)
        {
            command.Update(mapper.Map<CarBody>(updateCarBodyDTO));

            await command.SaveChangesAsync();
        }

        public async Task<List<CarBodyDTO>> GetCarBodiesByGenerationId(int id)
        {
            IQueryable<CarBody> carBodies = query.GetAll().Include(x => x.Cars);

            carBodies = carBodies.Where(x => x.Cars.Any(x => x.GenerationId == id));

            return await carBodies.Select(x => mapper.Map<CarBodyDTO>(x)).ToListAsync();
        }
    }
}
