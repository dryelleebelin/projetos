import Head from "next/head";  //mudar título da página
import styles from '../../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'
import Image from 'next/image'
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";

export default function SignUp() {
    return (
        <>
            <Head>
                <title>Faça seu cadastro agora!</title>
            </Head>

            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form>
                        <Input type="text" placeholder="Digite seu nome"/>
                        <Input type="text" placeholder="Digite seu email"/>
                        <Input type="password" placeholder="Digite sua senha"/>
                        <Button type="submit" loading={false}>Cadastrar</Button>
                    </form>
                </div>

                <Link href={`/`}>
                    <p className={styles.text}>Já possui uma conta? Faça login!</p>
                </Link>
            </div>
        </>
    );
}
