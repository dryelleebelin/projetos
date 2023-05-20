import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiUser} from 'react-icons/fi';
import {useState} from 'react';

import { db } from '../../services/firebaseConnection';  //conexão
import {addDoc, collection} from 'firebase/firestore';  //o que vai usar

import {toast} from 'react-toastify';


export default function Customers(){
    const [nome, setNome] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleRegister(event){
        event.preventDefault();
        if(nome !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNome('')
                setCnpj('')
                setEndereco('')
                toast.success("Empresa registrada!")
            })
            .catch((error) => {
                console.log(error);
                toast.error("Erro ao fazer o cadastro.")
            })
        }else{
            toast.error("Preencha todos os campos!")
        }
    }

    return(
        <div>
            <Header/>
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome fantasia</label>
                        <input type="text" placeholder="Nome da empresa" 
                        value={nome} onChange={(event) => setNome(event.target.value)}/>
                        <label>CNPJ</label>
                        <input type="text" placeholder="Digite o CNPJ" 
                        value={cnpj} onChange={(event) => setCnpj(event.target.value)}/>
                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço da empresa" 
                        value={endereco} onChange={(event) => setEndereco(event.target.value)}/>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}