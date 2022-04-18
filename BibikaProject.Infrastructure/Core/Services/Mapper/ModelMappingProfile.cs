using AutoMapper;
using BibikaProject.Application.Core.DTO.Model;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper 
{
    public class ModelMappingProfile : Profile
    {
        public ModelMappingProfile()
        {
            CreateMap<AddModelDTO, Model>()
               .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
               .ForMember(dest => dest.BrandId, opt => opt.MapFrom(src => src.BrandId));

            CreateMap<UpdateModelDTO, Model>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<Model, ModelDTO>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.BrandTitle, opt => opt.MapFrom(src => src.Brand.Title));
        }
    }
}
