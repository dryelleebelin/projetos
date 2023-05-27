using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;  //biblioteca, pacote de códigos
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApiPessoa.Application.Pessoa;
using WebApiPessoa.Application.Usuario;
using WebApiPessoa.Repository;

namespace WebApiPessoa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly PessoaContext _context;
        public PessoaController(PessoaContext context)
        {
            _context = context;
        }


        //swagger
        /// <summary>
        /// Rota responsável por realizar o processamento de dados de uma pessoa
        /// </summary>
        /// <returns>Retorna os dados processados da pessoa</returns>
        /// <response code="200">Retorna os dados processados com sucesso</response>
        /// <response code="400">Erro de validação</response>


        [HttpPost]
        [Authorize]
        public PessoaResponse ProcessarInformacoesPessoa([FromBody] PessoaRequest request) //PessoaResponse = o que a api vai responder //ProcessarInformacoesPessoa() = nome do método //[FromBody] = vem do body //PessoaRequest = classe = o que vem do body //request = nome da váriavel, nome do parâmetro
        {
            var identidade = (ClaimsIdentity)HttpContext.User.Identity;
            var usuarioId = identidade.FindFirst("usuarioId").Value;

            var pessoaService = new PessoaService(_context);
            var pessoaResponse = pessoaService.ProcessarInformacoesPessoa(request, Convert.ToInt32(usuarioId));

            return pessoaResponse;
        }

        [HttpGet]
        public List<PessoaHistoricoResponse> ObterHistoricoPessoas()
        {
            var pessoaService = new PessoaService(_context);
            var pessoas = pessoaService.ObterHistoricoPessoas();

            return pessoas;
        }

        [HttpGet]
        [Route("{id}")]
        public PessoaHistoricoResponse ObterHistoricoPessoa([FromRoute] int id)
        {
            var pessoaService = new PessoaService(_context);
            var pessoa = pessoaService.ObterHistoricoPessoa(id);

            return pessoa;
        }


        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeletarHistoricoPessoa([FromRoute] int id)
        {
            var pessoaService = new PessoaService(_context);
            var sucesso = pessoaService.DeletarUsuario(id);

            if (sucesso == true)
            {
                return NoContent();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
