import PropTypes from "prop-types";
import './modal.scss';
import {useEffect, useRef, useState} from "react";

const Modal = props => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        setActive(props.active);
    }, [props.active]);

    return (
        <div id={props.id} className={`modal ${props.active ? 'active' : ''}`}>
            {props.children}
        </div>
    );
};

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
};

export const ModalContent = props => {
    const modalContentRef = useRef(null);
    const closeModal = () => {
        modalContentRef.current.parentNode.classList.remove('active');
        if (props.onClose) props.onClose();
    }

    return (
        <div ref={modalContentRef} className='modal__content'>
            {props.children}
            <div className='modal__content__close' onClick={closeModal}>
                <i className='bx bx-x'></i>
            </div>
        </div>
    );
};

ModalContent.propsTypes = {
    onClose: PropTypes.func
};

export default Modal;