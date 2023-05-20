/*  Eventos:
import React, {Component} from 'react';

class Membro extends Component{
    //state
    constructor(props){
        super(props);
        this.state = {
            nome: props.nome
        };
        this.entrar = this.entrar.bind(this);
    }

    entrar(nome){
        this.setState({nome: nome})
    }

    render(){
        return(
            <div>
                <h2>Bem-vindo(a) {this.state.nome}</h2>
                <button onClick={() => this.entrar('Lucas')}>
                    Entrar no sistema
                </button>
                <button onClick={() => this.setState({nome: ''})}>
                    Sair
                </button>
            </div>
        );
    }
}

export default Membro;
*/