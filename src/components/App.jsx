import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './getImages';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import '.././index.css';
import { useEffect,useState } from 'react';

export const App =()=> {
  // state = {
  //   searchText: '',
  //   images: [],
  //   page: 1,
  //   showModal: false,
  //   modalImg: null,
  //   isLoading: false,
  //   totalPages: 1,
  //   errorMessage: '',
  // };

  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
     
     if (searchText.trim() === '') {
       return;
    }
    setIsLoading(true);

    getImages(searchText, page).then(data => {
      setImages(prevImages => {
        const newImages = page === 1 ? data.hits : [...prevImages, ...data.hits];
        return newImages;
      });
      setIsLoading(false);
      setTotalPages(Math.ceil(data.totalHits / 12));
    })
      .catch(error => {
        setErrorMessage(error.message);
        setIsLoading(false)
      })
  
  }, [ page, searchText])
  
  //  componentDidUpdate = (prevProps, prevState) => {
  
  //    const { searchText, page } = this.state;
     
  //    if (searchText.trim() === '') {
  //      return;
  //    }
  // if (
  //   prevState.searchText !== searchText ||
  //   prevState.page !== page
  // ) {
  //   this.setState({ isLoading: true });

  //   getImages(searchText, page).then(data => {
  //     const newImages = page === 1 ? data.hits : [...prevState.images, ...data.hits];

  //     this.setState({
  //       images: newImages,
  //       isLoading: false,
  //       totalPages: Math.ceil(data.totalHits / 12),
  //     });
  //   })
  //   .catch(error=> this.setState({errorMessage:error.message, isLoading: false}))
  //    }
  //  }; 

 

  const handleSearchBarSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.input;
    setSearchText(value);
    setPage(1);
    e.target.elements.input.value = '';

  };

  const onLoadMore = () => {
    setPage(prevpage => prevpage + 1);
  };

  const openModal = modalImg => {
    setShowModal(true);
    setModalImg(modalImg);
  };

  const closeModal = () => {
    setShowModal(false);
  };

    return (
      <div className="App">
        <Searchbar onSubmit={handleSearchBarSubmit} />
        {errorMessage && <p>Seems like something went wrong : {errorMessage}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} openModal={openModal} />
            <Button
              onLoadMore={onLoadMore}
              disabled={totalPages === page}
            />
          </>
        )}
        {showModal && (
          <Modal
            modalImg={modalImg}
            alt={searchText}
            onClose={closeModal}
          />
        )}
      </div>
    );
  }
