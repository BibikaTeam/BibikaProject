using BibikaProject.Domain.Entities.Core;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BibikaProject.Domain.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Post> Posts { get; set; }
    }
}
