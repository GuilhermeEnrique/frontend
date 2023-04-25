import Head from "next/head";
import React, { FormEvent, useState, useContext } from "react";
import Image from "next/image";
import styles from '../../../styles/home.module.scss';

import logoImg from '../../../public/Icon-Dice-Roll.svg';

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

import Link from 'next/link';

export default function Cadastrar() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false);

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.warn("Preencha os dados corretamente!", {
                theme: "colored"
            })
            return;
        }
        setLoading(true);

        let data = {
            name,
            email,
            password
        }

        await signUp(data)

        setLoading(false)
    }

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
                    <form onSubmit={handleSignUp}>
                        <Input
                            className={styles.inputCadastro}
                            placeholder="Digite seu nome de usuário"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            className={styles.inputCadastro}
                            placeholder="Digite seu email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            className={styles.inputCadastro}
                            placeholder="Digite sua senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            loading={loading}
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
