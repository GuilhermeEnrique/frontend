import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'


export function Header() {
    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/Icon-Dice-Roll.svg" alt="Logo Dice Roll" width={80} height={80} />
                </Link>
                <h1>Dice-Roll</h1>

                <nav className={styles.menuNav}>
                    <Link href="/profile">
                        Perfil
                    </Link>
                    <Link href="/about-us">
                        Sobre nós
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut size={24} />
                    </button>

                </nav>
            </div>
        </header>
    )
}
