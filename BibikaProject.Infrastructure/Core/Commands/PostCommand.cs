﻿using BibikaProject.Application.Core.Commands;
using BibikaProject.Domain.Entities.Core;
using BibikaProject.Domain.Entities.Identity;
using BibikaProject.Infrastructure.Core.Errors;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BibikaProject.Infrastructure.Core.Commands
{
    public class PostCommand : BaseCommand<Post, int>, IPostCommand
    {
        public PostCommand(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddImagesToPost(int postId, List<int> imagesId)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new BadRequestException("Bad data");
            }

            imagesId.ForEach(imageId => context.Images.Find(imageId).PostId = post.Id);
        }

        public async Task AddOptionsToPost(int postId, List<int> optionsId)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new BadRequestException("Bad data");
            }

            if (post.Options == null)
            {
                post.Options = new List<Option>();
            }

            optionsId.ForEach(optionId => post.Options.Add(context.Options.Find(optionId)));
        }

        public async Task LikePost(string userId, int postId)
        {
            var post = await context.Posts.FindAsync(postId);

            var user = await context.Users.FindAsync(userId);

            if (post.Likes == null)
            {
                post.Likes = new List<ApplicationUser>();
            }

            post.Likes.Add(user);
        }

        public async Task ViewPost(string userId, int postId)
        {
            var post = await context.Posts.FindAsync(postId);

            var user = await context.Users.FindAsync(userId);

            if (user == null || post == null)
            {
                throw new BadRequestException("User or post equals null");
            }

            await context.ViewPosts.AddAsync(new ViewPost { PostId = postId, UserId = userId });
        }

        public override Task<Post> AddAsync(Post entity)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.DailyPoint = 7;

            return base.AddAsync(entity);   
        }

        public async Task AddBannerViews(int postId, int amount)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.BannerShowsLeft += amount;
        }

        public async Task AddTrendViews(int postId, int amount)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.TrendShowsLeft += amount;
        }

        public async Task AddMoneyToBalance(int postId, float amount)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.Balance += amount;
        }

        public async Task EnableBannerAdvForPost(int postId, int addViews)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.BannerShowsLeft += addViews;

            post.IsBanner = true;
        }

        public async Task DisableBannerAdvForPost(int postId)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.IsBanner = false;
        }

        public async Task EnableTrendAdvForPost(int postId, int addViews)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.TrendShowsLeft += addViews;

            post.IsTrend = true;
        }

        public async Task DisableTrendAdvForPost(int postId)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.IsTrend = false;
        }

        public async Task DecrementBannerViews(int postId)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.BannerShowsLeft--;
        }

        public async Task DecrementTrendViews(int postId)
        {
            var post = await context.Posts.FindAsync(postId);

            if (post == null)
            {
                throw new NotFoundException("There is no post with this id");
            }

            post.TrendShowsLeft--;
        }

        public override void Delete(int id)
        {
            var entity = context.Posts.Include(x => x.Images).FirstOrDefault(x => x.Id == id);

            if (entity == null)
            {
                throw new BadRequestException("There is no entity with this id.");
            }

            context.Remove(entity);
        }
    }
}
