import React, { useState } from 'react';
import Modal from 'react-modal';
import './modalagendar.css';
import { IoClose } from 'react-icons/io5';
import logo from '../../imagens/logo.svg';

export default function ModalAgendar({ isOpen, onRequestClose }) {
    const [selectedHora, setSelectedHora] = useState('');
    const [isAgendamentoSucesso, setIsAgendamentoSucesso] = useState(false);

    const handleHoraChange = (value) => {
        setSelectedHora(value);
    };

    const handleAgendarHorario = () => {
        setIsAgendamentoSucesso(true);
    };

    const resetModal = () => {
        setSelectedHora('');
        setIsAgendamentoSucesso(false);
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={resetModal} contentLabel="Agendar Horário">
            {isAgendamentoSucesso ? (
                <div className='agendamento-ok'>
                    <img src={logo}/>
                    <h2>{isAgendamentoSucesso ? 'Agendamento Realizado com Sucesso!' : 'Agendar horário'}</h2>
                    <button onClick={resetModal}>Voltar</button>
                </div>
            ) : (
                <form>
                    <IoClose onClick={resetModal} className='modal-close' />
                    <h2>{isAgendamentoSucesso ? 'Agendamento Realizado com Sucesso!' : 'Agendar horário'}</h2>
                    <div>
                        <label>Nome completo</label>
                        <input type="text" placeholder="Digite seu nome" />
                    </div>
                    <div>
                        <label>Selecione a data</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>Selecione uma unidade</label>
                        <select>
                            <option>Selecione a unidade</option>
                            <option>Rua Aguiar, nº 120</option>
                            <option>Rua Centro, nº 10</option>
                        </select>
                    </div>
                    <div className='select-hora'>
                        <label>Selecione a hora</label>
                        <section>
                            <label className={selectedHora === '09:00' ? 'selected' : ''} onClick={() => handleHoraChange('09:00')}>09:00</label>
                            <label className={selectedHora === '10:00' ? 'selected' : ''} onClick={() => handleHoraChange('10:00')}>10:00</label>
                            <label className={selectedHora === '11:00' ? 'selected' : ''} onClick={() => handleHoraChange('11:00')}>11:00</label>
                            <label className={selectedHora === '12:00' ? 'selected' : ''} onClick={() => handleHoraChange('12:00')}>12:00</label>
                            <label className={selectedHora === '13:00' ? 'selected' : ''} onClick={() => handleHoraChange('13:00')}>13:00</label>
                            <label className={selectedHora === '14:00' ? 'selected' : ''} onClick={() => handleHoraChange('14:00')}>14:00</label>
                            <label className={selectedHora === '15:00' ? 'selected' : ''} onClick={() => handleHoraChange('15:00')}>15:00</label>
                            <label className={selectedHora === '16:00' ? 'selected' : ''} onClick={() => handleHoraChange('16:00')}>16:00</label>
                            <label className={selectedHora === '17:00' ? 'selected' : ''} onClick={() => handleHoraChange('17:00')}>17:00</label>
                            <label className={selectedHora === '18:00' ? 'selected' : ''} onClick={() => handleHoraChange('18:00')}>18:00</label>
                        </section>
                    </div>
                    <button onClick={handleAgendarHorario}>Agendar horário</button>
                </form>
            )}
        </Modal>
    );
}
