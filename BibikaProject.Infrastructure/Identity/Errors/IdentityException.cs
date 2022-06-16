using BibikaProject.Infrastructure.Errors;
using System.Net;

namespace BibikaProject.Infrastructure.Identity.Errors
{
    public class IdentityException : BaseException
    {
        public IdentityException(string error, HttpStatusCode code) : base(new string[] { error })
        {
            this.Code = code;
        }

        public IdentityException(string[] errors, HttpStatusCode code) : base(errors)
        {
            this.Code = code;
        }
    }
}
