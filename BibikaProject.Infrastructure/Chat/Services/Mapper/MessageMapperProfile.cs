using AutoMapper;
using BibikaProject.Application.Chat.DTO;
using BibikaProject.Domain.Entities.Chat;

namespace BibikaProject.Infrastructure.Chat.Services.Mapper
{
    public class MessageMapperProfile : Profile
    {
        public MessageMapperProfile()
        {
            CreateMap<Message, MessageDTO>()
                .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
                .ForMember(dest => dest.From, opt => opt.MapFrom(src => src.UserFromEmail))
                .ForMember(dest => dest.To, opt => opt.MapFrom(src => src.UserToEmail))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date));

            CreateMap<MessageDTO, Message>()
                .ForMember(dest => dest.Text, opt => opt.MapFrom(src => src.Text))
                .ForMember(dest => dest.UserFromEmail, opt => opt.MapFrom(src => src.From))
                .ForMember(dest => dest.UserToEmail, opt => opt.MapFrom(src => src.To))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date));
        }
    }
}
