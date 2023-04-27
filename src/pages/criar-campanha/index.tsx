import Head from "next/head"
import { FormEvent, useState } from 'react'
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonCancel } from "../../components/ui/ButtonCancel"
import { setupAPIClient } from "../../services/api"
import styles from './styles.module.scss'
import Link from "next/link"
import { toast } from "react-toastify"

export default function Campanhas() {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (titulo === '') {
            return
        }
        const apiClient = setupAPIClient();
        await apiClient.post('/campanha', {
            titulo: titulo,
            descricao: descricao
        })

        toast.success("Campanha criada com sucesso!")
        setTitulo('');
        setDescricao('');
    }


    return (
        <>
            <Head>
                <title>Campanhas - Dice-Roll</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.title}>
                        <h2>Criar campanha</h2>
                    </div>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <div className={styles.campanha}>
                            <Input
                                placeholder="Título"
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <Input
                                className={styles.input}
                                placeholder="Descrição"
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                            <ButtonSave type="submit">
                                Salvar
                            </ButtonSave>
                            <Link href="/">
                                <ButtonCancel>
                                    Cancelar
                                </ButtonCancel>
                            </Link>

                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}