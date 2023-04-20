import Head from "next/head";
import React from "react";
import Image from "next/image";
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/Icon-Dice-Roll.svg';

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from 'next/link';

export default function Cadastrar() {
    return (
        <>
            <Head>
                <title>Dice-Roll - Faça seu cadastro agora!</title>
            </Head>
            <div className={styles.containerCenter}>
                <div className={styles.cadastro}>
                    <Image className="img" src={logoImg} alt="Logo Dice Roll" />
                    <h1 className={styles.titleCadastro}>Cadastra-se</h1>
                    <p className={styles.subtitleCadastro}>Preencha as informações para criar uma conta e inscreva-se para continuar</p>
                    <form>
                        <Input
                            className={styles.inputCadastro}
                            placeholder="Usuário"
                            type="text"
                        />

                        <Input
                            className={styles.inputCadastro}
                            placeholder="Digite seu email"
                            type="text"
                        />

                        <Input
                            className={styles.inputCadastro}
                            placeholder="Digite sua senha"
                            type="password"
                        />

                        <Button
                            className={styles.buttonCadastro}
                            type="submit"
                            loading={false}
                        >
                            Cadastrar
                        </Button>

                        <Link href="/" className={styles.textCadastro}>
                            Já tem uma conta? Entrar
                        </Link>
                    </form>
                </div>
            </div>
        </>
    )
}
