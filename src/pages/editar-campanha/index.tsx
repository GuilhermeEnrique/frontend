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
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";


type CampanhaProps = {
    id: string;
    title: string;
    description: string;
    banner: string;
}

interface EditarCampanhaProps {
    campanha: CampanhaProps;
}

export default function EditarCampanha({ campanha }: EditarCampanhaProps) {
    const [title, setTitle] = useState(campanha.title)
    const [description, setDescription] = useState(campanha.description)
    const [avatarUrl, setAvatarUrl] = useState(campanha.banner)
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

    async function handleUpdate(event: FormEvent) {
        event.preventDefault();
        console.log(title, description)
        try {
            const data = new FormData();

            if (title === '' || description === '') {
                toast.error("Preencha todos os campos");
                return
            }

            data.append('title', title);
            data.append('description', description);

            if (imageAvatar) {
                data.append('file', imageAvatar);
            }

            const apiClient = setupAPIClient();

            await apiClient.put(`/campanha/${campanha.id}`, data)
            toast.success("Campanha atualizada com sucesso!")
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao atualizar. . . ");
        }
    }

    return (
        <>
            <Head>
                <title>Editar campanha - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter}>
                <Header />
                <div className={styles.title}>
                    <h2>Editar sua campanha</h2>
                </div>
                <main className={styles.container}>
                    <form className={styles.form} onSubmit={handleUpdate}>
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
                            placeholder={campanha.title}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextArea
                            placeholder={campanha.description}
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
            </div>
        </>
    )

}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    
    const response = await apiClient.get(`/campanha/`);
    const campanha = response.data;
    console.log(campanha)
    return {
        props: {
            campanha,
        },
    };
});
