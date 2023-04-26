import Head from "next/head"
import { FormEvent, useState } from 'react'
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonCancel } from "../../components/ui/ButtonCancel"
import { setupAPIClient } from "../../services/api"
import styles from './styles.module.scss'
import Link from "next/link"
import { toast } from "react-toastify"



export default function Campanhas() {
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (titulo === ''){
            return
        }
        const apiClient = setupAPIClient();
        await apiClient.post('/campanha',{
            titulo: titulo,
            descricao: descricao
        })

        toast.success("Campanha criada com sucesso!")
        setTitulo('');
        setDescricao('');
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    function handleFileInputChange(event) {
        const file = event.target.files[0];
        setSelectedFile(file);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }


    return (
        <>
            <Head>
                <title>Campanhas - Dice-Roll</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.title}>
                        <h2>Criar campanha</h2>
                    </div>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <div>
                            <input type="file" onChange={handleFileInputChange} className={styles.inputFile} style={{
                            backgroundImage: `url(${previewUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }} ></input>
                        </div>

                        <div className={styles.campanha}>
                            <Input
                                placeholder="Título"
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                            <Input
                                className={styles.input}
                                placeholder="Descrição"
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
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