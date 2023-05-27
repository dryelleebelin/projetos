using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using WebApiPessoa.Repository;
using WebApiPessoa.Repository.Models;

namespace WebApiPessoa.Application.Pessoa
{
    public class PessoaService
    {
        private readonly PessoaContext _context;
        public PessoaService(PessoaContext context)
        {
            _context = context;
        }

        public PessoaHistoricoResponse ObterHistoricoPessoa(int id)
        {
            var pessoaDb = _context.Pessoas.FirstOrDefault(x => x.id == id);
            var pessoa = new PessoaHistoricoResponse()
            {
                Id = pessoaDb.id,
                Nome = pessoaDb.nome,
                DataNascimento = pessoaDb.dataNascimento,
                Altura = pessoaDb.altura,
                Peso = pessoaDb.peso,
                Salario = Convert.ToDouble(pessoaDb.salario),
                Saldo = pessoaDb.saldo,
                Idade = pessoaDb.idade,
                Imc = pessoaDb.imc,
                Classificacao = pessoaDb.classificacao,
                Inss = Convert.ToDouble(pessoaDb    .inss),
                Aliquota = Convert.ToDouble(pessoaDb.aliquota),
                SalarioLiquido = Convert.ToDouble(pessoaDb.salarioLiquido),
                SaldoDolar = pessoaDb.saldoDolar,
                IdUsuario = pessoaDb.idUsuario
            };

            return pessoa;
        }
        

        public bool DeletarUsuario(int id)
        {
            try
            {
                var pessoaDb = _context.Pessoas.FirstOrDefault(xx => xx.id == id);
                if (pessoaDb == null)
                    return false;

                _context.Pessoas.Remove(pessoaDb);
                _context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<PessoaHistoricoResponse> ObterHistoricoPessoas()
        {
            var pessoasDb = _context.Pessoas.ToList();
            var pessoas = new List<PessoaHistoricoResponse>();

            foreach (var item in pessoasDb)
            {
                pessoas.Add(new PessoaHistoricoResponse()
                {
                    Id = item.id,
                    Nome = item.nome,
                    DataNascimento = item.dataNascimento,
                    Altura = item.altura,
                    Peso = item.peso,
                    Salario = Convert.ToDouble(item.salario),
                    Saldo = item.saldo,
                    Idade = item.idade,
                    Imc = item.imc,
                    Classificacao = item.classificacao,
                    Inss = Convert.ToDouble(item.inss),
                    Aliquota = Convert.ToDouble(item.aliquota),
                    SalarioLiquido = Convert.ToDouble(item.salarioLiquido),
                    SaldoDolar = item.saldoDolar,
                    IdUsuario = item.idUsuario
                });
            }
            return pessoas;
        } 

        public PessoaResponse ProcessarInformacoesPessoa(PessoaRequest request, int usuarioId)
        {
            var idade = CalcularIdade(request.DataNascimento);
            var imc = CalcularImc(request.Peso, request.Altura);
            var classificacao = CalcularClassificacao(imc);
            var aliquota = CalcularAliquota(request.Salario);
            var inss = CalcularInss(request.Salario, aliquota);
            var salarioLiquido = CalcularSalarioLiquido(request.Salario, inss);
            var saldoDolar = CalcularDolar(request.Saldo);

            var resposta = new PessoaResponse();
            resposta.SaldoDolar = saldoDolar;
            resposta.Aliquota = aliquota;
            resposta.SalarioLiquido = salarioLiquido;
            resposta.Classificacao = classificacao;
            resposta.Idade = idade;
            resposta.Imc = imc;
            resposta.Inss = inss;
            resposta.Nome = request.Nome;

            var pessoa = new TPessoa()
            {
                aliquota = Convert.ToDecimal(aliquota),
                altura = request.Altura,
                classificacao = classificacao,
                dataNascimento= request.DataNascimento,
                idade = idade,
                idUsuario = usuarioId,
                imc = imc,
                inss = Convert.ToDecimal(inss),  
                nome = request.Nome,
                peso = request.Peso,
                salario = Convert.ToDecimal(request.Salario),
                salarioLiquido = Convert.ToDecimal(salarioLiquido),
                saldo = request.Saldo,
                saldoDolar= saldoDolar
            };

            _context.Pessoas.Add(pessoa);
            _context.SaveChanges();

            return resposta;
        }
        private int CalcularIdade(DateTime dataNascimento)
        {
            var anoAtual = DateTime.Now.Year;
            var idade = anoAtual - dataNascimento.Year;
            var mesAtual = DateTime.Now.Month;
            if (mesAtual < dataNascimento.Month)
            {
                idade = idade - 1;
            }

            return idade;
        }

        private decimal CalcularImc(decimal peso, decimal altura)
        {
            return Math.Round(peso / (altura * altura), 2);
        }

        private string CalcularClassificacao(decimal imc)
        {
            var classificacao = "";

            if (imc < (decimal)18.5)
            {
                classificacao = "Abaixo do peso ideal";
            }
            else if (imc >= (decimal)18.5 && imc <= (decimal)24.99)
            {
                classificacao = "Peso normal";
            }
            else if (imc >= (decimal)25 && imc <= (decimal)29.99)
            {
                classificacao = "Pré-obesidade";
            }
            else if (imc >= (decimal)30 && imc <= (decimal)34.99)
            {
                classificacao = "Obesidade grau I";
            }
            else if (imc >= (decimal)35 && imc <= (decimal)39.99)
            {
                classificacao = "Obesidade grau II";
            }
            else
            {
                classificacao = "Obesidade grau III";
            }

            return classificacao;
        }

        private double CalcularAliquota(double salario)
        {
            var aliquota = 7.5;
            if (salario <= 1212)
            {
                aliquota = 7.5;
            }
            else if (salario >= 1212.01 && salario <= 2427.35)
            {
                aliquota = 9;
            }
            else if (salario >= 2427.36 && salario <= 3641.03)
            {
                aliquota = 12;
            }
            else
            {
                aliquota = 14;
            }

            return aliquota;
        }

        private double CalcularInss(double salario, double aliquota)
        {
            var inss = (salario * aliquota) / 100;

            return inss;
        }

        private double CalcularSalarioLiquido(double salario, double inss)
        {
            return salario - inss;
        }

        private decimal CalcularDolar(decimal saldo)
        {
            var dolar = (decimal)5.15;
            var saldoDolar = Math.Round(saldo / dolar, 2);

            return saldoDolar;
        }
    }
}
