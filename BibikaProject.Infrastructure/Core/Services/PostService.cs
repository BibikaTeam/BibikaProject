using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class PostService : IPostService
    {
        public PostService(IPostCommand command, IMapper mapper, IPostQuery query)
        {
            this.command = command;
            this.mapper = mapper;
            this.query = query;
        }

        private readonly IPostCommand command;
        private readonly IMapper mapper;
        private readonly IPostQuery query;

        public async Task AddPostAsync(AddPostDTO addPostDTO)
        {
            var entity = await command.AddAsync(mapper.Map<Post>(addPostDTO));
           
            await command.SaveChangesAsync();
        }

        public async Task<List<PostDTO>> GetAllPosts()
        {
            IQueryable<Post> posts = query.GetAll()
                                          .Include(x => x.Seller)
                                          .Include(x => x.Car).ThenInclude(x => x.Engine)
                                          .Include(x => x.Car).ThenInclude(x => x.CompleteSet)
                                          .Include(x => x.Car).ThenInclude(x => x.CarBody)
                                          .Include(x => x.Car).ThenInclude(x => x.GearBox)
                                          .Include(x => x.Car).ThenInclude(x => x.Generation).ThenInclude(x => x.Model).ThenInclude(x => x.Brand);

            return await posts.Select(x => mapper.Map<PostDTO>(x)).ToListAsync();
        }

        public async Task AddImagesToPost(AddImagesToPostDTO addImagesToPostDTO)
        {
            await command.AddImagesToPost(addImagesToPostDTO.PostId, addImagesToPostDTO.ImagesId);

            await command.SaveChangesAsync();
        }
    }
}
