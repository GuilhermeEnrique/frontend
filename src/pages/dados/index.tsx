import Head from "next/head";
import React, { FC, useEffect, useRef } from "react";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { ButtonEdit } from "../../components/ui/ButtonEdit";

export default function Dados() {
    const Roll: FC = () => {
        const images: string[] = [
            'dice-01.svg',
            'dice-02.svg',
            'dice-03.svg',
            'dice-04.svg',
            'dice-05.svg',
            'dice-06.svg',
        ];

        const diceRef = useRef<NodeListOf<HTMLImageElement>>(null);

        useEffect(() => {
            diceRef.current = document.querySelectorAll('img');
        }, []);

        function handleRoll() {
            diceRef.current?.forEach((die) => {
                die.classList.add('shake');
            });

            setTimeout(() => {
                diceRef.current?.forEach((die) => {
                    die.classList.remove('shake');
                });

                const dieOneValue = Math.floor(Math.random() * 6);
                const dieTwoValue = Math.floor(Math.random() * 6);

                document.querySelector<HTMLImageElement>('#die-1')!.src = images[dieOneValue];
                document.querySelector<HTMLImageElement>('#die-2')!.src = images[dieTwoValue];
                document.querySelector<HTMLDivElement>('#total')!.innerHTML =
                    'Os resultados são: ' + ((dieOneValue + 1) + (dieTwoValue + 1));
            }, 1000);
        }

        useEffect(() => {
            handleRoll();
        }, []);

        return <></>;
    };

    return (
        <>
            <Head>
                <title>Dados - Dice-Roll</title>
            </Head>
            <div className={styles.container}>
                <Header />
                <div className={styles.diceWrapper}>
                    <img id="die1" className={styles.die1} />
                    <img id="die2" className={styles.die2} />
                    <img id="die3" className={styles.die3} />
                </div>
                <p id="total" className={styles.total}>Total:</p>
                <ButtonEdit type="submit">
                    Rolar dados
                </ButtonEdit>
            </div>
        </>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {

        }
    }
})