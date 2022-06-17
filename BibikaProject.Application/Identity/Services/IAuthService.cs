﻿using BibikaProject.Application.Identity.Requests;
using BibikaProject.Application.Identity.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BibikaProject.Application.Identity.Services
{
    public interface IAuthService
    {
        Task<TokenResponse> LoginAsync(UserLoginRequest request);

        Task RegisterAsync(UserRegisterRequest request);

        Task<TokenResponse> RefreshAsync(RefreshTokenRequest request);

        Task<TokenResponse> GoogleLoginAsync(GoogleLoginRequest request);
    }
}
