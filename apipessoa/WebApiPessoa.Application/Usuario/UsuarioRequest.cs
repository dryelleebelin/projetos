using System;
using System.Collections.Generic;
using System.Text;

namespace WebApiPessoa.Application.Usuario
{
    public class UsuarioRequest
    {
       
        public string Nome { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }
    }
} 
