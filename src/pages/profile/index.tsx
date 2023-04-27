import Head from "next/head"
import { Header } from "../../components/Header"
import { FiCamera } from "react-icons/fi";
import { Input, TextArea } from "../../components/ui/Input"
import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonCancel } from "../../components/ui/ButtonCancel"
import { canSSRAuth } from "../../utils/canSSRAuth"
import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import Link from "next/link"

export default function Profile() {
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
                <title>Perfil - Dice-Roll</title>
            </Head>
            <div>
                <Header />
                <div className={styles.title}>
                    <h2>Perfil</h2>
                </div>
                <main className={styles.container}>

                    <form className={styles.form} encType="multipart/form-data">
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
                        </label>
                        <Input
                            placeholder="Nome"
                            type="text"
                        />
                        <TextArea
                            placeholder="Biografia"
                        />
                        <Input
                            placeholder="Email"
                            type="text"
                        />
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
                    </form>
                </main>
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