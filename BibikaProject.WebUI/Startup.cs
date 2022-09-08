using BibikaProject.Application.Logger;
using BibikaProject.Infrastructure.Core.Commands;
using BibikaProject.Infrastructure.Core.Services.Helpers;
using BibikaProject.WebUI.ExceptionMiddleware;
using FluentValidation.AspNetCore;
using Hangfire;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

namespace BibikaProject.WebUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {          
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()
                    .AddFluentValidation()
                    .ConfigureApiBehaviorOptions(options =>
                    {
                        options.InvalidModelStateResponseFactory = context =>
                        {
                            var errors = new List<string>();

                            foreach (var val in context.ModelState.Values)
                            {
                                foreach (var err in val.Errors)
                                {
                                    errors.Add(err.ErrorMessage);
                                }
                            }

                            var result = new { Code = HttpStatusCode.BadRequest, Errors = errors };

                            return new BadRequestObjectResult(result);
                        };
                    })
                    .AddNewtonsoftJson(options =>
                    {
                        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    });
                    

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BibikaProject.WebUI", Version = "v1" });
            });

            services.ConfigureCors();

            services.AddSpaStaticFiles(configuration => configuration.RootPath = "Client/build");

            services.ConfigureSqlContext(Configuration);

            services.ConfigureJWT(Configuration);

            services.ConfigureFacebookSettings(Configuration);
            services.ConfigureGoogleSettings(Configuration);

            services.ConfigureIdentity();

            services.ConfigureLogger();

            services.ConfigureFluentValidators();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.ConfigureEmail(Configuration);

            services.ConfigureHangfire(Configuration);

            services.ConfigureBrandService();
            services.ConfigurePostService();
            services.ConfigureImageService();
            services.ConfigureModelService();
            services.ConfigureGenerationService();
            services.ConfigureCarService();
            services.ConfigureOptionService();
            services.ConfigureEngineService();
            services.ConfigureGearBoxService();
            services.ConfigureCompleteSetService();
            services.ConfigureCarBodyService();         
            services.ConfigureUserService();
            services.ConfigureAdvertismentService();
            services.ConfigureSearchPanelService();
            services.ConfigureViewPostQuery();
            services.ConfigureCharService();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerManager logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
                app.UseHangfireDashboard();
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "images")),
                RequestPath = "/images"
            });

            app.UseSpaStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();          


            app.ConfigureExceptionHandler(logger);

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseHangfireServer();

            //app.UseSpa(spa =>
            //{
            //    spa.Options.SourcePath = "Client";

            //    //if (env.IsDevelopment())
            //    //{
            //    //    spa.UseReactDevelopmentServer(npmScript: "start");
            //    //}
            //});

            RecurringJob.AddOrUpdate<AdvertismentHelper>("dailyPointsDecrement", x => x.DecrementDailyPoints(), Cron.Daily);
            RecurringJob.AddOrUpdate<AdvertismentHelper>("balanceDecrement", x => x.DecrementBalance(), Cron.Daily);

        }
    }
}
