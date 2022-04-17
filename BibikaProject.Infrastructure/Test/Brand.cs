using System.Collections.Generic;

namespace BibikaProject.Infrastructure.Test
{
    internal class Brand
    {
        public string Name { get; set; }
        public List<Model> Models { get; set; }
    }
    internal class Model
    {
        public string Name { get; set; }
        public Brand Brand { get; set; }
        public List<Generation> Generations { get; set; }
    }
    internal class Generation
    {
        public string Name { get; set; }
        public int YearFrom { get; set; }
        public int YearTo { get; set; }
        public Model Model { get; set; }
        public List<Car> Cars { get; set; }

    }
    class Car
    {
        Generation Generation { get; set; }
        CompleteSet CompleteSet { get; set; }
        GearboxType GearboxType { get; set; }
        Engine Engine { get; set; }
    }
    class CompleteSet
    {

    }
    class GearboxType
    {

    }
    class Engine
    {
    }
}
