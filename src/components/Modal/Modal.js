import { createPortal } from 'react-dom';
import '../../index.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';



export const Modal = ({ modalImg, alt, onClose }) => {
    
    useEffect(() => {

        window.addEventListener('keydown', handleOnEscapeModalClose); 
        return () => window.removeEventListener('keydown', handleOnEscapeModalClose);
    })
    // componentDidMount() {
    //     window.addEventListener('keydown', this.handleOnEscapeModalClose);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.handleOnEscapeModalClose);
    // }



    const handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
           onClose();
        }
    }

    const handleOnEscapeModalClose = (e) => {
        if (e.code === 'Escape') {
        onClose();  
        }
    }

  
        const modalRoot = document.getElementById('modal-root');

        return createPortal(
            <div className="Overlay" onClick={handleBackdropClick}>
                <div className="Modal">
                    <img src={modalImg} alt={alt} />
                </div>
            </div>,
            modalRoot
        )
}


Modal.propTypes = {
    modalImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose:PropTypes.func.isRequired,
}