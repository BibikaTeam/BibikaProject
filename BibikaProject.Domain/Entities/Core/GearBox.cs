using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities.Core
{
    public class GearBox
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }
    }
}
