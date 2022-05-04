using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using System;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class PostService : IPostService
    {
        private readonly IPostCommand command;
        private readonly IMapper mapper;
        private readonly IImageService imageService;

        public PostService(IPostCommand command, IMapper mapper, IImageService imageService)
        {
            this.command = command;
            this.mapper = mapper;   
            this.imageService = imageService;   
        }
        public async Task AddPostAsync(AddPostDTO addPostDTO)
        {
            await command.AddAsync(mapper.Map<Post>(addPostDTO));

            await command.SaveChangesAsync();  
        }
    }
}
