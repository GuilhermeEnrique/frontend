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

type PersonagemProps = {
    id: string;
    name: string;
    description: string;
    classe: string;
    race: string;
    banner: string;
    level: string;
    life: string;
    campanhasId: string
    userId: string;
    Users: {
        id: string
        name: string;
    };
    campanhas: {
        id: string;
        title: string;
    }
}


interface PersonagensProps {
    personagens: PersonagemProps[];
}

export default function EditarCampanha({ personagens }: PersonagensProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [race, setRace] = useState('')
    const [level, setLevel] = useState('')
    const [life, setLife] = useState('')
    const [classe, setClasse] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const [campanhas, setCampanha] = useState(personagens[0].campanhas.title || [])
    const [campanhaSelected, setCampanhaSelected] = useState(0)

    const [usuarios, setUsuario] = useState(personagens[0].Users.name || [])
    const [usuarioSelected, setUsuarioSelected] = useState(0)

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

    function handleChangeCampanha(event) {
        setCampanhaSelected(event.target.value)
    }

    function handleChangeUser(event) {
        setUsuarioSelected(event.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        console.log(name, description)
        try {
            const data = new FormData();

            if (name === '' || description === '' || imageAvatar === null) {
                toast.error("Preencha todos os campos");
                return
            }
            data.append('id', '')
            data.append('title', name);
            data.append('description', description);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.put('/campanha/personagens/:id', data)
            toast.success("Campanha criada com sucesso!")
            window.location.reload();
        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao cadastrar. . . ");
        }

        setName('');
        setDescription('');
        setAvatarUrl(null);
        setImageAvatar(null);
    }

    return (
        <>
            <Head>
                <title>Editar personagem - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter} >
                <Header />
                <div className={styles.title}>
                    <h2>Editar seu personagem</h2>
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
                        <select value={usuarioSelected} className={styles.select} onChange={handleChangeCampanha}>
                            <option>
                                {personagens[0].name}
                            </option>
                        </select>

                        <select value={usuarioSelected} className={styles.select} onChange={handleChangeUser}>
                            <option >
                                {personagens[0].campanhas.title}
                            </option>
                        </select>

                        <Input
                            type="number"
                            placeholder="Pontos de vida"
                            value={life}
                            onChange={(e) => setLife(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Nível"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Nome do personagem"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextArea
                            placeholder="Descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Raça"
                            value={race}
                            onChange={(e) => setRace(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Classe"
                            value={classe}
                            onChange={(e) => setClasse(e.target.value)}
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
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get(`/campanha/personagens`);
    const personagens = response.data;

    return {
        props: {
            personagens,
        },
    };
});
