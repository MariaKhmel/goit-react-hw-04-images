import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import PropTypes from 'prop-types';


export const ImageGallery = ({ images, openModal }) => {
    return (
        <ul className="ImageGallery">
            {images.map(image => (
              
                <ImageGalleryItem 
                    openModal={openModal}
                    image={image}
                    key={image.webformatURL}
                    src={image.webformatURL}
                    alt={image.tags}
                />
        ))}
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal:PropTypes.func.isRequired
}
