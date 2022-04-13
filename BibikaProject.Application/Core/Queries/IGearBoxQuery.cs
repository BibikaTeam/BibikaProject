﻿using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface IGearBoxQuery
    {
        IQueryable<GearBox> GetAllGearBoxesAsync();

        Task<GearBox> GetGearBoxByIdAsync(int id);
    }
}
