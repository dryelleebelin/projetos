using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebApiPessoa.Repository;
using WebApiPessoa.Repository.Models;

namespace WebApiPessoa.Application.Autenticacao
{
    public class AutenticacaoService
    {
        private readonly PessoaContext _context; //
        public AutenticacaoService(PessoaContext context)
        {
            _context = context;
        }   //
        public string Autenticar(AutenticacaoRequest request)
        {
            var usuario = _context.Usuarios.FirstOrDefault(x => x.usuario == request.UserName && x.senha == request.Password);  //
            if (usuario != null)
            {
                var tokenString = GerarTokenJwt(usuario);
                return tokenString;
            }
            else
            {
                return null;
            }
        }
        private string GerarTokenJwt(TUsuario usuario)
        {
            var issuer = "var";  //quem está emitindo o token
            var audience = "var";  //destinatário da api
            var key = "1c93a5c9-1b8d-4f3c-ba71-65954542cc4e";  //chave secreta

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim("usuarioId", usuario.id.ToString())
            };

            var token = new JwtSecurityToken(issuer: issuer, claims: claims, audience: audience, expires: DateTime.Now.AddMinutes(60), signingCredentials: credentials);
            var tokenHandler = new JwtSecurityTokenHandler();
            var stringToken = tokenHandler.WriteToken(token);
            return stringToken;
        }
    }
}
