import Head from "next/head";  //mudar título da página
import styles from '../../../styles/home.module.scss'
import logoImg from '../../../public/logo.svg'
import Image from 'next/image'
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { useState, FormEvent, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const {signUp} = useContext(AuthContext)

    async function handleSignUp(event: FormEvent){
        event.preventDefault()

        if(name === '' || email === '' || password === ''){
            toast.warning("Preencha todos os campos!")
            return
        }

        setLoading(true)

        let data = {name, email, password}

        await signUp(data)

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro agora!</title>
            </Head>

            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSignUp}>
                        <Input type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)}/>
                        <Input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <Button type="submit" loading={loading}>Cadastrar</Button>
                    </form>
                </div>

                <Link href={`/`}>
                    <p className={styles.text}>Já possui uma conta? Faça login!</p>
                </Link>
            </div>
        </>
    );
}
