import '../../index.css'
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore , disabled}) => {
    return (
        <div style={{ display: 'flex', justifyContent:'center' }}>
        <button type="button"
            className='Button'
        onClick={onLoadMore}
            disabled={disabled}
            >Load more</button>     
        </div>)
}

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}