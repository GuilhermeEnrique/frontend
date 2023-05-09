// ModalCampanhaEdit.tsx

import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";

import { setupAPIClient } from "../../services/api";

type CampanhaProps = {
    id: string;
    title: string;
    description: string;
    banner: string;
};

interface ModalCampanhaEditProps {
    isOpen: boolean;
    onRequestClose: () => void;
    campanha: CampanhaProps;
}

export function ModalCampanhaEdit({
    isOpen,
    onRequestClose,
    campanha,
}: ModalCampanhaEditProps) {
    const [title, setTitle] = useState(campanha.title);
    const [description, setDescription] = useState(campanha.description);
    const [banner, setBanner] = useState(campanha.banner);

    async function handleUpdateCampanha(event: FormEvent) {
        event.preventDefault();

        const data = { title, description, banner };

        try {
            await setupAPIClient.put(`/campanha/${campanha.id}`, data);
            onRequestClose();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <FiX size={20} />
            </button>

            <h2>Editar campanha</h2>

            <form onSubmit={handleUpdateCampanha}>
                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <label htmlFor="description">Descrição</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <label htmlFor="banner">Banner (URL da imagem)</label>
                <input
                    type="text"
                    id="banner"
                    value={banner}
                    onChange={(event) => setBanner(event.target.value)}
                />

                <button type="submit">Salvar</button>
            </form>
        </Modal>
    )
}
