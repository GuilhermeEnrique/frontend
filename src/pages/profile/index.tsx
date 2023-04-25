import Head from "next/head"
import { Header } from "../../components/Header"
import { Input } from "../../components/ui/Input"
import { Button } from "../../components/ui/Button"

export default function Profile() {
    return (
        <>
            <Head>
                Perfil - Dice-Roll
            </Head>
            <div>
                <Header />
            </div>
            <div>
            <h2>Perfil</h2>
            <img src='/Icon-Dice-Roll.svg' width={50} height={50}/>
            </div>
            <form action="">
                <Input
                    placeholder="Nome"
                    type="text"
                />
                <Input
                    placeholder="Biografia"
                    type="text"
                />
                <Input
                    placeholder="Email"
                    type="text"
                />
                <Button>
                    Trocar de senha
                </Button>
                <Button>
                    Salvar
                </Button>
                <Button>
                    Cancelar
                </Button>
            </form>
        </>
    )
}