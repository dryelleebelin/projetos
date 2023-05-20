import {useState} from 'react';
import {Link} from 'react-router-dom';  //link das rotas
import {auth} from '../../firebaseConnection';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

export default function Register(){
  const [email, setEmail] = useState('')  //estados  //começa com valor vazio  //add no value
  const [password, setPassword] = useState('')  //estados  //começa com valor vazio
  const navigate = useNavigate();

  async function handleRegister(event){
    event.preventDefault();  //pra não atualizar a página
    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', {replace: true})
      })
      .catch(() => {
        console.log("ERRO AO FAZER O CADASTRO")
      })
    }else{
      alert("Preencha todos os campos!")
    }
  }

    return(
      <div className="home-container">
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta</span>
        <form className="form" onSubmit={handleRegister}>
          <input type="text" placeholder="Digite seu email" value={email} onChange={(event) => setEmail(event.target.value)}/> 
          <input type="password" placeholder="Digite sua senha" value={password} onChange={(event) => setPassword(event.target.value)}/> 
          <button type="submit">Cadastrar</button>
        </form>
        <Link className="button-link" to="/">Já possui uma conta? Faça login!</Link>
      </div>
    )
  }