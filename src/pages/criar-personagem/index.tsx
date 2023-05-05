import Head from "next/head";
import styles from './styles.module.scss'
import Link from "next/link";
import { ButtonCancel } from "../../components/ui/ButtonCancel";
import { ButtonSave } from "../../components/ui/ButtonSave";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input, TextArea } from "../../components/ui/Input";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import Campanhas from "../campanhas";

type CampanhaProps = {
    id: string;
    title: string;
}

type UsuarioProps = {
    id: string;
    name: string;
}
interface AboutProps {
    userList: UsuarioProps[];
    campanhaList: CampanhaProps[];
}


export default function FichaDePersonagem({ userList, campanhaList }: AboutProps) {
    console.log(campanhaList)
    const [level, setLevel] = useState('')
    const [life, setLife] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [race, setRace] = useState('')
    const [classe, setClasse] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const [campanhas, setCampanha] = useState(campanhaList || [])
    const [campanhaSelected, setCampanhaSelected] = useState(0)

    const [usuarios, setUsuario] = useState(userList || [])
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

    //Quando você seleciona uma nova campanha na lista
    function handleChangeCampanha(event) {
        setCampanhaSelected(event.target.value)
    }

    function handleChangeUser(event) {
        setUsuarioSelected(event.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (name === '' || imageAvatar === null || description === '' || classe === '' || race === '' || life === '' || level === '') {
                toast.error("Ops! Preenchas os campos");
                return
            }

            data.append('name', name);
            data.append('description', description);
            data.append('classe', classe);
            data.append('race', race);
            data.append('file', imageAvatar);
            data.append('level', level);
            data.append('life', life);
            data.append('campanhasId', campanhas[campanhaSelected].id);
            data.append('userId', usuarios[campanhaSelected].id);

            const apiClient = setupAPIClient();

            await apiClient.post('/personagem', data)
            toast.success('Cadastrado com sucesso!')
        } catch (err) {
            console.log(err);
            toast.error("Ops! Erro ao cadastrar. . .");
        }

        setName('')
        setDescription('')
        setClasse('')
        setRace('')
        setLife('')
        setLevel('')
        setAvatarUrl(null)
        setImageAvatar(null)
    }

    return (
        <>
            <Head>
                <title>Ficha de Personagem - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter} >
                <Header />
                <div className={styles.title}>
                    <h2>Criar personagem</h2>
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

                        <select value={usuarioSelected} className={styles.select} onChange={handleChangeCampanha}>
                            {usuarios.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <select value={usuarioSelected} onChange={handleChangeUser}>
                            {campanhas.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.title}
                                    </option>
                                )
                            })}
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
                            <Link href="/">
                                <ButtonCancel>
                                    Cancelar
                                </ButtonCancel>
                            </Link>
                        </div>

                    </form >
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/campanha');
    const responseUser = await apiClient.get('/about');
    // console.log(response.data)
    // console.log(responseUser.data)

    return {
        props: {
            campanhaList: response.data,
            userList: responseUser.data
        }
    }
})
