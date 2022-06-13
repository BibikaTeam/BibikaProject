using BibikaProject.Infrastructure.Errors;
using System.Net;

namespace BibikaProject.Infrastructure.Core.Errors
{
    public class NotFoundException : BaseException
    {
        public NotFoundException(string[] errors) : base(errors)
        {
            Code = HttpStatusCode.NotFound;
        }

        public NotFoundException(string error) : base(new string[] { error })
        {
            Code = HttpStatusCode.NotFound;
        }
    }
}
