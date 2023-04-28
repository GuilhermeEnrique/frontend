import Head from "next/head"
import { FormEvent, useState } from 'react'
import { Header } from "../../components/Header"
import { FiPlusCircle } from "react-icons/fi";
import { Input } from "../../components/ui/Input"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { setupAPIClient } from "../../services/api"
import styles from './styles.module.scss'
import Link from "next/link"
import { toast } from "react-toastify"
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Campanhas() {

    return (
        <>
            <Head>
                <title>Campanhas - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter}>
                <Header />

                <main className={styles.container}>
                    <div className={styles.title}>
                        <h2>Seu personagem</h2>
                    </div>
                    <form className={styles.form}>
                        <div className={styles.campanha}>
                            <Link href="/criar-personagem">
                                <ButtonEdit>
                                    <FiPlusCircle className={styles.icon} /> <br />
                                    Criar personagem
                                </ButtonEdit>
                            </Link>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
})