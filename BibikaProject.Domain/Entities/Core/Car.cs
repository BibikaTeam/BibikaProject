using System.Collections.Generic;

namespace BibikaProject.Domain.Entities.Core
{
    public class Car : BaseEntity<int>
    {
        public int GenerationId { get; set; }
        public Generation Generation { get; set; }

        public int CompleteSetId { get; set; }
        public CompleteSet CompleteSet { get; set; }

        public int GearBoxId { get; set; }
        public GearBox GearBox { get; set; }

        public int CarBodyId { get; set; }
        public CarBody CarBody { get; set; }

        public int EngineId { get; set; }
        public Engine Engine { get; set; }

        public ICollection<Post> Posts { get; set; }
    }
}
