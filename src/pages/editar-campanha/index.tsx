import { FiCamera } from "react-icons/fi";
import { Header } from "../../components/Header";
import { ButtonCancel } from "../../components/ui/ButtonCancel";
import { ButtonSave } from "../../components/ui/ButtonSave";
import { Input, TextArea } from "../../components/ui/Input";
import styles from './styles.module.scss'
import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import { canSSRAuth } from "../../utils/canSSRAuth";
import Link from "next/link";
import router from "next/router";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";


type CampanhaProps = {
    id: string;
    title: string;
    description: string;
    banner: string;
}

interface CampanhasProps {
    campanhas: CampanhaProps[];
}


export default function EditarCampanha({ campanhas }: CampanhasProps) {
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
        console.log(title, description)
        try {
            const data = new FormData();

            if (title === '' || description === '' || imageAvatar === null) {
                toast.error("Preencha todos os campos");
                return
            }
            data.append('id', campanhas[0].id)
            data.append('title', title);
            data.append('description', description);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.put('/campanha/:id', data)
            toast.success("Campanha criada com sucesso!")
            window.location.reload();
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
                    <h2>Editar sua campanha</h2>
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
                                    alt="Banner da campanha"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>
                        <Input
                            placeholder={campanhas[0].title}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextArea
                            placeholder={campanhas[0].title}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className={styles.buttons}>
                            <ButtonSave type="submit">
                                Salvar
                            </ButtonSave>
                            <Link href="/campanhas">
                                <ButtonCancel>
                                    Cancelar
                                </ButtonCancel>
                            </Link>
                        </div>
                    </form>
                </main>
            </div >
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