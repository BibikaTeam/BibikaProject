﻿using AutoMapper;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Application.Core.DTO.Post;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.Services;
using BibikaProject.Infrastructure.Core.Errors;
using BibikaProject.Infrastructure.Core.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Services
{
    public class AdvertismentService : IAdvertismentService
    {
        public AdvertismentService(IPostCommand command, IMapper mapper, IPostQuery query)
        {
            this.command = command;
            this.mapper = mapper;
            this.query = query;
        }

        private readonly IPostCommand command;
        private readonly IMapper mapper;
        private readonly IPostQuery query;

        public async Task AddBannerViews(int postId, int amount)
        {
            await command.AddBannerViews(postId, amount);

            await command.SaveChangesAsync();
        }

        public async Task AddMoneyToBalance(int postId, float amount)
        {
            await command.AddMoneyToBalance(postId, amount);

            await command.SaveChangesAsync();
        }

        public async Task AddTrendViews(int postId, int amount)
        {
            await command.AddTrendViews(postId, amount);

            await command.SaveChangesAsync();
        }

        public async Task DisableBannerAdvForPost(int postId)
        {
            await command.DisableBannerAdvForPost(postId);

            await command.SaveChangesAsync();
        }

        public async Task DisableTrendAdvForPost(int postId)
        {
            await command.DisableTrendAdvForPost(postId);

            await command.SaveChangesAsync();
        }

        public async Task EnableBannerAdvForPost(int postId, int addViews)
        {
            await command.EnableBannerAdvForPost(postId, addViews);

            await command.SaveChangesAsync();
        }

        public async Task EnableTrendAdvForPost(int postId, int addViews)
        {
            await command.EnableTrendAdvForPost(postId, addViews);

            await command.SaveChangesAsync();
        }

        public async Task<PostDTO> GetRandomBannerPost()
        {
            var posts = query.GetAll().Where(x => x.IsBanner && x.BannerShowsLeft > 0).IncldueAllPostProperties();

            var random = new Random();

            var post = await posts.FirstOrDefaultAsync(x => x.Id == random.Next(0, posts.Count() - 1));

            if (post == null)
            {
                throw new NotFoundException("There is no banner post in database");
            }

            await command.DecrementBannerViews(post.Id);
            await command.SaveChangesAsync();

            return mapper.Map<PostDTO>(post);
        }

        public async Task<PostDTO> GetRandomTrendPost()
        {
            var posts = query.GetAll().Where(x => x.IsTrend && x.TrendShowsLeft > 0).IncldueAllPostProperties();

            var random = new Random();

            var post = await posts.FirstOrDefaultAsync(x => x.Id == random.Next(0, posts.Count() - 1));

            if (post == null)
            {
                throw new NotFoundException("There is no trend post in database");
            }

            await command.DecrementTrendViews(post.Id);
            await command.SaveChangesAsync();

            return mapper.Map<PostDTO>(post);
        }
    }
}
