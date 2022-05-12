using BibikaProject.Infrastructure.Errors;
using System.Net;

namespace BibikaProject.Infrastructure.Identity.Errors
{
    public class IdentityException : BaseException
    {
        public IdentityException(string message, HttpStatusCode code) : base(message)
        {
            this.Code = code;
        }
    }
}
