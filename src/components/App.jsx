import { Component, Fragment } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './getImages';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import '.././index.css';

export class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 1,
    showModal: false,
    modalImg: null,
    isLoading: false,
    totalPages: 1,
    errorMessage: '',
  };

   componentDidUpdate = (prevProps, prevState) => {
  
     const { searchText, page } = this.state;
     
     if (searchText.trim() === '') {
       return;
     }
  if (
    prevState.searchText !== searchText ||
    prevState.page !== page
  ) {
    this.setState({ isLoading: true });

    getImages(searchText, page).then(data => {
      const newImages = page === 1 ? data.hits : [...prevState.images, ...data.hits];

      this.setState({
        images: newImages,
        isLoading: false,
        totalPages: Math.ceil(data.totalHits / 12),
      });
    })
    .catch(error=> this.setState({errorMessage:error.message, isLoading: false}))
     }
   }; 

 

  handleSearchBarSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.input;
    this.setState({ searchText: value, page:1 });
    e.target.elements.input.value = '';

  };

  onLoadMore = () => {
    this.setState(prevState =>({ page: prevState.page + 1 }));
  };

  openModal = modalImg => {
    this.setState({ showModal: true, modalImg });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      modalImg,
      searchText,
      totalPages,
      page,
      errorMessage,
    } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchBarSubmit} />
        {errorMessage && <p>Seems like something went wrong : {errorMessage}</p>}
        {isLoading && <Loader />}
        {images.length > 0 && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            <Button
              onLoadMore={this.onLoadMore}
              disabled={totalPages === page}
            />
          </>
        )}
        {showModal && (
          <Modal
            modalImg={modalImg}
            alt={searchText}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}