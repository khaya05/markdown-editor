import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import { content } from '../contents/data';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [markdownInput, setMarkdownInput] = useState(content);
  const [showAside, setShowAside] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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

  // const []
  return (
    <AppContext.Provider
      value={{
        markdownInput,
        showAside,
        isEditing,
        darkMode,
        showModal,
        showPreview,
        showInput,
        screenWidth,
        preferrersLightMode,
        setPreferrersLightMode,
        setShowInput,
        setShowPreview,
        setShowModal,
        setDarkMode,
        setShowAside,
        setIsEditing,
        setMarkdownInput,
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
