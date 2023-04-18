import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from '../../styles/home.module.scss';

import logoImg from '../../public/Icon-Dice-Roll.svg';

import { Input } from "../components/ui/input";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dice-Roll - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className="img" src={logoImg} alt="Logo Dice Roll" />

        <div className={styles.login}>
          <form>
            <Input
            placeholder="Digite seu email"
            type="text"
            />
          
            <Input
            placeholder="Digite sua senha"
            type="password"
            />
          </form>
        </div>
      </div>
    </>
  )
}
