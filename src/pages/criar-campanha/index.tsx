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

    // Função para lidar com a seleção de um arquivo de imagem
    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        // Verifica se existem arquivos selecionados
        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];

        if (!image) {
            return;
        }
        // Verifica se o tipo de arquivo é imagem JPEG ou PNG
        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }
    }
    // Função para lidar com o envio do formulário de registro da campanha
    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();
            // Verifica se o título, descrição e imagem do avatar foram preenchidos
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
        // Limpa os campos após o registro da campanha
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
                                    alt="Banner da campanha"
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
    return {
        props: {
        }
    }
})