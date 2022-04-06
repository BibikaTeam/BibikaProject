using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public ICollection<CarPost> CarPosts { get; set; }
    }
}
