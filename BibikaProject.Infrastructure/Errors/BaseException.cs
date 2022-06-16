using System;
using System.Net;

namespace BibikaProject.Infrastructure.Errors
{
    public abstract class BaseException : Exception
    {
        public BaseException(string[] errors) : base(" ")
        {
            Errors = errors;
        }

        public HttpStatusCode Code { get; protected set; }

        public string[] Errors { get; set; }
    }
}
