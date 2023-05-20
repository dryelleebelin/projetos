//context api
//controle de autenticação  //importa no app.js
import {createContext, useState, useEffect} from 'react';
import {auth, db} from '../services/firebaseConnection';  //firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';  //usar alertas
import { async } from '@firebase/util';


export const AuthContext = createContext({}); //inicializa com um objeto vazio

//provedor de contexto: (está em volta de todo o projeto)
//em todo provider precisa passar um value com as informação que os componentes podem acessar
function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);  //controlar caso demore o cadastro
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem('@ticketsPRO')
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }
            setLoading(false);
        }
        loadUser();
    }, [])

    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem-vindo(a) de volta!")
            navigate("/dashboard")
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Ops algo deu errado!");
        })
    }

    //cadastrar novo user
    async function signUp(name, email, password){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)  //a execução do código será pausada até que a função "createUserWithEmailAndPassword" seja concluída e retorne um valor.
        .then( async(value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {   //vai esperar a requisição //vai cadastrar dentro de um doc //"" = nome do doc/coleção que quer chamar, documento
                //o que vai passar pro banco:
                nome: name,
                avatarUrl: null
            })
            .then(() => {
                let data = {  //objeto
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);  //não está carregando mais nada
                toast.success("Seja bem-vindo(a) ao sistema!")  //alerta
                navigate("/dashboard")
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);  //não está carregando mais nada
        })
    }

    //armazenar informações do usuário no localStoragr
    function storageUser(data){
        localStorage.setItem('@ticketsPRO', JSON.stringify(data)) 
    }

    async function logout(){
        await signOut(auth);
        localStorage.removeItem('@ticketsPRO');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ //vai deixar ser exportado:
            signed: !!user, //!! converte pra boolean //useState: null = false
            user,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading,
            storageUser,
            setUser
        }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;