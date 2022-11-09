import { deleteDoc, doc } from 'firebase/firestore';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { useGlobalContext } from '../context/context';
import { db } from '../../firebase-config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/DeleteModal.css';

const Modal = () => {
  const {
    showModal,
    setShowModal,
    currentFile,
    setFilename,
    setFileContents,
    preferrersLightMode,
  } = useGlobalContext();
  const toggleModal = () => {
    setShowModal(false);
  };

  const notify = () => {
    toast.success('File Deleted', {
      position: 'top-left',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: preferrersLightMode ? 'light' : 'dark',
    });
  };

  const deleteFile = async () => {
    const fileDoc = doc(db, 'files', currentFile.id);
    await deleteDoc(fileDoc);
    setFilename('');
    setFileContents('');
    notify();
  };

  return (
    <>
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
          <button className="orange-btn" onClick={deleteFile}>
            confirm & delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const DeleteModal = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Modal />, document.querySelector('#modal-root'))}
    </Fragment>
  );
};

export default DeleteModal;
