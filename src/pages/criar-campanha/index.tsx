import Head from "next/head"
import styles from './styles.module.scss'
import Link from "next/link"
import { ButtonCancel } from "../../components/ui/ButtonCancel"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { ChangeEvent, FormEvent, useState } from 'react'
import { FiCamera } from "react-icons/fi"
import { Header } from "../../components/Header"
import { Input, TextArea } from "../../components/ui/Input"
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"

export default function Campanhas() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
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

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (title === '' || description === '' || imageAvatar === null) {
                toast.error("Preencha todos os campos");
                return
            }

            data.append('title', title);
            data.append('description', description);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/campanha', data)
            toast.success("Campanha criada com sucesso!")
        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao cadastrar. . . ");
        }

        setTitle('');
        setDescription('');
        setAvatarUrl(null);
        setImageAvatar(null);
    }

    return (
        <>
            <Head>
                <title>Campanhas - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter} >
                <Header />
                <div className={styles.title}>
                    <h2>Criar campanha</h2>
                </div>
                <main className={styles.container}>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <label className={styles.labelAvatar}>
                            <span>
                                <FiCamera className={styles.icon} />
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
                        </label>
                        <Input
                            placeholder="Título"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextArea
                            placeholder="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <ButtonSave type="submit">
                            Salvar
                        </ButtonSave>
                        <Link href="/campanhas">
                            <ButtonCancel>
                                Cancelar
                            </ButtonCancel>
                        </Link>
                    </form>
                </main>
            </div >
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {
        }
    }
})