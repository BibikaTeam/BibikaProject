using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.CompleteSet;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class CompleteSetService : ICompleteSetService
    {
        public CompleteSetService(IMapper mapper, ICompleteSetCommand command, ICompleteSetQuery query)
        {
            this.mapper = mapper;
            this.command = command;
            this.query = query;
        }

        private readonly IMapper mapper;
        private readonly ICompleteSetCommand command;
        private readonly ICompleteSetQuery query;

        public async Task AddCompleteSetAsync(AddCompleteSetDTO addCompleteSetDTO)
        {
            await command.AddAsync(mapper.Map<CompleteSet>(addCompleteSetDTO));

            await command.SaveChangesAsync();
        }

        public async Task DeleteCompleteSetAsync(int id)
        {
            command.Delete(id);

            await command.SaveChangesAsync();
        }

        public Task<List<CompleteSetDTO>> GetAllCompleteSets()
        {
            return query.GetAll().Select(x => mapper.Map<CompleteSetDTO>(x)).ToListAsync();
        }

        public async Task UpdateCompleteSetAsync(UpdateCompleteSetDTO updateCompleteSetDTO)
        {
            command.Update(mapper.Map<CompleteSet>(updateCompleteSetDTO));

            await command.SaveChangesAsync();
        }
    }
}
