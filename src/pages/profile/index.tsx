import Head from "next/head"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"
import { ButtonEdit } from "../../components/ui/ButtonEdit"
import { ButtonSave } from "../../components/ui/ButtonSave"
import { ButtonCancel } from "../../components/ui/ButtonCancel"
import { FiEdit } from "react-icons/fi";
import styles from './styles.module.scss'

export default function Profile() {
    return (
        <>
            <Head>
                <title>Perfil - Dice-Roll</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.title}>
                        <h2>Perfil</h2>
                    </div>

                    <form className={styles.form} encType="multipart/form-data">
                        <input className={styles.input} type='file'></input>
                        <Input
                            placeholder="Nome"
                            type="text"
                        />
                        <Input
                            className={styles.input}
                            placeholder="Biografia"
                            type="text"
                        />
                        <Input
                            placeholder="Email"
                            type="text"
                        />
                        <ButtonEdit>
                            Trocar de senha
                        </ButtonEdit>
                        <ButtonSave type="submit">
                            Salvar
                        </ButtonSave>
                        <ButtonCancel>
                            Cancelar
                        </ButtonCancel>
                    </form>
                </main>
            </div>
        </>
    )
}