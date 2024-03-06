import { Component } from 'react';
import { createPortal } from 'react-dom';
import '../../index.css';
import PropTypes from 'prop-types';



export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleOnEscapeModalClose);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleOnEscapeModalClose);
    }

    handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    handleOnEscapeModalClose = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();  
        }
    }

    render() {
        const { modalImg, alt } = this.props;
        const modalRoot = document.getElementById('modal-root');

        return createPortal(
            <div className="Overlay" onClick={this.handleBackdropClick}>
                <div className="Modal">
                    <img src={modalImg} alt={alt} />
                </div>
            </div>,
            modalRoot
        )
    }
}


Modal.propTypes = {
    modalImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose:PropTypes.func.isRequired,
}