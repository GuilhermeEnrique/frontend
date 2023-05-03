import Modal from "react-modal";
import styles from './styles.module.scss';

import { FiX, FiEdit } from 'react-icons/fi'

import { CampanhaItemProps } from "../../pages/campanhas";
import Link from "next/link";

interface ModalCampanhaProps {
    isOpen: boolean;
    onRequestClose: () => void;
    campanha: CampanhaItemProps[];
}

export function ModalCampanha({ isOpen, onRequestClose, campanha }: ModalCampanhaProps) {

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
            <Link href='/editar-campanha'>
                <button style={{ background: 'transparent', border: 0, cursor: 'pointer' }}>
                    <FiEdit size={40} color="var(--Primary)" />
                </button>
            </Link>
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0, cursor: 'pointer' }}
            >
                <FiX size={40} color="var(--Danger)" />
            </button>
            
            <div className={styles.container}>
                <h2>Detalhes da campanha</h2>
                <span className={styles.table}>
                    <span className={styles.title}><strong>Campanha</strong>: {campanha[0].title}</span>
                    <span className={styles.description}><strong>Descrição:</strong> {campanha[0].description}</span>
                    <span><strong>Personagens:</strong></span>
                    {campanha.map(item => (
                        <section key={item.id} className={styles.containerItem}>
                            {item.characters.map(character => (
                                <div key={character.id}>
                                    <span>{character.name}: {character.classe}</span>
                                </div>
                            ))}
                        </section>
                    ))}
                </span>
            </div>
        </Modal>
    )
}