using AutoMapper;
using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    public class BrandMappingProfile : Profile
    {
        public BrandMappingProfile()
        {
            CreateMap<AddBrandDTO, Brand>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));

            CreateMap<UpdateBrandDTO, Brand>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<Brand, BrandDTO>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
        }
    }
}
