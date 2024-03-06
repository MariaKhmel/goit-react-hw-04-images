import { FcSearch } from 'react-icons/fc';
import '../../index.css';
import PropTypes from 'prop-types'

export const Searchbar = ({ onSubmit })=>{
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={onSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <FcSearch/>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="input"
                    />
                </form>
            </header>
        );
    }


Searchbar.propTypes = {
    onSubmit:PropTypes.func.isRequired,
}