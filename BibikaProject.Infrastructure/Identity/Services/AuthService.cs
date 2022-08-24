using BibikaProject.Application.Identity.Services;
using BibikaProject.Domain.Entities.Identity;
using BibikaProject.Application.Identity.Queries;
using BibikaProject.Application.Identity.Commands;
using BibikaProject.Application.Identity.Responses;
using BibikaProject.Application.Identity.Requests;
using BibikaProject.Application.Identity.Claims;
using BibikaProject.Infrastructure.Identity.Errors;
using BibikaProject.Infrastructure.Identity.Services.Settings;
using BibikaProject.Infrastructure.Identity.Services.Helpers;
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
using System.Net.Http;
using System.Net;
using Google.Apis.Auth;
using Newtonsoft.Json;
using BibikaProject.Infrastructure.Identity.Services.FacebookAuthTypes;
using BibikaProject.Infrastructure.Identity.Services.Helpers.Email;

namespace BibikaProject.Infrastructure.Identity.Services
{
    public class AuthService : IAuthService
    {
        public AuthService(UserManager<ApplicationUser> userManager,
                           IOptions<JWTSettings> jwtSettings,
                           IRefreshTokenQuery refreshTokenQuery,
                           IRefreshTokenCommand refreshTokenCommand,
                           IOptions<FacebookAuthSettings> facebookAuthSettings,
                           IOptions<GoogleAuthSettings> googleAuthSettings,
                           IOptions<EmailConfiguration> emailConfiguration)
        {
            this.userManager = userManager;
            this.jwtSettings = jwtSettings.Value;
            this.refreshTokenQuery = refreshTokenQuery;
            this.refreshTokenCommand = refreshTokenCommand;
            this.facebookAuthSettings = facebookAuthSettings.Value;
            this.googleAuthSettings = googleAuthSettings.Value;
            this.emailConfiguration = emailConfiguration.Value;
            this.emailSender = new EmailSender(this.emailConfiguration);
        }

        private readonly UserManager<ApplicationUser> userManager;
        private readonly JWTSettings jwtSettings;
        private readonly IRefreshTokenQuery refreshTokenQuery;
        private readonly IRefreshTokenCommand refreshTokenCommand;
        private readonly FacebookAuthSettings facebookAuthSettings;
        private readonly GoogleAuthSettings googleAuthSettings;
        private readonly EmailSender emailSender;
        private readonly EmailConfiguration emailConfiguration;

        private static readonly HttpClient Client = new HttpClient();

        public async Task<TokenResponse> LoginAsync(UserLoginRequest request)
        {
            ApplicationUser user = await userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new IdentityException("Wrong password or email", HttpStatusCode.BadRequest);
            }

            if (!await userManager.CheckPasswordAsync(user, request.Password))
            {
                throw new IdentityException("Wrong password or email", HttpStatusCode.BadRequest);
            }

            var JWT = await CreateTokenAsync(user);

            var refresh = await CreateRefreshToken(user, GetPrincipalFromToken(JWT));

            return new TokenResponse
            {
                Token = JWT,
                RefreshToken = refresh
            };
        }

        public async Task RegisterAsync(UserRegisterRequest request)
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

                throw new IdentityException(errors.ToArray(), HttpStatusCode.BadRequest);
            }

            //await userManager.AddToRoleAsync(user, "User");
        }

        public async Task<TokenResponse> RefreshAsync(RefreshTokenRequest request)
        {
            var principal = GetPrincipalFromToken(request.Token);

            if (principal == null)
            {
                throw new IdentityException("Invalid access token", HttpStatusCode.BadRequest);
            }

            var expDateUnix = long.Parse(principal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Exp).Value);

            var expDate = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(expDateUnix);

            var jti = principal.Claims.Single(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

            var storedRefreshToken = await refreshTokenQuery.GetRefreshTokenAsync(request.RefreshToken);

            if (storedRefreshToken == null ||
               storedRefreshToken.Invalidated ||
               storedRefreshToken.Used ||
               storedRefreshToken.JwtId != jti)
            {
                throw new IdentityException("Invalid refresh token", HttpStatusCode.BadRequest);
            }

            if (expDate > DateTime.UtcNow)
            {
                throw new IdentityException("Access token hasn't expired", HttpStatusCode.BadRequest);
            }

            if (DateTime.UtcNow > storedRefreshToken.ExpiryDate)
            {
                throw new IdentityException("Refresh token has expired", HttpStatusCode.BadRequest);
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
                Token = newJWT
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
                ValidIssuer = jwtSettings.ValidIssuer,
                ValidAudience = jwtSettings.ValidAudience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
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
            var key = Encoding.UTF8.GetBytes(jwtSettings.Secret);

            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaimsAsync(ApplicationUser user)
        {
            var claims = new List<Claim>
                {
                    new Claim(UserJWTClaimTypes.Name, user.UserName),
                    new Claim(UserJWTClaimTypes.Id, user.Id),
                    new Claim(UserJWTClaimTypes.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

            var roles = await userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(UserJWTClaimTypes.Role, role));
            }

            return claims;
        }

        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {
            var tokenOptions = new JwtSecurityToken
                (
                    issuer: jwtSettings.ValidIssuer,
                    audience: jwtSettings.ValidAudience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings.Expires)),
                    signingCredentials: signingCredentials
                );

            return tokenOptions;
        }

        public async Task<TokenResponse> GoogleLoginAsync(GoogleLoginRequest request)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { googleAuthSettings.ClientId }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(request.Credential, settings);

            if (payload == null)
            {
                throw new IdentityException("Bad Data", HttpStatusCode.BadRequest);
            }

            var user = await userManager.FindByEmailAsync(payload.Email);

            if (user == null)
            {
                await RegisterAsync(new UserRegisterRequest
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    Password = Guid.NewGuid().ToString()
                });

                user = await userManager.FindByEmailAsync(payload.Email);

                if (user == null)
                {
                    throw new IdentityException("Bad Data", HttpStatusCode.BadRequest);
                }
            }

            var JWT = await CreateTokenAsync(user);

            var refresh = await CreateRefreshToken(user, GetPrincipalFromToken(JWT));

            return new TokenResponse
            {
                Token = JWT,
                RefreshToken = refresh
            };
        }

        public async Task<TokenResponse> FacebookLoginAsync(FacebookLoginRequest request)
        {
            var appAccessTokenResponse = await Client.GetStringAsync(FacebookURLGenerator.AppAccessToken(facebookAuthSettings.AppId, 
                                                                                                         facebookAuthSettings.AppSecret));
            var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);

            var userAccessTokenValidationResponse = await Client.GetStringAsync(FacebookURLGenerator.UserAccess(request.FacebookToken, 
                                                                                                                appAccessToken.AccessToken));
            var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

            if (!userAccessTokenValidation.Data.IsValid)
            {
                throw new IdentityException("Bad Data", HttpStatusCode.BadRequest);
            }

            var userInfoResponse = await Client.GetStringAsync(FacebookURLGenerator.UserInfo(request.FacebookToken));
            var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

            var user = await userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                await RegisterAsync(new UserRegisterRequest
                {
                    Email = userInfo.Email,
                    UserName = userInfo.FirstName,
                    Password = Guid.NewGuid().ToString()
                });

                user = await userManager.FindByEmailAsync(userInfo.Email);

                if (user == null)
                {
                    throw new IdentityException("Bad Data", HttpStatusCode.BadRequest);
                }
            }

            var JWT = await CreateTokenAsync(user);

            var refresh = await CreateRefreshToken(user, GetPrincipalFromToken(JWT));

            return new TokenResponse
            {
                Token = JWT,
                RefreshToken = refresh
            };
        }

        public async Task ResetPassword(ResetPasswordRequest request)
        {
            var user = await userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new IdentityException("User not found", HttpStatusCode.NotFound);
            }

            await userManager.ResetPasswordAsync(user, Decode(request.Token), request.NewPassword);
        }

        public async Task ResetPasswordReqauest(string email)
        {
            var user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                throw new IdentityException("User not found", HttpStatusCode.NotFound);
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            var body = TemplateEngine.GetResetPasswordTemplate(user.UserName, Encode(token));

            await emailSender.SendAsync(email, "Password Resset", body);
        }

        private string Encode(string token)
        {
            var result = token.Replace('/', '.').Replace('+', '-');

            return result;
        }

        private string Decode(string token)
        {
            var result = token.Replace('.', '/').Replace('-', '+');

            return result;
        }
    }
}
