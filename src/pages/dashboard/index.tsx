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
            <div className={styles.containerCenter}>
                <Header />
                <main className={styles.container}>
                    <Link className={styles.personagem} href='/personagens'>
                        <span>Fichas <br />de<br />personagens</span>
                    </Link>
                    <Link className={styles.campanhas} href='/campanhas'>
                        <span>
                            Campanhas
                        </span>
                    </Link>
                    <Link className={styles.dados} href='/dados'>
                        <span>
                            Dados
                        </span>
                    </Link>
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