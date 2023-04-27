import Head from "next/head";
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Dados() {
    return (
        <>
            <Head>
                <title>Dados - Dice-Roll</title>
            </Head>
            <div>
                <Header />
                <h1>Dados</h1>
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