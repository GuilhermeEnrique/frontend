import Head from "next/head";
import React, { useContext, FormEvent, useState } from "react";
import Image from "next/image";
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/Icon-Dice-Roll.svg';

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import Link from 'next/link';
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email == '' || password == '') {
      toast.warn("Preencha os dados corretamente!", {
        theme: "colored"
      })
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Dice-Roll - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <div className={styles.logo}>
          <Image className="img" src={logoImg} alt="Logo Dice Roll" />
          <p className={styles.title}>Crie personagens facilmente, organize suas campanhas, seu inventários e atributos e tenha seus dados na sua tela.</p>
        </div>
        <div className={styles.login}>
          <h1 className={styles.titleLogin}>Login</h1>
          <p className={styles.subtitleLogin}>Digite seu endereço de e-mail e senha para acessar sua conta</p>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link href="/reset-password" className={styles.text}>
              Esqueceu sua senha?
            </Link>
            <Button
              type="submit"
              loading={loading}
            >
              Entrar
            </Button>
            <Link href="/cadastrar" className={styles.text}>
              Não tem uma conta? Cadastre-se
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {

    }
  }

})