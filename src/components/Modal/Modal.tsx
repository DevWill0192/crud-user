import styles from './styles.module.css';

const Modal = ({ isOpen, onClose, onCloseAdd }: { isOpen: boolean, onClose: () => void, onCloseAdd: () => void}) => {

    if (!isOpen) return null;
    
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <h1 className={styles.modalTitle}>Usuario Creado!</h1>
                <p className={styles.modalContentP}>Recuerda que puedes agregar otro usuario </p>
                <div className={styles.buttons}>
                    <button className={styles.modalClose} onClick={onClose}>Cerrar</button>
                    <button className={styles.modalAdd} onClick={onCloseAdd}>Agregar otro</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;