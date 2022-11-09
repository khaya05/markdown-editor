import { collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import { db } from '../../firebase-config';

const AppContext = createContext();
const filesCollectionRef = collection(db, 'files');

const AppProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState({});
  const [filename, setFilename] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [showAside, setShowAside] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [screenWidth, setScreenWidth] = useState(null);
  const [preferrersLightMode, setPreferrersLightMode] = useState(true);

  // https://www.pluralsight.com/guides/re-render-react-component-on-window-resize

  function delayCall(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  useEffect(() => {
    const delayCallHandler = delayCall(function handleResize() {
      setScreenWidth(window.innerWidth);
    }, 500);

    window.addEventListener('resize', delayCallHandler);
    return (_) => {
      window.removeEventListener('resize', delayCallHandler);
    };
  }, []);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  // always show preview on larger devices
  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      setShowPreview(true);
    }
  }, [screenWidth]);

  // set light-theme as default
  useEffect(() => {
    document.documentElement.className = preferrersLightMode
      ? 'light-mode'
      : 'dark-mode';
  }, [preferrersLightMode]);

  // firebase

  useEffect(() => {
    const getFiles = () => {
      onSnapshot(filesCollectionRef, (data) => {
        setFiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getFiles();
  }, []);

  useEffect(() => {
    if (files) {
      setCurrentFile(files[index]);
    }
  }, [files, index]);

  useEffect(() => {
    setFilename(currentFile?.name);
    setFileContents(currentFile?.contents);
  }, [currentFile]);

  return (
    <AppContext.Provider
      value={{
        showAside,
        isEditing,
        showModal,
        showPreview,
        showInput,
        screenWidth,
        preferrersLightMode,
        filename,
        fileContents,
        index,
        currentFile,
        files,
        setIndex,
        setFilename,
        setFileContents,
        setPreferrersLightMode,
        setShowInput,
        setShowPreview,
        setShowModal,
        setShowAside,
        setIsEditing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
