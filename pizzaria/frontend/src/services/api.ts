import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined){  //ctx = contexto
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers:{  //em rotas logadas passa o Bearer com o token - cabeçalho
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {  //middle //callbacks
        return response
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            //qualquer erro 401 (não autorizado) devemos deslogar o usuário
            if(typeof window !== undefined){
                //chamar função para deslogar o usuário
                signOut()
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }
        return Promise.reject(error)
    })
    return api
}