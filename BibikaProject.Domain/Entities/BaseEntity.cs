using System.ComponentModel.DataAnnotations;

namespace BibikaProject.Domain.Entities
{
    public interface IEntity<T>
    {
        T Id { get; set; }
    }

    public abstract class BaseEntity<T> : IEntity<T>
    {
        [Key]
        public T Id { get; set; }
    }
}
