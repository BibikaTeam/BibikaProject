using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.GearBox;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class GearBoxService : IGearBoxService
    {
        public GearBoxService(IMapper mapper, IGearBoxCommand command, IGearBoxQuery query)
        {
            this.mapper = mapper;
            this.command = command;
            this.query = query;
        }

        private readonly IMapper mapper;
        private readonly IGearBoxCommand command;
        private readonly IGearBoxQuery query;

        public async Task AddGearBoxAsync(AddGearBoxDTO addGearBoxDTO)
        {
            await command.AddAsync(mapper.Map<GearBox>(addGearBoxDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteGearBoxAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public async Task<List<GearBoxDTO>> GetAllGearBoxesAsync()
        {
            return await query.GetAll().Select(x => mapper.Map<GearBoxDTO>(x)).ToListAsync();
        }

        public async Task UpdateGearBoxAsync(UpdateGearBoxDTO updateGearBoxDTO)
        {
            command.Update(mapper.Map<GearBox>(updateGearBoxDTO));

            await command.SaveChangesAsync();
        }

        public async Task<List<GearBoxDTO>> GetGearBoxesByGenerationId(int id)
        {
            IQueryable<GearBox> gearBoxes = query.GetAll().Include(x => x.Cars);

            gearBoxes = gearBoxes.Where(x => x.Cars.Any(x => x.GenerationId == id));

            return await gearBoxes.Select(x => mapper.Map<GearBoxDTO>(x)).ToListAsync();
        }
    }
}
