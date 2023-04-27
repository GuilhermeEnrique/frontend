import styles from './styles.module.scss'
import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function FichaPersonagem() {
    return (
        <>
            <Head>
                <title>Sobre nós - Dice-Roll</title>
            </Head>
            <div>
                <Header />
                <div className={styles.container}>
                <h1>trocar de senha</h1>

                </div>
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