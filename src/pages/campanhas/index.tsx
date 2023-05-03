import Head from "next/head"
import { FormEvent, useState } from 'react'
import { Header } from "../../components/Header"
import { FiPlusCircle } from "react-icons/fi";
import { Input } from "../../components/ui/Input"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { setupAPIClient } from "../../services/api"
import { FiRefreshCcw } from "react-icons/fi";
import styles from './styles.module.scss'
import Link from "next/link"
import { toast } from "react-toastify"
import { canSSRAuth } from "../../utils/canSSRAuth";

type CampanhaProps = {
    id: string,
    title: string,
    description: string,
    banner: string
}

interface CampanhasProps {
    campanhas: CampanhaProps[];
}

export default function Campanhas({ campanhas }: CampanhasProps) {
    const [campanhaList, setCampanhaList] = useState(campanhas || [])

    function handleOpenModalView(id: string){
        alert("id clicado " + id)
    }
    return (
        <>
            <Head>
                <title>Campanhas - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter}>
                <Header />
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h2>Suas campanhas</h2><span> <FiRefreshCcw /> </span>

                    </div>
                    <div className={styles.form}>
                        <div className={styles.campanha}>
                            <article className={styles.listCampanhas}>
                                {campanhaList.map(item => (
                                    <section className={styles.campanha}>
                                        <button onClick={()=> handleOpenModalView(item.id)}>
                                            <div className={styles.tag}></div>
                                            <span>{item.title}</span>
                                        </button>
                                    </section>
                                ))}
                            </article>

                            <Link href="/criar-campanha">
                                <ButtonEdit>
                                    <FiPlusCircle className={styles.icon} /> <br />
                                    Criar campanha
                                </ButtonEdit>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/campanha');

    // console.log(response.data);
    return {
        props: {
            campanhas: response.data
        }
    }
})