using AutoMapper;
using BibikaProject.Application.Core.DTO.CompleteSet;
using BibikaProject.Domain.Entities.Core;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    public class CompleteSetMapperProfile : Profile
    {
        public CompleteSetMapperProfile()
        {
            CreateMap<AddCompleteSetDTO, CompleteSet>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));

            CreateMap<UpdateCompleteSetDTO, CompleteSet>()
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));

            CreateMap<CompleteSet, CompleteSetDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));
        }
    }
}
