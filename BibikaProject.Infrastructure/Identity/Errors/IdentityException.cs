using System;
using System.Net;

namespace BibikaProject.Infrastructure.Identity.Errors
{
    public class IdentityException : Exception
    {
        public IdentityException(string message, HttpStatusCode code) : base(message)
        {
            this.Code = code;
        }

        public HttpStatusCode Code { get; set; }
    }
}
