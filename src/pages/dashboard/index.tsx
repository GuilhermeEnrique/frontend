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
                    <article className={styles.dashboard}>
                        <section className={styles.personagem}>
                            <Link href='/personagens'>
                                <span>Fichas de personagens</span>
                            </Link>
                        </section>

                        <section className={styles.campanhas}>
                            <Link href='/campanhas'>
                                <span>
                                    Campanhas
                                </span>
                            </Link>
                        </section>

                        <section className={styles.dados}>
                            <Link href='/dados'>
                                <span>
                                    Dados
                                </span>
                            </Link>
                        </section>
                    </article>
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