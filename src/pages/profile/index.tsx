import Head from "next/head"
import { Header } from "../../components/Header"
import { FiCamera } from "react-icons/fi";
import { Input, TextArea } from "../../components/ui/Input"
import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonCancel } from "../../components/ui/ButtonCancel"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import styles from './styles.module.scss'
import Link from "next/link"
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

type UserProps = {
    id: string,
    title: string,
    description: string,
    banner: string
}

interface AboutProps {
    usuarios: UserProps[];
}

export default function Profile({ usuarios }: AboutProps) {

    const [name, setName] = useState('')
    const [biografia, setBiografia] = useState('')
    const [email, setEmail] = useState('')
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

            if (name === '' || biografia === '' || email === '') {
                toast.error("Preencha todos os campos")
                return
            }

            data.append('name', name)
            data.append('biografia', biografia)
            data.append('email', email)
            data.append('file', imageAvatar)
            const apiClient = setupAPIClient();
            await apiClient.put('/users', data)
            toast.success("Usuário criado")
        } catch (err) {
            console.log(err);
            toast.error("Ops, algo deu errado")
        }

    }
    return (
        <>
            <Head>
                <title>Perfil - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter}>
                <Header />
                <div className={styles.title}>
                    <h2>Perfil</h2>
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
                            placeholder="Nome"
                            type="text"
                            value={''}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextArea
                            placeholder="Biografia"
                            value={''}
                            onChange={(e) => setBiografia(e.target.value)}
                        />
                        <Input
                            placeholder="Email"
                            type="text"
                            value={''}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={styles.buttons}>
                            <Link href="/trocar-senha">
                                <ButtonEdit>
                                    Trocar de senha
                                </ButtonEdit>
                            </Link>
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/about');

    console.log(response.data)
    return {
        props: {
            usuario: response.data
        }
    }
})