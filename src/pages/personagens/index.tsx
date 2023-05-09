import { useState } from "react";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";
import styles from './styles.module.scss';
import Link from "next/link";
import Modal from 'react-modal';
import { Header } from "../../components/Header";
import { FiPlusCircle, FiRefreshCcw } from "react-icons/fi";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { ModalPersonagem } from "../../components/ModalPersonagem";

type PersonagemProps = {
    id: string,
    name: string,
    description: string,
    banner: string
}

interface PersonagensProps {
    personagens: PersonagemProps[];
}

export type PersonagemItemProps = {
    id: string;
    name: string;
    description: string;
    banner: string;
    race: string;
    level: string;
    classe: string;
    life: string
    User: {
        id: string
        name: string;
    };
    campanhas: {
        id: string;
        title: string;
    }
}

export default function Personagens({ personagens }: PersonagensProps) {
    const [personagemList, setPersonagemList] = useState(personagens || [])

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
                userId: id,
            }
        })
        console.log(response.data)
        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleExclusaoPersonagem(id: string) {
        const apiClient = setupAPIClient();
        await apiClient.delete('/campanha/personagens/delete', {
            params: {
                personagemId: id,
            }
        })

        const response = await apiClient.get('/personagens');

        setPersonagemList(response.data);
        setModalVisible(false);
    }
    Modal.setAppElement('#__next');
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
                        {personagemList.length === 0 && (
                            <span className={styles.emptyList}>
                                Nenhum personagem foi encontrado...
                            </span>
                        )}
                        <article className={styles.listPersonagens}>
                            {personagemList.map(item => (
                                <section key={item.id} className={styles.selectPersonagens}>
                                    <button onClick={() => handleOpenModalView(item.id)} >
                                        <span>{item.name}</span>
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
                    <ModalPersonagem
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        handleExclusaoPersonagem={handleExclusaoPersonagem}
                        personagem={modalItem}
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