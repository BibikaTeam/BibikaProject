using BibikaProject.Domain.Entities.Core;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BibikaProject.Domain.Entities.Identity
{
    public class ApplicationUser : IdentityUser, IEntity<string>
    {
        public ICollection<Post> Posts { get; set; }

        public ICollection<Post> LikedPosts { get; set; }

        public ICollection<ViewPost> ViewedPosts { get; set; }
    }
}
