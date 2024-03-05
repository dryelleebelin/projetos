//usuários não logados podem acessar - visitantes
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function canSSRGuest<P>(fn: GetServerSideProps<P>){  //"P" = tipo
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)  //acessando do lado do servidor
        //se o usuário tentar acessar a página porém já tem um login salvo, redirecionamos
        if(cookies['@nextauth.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false  //para dizer que não é pra sempre que isso vai acontecer
                }
            }
        }

        return await fn(ctx)
    }
}