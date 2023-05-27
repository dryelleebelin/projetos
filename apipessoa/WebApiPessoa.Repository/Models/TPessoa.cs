using System;
using System.Collections.Generic;
using System.Runtime;
using System.Text;

namespace WebApiPessoa.Repository.Models
{
    //representação da tabela
    public class TPessoa
    {
        //representação dos atributos da tabela
        public int id { get; set; }
        public string nome { get; set; }
        public DateTime dataNascimento { get; set; }
        public decimal altura { get; set; }
        public decimal peso { get; set; }
        public decimal salario { get; set; }
        public decimal saldo { get; set; }
        public int idade { get; set; }
        public decimal imc { get; set; }
        public string classificacao { get; set; }
        public decimal inss { get; set; }
        public decimal aliquota { get; set; }
        public decimal salarioLiquido { get; set; }
        public decimal saldoDolar { get; set; }
        public int idUsuario { get; set; }
    }
}
