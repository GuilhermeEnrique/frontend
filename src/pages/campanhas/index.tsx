import Head from "next/head"
import Link from "next/link"
import Modal from 'react-modal';
import styles from './styles.module.scss'

import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header"
import { ModalCampanha } from "../../components/ModalCampanha";
// import { ModalCampanhaEdit } from "../../components/ModalCampanhaEdit";
import { FiPlusCircle, FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api"
import { useState } from 'react'

type CampanhaProps = {
    id: string,
    title: string,
    description: string,
    banner: string
}

interface CampanhasProps {
    campanhas: CampanhaProps[];
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

export default function Campanhas({ campanhas }: CampanhasProps) {
    const [campanhaList, setCampanhaList] = useState(campanhas || [])

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

    async function handleExclusaoCampanha(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.delete('/campanha/delete', {
            params: {
                campanhasId: id,
            }
        })

        const response = await apiClient.get('/campanha');

        setCampanhaList(response.data);
        setModalVisible(false);
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
                        {campanhaList.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhuma campanha foi encontrada...
                            </span>
                        )}
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
                        handleExclusaoCampanha={handleExclusaoCampanha}
                        campanha={modalItem}
                    />
                )}

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