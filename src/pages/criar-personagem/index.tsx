import Head from "next/head";
import styles from './styles.module.scss'
import Link from "next/link";
import { ButtonCancel } from "../../components/ui/ButtonCancel";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { ButtonSave } from "../../components/ui/ButtonSave";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input, TextArea } from "../../components/ui/Input";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

type CampanhaProps = {
    id: string;
    titulo: string;
}

interface CampanhasProps {
    campanhaList: CampanhaProps[];
}

export default function FichaDePersonagem({ campanhaList }: CampanhasProps) {
    const [nivel, setNivel] = useState('')
    const [pontosDeVida, setPontosDeVida] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [raca, setRaca] = useState('')
    const [classe, setClasse] = useState('')

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)

    const [campanhas, setCampanha] = useState(campanhaList || [])
    const [campanhaSelected, setCampanhaSelected] = useState(0)

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
        // console.log('selecionado: ', campanhas[event.target.value])
        setCampanhaSelected(event.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {
            const data = new FormData();

            if (nome === '' || imageAvatar === null || descricao === '' || classe === '' || raca === '' || pontosDeVida === '' || nivel === '') {
                toast.error("Ops! Erro ao cadastrar. . .");
                return
            }

            data.append('pontosDeVida', pontosDeVida);
            data.append('nivel', nivel);
            data.append('nome', nome);
            data.append('descricao', descricao);
            data.append('raca', raca);
            data.append('classe', classe);
            data.append('campanhasId', campanhas[campanhaSelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/personagem', data)
            toast.success('Cadastrado com sucesso!')
        } catch (err) {
            console.log(err);
            toast.error("Ops! Erro ao cadastrar. . .");
        }

    }

    return (
        <>
            <Head>
                <title>Ficha de Personagem - Dice-Roll</title>
            </Head>
            <Header />
            <form className={styles.gridContainer} onSubmit={handleRegister}>
                <div className={styles.Header}>
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
                    <Input
                        type="number"
                        placeholder="Pontos de vida"
                        value={pontosDeVida}
                        onChange={(e) => setPontosDeVida(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Nível"
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Nome do personagem"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextArea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Raça"
                        value={raca}
                        onChange={(e) => setRaca(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="Classe"
                        value={classe}
                        onChange={(e) => setClasse(e.target.value)}
                    />
                    <select value={campanhaSelected} className={styles.input} onChange={handleChangeCampanha}>
                        {campanhas.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.titulo}
                                </option>
                            )
                        })}
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
            </form >
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/campanha');
    // console.log(response.data)

    return {
        props: {
            campanhaList: response.data
        }
    }
})