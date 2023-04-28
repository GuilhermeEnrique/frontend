import Head from "next/head"
import { ChangeEvent, FormEvent, useState } from 'react'
import { Header } from "../../components/Header"
import { Input, TextArea } from "../../components/ui/Input"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonCancel } from "../../components/ui/ButtonCancel"
import { setupAPIClient } from "../../services/api"
import styles from './styles.module.scss'
import Link from "next/link"
import { toast } from "react-toastify"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { FiCamera } from "react-icons/fi"

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

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    return (
        <>
            <Head>
                <title>Campanhas - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter}>
                <form className={styles.form} onSubmit={handleRegister}>
                    <div className={styles.Header}>
                        <Header />
                        <h2>Criar campanha</h2>
                    </div>
                    <div className={styles.Avatar}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiCamera className={styles.icon} />
                                <p className={styles.dica}>Tamanho recomendado: 535 x 278 </p>
                            </span>
                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
                            {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do usuário"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label></div>
                    <div className={styles.Form}><Input
                        placeholder="Título"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                        <TextArea
                            placeholder="Descrição"
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
                        </Link></div>
                </form>
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