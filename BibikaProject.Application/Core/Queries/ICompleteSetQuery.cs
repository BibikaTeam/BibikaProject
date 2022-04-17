﻿using BibikaProject.Domain.Entities.Core;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Queries
{
    public interface ICompleteSetQuery
    {
        IQueryable<CompleteSet> GetAllCompleteSetsAsync();

        Task<CompleteSet> GetCompleteSetByIdAsync(int id);
    }
}