using BibikaProject.Infrastructure.Errors;
using System.Net;

namespace BibikaProject.Infrastructure.Core.Errors
{
    public class NotFoundException : BaseException
    {
        public NotFoundException(string message) : base(message)
        {
            Code = HttpStatusCode.NotFound;
        }     
    }
}
