import PropTypes from 'prop-types';
import './button.scss';

const Button = (props) => {
    return (
        <button className={`btn ${props.className}`} onClick={props.onClick ? props.onClick : null}>
            {props.children}
        </button>
    )
};

export const SmallButton = (props) => {
    return (
        <button className={`btn-small ${props.className}`} onClick={props.onClick ? props.onClick : null}>
            {props.children}
        </button>
    )
};

export const OutlineButton = (props) => {
    return (
        <button className={`btn-outline ${props.className}`} onClick={props.onClick ? props.onClick : null}>
            {props.children}
        </button>
    )
};

export const SmallOutlineButton = (props) => {
    return (
        <button className={`btn-outline-small ${props.className}`} onClick={props.onClick ? props.onClick : null}>
            {props.children}
        </button>
    )
};

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button;