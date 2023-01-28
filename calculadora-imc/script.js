const calcular = document.getElementById('calcular');  //variável global

function imc()
{
    const nome = document.getElementById('nome').value; //variável
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const resultado = document.getElementById('resultado');

    if(nome !== ''  && altura !== '' && peso !== '')
    {
        const valorIMC = (peso / (altura * altura)).toFixed(2);
        let classificacao = "";
        if (valorIMC < 18.5)
        {
            classificacao = "abaixo do peso.";
        }
        else if (valorIMC < 25)
        {
            classificacao = "com peso ideal. Parabéns!";
        }
        else if (valorIMC < 30)
        {
            classificacao = "levemente acima do peso.";
        }
        else if (valorIMC < 35)
        {
            classificacao = "com obesidade grau I.";
        }
        else if (valorIMC < 40)
        {
            classificacao = "com obesidade grau II.";
        }
        else
        {
            classificacao = "com obesidade grau III. Cuidado!";
        }

        resultado.textContent = nome + ' seu IMC é ' + valorIMC + ' e você está ' + classificacao;
    }
    else
    {
        resultado.textContent = 'Preencha todos os campos!'
    }
}

calcular.addEventListener('click', imc);  //quando clicar no calcular vai realizar a função imc