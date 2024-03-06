import '../../index.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ src, alt, openModal, image }) => {

    return (
        <li className='ImageGalleryItem'
            onClick={() => openModal(image.webformatURL)} >
            <img src={src} alt={alt} className='ImageGalleryItem-image' />
        </li>
    )
}

ImageGalleryItem.protoTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    image:PropTypes.array.isRequired,
}