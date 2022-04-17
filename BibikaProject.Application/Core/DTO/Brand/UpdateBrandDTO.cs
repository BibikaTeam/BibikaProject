﻿using FluentValidation;

namespace BibikaProject.Application.Core.DTO.Brand
{
    public class UpdateBrandDTO
    {
        public int Id { get; set; }

        public string Title { get; set; }
    }

    public class UpdateBrandDTOValidator : AbstractValidator<UpdateBrandDTO>
    {
        public UpdateBrandDTOValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}