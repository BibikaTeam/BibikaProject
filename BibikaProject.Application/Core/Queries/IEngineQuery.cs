﻿using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IEngineQuery
    {
        IQueryable<Engine> GetAllEnginesAsync();

        Task<Engine> GetEngineByIdAsync(int id);
    }
}