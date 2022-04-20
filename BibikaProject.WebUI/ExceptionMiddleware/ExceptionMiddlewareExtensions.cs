﻿using BibikaProject.Application.Logger;
using BibikaProject.Infrastructure.Identity.Errors;
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

                    if (contextFeature != null)
                    {
                        context.Response.ContentType = "application/json";

                        if (contextFeature.Error is IdentityException)
                        {
                            var error = (IdentityException)contextFeature.Error;

                            context.Response.StatusCode = (int)error.Code;

                            await context.Response.WriteAsync(new ErrorDetails()
                            {
                                StatusCode = context.Response.StatusCode,
                                Message = error.Message

                            }.ToString());
                        }
                        else
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                            await context.Response.WriteAsync(new ErrorDetails()
                            {
                                StatusCode = context.Response.StatusCode,
                                Message = "Internal Server Error."
                                

                            }.ToString());

                        }

                        logger.LogError($"Something went wrong: {contextFeature.Error}");
                    }
                });
            });
        }
    }
}
