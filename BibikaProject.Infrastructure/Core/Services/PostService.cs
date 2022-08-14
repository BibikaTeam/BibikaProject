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
                                          .Include(x => x.Likes)
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
                    if (filter.BrandId != 0) 
                    {
                        posts = posts.Where(x => x.Car.Generation.Model.BrandId == filter.BrandId);
                    }

                    if (filter.ModelId != 0)
                    {
                        posts = posts.Where(x => x.Car.Generation.ModelId == filter.ModelId);
                    }

                    if (filter.GenerationId != 0)
                    {
                        posts = posts.Where(x => x.Car.GenerationId == filter.GenerationId);
                    }

                    if (filter.YearMax != default(DateTime))
                    {
                        posts = posts.Where(x => x.Year.Year <= filter.YearMax.Year);
                    }

                    if (filter.YearMin != default(DateTime))
                    {
                        posts = posts.Where(x => x.Year.Year >= filter.YearMax.Year);
                    }

                    if (filter.CarBodyId != 0)
                    {
                        posts = posts.Where(x => x.Car.CarBodyId == filter.CarBodyId);
                    }

                    if (filter.CompleteSetId != 0)
                    {
                        posts = posts.Where(x => x.Car.CompleteSetId == filter.CompleteSetId);
                    }

                    if (filter.GearBoxId != 0)
                    {
                        posts = posts.Where(x => x.Car.GearBoxId == filter.GearBoxId);
                    }

                    if (filter.EngineId != 0)
                    {
                        posts = posts.Where(x => x.Car.EngineId == filter.EngineId);
                    }

                    if (!string.IsNullOrEmpty(filter.Color))
                    {
                        posts = posts.Where(x => x.Color == filter.Color);
                    }

                    if (!string.IsNullOrEmpty(filter.Location))
                    {
                        posts = posts.Where(x => x.Location.Contains(filter.Location));
                    }
                }

            }

            response.AllPages = (int)Math.Ceiling((double)await posts.CountAsync() / (double)pagedPostRequest.CountOnPage);

            posts = posts.GetPage(pagedPostRequest.Page, pagedPostRequest.CountOnPage).AsNoTracking();

            response.Data = await posts.Select(x => mapper.Map<PostDTO>(x)).ToListAsync();

            return response;
        }
        
        public async Task<List<PostDTO>> GetUserPosts(string id)
        {
            IQueryable<Post> posts = query.GetAll()
                                          .IncldueAllPostProperties();

            posts = posts.Where(x => x.Seller.Id == id);

            return await posts.Select(x => mapper.Map<PostDTO>(x)).ToListAsync();
        }

        public async Task<List<PostDTO>> GetUserLikedPosts(string id)
        {
            IQueryable<Post> posts = query.GetAll()
                                          .Include(x => x.Seller)
                                          .Include(x => x.Likes);

            posts = posts.Where(x => x.Likes.Any(x => x.Id == id));

            return await posts.Select(x => mapper.Map<PostDTO>(x)).ToListAsync();
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

        public async Task<PostDTO> GetPostById(int id)
        {
            var temp = await query.GetAll().IncldueAllPostProperties().FirstAsync(x => x.Id == id);

            return mapper.Map<PostDTO>(temp);
        }
    }
}
