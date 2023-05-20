import {useState, useEffect} from 'react';  //armazenar dados
import {db, auth} from './firebaseConnection';
import {
  doc, 
  setDoc, 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  onSnapshot  //executa em tempo real
} from 'firebase/firestore';  //setDoc/addDoc = cadastrar

import {createUserWithEmailAndPassword,
   signInWithEmailAndPassword, 
   signOut,
   onAuthStateChanged} from 'firebase/auth'; //sistema de autenticação
import './app.css';
import { async } from '@firebase/util';

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [idPost, setIdPost] = useState('');  //começa vazio

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);  //não começa logado
  const [userDetail, setUserDetail] = useState({})

  const [posts, setPosts] = useState([]);

  useEffect(() => {  //é executado quando o coponente é montado em tela
    async function loadPosts(){
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPost = [];
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
      })
      setPosts(listaPost);
    })
    }
    loadPosts();
  }, [])

  useEffect(() => {  //permanecer login
    async function checkLogin(){
      onAuthStateChanged(auth, (user) => {
        if(user){
          console.log(user)
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
          })
        } else{
          setUser(false);
          setUserDetail({})
        }
      })
    }
    checkLogin();
  }, [])

  async function handleAdd(){
    /* await setDoc(doc(db, "posts", "12345"), { //esperar requisição //criar doc novo(referencia(conexão com o firestore, caminho que quercadastrar)) + o que quer cadastrar
      titulo: titulo,
      autor: autor,
    })  
    .then(() => {  //tratamento de sucesso
      console.log("DADOS REGISTRADOS NO BANCO!")
    })
    .catch((error) => {  //tratamento de erro
      console.log("GEROU ERRO" + error)
    }) */ 
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => { 
      console.log("CADASTRADO COM SUCESSO")
      setAutor('');  //zerar os campos
      setTitulo('');  //zerar os campos
    })
    .catch((error) => {  
      console.log("ERRO " + error)
    })
  }

  async function buscarPost(){
    /*const postRef = doc(db, "posts", "Wf3ZffFnWP2FSUdcUQP0")
    await getDoc(postRef)

    .then((snapshot) => { 
      setAutor(snapshot.data().autor)
      setTitulo(snapshot.data().titulo)
    })
    .catch((error) => {  
      console.log("ERRO AO BUSCAR")
    })*/
    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
    
    .then((snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })
      setPosts(lista);
    })
    .catch((error) => {
      console.log("DEU ALGUM ERRO AO BUSCAR")
    })
  }

  async function editarPost(){
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  async function excluirPost(id){
    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)  //é uma promise, usa o then e catch
    .then(() => {
      alert("POST DELETADO COM SUCESSO!")
    })
  }

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      console.log("CADASTRADO COM SUCESSO!")
      setEmail('')
      setSenha('')
    })
    .catch((error) => {
      if(error.code === 'auth/weak-password'){
        alert("Essa senha é muito fraca.")
      }else if(error.code === 'auth/email-already-in-use'){
        alert("Esse email já existe!")
      }
    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log("USER LOGADO COM SUCESSO")
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);
      setEmail('')
      setSenha('')
    })
    .catch(() => {
      console.log("ERRO AO FAZER LOGIN")
    })
  }

  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDetail({})
  }

  return (
    <div>
      <h1>React JS + Firebase</h1>

      {user && (
        <div>
          <strong>Seja bem-vindo(a) (Você está logado(a)!)</strong><br/><br/>
          <span>ID: {userDetail.uid} <br/> Email: {userDetail.email}</span><br/><br/>
          <button onClick={fazerLogout}>Sair da conta</button>
          <br/><br/>
          <hr/>
        </div>
      )}

      <div className="container">
        <h2>Usuarios</h2>
        <label>Email</label>
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Digite um email"/><br/>
        <label>Senha</label>
        <input value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Informe sua senha"/><br/>
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Fazer login</button>
      </div>

      <br/><br/>
      <hr/>

      <div className="container">
        <h2>Posts</h2>
        <label>ID do Post:</label>
        <input placeholder='Digite o ID do post' value={idPost} onChange={(event) => setIdPost(event.target.value)}/><br/>
        <label>Titulo:</label>
        <textarea type="text" placeholder="Digite o titulo" value={titulo} onChange={(evento) => setTitulo(evento.target.value)}/>
        <label>Autor:</label>
        <input type="text" placeholder="Autor do post" value={autor} onChange={(evento) => setAutor(evento.target.value)}/>
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPost}>Buscar post</button><br/>
        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong><br/>
                <span>Titulo: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/>
                <button onClick={() => excluirPost(post.id)}>Excluir</button><br/><br/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;