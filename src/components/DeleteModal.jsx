import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useGlobalContext } from '../context/context';

import '../styles/DeleteModal.css';

const Modal = () => {
  const { showModal, setShowModal } = useGlobalContext();
  const toggleModal = () => {
    setShowModal(false)
  };

  return (
    <div
      className={`modal-overlay ${showModal ? 'open-modal' : ''}`}
      onClick={toggleModal}
    >
      <div className="modal-container">
        <h3 className="modal-title">delete this document?</h3>
        <p>
          Are you sure you want to delete the ‘welcome.md’ document and its
          contents? This action cannot be reversed.
        </p>
        <button className='orange-btn'>confirm & delete</button>
      </div>
    </div>
  );
};

const DeleteModal = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Modal />,
        document.querySelector('#modal-root')
      )}
    </Fragment>
  );
};

export default DeleteModal;
