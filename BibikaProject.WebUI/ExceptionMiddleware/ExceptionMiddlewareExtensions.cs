using BibikaProject.Application.Logger;
using BibikaProject.Infrastructure.Errors;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace BibikaProject.WebUI.ExceptionMiddleware
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILoggerManager logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature == null)
                    {
                        return;
                    }

                    context.Response.ContentType = "application/json";

                    if (contextFeature.Error is BaseException)
                    {
                        var error = (BaseException)contextFeature.Error;

                        context.Response.StatusCode = (int)error.Code;

                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            Code = context.Response.StatusCode,
                            Errors = error.Errors

                        }.ToString());
                    }
                    else
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            Code = context.Response.StatusCode,
                            Errors = new string[] { "Internal Server Error." }


                        }.ToString());

                    }

                    logger.LogError($"Something went wrong: {contextFeature.Error}");

                });
            });
        }
    }
}
