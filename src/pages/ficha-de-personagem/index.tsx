import Head from "next/head";
import styles from './styles.module.scss'
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { ButtonSave } from "../../components/ui/ButtonSave";
import { ButtonCancel } from "../../components/ui/ButtonCancel";
import Link from "next/link";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Input, TextArea } from "../../components/ui/Input";
import { FiCamera } from "react-icons/fi";
import { ChangeEvent, useState } from "react";

export default function FichaDePersonagem() {
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
                <title>Ficha de Personagem - Dice-Roll</title>
            </Head>
            <div>
                <Header />
                <h1>Ficha de personagem</h1>
            </div>
            <main className={styles.container}>
                <form className={styles.form}>
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
                        </label>
                    </div>
                    <div className={styles.register}>
                        <Input type="number" placeholder="Pontos de vida" />
                        <Input placeholder="Nome do personagem" />
                        <TextArea placeholder="Descrição" />
                        <Input placeholder="Raça" />
                        <Input placeholder="Nível" />
                        <Input placeholder="Classe" />
                        <select>
                            <option>O retorno do rei</option>
                            <option>As Masmorras</option>
                        </select>
                    </div>
                    <div className={styles.buttons}>
                        <Link href="/">
                            <ButtonEdit>
                                Atributos
                            </ButtonEdit>
                        </Link>
                        <Link href="/">
                            <ButtonEdit>
                                Inventário
                            </ButtonEdit>
                        </Link>
                    </div>
                    <div className={styles.Salvar}>
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
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
})