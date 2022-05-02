using BibikaProject.Application.Identity.Commands;
using BibikaProject.Application.Identity.Queries;
using BibikaProject.Application.Identity.Services;
using BibikaProject.Application.Logger;
using BibikaProject.Domain.Entities.Identity;
using BibikaProject.Infrastructure;
using BibikaProject.Application.Core.DTO.Brand;
using BibikaProject.Application.Core.DTO.Car;
using BibikaProject.Application.Core.DTO.Generation;
using BibikaProject.Application.Core.DTO.Model;
using BibikaProject.Infrastructure.Identity;
using BibikaProject.Infrastructure.Identity.Commands;
using BibikaProject.Infrastructure.Identity.Queries;
using BibikaProject.Infrastructure.Identity.Services;
using BibikaProject.Infrastructure.Logger;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BibikaProject.Application.Core.Services;
using BibikaProject.Infrastructure.Core.Services;
using BibikaProject.Application.Core.Commands;
using BibikaProject.Infrastructure.Core.Commands;
using BibikaProject.Infrastructure.Core.Queries;
using BibikaProject.Application.Core.Queries;
using BibikaProject.Application.Core.DTO.Post;

namespace BibikaProject.WebUI
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                builder => builder.AllowAnyOrigin()
                                  .AllowAnyMethod()
                                  .AllowAnyHeader());
            });

        }

        public static void ConfigureSqlContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                     options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));
        }

        public static void ConfigureJWT(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");

            var secretKey = configuration["JwtSettings:secret"];

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                ValidAudience = jwtSettings.GetSection("validAudience").Value,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };

            services.Configure<JWTSettings>(jwtSettings);

            services.AddSingleton<TokenValidationParameters>(tokenValidationParameters);

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = tokenValidationParameters;
            });
        }

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<ApplicationUser>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
                options.User.RequireUniqueEmail = true;
            }).AddDefaultTokenProviders();

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);

            builder.AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

            services.AddTransient<IAuthService, AuthService>();

            services.AddTransient<IRefreshTokenQuery, RefreshTokenQuery>();
            services.AddTransient<IRefreshTokenCommand, RefreshTokenCommand>();
        }

        public static void ConfigureLogger(this IServiceCollection services)
        {
            services.AddScoped<ILoggerManager, LoggerManager>();
        }

        public static void ConfigureFluentValidators(this IServiceCollection services)
        {
            services.AddTransient<IValidator<AddBrandDTO>, AddBrandDTOValidator>();
            services.AddTransient<IValidator<UpdateBrandDTO>, UpdateBrandDTOValidator>();

            services.AddTransient<IValidator<AddModelDTO>, AddModelDTOValidator>();
            services.AddTransient<IValidator<UpdateModelDTO>, UpdateModelDTOValidator>();

            services.AddTransient<IValidator<AddGenerationDTO>, AddGenerationDTOValidator>();
            services.AddTransient<IValidator<UpdateGenerationDTO>, UpdateGenerationDTOValidator>();

            services.AddTransient<IValidator<AddCarDTO>, AddCarDTOValidator>();
            services.AddTransient<IValidator<UpdateCarDTO>, UpdateCarDTOValidator>();

            services.AddTransient<IValidator<AddPostDTO>, AddPostDTOValidator>();
        }

        public static void ConfigureBrandService(this IServiceCollection services)
        {
            services.AddTransient<IBrandService, BrandService>();

            services.AddTransient<IBrandCommand, BrandCommand>();
            services.AddTransient<IBrandQuery, BrandQuery>();
        }
        public static void ConfigurePostService(this IServiceCollection services)
        {
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<IPostCommand, PostCommand>();
        }
        public static void ConfigureHelperServices (this IServiceCollection services)
        {
            services.AddTransient<IImageService, ImageService>();   
        } 
    }
}
