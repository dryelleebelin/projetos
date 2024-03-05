import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";  //limpar cookies
import Router from "next/router";  //mandar o usuário para uma rota de forma indireta
import { api } from "../services/apiClient";
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string
    name: string
    email: string
}

type SignInProps = {
    email: string
    password: string
}

type SignUpProps = {
    name: string
    email: string
    password: string
}

type AuthPoviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('Erro ao deslogar.')
    }
}

export function AuthProvider({children}: AuthPoviderProps){ 
    const [user, setUser] = useState<UserProps>()  //vai respeitar a tipagem
    const isAuthenticated = !!user  //com base no user  //converter a variável em boolean

    async function signIn({email, password}: SignInProps) {  //async -> promise
        try{
            const response = await api.post('/session', {
                email,
                password
            })
            //console.log(response.data)
            const {id, name, token} = response.data
            setCookie(undefined, '@nextauth.token', token, {  //passar: contexto, qual cookie quer salvar, o que quer salvar + propriedades
                maxAge: 60 * 60 * 24 * 30, //tempo de expiração - 1 mês
                path: "/"  //quais caminhos terão acesso ao cookie - todos
            })
            setUser({
                id,
                name,
                email
            })
            //passar para as próximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            toast.success("Logado com sucesso!")
            Router.push('/dashboard')
        } catch(err){
            toast.error("Erro ao acessar!")
            console.log("Erro ao acessar ", err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('users', {
                name,
                email,
                password
            })

            toast.success("Conta criada com sucesso!")

            Router.push('/')

        } catch(err){
            toast.error("Erro ao cadastrar!")
            console.log("Erro ao se cadastrar ", err)
        }
    }
    
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>  {/* renderiza as páginas */}
            {children}
        </AuthContext.Provider>
    )
}