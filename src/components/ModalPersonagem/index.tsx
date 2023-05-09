import Modal from "react-modal";
import styles from './styles.module.scss';

import { FiX, FiEdit, FiTrash } from 'react-icons/fi'

import { PersonagemItemProps } from "../../pages/personagens";
import Link from "next/link";
import { setupAPIClient } from "../../services/api";

interface ModalPersonagemProps {
    isOpen: boolean;
    onRequestClose: () => void;
    handleExclusaoPersonagem: (id: string) => void;
    personagem: PersonagemItemProps[];
}

export function ModalPersonagem({ isOpen, onRequestClose, personagem, handleExclusaoPersonagem }: ModalPersonagemProps) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--Secundary)',
            color: 'var(--Primary)'
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <div className={styles.buttons}>
                <button
                    className={styles.icon}
                    onClick={() => handleExclusaoPersonagem(personagem[0].id)}
                >
                    <FiTrash size={40} color="var(--Danger)" />
                </button>
                <Link href='/editar-personagem'>
                    <button className={styles.icon}>
                        <FiEdit size={40} color="var(--Primary)" />
                    </button>
                </Link>
                <button
                    type="button"
                    onClick={onRequestClose}
                    className={styles.icon}
                >
                    <FiX size={40} color="var(--Danger)" />
                </button>
            </div>
            <div className={styles.container}>
                <h2>Detalhes do personagem</h2>
                <span className={styles.table}>
                    {/* <span className={styles.title}><strong>Personagem</strong>: {personagem[0].name}</span> */}
                    {/* <span className={styles.description}><strong>Vida:</strong> {personagem[0].life}</span>
                    <span className={styles.description}><strong>Raça:</strong> {personagem[0].race}</span>
                    <span className={styles.description}><strong>Nível:</strong> {personagem[0].level}</span>
                    <span className={styles.description}><strong>Classe:</strong> {personagem[0].classe}</span>
                    <span className={styles.description}><strong>Descrição:</strong> {personagem[0].description}</span>
                    <span className={styles.description}><strong>Usuário:</strong> {personagem[0].User.name}</span>
                    <span className={styles.description}><strong>Campanha:</strong> {personagem[0].campanhas.title}</span> */}

                </span>
            </div>
        </Modal>
    )
}
