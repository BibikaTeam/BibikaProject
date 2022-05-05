using AutoMapper;
using BibikaProject.Application.Core.DTO.Car;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    public class CarMappingProfile : Profile
    {
        public CarMappingProfile()
        {
            CreateMap<AddCarDTO, Car>()
                .ForMember(dest => dest.CarBodyId, opt => opt.MapFrom(src => src.CarBodyId))
                .ForMember(dest => dest.GenerationId, opt => opt.MapFrom(src => src.GenerationId))
                .ForMember(dest => dest.EngineId, opt => opt.MapFrom(src => src.EngineId))
                .ForMember(dest => dest.CompleteSetId, opt => opt.MapFrom(src => src.CompleteSetId))
                .ForMember(dest => dest.GearBoxId, opt => opt.MapFrom(src => src.GearBoxId));

            CreateMap<UpdateCarDTO, Car>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.CarId))
                .ForMember(dest => dest.CarBodyId, opt => opt.MapFrom(src => src.CarBodyId))
                .ForMember(dest => dest.GenerationId, opt => opt.MapFrom(src => src.GenerationId))
                .ForMember(dest => dest.EngineId, opt => opt.MapFrom(src => src.EngineId))
                .ForMember(dest => dest.CompleteSetId, opt => opt.MapFrom(src => src.CompleteSetId))
                .ForMember(dest => dest.GearBoxId, opt => opt.MapFrom(src => src.GearBoxId));

            CreateMap<Car, CarDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.CarBodyTitle, opt => opt.MapFrom(src => src.CarBody.Title))
                .ForMember(dest => dest.CompleteSetTitle, opt => opt.MapFrom(src => src.CompleteSet.Title))
                .ForMember(dest => dest.GearBoxTitle, opt => opt.MapFrom(src => src.GearBox.Title))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => $"{src.Generation.Model.Brand.Title} {src.Generation.Model.Title} {src.Generation.Title}"));
        }
    }
}
