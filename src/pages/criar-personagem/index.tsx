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
            <div className={styles.gridContainer}>
                <div className={styles.Header}>
                    <Header />
                    <h2>Criar personagem</h2>
                </div>
                    <div className={styles.Avatar}>
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
                    </div>
                    <div className={styles.Form}>
                        <Input type="number" placeholder="Pontos de vida" />
                        <Input placeholder="Nome do personagem" />
                        <TextArea placeholder="Descrição" />
                        <Input placeholder="Raça" />
                        <Input placeholder="Nível" />
                        <Input placeholder="Classe" /> <br />
                        <select className={styles.input}>
                            <option>O retorno do rei</option>
                            <option>As Masmorras</option>
                        </select>
                    </div>
                    <div className={styles.Buttons}>
                        <ButtonSave type="submit">
                            Salvar
                        </ButtonSave>
                        <Link href="/">
                            <ButtonCancel>
                                Cancelar
                            </ButtonCancel>
                        </Link>
                    </div>
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