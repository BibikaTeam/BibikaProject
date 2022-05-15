using AutoMapper;
using BibikaProject.Application.Core.DTO.CarBody;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    public class CarBodyMapperProfile : Profile
    {
        public CarBodyMapperProfile()
        {
            CreateMap<AddCarBodyDTO, CarBody>()
               .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));

            CreateMap<UpdateCarBodyDTO, CarBody>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<CarBody, CarBodyDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));
        }
    }
}
