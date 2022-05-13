using AutoMapper;
using BibikaProject.Application.Core.DTO.Engine;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    public class EngineMappingProfile : Profile
    {
        public EngineMappingProfile()
        {
            CreateMap<Engine, EngineDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.KWPower, opt => opt.MapFrom(src => src.KWPower))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Fuel, opt => opt.MapFrom(src => src.Fuel))
                .ForMember(dest => dest.Capacity, opt => opt.MapFrom(src => src.Capacity));

            CreateMap<AddEngineDTO, Engine>()
                .ForMember(dest => dest.KWPower, opt => opt.MapFrom(src => src.KWPower))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Fuel, opt => opt.MapFrom(src => src.Fuel))
                .ForMember(dest => dest.Capacity, opt => opt.MapFrom(src => src.Capacity));

            CreateMap<UpdateEngineDTO, Engine>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.KWPower, opt => opt.MapFrom(src => src.KWPower))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Fuel, opt => opt.MapFrom(src => src.Fuel))
                .ForMember(dest => dest.Capacity, opt => opt.MapFrom(src => src.Capacity)); 
        }
    }
}
