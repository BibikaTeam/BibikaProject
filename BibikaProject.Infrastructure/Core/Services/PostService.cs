using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Requests;
using BibikaProject.Application.Core.Responses;
using BibikaProject.Application.Core.Services;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Infrastructure.Core.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
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

        public async Task<int> AddPostAsync(AddPostDTO addPostDTO)
        {
            var entity = await command.AddAsync(mapper.Map<Post>(addPostDTO));
           
            await command.SaveChangesAsync();

            return entity.Id;
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

        public async Task AddOptionsToPost(AddOptionsToPostDTO optionsToPostDTO)
        {
            await command.AddOptionsToPost(optionsToPostDTO.PostId, optionsToPostDTO.OptionsId);

            await command.SaveChangesAsync();
        }

        public async Task<PagedList<PostDTO>> GetPagedPosts(PagedPostRequest pagedPostRequest)
        {
            IQueryable<Post> posts = query.GetAll()
                                          .IncldueAllPostProperties();

            var response = new PagedList<PostDTO> { CurrentPage = pagedPostRequest.Page };

            posts = posts.Search(pagedPostRequest.Search, "Description");

            if (pagedPostRequest.Filters != null)
            {
                foreach (var filter in pagedPostRequest.Filters)
                {
                    posts = posts.Where(x => x.Year <= filter.YearMax && x.Year >= filter.YearMin)
                                 .Where(x => x.Location == filter.Location)
                                 .Where(x => x.Color == filter.Color)
                                 .Where(x => x.Car.GenerationId == filter.GenerationId)
                                 .Where(x => x.Car.Generation.ModelId == filter.ModelId)
                                 .Where(x => x.Car.Generation.Model.BrandId == filter.BrandId)
                                 .Where(x => x.Car.EngineId == filter.EngineId)
                                 .Where(x => x.Car.CarBodyId == filter.CarBodyId)
                                 .Where(x => x.Car.CompleteSetId == filter.CompleteSetId)
                                 .Where(x => x.Car.GearBoxId == filter.GearBoxId);
                }
            }      

            response.AllPages = (int)Math.Ceiling((double)await posts.CountAsync() / (double)pagedPostRequest.CountOnPage);

            posts = posts.GetPage(pagedPostRequest.Page, pagedPostRequest.CountOnPage).AsNoTracking();

            response.Data = await posts.Select(x => mapper.Map<PostDTO>(x)).ToListAsync();

            return response;
        }

        public async Task<PostDTO> GetRandomPost()
        {
            IQueryable<Post> posts = query.GetAll()
                                          .Include(x => x.Seller)
                                          .Include(x => x.Car).ThenInclude(x => x.Engine)
                                          .Include(x => x.Car).ThenInclude(x => x.CompleteSet)
                                          .Include(x => x.Car).ThenInclude(x => x.CarBody)
                                          .Include(x => x.Car).ThenInclude(x => x.GearBox)
                                          .Include(x => x.Car).ThenInclude(x => x.Generation).ThenInclude(x => x.Model).ThenInclude(x => x.Brand);

            var postsList = await posts.ToListAsync();

            var rand = new Random();
          
            return mapper.Map<PostDTO>(postsList[rand.Next(0, postsList.Count())]);
        }
    }
}
