using AutoMapper;
using BibikaProject.Application.Core.DTO.Generation;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    public class GenerationMappingProfile : Profile
    {
        public GenerationMappingProfile()
        {
            CreateMap<AddGenerationDTO, Generation>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.ModelId, opt => opt.MapFrom(src => src.ModelId));

            CreateMap<UpdateGenerationDTO, Generation>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<Generation, GenerationDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.ModelTitle, opt => opt.MapFrom(src => src.Model.Title))
                .ForMember(dest => dest.BrandTitle, opt => opt.MapFrom(src => src.Model.Brand.Title));
        }
    }
}
