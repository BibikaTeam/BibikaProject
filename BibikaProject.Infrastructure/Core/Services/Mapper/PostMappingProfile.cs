using AutoMapper;
using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Domain.Entities.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services.Mapper
{
    internal class PostMappingProfile : Profile
    {
        public PostMappingProfile()
        {
            CreateMap<AddPostDTO, Post>()
                .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.CarId))
                .ForMember(dest => dest.SellerId, opt => opt.MapFrom(src => src.SellerId))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.Mileage, opt => opt.MapFrom(src => src.Mileage));

            CreateMap<Post, PostDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Year, opt => opt.MapFrom(src => src.Year))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Color, opt => opt.MapFrom(src => src.Color))
                .ForMember(dest => dest.SellerName, opt => opt.MapFrom(src => src.Seller.UserName))
                .ForMember(dest => dest.Mileage, opt => opt.MapFrom(src => src.Mileage));
        }
    }
}
