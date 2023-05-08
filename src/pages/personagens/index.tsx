import Head from "next/head"
import Link from "next/link"
import Modal from 'react-modal';
import styles from './styles.module.scss'

import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header"
import { ModalCampanha } from "../../components/ModalCampanha";
import { FiPlusCircle } from "react-icons/fi";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api"
import { useState } from 'react'

type personagemProps = {
    id: string,
    name: string,
    description: string,
    banner: string,
    classe: string,
    race: string,
    level: string,
    life: string,
    campanhasId: string,
    userId: string,
}

interface AboutProps {
    personagem: personagemProps[];
}

export type CampanhaItemProps = {
    id: string;
    title: string;
    description: string;
    banner: string;
    characters: {
        map(arg0: (character: any) => JSX.Element): import("react").ReactNode;
        id: string;
        name: string;
    }
}

export default function Campanhas({ personagem }: AboutProps) {

    const [campanhaList, setCampanhaList] = useState(personagem || [])

    const [modalItem, setModalItem] = useState<CampanhaItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleRefresh() {
        setRefreshing(true);
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/campanha');
        setCampanhaList(response.data);
        setRefreshing(false);
    }

    async function handleOpenModalView(id: string) {

        const apiClient = setupAPIClient();

        const response = await apiClient.get('/campanha', {
            params: {
                id: id,
            }
        })
        console.log(response.data)
        setModalItem(response.data);
        setModalVisible(true);

    }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Campanhas - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter} >
                <Header />
                <main className={styles.container}>
                    <div className={styles.title}>
                        <h2>Suas campanhas</h2>
                        <button onClick={handleRefresh} disabled={refreshing}>
                            {refreshing ? 'Atualizando...' : <FiRefreshCcw size={30} />}
                        </button>
                    </div>
                    <div className={styles.campanhas}>
                        <article className={styles.listCampanhas}>
                            {campanhaList.map(item => (
                                <section key={item.id} className={styles.selectCampanha}>
                                    <button onClick={() => handleOpenModalView(item.id)} >
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
                </main>

                {modalVisible && (
                    <ModalCampanha
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        campanha={modalItem}
                    />
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/campanha/personagens');

    // console.log(response.data);
    return {
        props: {
            personagens: response.data
        }
    }
})