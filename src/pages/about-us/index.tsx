import Head from "next/head"
import { Header } from "../../components/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"

export default function AboutUs() {
    return (
        <>
            <Head>
                <title>Sobre nós - Dice-Roll</title>
            </Head>
            <div>
                <Header />
                <h1>Sobre nós</h1>
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