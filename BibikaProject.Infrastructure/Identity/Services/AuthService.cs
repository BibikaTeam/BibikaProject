using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using BibikaProject.Application.Identity.Services;
using BibikaProject.Domain.Entities.Identity;
using BibikaProject.Application.Identity.Queries;
using BibikaProject.Application.Identity.Commands;
using BibikaProject.Application.Identity.Responses;
using BibikaProject.Application.Identity.Requests;

namespace BibikaProject.Infrastructure.Identity.Services
{
    public class AuthService : IAuthService
    {
        public AuthService(UserManager<ApplicationUser> userManager,
                           IOptions<JWTSettings> options,
                           IRefreshTokenQuery refreshTokenQuery,
                           IRefreshTokenCommand refreshTokenCommand)
        {
            this.userManager = userManager;
            this.options = options.Value;
            this.refreshTokenQuery = refreshTokenQuery;
            this.refreshTokenCommand = refreshTokenCommand;
        }

        private readonly UserManager<ApplicationUser> userManager;
        private readonly JWTSettings options;
        private readonly IRefreshTokenQuery refreshTokenQuery;
        private readonly IRefreshTokenCommand refreshTokenCommand;

        public async Task<TokenResponse> LoginAsync(UserLoginRequest request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return new TokenResponse
                {
                    Token = null,
                    RefreshToken = null,
                    Error = "Wrong email",
                };
            }

            if (!await userManager.CheckPasswordAsync(user, request.Password))
            {
                return new TokenResponse
                {
                    Token = null,
                    RefreshToken = null,
                    Error = "Wrong password",
                };
            }

            var JWT = await CreateTokenAsync(user);

            var refresh = await CreateRefreshToken(user, GetPrincipalFromToken(JWT));

            return new TokenResponse
            {
                Token = JWT,
                RefreshToken = refresh,
                Error = null,
            };
        }

        public async Task<List<string>> RegisterAsync(UserRegisterRequest request)
        {
            var user = new ApplicationUser
            {
                UserName = request.UserName,
                Email = request.Email
            };

            var result = await userManager.CreateAsync(user, request.Password);           

            if (!result.Succeeded)
            {
                var errors = new List<string>();

                foreach (var item in result.Errors)
                {
                    errors.Add(item.Description);
                }

                return errors;
            }

            return null;
        }

        public async Task<TokenResponse> RefreshAsync(RefreshTokenRequest request)
        {
            var principal = GetPrincipalFromToken(request.Token);

            if (principal == null)
            {
                return new TokenResponse
                {
                    Token = null,
                    RefreshToken = null,
                    Error = "Invalid access token"
                };
            }

            var expDateUnix = long.Parse(principal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

            var expDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(expDateUnix);

            var jti = principal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            var storedRefreshToken = await refreshTokenQuery.GetRefreshTokenAsync(request.RefreshToken);

            if(storedRefreshToken == null ||
               storedRefreshToken.Invalidated ||
               storedRefreshToken.Used ||
               storedRefreshToken.JwtId != jti)
            {
                return new TokenResponse
                {
                    Token = null,
                    RefreshToken = null,
                    Error = "Invalid refresh token"
                };
            }

            if(expDate > DateTime.UtcNow)
            {
                return new TokenResponse
                {
                    Token = null,
                    RefreshToken = null,
                    Error = "Access token hasn't expired"
                };
            }

            if(DateTime.UtcNow > storedRefreshToken.ExpiryDate)
            {
                return new TokenResponse
                {
                    Token = null,
                    RefreshToken = null,
                    Error = "Refresh token has expired"
                };
            }

            storedRefreshToken.Used = true;

            refreshTokenCommand.UpdateRefreshToken(storedRefreshToken);
            await refreshTokenCommand.SaveChangesAsync();

            var user = await userManager.FindByIdAsync(storedRefreshToken.UserId);

            var newJWT = await CreateTokenAsync(user);

            var newRefresh = await CreateRefreshToken(user, GetPrincipalFromToken(newJWT));

            return new TokenResponse
            {
                RefreshToken = newRefresh,
                Token = newJWT,
                Error = null
            };
        }

        private ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                ValidIssuer = options.ValidIssuer,
                ValidAudience = options.ValidAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(options.Secret))
            };

            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out _);

            return principal;
        }

        private async Task<string> CreateRefreshToken(ApplicationUser user, ClaimsPrincipal principal)
        {
            var token = new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                JwtId = principal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value,
                UserId = user.Id,
                ExpiryDate = DateTime.UtcNow.AddMonths(6)
            };

            await refreshTokenCommand.AddRefreshTokenAsync(token);
            await refreshTokenCommand.SaveChangesAsync();

            return token.Token;
        }

        private async Task<string> CreateTokenAsync(ApplicationUser user)
        {
            var signingCredentials = GetSigningCredentials();

            var claims = await GetClaimsAsync(user);

            var tokenOptions = GenerateTokenOptions(signingCredentials, claims);

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(options.Secret);

            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaimsAsync(ApplicationUser user)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var roles = await userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var tokenOptions = new JwtSecurityToken
                (
                    issuer: options.ValidIssuer,
                    audience: options.ValidAudience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(options.Expires)),
                    signingCredentials: signingCredentials
                );

            return tokenOptions;
        }

    }
}
