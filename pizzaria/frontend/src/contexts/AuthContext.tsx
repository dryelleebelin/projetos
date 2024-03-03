import { createContext, ReactNode, useState } from "react";
import { destroyCookie } from "nookies";  //limpar cookies
import Router from "next/router";  //mandar o usuário para uma rota de forma indireta

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
    signOut: () => void
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
        console.log("dados para logar", email)
        console.log("senha", password)
    }
    
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>  {/* renderiza as páginas */}
            {children}
        </AuthContext.Provider>
    )
}