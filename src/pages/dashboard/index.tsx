import { canSSRAuth } from "../../utils/canSSRAuth"
import { Header } from "../../components/Header"
import styles from './styles.module.scss'
import Head from "next/head"
import Link from "next/link"

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Inicio - Dice-Roll</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <div>
                        <Link className={styles.campanhas} href='/campanhas'>
                            Campanhas
                        </Link>
                        <Link className={styles.personagem} href='/ficha-de-personagem'>
                            Fichas de personagens
                        </Link>
                        <Link className={styles.dados} href='/dados'>
                            Dados
                        </Link>
                    </div>
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