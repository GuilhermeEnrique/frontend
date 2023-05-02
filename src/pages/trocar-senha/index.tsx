import Link from 'next/link';
import Head from "next/head";
import styles from './styles.module.scss'
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Input } from '../../components/ui/Input';
import { ButtonSave } from '../../components/ui/ButtonSave';
import { ButtonCancel } from '../../components/ui/ButtonCancel';
import { FormEvent, useState, useContext } from 'react';
import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';

type UserProps = {
    id: string;
    email: string;
}

interface DetailsProps {
    userList: UserProps[];
}

export default function FichaPersonagem({ userList }: DetailsProps) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    async function handleAlterar(event: FormEvent) {
        event.preventDefault();
        try {
            const data = new FormData();

            if (oldPassword === '' || newPassword === '') {
                toast.error("Preencha corretamente")
                return
            }

            data.append('newPassword', newPassword)
            data.append('oldPassword', oldPassword)

            const apiClient = setupAPIClient();
            await apiClient.put('/user/password', data)
            toast.success('Senha alterada com sucesso!')
        } catch (err) {
            console.log(err)
            toast.error("Erro ao atualizar a senha")
        }
    }
    return (
        <>
            <Head>
                <title>Sobre nós - Dice-Roll</title>
            </Head>
            <div className={styles.containerCenter}>
                <Header />
                <div className={styles.title}>
                    <h1>Altere sua senha</h1>
                </div>
                <form onSubmit={handleAlterar}>
                    <div className={styles.container}>
                        <Input
                            placeholder='Antiga Senha'
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <Input
                            placeholder='Antiga Senha'
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <Input
                            placeholder='Nova Senha'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}

                        />
                        <ButtonSave type='submit'>
                            Salvar
                        </ButtonSave>
                        <Link href="/profile">
                            <ButtonCancel>
                                Cancelar
                            </ButtonCancel>
                        </Link>
                    </div>
                </form>
            </div >
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/about');
    console.log(response.data)

    return {
        props: {
            userList: response.data
        }
    }
})