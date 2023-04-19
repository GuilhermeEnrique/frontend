import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/Icon-Dice-Roll.svg';

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import Link from 'next/link';

export default function Home() {
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
          <form>
            <Input
              placeholder="Digite seu email"
              type="text"
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
            />
            <Link href="/reset-password" className={styles.text}>
              Esqueceu sua senha?
            </Link>
            <Button
              type="submit"
              loading={false}
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
