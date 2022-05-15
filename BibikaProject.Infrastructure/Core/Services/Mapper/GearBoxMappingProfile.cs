using AutoMapper;
using BibikaProject.Application.Core.DTO.GearBox;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    public class GearBoxMappingProfile : Profile
    {
        public GearBoxMappingProfile()
        {
            CreateMap<AddGearBoxDTO, GearBox>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));

            CreateMap<UpdateGearBoxDTO, GearBox>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<GearBox, GearBoxDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));
        }
    }
}
