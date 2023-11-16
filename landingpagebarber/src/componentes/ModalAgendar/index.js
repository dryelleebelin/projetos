import React from 'react';
import Modal from 'react-modal';
import './modalagendar.css';

export default function ModalAgendar({ isOpen, onRequestClose }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Agendar Horário">
            <h2>Agendar horário</h2>
            <form>
                <div>
                    <label>Nome completo</label>
                    <input type="text" placeholder='Digite seu nome' />
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
                {/* <div className='select-hora'>
                    <label>Selecione a hora</label>
                    <section>
                        <input type='radio' name='hora' value="09:00"/>
                        <label for="hora09">09:00</label>

                        <input type='radio' name='hora' value="10:00"/>
                        <label for="hora10">10:00</label>

                        <input type='radio' name='hora' value="11:00"/>
                        <label for="hora11">11:00</label>
                    </section>
                </div> */}
                <button>Agendar horário</button>
            </form>
        </Modal>
    );
}
