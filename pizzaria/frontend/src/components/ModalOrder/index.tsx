import Modal from 'react-modal'
import styles from './style.module.scss'
import { FiX } from 'react-icons/fi'
import { OrderItemProps } from '../../pages/dashboard'

interface ModalOrderProps{
    isOpen: boolean  //para saber se o modal está aberto ou não
    onRequestClose: () => void  //método para fechar modal
    order: OrderItemProps[]  //detalhes do pedido
    handleFinishOrder: (id: string) => void  //espera-se passar um id e não vai devolver nada
}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder}: ModalOrderProps){
    const customStyles = {
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            backgroundColor: '#1d1d2e',
            transform: 'translate(-50%, -50%)'
        }
    }

    return(
        <Modal style={customStyles} isOpen={isOpen} onRequestClose={onRequestClose}>
            <button type='button' onClick={onRequestClose} className='react-modal-close' style={{backgroundColor: 'transparent', border: 0}}><FiX size={45} color='#f34748'/></button>

            <div className={styles.container}>
                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>
                {order.map(item => (
                    <section className={styles.containerItem} key={item.id}>
                        <span>{item.amount} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}
                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(order[0].order_id)}>Concluir pedido</button>
            </div>
        </Modal>
    )
}