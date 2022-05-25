using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class EngineService : IEngineService
    {
        public EngineService(IMapper mapper, IEngineCommand command, IEngineQuery query)
        {
            this.mapper = mapper;
            this.command = command;
            this.query = query;
        }

        private readonly IMapper mapper;
        private readonly IEngineCommand command;
        private readonly IEngineQuery query;

        public async Task AddEngineAsync(AddEngineDTO addEngineDTO)
        {
            await command.AddAsync(mapper.Map<Engine>(addEngineDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteEngineAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<List<EngineDTO>> GetAllEnginesAsync()
        {
            return await query.GetAll().Select(x => mapper.Map<EngineDTO>(x)).ToListAsync();
        }

        public async Task UpdateEngineAsync(UpdateEngineDTO updateEngineDTO)
        {
            command.Update(mapper.Map<Engine>(updateEngineDTO));

            await command.SaveChangesAsync();
        }

        public async Task<List<EngineDTO>> GetAllEnginesByGenerationAsync(int generationId)
        {
            IQueryable<Engine> engines = query.GetAll().Include(x => x.Cars);

            engines = engines.Where(x => x.Cars.Any(x => x.GenerationId == generationId));

            return await engines.Select(x => mapper.Map<EngineDTO>(x)).ToListAsync();
        }
    }
}
