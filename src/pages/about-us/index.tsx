import Head from "next/head"
import { Header } from "../../components/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss'
import { FiInstagram, FiGithub } from "react-icons/fi";

export default function AboutUs() {
    return (
        <>
            <Head>
                <title>Sobre nós - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter}>
                <Header />
                <div className={styles.title}>
                    <h1>Sobre nós</h1>
                </div>
                <main className={styles.container}>
                    <div className={styles.dice}>
                        <img src="/Icon-Dice-Roll.svg" alt="Logo Dice Roll" className={styles.img} />
                        <span className={styles.text}>
                            O sistema Dice-Roll é um projeto de gerenciamento de mesas de RPG (Role-Playing Game) desenvolvido especialmente para jogadores de Dungeons & Dragons. Esse sistema permite aos jogadores gerenciar e organizar suas partidas de RPG de maneira fácil e intuitiva.
                        </span>
                    </div>
                    <div className={styles.desenvolvedor}>
                        <img src="desenvolvedor.jpg" alt="Guilherme Enrique" />
                        <span className={styles.text}>
                            Desenvolvedor: Guilherme Enrique
                        </span>
                        <span>
                            <button className={styles.icon}>
                                <a href="https://www.instagram.com/guierme16/" target="_blank">
                                    <FiInstagram size={50} />
                                </a>
                            </button>
                            <button className={styles.icon}>
                                <a href="https://github.com/GuilhermeEnrique" target="_blank">
                                    <FiGithub size={50} />
                                </a>
                            </button>
                        </span>
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