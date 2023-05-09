import Head from "next/head"
import Link from "next/link"
import Modal from 'react-modal';
import styles from './styles.module.scss'

import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header"
import { ModalPersonagem } from "../../components/ModalPersonagem";
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

export type PersonagemItemProps = {
    id: string,
    name: string,
    description: string,
    banner: string,
    classe: string,
    race: string,
    level: string,
    life: string,
    userId: string,
    campanhasId: string,
    campanhas: {
        id: string,
        title: string
    }

}

export default function Personagem({ personagem }: AboutProps) {

    const [personagemList, setPersonagemList] = useState(personagem || [])

    const [modalItem, setModalItem] = useState<PersonagemItemProps[]>()
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleRefresh() {
        setRefreshing(true);
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/campanha/personagens');
        setPersonagemList(response.data);
        setRefreshing(false);
    }

    async function handleOpenModalView(id: string) {

        const apiClient = setupAPIClient();

        const response = await apiClient.get('/campanha/personagens', {
            params: {
                id: id,
            }
        })
        console.log(response.data)
        setModalItem(response.data);
        setModalVisible(true);

    }

    Modal.setAppElement('#__next');

    async function handleExclusaoPersonagem(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.delete('/campanha/personagens/delete', {
            params: {
                personagemId: id,
            }
        })

        const response = await apiClient.get('/campanha/personagens/');

        setPersonagemList(response.data);
        setModalVisible(false);
    }

    return (
        <>
            <Head>
                <title>Personagens - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter} >
                <Header />
                <main className={styles.container}>
                    <div className={styles.title}>
                        <h2>Seus personagens</h2>
                        <button onClick={handleRefresh} disabled={refreshing}>
                            {refreshing ? 'Atualizando...' : <FiRefreshCcw size={30} />}
                        </button>
                    </div>
                    <div className={styles.personagens}>
                        <article className={styles.listPersonagens}>
                            {personagemList.map(item => (
                                <section key={item.id} className={styles.selectPersonagens}>
                                    <button onClick={() => handleOpenModalView(item.id)} >
                                        <span>{item.name}</span>
                                    </button>
                                </section>
                            ))}
                        </article>

                        <Link href="/criar-personagem">
                            <ButtonEdit>
                                <FiPlusCircle className={styles.icon} /> <br />
                                Criar personagem
                            </ButtonEdit>
                        </Link>
                    </div>
                </main>

                {modalVisible && (
                    <ModalPersonagem
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        personagem={modalItem}
                        handleExclusaoPersonagem={handleExclusaoPersonagem}
                    />
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/campanha/personagens');

    console.log(response.data);
    return {
        props: {
            personagens: response.data
        }
    }
})