import { useState } from 'react';
import { createContext, useContext } from 'react';
import { content } from '../contents/data';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [markdownInput, setMarkdownInput] = useState(content);
  const [showAside, setShowAside] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const []
  return (
    <AppContext.Provider
      value={{
        markdownInput,
        showAside,
        isEditing,
        darkMode,
        showModal,
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
