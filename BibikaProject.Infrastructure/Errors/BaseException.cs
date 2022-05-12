using System;
using System.Net;

namespace BibikaProject.Infrastructure.Errors
{
    public abstract class BaseException : Exception
    {
        public BaseException(string message) : base(message)
        {
        }

        public HttpStatusCode Code { get; protected set; }
    }
}
