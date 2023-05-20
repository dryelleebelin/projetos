/*  Estrutura sem o hooks:::
import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      
    };

  }

  render(){
    return(
      <div>

      </div>
    );
  }
}

export default App;
*/

/*  Stateless components:

const Bemvindo = (props) => {
  return(
    <div>
      <h3>Bem-vindo(a) {props.nome}</h3>
      <h3>Você {props.idade} anos</h3>
    </div>
  );
}

export default function App(){
  return(
    <div>
      <p>Olá Mundo!</p>
      <Bemvindo nome="Dryelle" idade="18"/>
    </div>
  )
}
*/

/*  Stateless components:
//componente principal:
function App(){
  return(
    <div>
      <h1>Conheça nossa equipe:</h1>
      <Equipe nome="Dryelle" cargo="Programadora" idade="18" facebook="https://google.com"/>
      <Equipe nome="Lucas" cargo="Designer" idade="17" facebook="https://google.com"/>
      <Equipe nome="Amanda" cargo="Front-end" idade="20" facebook="https://google.com"/>
    </div>
  )
}

const Equipe = (props) => {
  return (
    <div>
      <Sobre username={props.nome} cargo={props.cargo} idade={props.idade}/>
      <Social fb={props.facebook}/>
      <hr/>
    </div>
  );
}

const Sobre = (props) => {
  return(
    <div>
      <h2>Olá sou o(a) {props.username}</h2>
      <h3>Cargo: {props.cargo}</h3>
      <h3>Idade: {props.idade} anos</h3>
    </div>
  )
}

const Social = (props) => {
  return(
    <div>
      <a href={props.fb}>Facebook</a>
      <a>LinkedIn</a>
      <a>YouTube</a>
    </div>
  )
}
*/ 

/*  Class components:
// (passa o " , { Component } " no import)

import React, { Component } from 'react';

function App () {
  return(
    <div>
      <h1>Conheça nossa equipe:</h1>
      <Equipe nome="Dryelle" cargo="Programadora" idade="18"/>
    </div>
  )
}
class Equipe extends Component{ 
  render(){  
    return(
      <div>
        <Sobre nome={this.props.nome} cargo={this.props.cargo} idade={this.props.idade}/>
        <hr/>
      </div>
    );
  }
}
class Sobre extends Component{
  render(){
    return(
      <div>
        <h2>Olá sou o(a) {this.props.nome}</h2>
        <h2>Cargo: {this.props.cargo}</h2>
        <h2>Idade: {this.props.idade} anos</h2>
      </div>
    );
  }
}

export default App;
*/

/*  Usando states:
import React, { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: 'Dryelle',
      contador: 0
    };
    this.aumentar = this.aumentar.bind(this);
    this.diminuir = this.diminuir.bind(this);

  }

  aumentar(){
    let state = this.state;
    state.contador += 1;
    state.nome = 'José';
    this.setState(state);
  }
  diminuir(){
    let state = this.state;
    if(state.contador === 0){
      alert('Opa chegou a zero!');
      return;
    }
    state.contador -= 1;
    this.setState(state);
  }

  render(){
    return(
      <div>
        <h2>Contador</h2>
        {this.state.nome}
        <h3><button onClick={this.diminuir}>-</button>
        {this.state.contador}
        <button onClick={this.aumentar} >+</button>
        </h3>
      </div>
    );
  }
}

export default App;
*/

/*  Ciclo de vida dos componentes:
import React, {Component} from 'react';

class App extends Component{

constructor(props){
  super(props);
  this.state = {
    hora: '00:00:00'
  };
}

  componentDidMount(){
    setInterval(()=>{
      this.setState({hora: new Date().toLocaleTimeString()})
    }, 1000);
  }

  componentDidUpdate(){
    console.log('Atualizou!');
  }

  render(){
    return(
      <div>
        <h1>Meu projeto {this.state.hora}</h1>
      </div>
    );
  }
}

export default App;
*/

/*  Eventos:
import React, {Component} from 'react';
import Membro from './components/Membro';

class App extends Component{
  render(){
    return(
      <div>
        <Membro nome="Visitante"/>
      </div>
    );
  }
}

export default App;
*/

/*  Renderização condicional, operação:
import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      status: false
    };
    this.sair = this.sair.bind(this);
    this.entrar = this.entrar.bind(this);

  }

  sair(){
    this.setState({status: false});
  }
  entrar(){
    this.setState({status: true});
  }

  render(){
    return(
      <div>
        {this.state.status ?
        <div>
          <h2>Bem-vindo ao sistema</h2>
          <button onClick={this.sair}>Sair</button>
        </div> :
        <div>
          <h2>Olá visitante, faça o login!</h2>
          <button onClick={this.entrar}>Entrar no sistema</button>
        </div>
      }
      </div>
    );
  }
}

export default App;
*/

/*  Trabalhando com listas:
import React, {Component} from 'react';
import Feed from './components/Feed';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      feed:[
        {id: 1,
        username: 'Dryelle',
        curtidas: 10,
        comentarios: 2
        },
        {id: 2,
          username: 'Vanessa',
          curtidas: 120,
          comentarios: 24
        },
        {id: 3,
          username: 'Amanda',
          curtidas: 30,
          comentarios: 12
        },
        {id: 4,
          username: 'Ricardo',
          curtidas: 1,
          comentarios: 0
        }
      ]
    };

  }

  render(){
    return(
      <div>
        {this.state.feed.map((item) => {
          return(
            <Feed id={item.id} username={item.username} curtidas={item.curtidas} comentarios={item.comentarios}/> //props que vai utilizar
          );
        })}
      </div>
    );
  }
}

export default App;
*/

/*  Manipulando formulários:
import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      form:{
        nome: '',
        email: '',
        senha: '',
        sexo: ''
      }
    };
    this.dadosForm = this.dadosForm.bind(this);
  }

  dadosForm(event){
    let form = this.state.form;
    form[event.target.name] = event.target.value;
    this.setState({form: form});
  }

  render(){
    return(
      <div>
        <h2>Login</h2>
        Nome:
        <input type="text" name="nome" value={this.state.form.nome} onChange={(this.dadosForm)}/> <br/>
        Email: 
        <input type="email" name="email" value={this.state.form.email} onChange={this.dadosForm} /> <br/>  
        Senha: 
        <input type="password" name="senha" value={this.state.form.senha} 
        onChange={this.dadosForm}/> <br/>
        Sexo: 
        <select name="sexo" value={this.state.form.sexo} onChange={this.dadosForm}>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
        </select>
        <div>
          <h4>{this.state.form.email}</h4>
          <h4>{this.state.form.senha}</h4>
          <h4>{this.state.form.sexo}</h4>
        </div>
      </div>
    );
  }
}

export default App;
*/

/*  Formulário 2:
import React, {Component} from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
      error: ''
    };
    this.cadastrar = this.cadastrar.bind(this);
  }

  cadastrar(event){
    const {nome, email, senha} = this.state;
    if(nome !== '' && email !== '' && senha !== ''){
      alert(`Nome: ${nome} \nEmail: ${email} \nSenha: ${senha}`);
    } else{
      this.setState({error: 'Ops! Parece que esta faltando algo.'});
    }
    event.preventDefault();
  }

  render(){
    return(
      <div>
        <h1>Novo usuário</h1>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.cadastrar}>
          <label>Nome: </label>
          <input type="text" value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})}/> <br/>
          <label>Email: </label>
          <input type="email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/> <br/>
          <label>Senha: </label>
          <input type="password" value={this.state.senha} onChange={(event) => this.setState({senha: event.target.value})}/> <br/>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default App;
*/

/*  Projeto biscoito da sorte:
import React, {Component} from 'react';
import './estilo.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      textoFrase: ''
    };
    this.quebraBiscoito = this.quebraBiscoito.bind(this);
    this.frases = ['Siga os bons e aprenda com eles.', 
    'O bom-senso vale mais do que muito conhecimento.', 
    'O riso é a menor distância entre duas pessoas.', 
    'Deixe de lado as preocupações e seja feliz.',
    'Realize o óbvio, pense no improvável e conquiste o impossível.',
    'Acredite em milagres, mas não dependa deles.',
    'A maior barreira para o sucesso é o medo do fracasso.']
  }

  quebraBiscoito(){
    let state = this.state
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
    state.textoFrase = '" ' + this.frases[numeroAleatorio] + ' "';
    this.setState(state);
  }

  render(){
    return(
      <div className="container">
        <img src={require('./assets/biscoito.png')} className="img"/>
        <Botao nome="Abrir biscoito" acaoBtn={this.quebraBiscoito}/>
        <h3 className="textoFrase">{this.state.textoFrase}</h3>
      </div>
    );
  }
}

class Botao extends Component{
  render(){
    return(
      <div>
        <button onClick={this.props.acaoBtn}>{this.props.nome}</button>
      </div>
    )
  }
}

export default App;
*/

/*  Projeto cronometro:
import React, {Component} from 'react';
import './estilo.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      numero: 0,
      botao: 'VAI'
    };
    this.timer = null;
    this.vai = this.vai.bind(this);
    this.limpar = this.limpar.bind(this);
  }

  vai(){
    let state = this.state;
    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
      state.botao = 'VAI';
    }else{
      this.timer = setInterval(() => {
        let state = this.state;
        state.numero += 0.1;
        this.setState(state);
      }, 100);
      this.state.botao = 'PAUSAR';
    }
    this.setState(state);
  }
  limpar(){
    if(this.timer !== null){
      clearInterval(this.timer);
      this.timer = null;
    }
    let state = this.state;
    state.numero = 0;
    state.botao = 'VAI';
    this.setState(state);
  }

  render(){
    return(
      <div className="container">
        <img src={require('./assets/cronometro.png')} className="img"/>
        <a className="timer">{this.state.numero.toFixed(1)}</a>
        <div className="areaBtn">
        <a className="botao" onClick={this.vai}>{this.state.botao}</a>
        <a className="botao" onClick={this.limpar}>LIMPAR</a>
        </div>
      </div>
    );
  }
}

export default App;
*/




/*  Api react hooks (useState):
import React, { useState } from 'react';

function App(){

  const [tarefas, setTarefas] = useState([
    'Pagar a conta de luz',
    'Estudar React Hooks'
  ]);
  const [input, setInput] = useState('');

  function handleAdd(){
    setTarefas([...tarefas, input])
    setInput('');
  }

  return (
    <div>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>

      <input type="text" value={input} onChange={e => setInput(e.target.value)}/>    
      <button type="button" onClick={handleAdd}>Adicionar</button>

    </div>
  );
}

export default App;
*/

/*  Api react hooks (useEffect) substitui os ciclos de vida dos componentes:
import React, { useState, useEffect } from 'react';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');

  useEffect(()=>{
    const tarefasStorage = localStorage.getItem('tarefas');

    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }

  }, []);

  useEffect(()=> {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function handleAdd(){
    setTarefas([...tarefas, input])
    setInput('');
  }

  return (
    <div>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>

      <input type="text" value={input} onChange={e => setInput(e.target.value)}/>    
      <button type="button" onClick={handleAdd}>Adicionar</button>

    </div>
  );
}

export default App;
*/

/*  Api react hooks (useMemo):
import React, { useState, useEffect, useMemo } from 'react';


function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');


  useEffect(()=>{
    const tarefasStorage = localStorage.getItem('tarefas');

    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }

  }, []);


  useEffect(()=> {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);


  function handleAdd(){
    setTarefas([...tarefas, input])
    setInput('');
  }

  const totalTarefas = useMemo(()=> tarefas.length, [tarefas]);

  return (
    <div>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      <br/>    
      <strong>Você tem {totalTarefas} tarefas!</strong><br/>
      <input type="text" value={input} onChange={e => setInput(e.target.value)}/>    
      <button type="button" onClick={handleAdd}>Adicionar</button>

    </div>
  );
}

export default App;
*/

/*  Api react hooks (useCallback):
import React, { useState, useEffect, useMemo, useCallback } from 'react';


function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');


  useEffect(()=>{
    const tarefasStorage = localStorage.getItem('tarefas');

    if(tarefasStorage){
      setTarefas(JSON.parse(tarefasStorage));
    }

  }, []);


  useEffect(()=> {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);


  const handleAdd = useCallback(() => {
    setTarefas([...tarefas, input]);
    setInput('');
  }, [input, tarefas]);

  const totalTarefas = useMemo(()=> tarefas.length, [tarefas]);

  return (
    <div>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
      <br/>    
      <strong>Você tem {totalTarefas} tarefas!</strong><br/>
      <input type="text" value={input} onChange={e => setInput(e.target.value)}/>    
      <button type="button" onClick={handleAdd}>Adicionar</button>

    </div>
  );
}

export default App;
*/
