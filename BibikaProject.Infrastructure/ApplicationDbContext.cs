﻿using BibikaProject.Domain.Entities.Core;
using BibikaProject.Domain.Entities.Identity;
using BibikaProject.Infrastructure.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BibikaProject.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

        public virtual DbSet<CarPost> CarPosts { get; set; }

        public virtual DbSet<Brand> Brands { get; set; }

        public virtual DbSet<CarBody> CarBodies { get; set; }

        public virtual DbSet<Generation> Generations { get; set; }

        public virtual DbSet<Image> Images { get; set; }

        public virtual DbSet<Model> Models { get; set; }

        public virtual DbSet<Option> Options { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new RoleConfiguration());
        }
    }
}
