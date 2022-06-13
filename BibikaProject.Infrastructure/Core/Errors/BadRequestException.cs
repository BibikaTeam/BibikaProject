using BibikaProject.Infrastructure.Errors;
using System.Net;

namespace BibikaProject.Infrastructure.Core.Errors
{
    public class BadRequestException : BaseException
    {
        public BadRequestException(string[] errors) : base(errors)
        {
            Code = HttpStatusCode.BadRequest;
        }

        public BadRequestException(string error) : base(new string[] { error })
        {
            Code = HttpStatusCode.BadRequest;
        }

    }
}
