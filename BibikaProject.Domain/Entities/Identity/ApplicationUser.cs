using Microsoft.AspNetCore.Identity;

namespace BibikaProject.Domain.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string Test { get; set; }
    }
}
