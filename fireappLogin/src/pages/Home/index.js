import {useState} from 'react';
import './home.css';
import {Link} from 'react-router-dom';  //link das rotas
import {auth} from '../../firebaseConnection';
import {signInWithEmailAndPassword} from 'firebase/auth'  //métodos para o login
import {useNavigate} from 'react-router-dom';  //fazer navegações de forma indireta

export default function Home(){
  const [email, setEmail] = useState('')  //estados  //começa com valor vazio  //add no value
  const [password, setPassword] = useState('')  //estados  //começa com valor vazio

  const navigate = useNavigate();  //instanciar

  async function handleLogin(event){
    event.preventDefault();  //pra não atualizar a página
    if(email !== '' && password !== ''){
      await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/admin', {replace: true})
      })
      .catch(() => {
        console.log("ERRO AO FAZER O LOGIN")
      })
    }else{
      alert("Preencha todos os campos!")
    }
  }

    return(
      <div className="home-container">
        <h1>Lista de tarefas</h1>
        <span>Gerencie sua agenda de forma rápida e fácil.</span>
        <form className="form" onSubmit={handleLogin}>
          <input type="text" placeholder="Digite seu email" value={email} onChange={(event) => setEmail(event.target.value)}/> 
          <input type="password" placeholder="Digite sua senha" value={password} onChange={(event) => setPassword(event.target.value)}/> 
          <button type="submit">Acessar</button>
        </form>
        <Link className="button-link" to="/register">Não possui uma conta? Cadastre-se</Link>
      </div>
    )
  }