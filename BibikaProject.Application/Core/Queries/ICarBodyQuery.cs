﻿using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface ICarBodyQuery
    {
        Task<IQueryable<CarBody>> GetAllCarBodiesAsync();

        Task<CarBody> GetCarBodyByIdAsync(int id);
    }
}
