import Head from "next/head";  //mudar título da página
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'
import Image from 'next/image'
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, FormEvent, useState, use } from "react";
import { toast } from "react-toastify";

export default function Home(){
  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault()

    if(email === '' || password === ''){
      toast.warning("Preencha todos os campos!")
      return
    }

    setLoading(true)

    let data = {
      email,
      password
    }
    await signIn(data)

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>
        
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" loading={loading}>Acessar</Button>
          </form>
        </div>

        <Link href={`/signup`}>
          <p className={styles.text}>Não possui uma conta? Cadastre-se</p>
        </Link>
      </div>
    </>
  );
}
