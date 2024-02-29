import Head from "next/head";  //mudar título da página
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg' 
import Image from "next/image";  //tag img do next

export default function Home(){
  return (
    //tag vazia
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

        <div className={styles.login}>
        </div>
      </div>
    </>
  );
}
