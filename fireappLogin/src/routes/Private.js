//passa primeiro pelo private e depois pelo admin
import {useState, useEffect} from 'react';
import {auth} from '../firebaseConnection';
import {onAuthStateChanged} from 'firebase/auth';  //verifica se tem usuário logado
import {Navigate} from 'react-router-dom';

export default function Private({children}){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false); //não começa logado

    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }
                    localStorage.setItem("@detailUser", JSON.stringify(userData)) //transforma em string
                    setLoading(false);
                    setSigned(true);
                }else{
                    setLoading(false);
                    setSigned(false);
                }
            })
        }
        checkLogin();
    }, [])
    if(loading){
        return(
            <div></div>
        )
    }
    if(!signed){ //se não estiver logado
        return <Navigate to="/"/>
    }

    return children;
}