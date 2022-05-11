using BibikaProject.Application.Core.DTO.Option;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Core.Services
{
    public interface IOptionService
    {
        Task AddOptionAsync(AddOptionDTO addOptionDTO);

        Task UpdateOptionAsync(UpdateOptionDTO updateOptionDTO);

        Task DeleteOptionAsync(int id);

        Task<PagedList<OptionDTO>> GetPagedOptionsAsync(PagedOptionsRequest pagedOptionsRequest);

        Task<List<OptionDTO>> GetAllOptionsAsync();
    }
}
