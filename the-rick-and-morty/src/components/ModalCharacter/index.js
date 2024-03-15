import './modalcharacter.scss'
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";

export default function ModalCharacter({isOpen, closeModal, item}){
    const created = new Date(item.created).toLocaleDateString('pt-BR')

    const customStyles = {
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '0',
            backgroundColor: 'transparent',
            transform: 'translate(-50%, -50%)'
        }
    }

    return (
        <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
            <main className='modal-character'>
                <div className='modal-content'>
                    <IoClose onClick={closeModal}/>
                    <h1>{item.name.split(" ").slice(0, 2).join(" ")}</h1>
                    <p><span>Espécie:</span> {item.species}</p>
                    <p><span>Status:</span> {item.status}</p>
                    <p><span>Gênero:</span> {item.gender}</p>
                    <p><span>Localização:</span> {item.location.name}</p>
                    <p><span>Criado(a):</span> {created}</p>
                    <p><span>Origem:</span> {item.origin.name.split(" ").slice(0, 1)}</p>
                </div>

                <img className='modal-image' src={item.image} alt='Character image' />
                <a className='view-image' href={item.image} target="_blank" rel="external"><FiExternalLink/></a>
            </main>
        </Modal>
    );
};
