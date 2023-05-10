import Head from "next/head";
import React, { FormEvent, useState } from "react";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { ButtonEdit } from "../../components/ui/ButtonEdit";
import { Input } from "../../components/ui/Input";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

export default function Dados() {
    const [tipo, setTipo] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [results, setResults] = useState([]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const data = { type: tipo, quantity: quantidade };
            const apiClient = setupAPIClient();
            console.log(data)
            const response = await apiClient.post('/roll', data);
            const { result, sum } = response.data;

            setResults(result);
            toast.success("Gira, gira, gira ASPAS")

        } catch (err) {
            console.log(err);
            toast.error("Press F no chat");
        }
        setTipo('');
        setQuantidade('');
    };

    return (
        <>
            <Head>
                <title>Dados - Dice-Roll</title>
            </Head>
            <Header />
            <div>
                <h2 className={styles.title}>Dados</h2>
                <form className={styles.container} onSubmit={handleSubmit}>
                    <select
                        className={styles.select}
                        value={tipo}
                        onChange={(event) => setTipo(event.target.value)}
                    >
                        <option value="" disabled>Selecione um tipo de dado</option>
                        <option value={'4'}>D4</option>
                        <option value={'6'}>D6</option>
                        <option value={'8'}>D8</option>
                        <option value={'10'}>D12</option>
                        <option value={'20'}>D20</option>
                    </select>
                    {/* <Input
                        type="text"
                        placeholder="Tipo"
                        value={tipo}
                        onChange={(event) => setTipo(event.target.value)}
                    /> */}
                    <Input
                        type="number"
                        placeholder="Quantidade"
                        value={quantidade}
                        onChange={(event) => setQuantidade(event.target.value)}
                    />

                    <ButtonEdit children='Rolar' type="submit" />
                    {results.length > 0 && (
                        <div>
                            <h3>Resultados:</h3>
                            <ul>
                                {results.map((value, index) => (
                                    <li key={index}>{value}</li>
                                ))}
                            </ul>
                            <span>Soma dos resultados: {results.reduce((a, b) => a + b)}</span>
                        </div>
                    )}
                </form>
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