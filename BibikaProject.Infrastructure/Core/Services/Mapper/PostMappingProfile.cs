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

            //CreateMap<AddPost, Brand>()
            //    .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));

            CreateMap<AddPostDTO, Post>()
                .ForMember(dest => dest.CarId, opt => opt.MapFrom(src => src.CarId))
                .ForMember(dest => dest.SellerId, opt => opt.MapFrom(src => src.SellerId));
        }
    }
}
