import React from 'react';
import ReactMarkdown from 'react-markdown';
import { hidePreviewIcon, showPreviewIcon } from '../assets';
import { useGlobalContext } from '../context/context';
import { CSSTransition } from 'react-transition-group';

import '../styles/Main.css';

function Main() {
  const {
    showPreview,
    setShowPreview,
    showInput,
    setShowInput,
    screenWidth,
    fileContents,setFileContents
  } = useGlobalContext();

  const handleMarkdownClick = () => {
    setShowInput(false);
    setShowPreview(true);
  };

  const handlePreviewClick = () => {
    setShowInput((oldState) => !oldState);
    if (screenWidth < 768) {
      setShowPreview(false);
    }
  };

  const changeFileContents = (e) => {
    setFileContents(e.target.value)

    
  }

  return (
    <main>
      <CSSTransition
        in={showInput}
        timeout={400}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: '',
          enterActive: 'show-input',
          exit: '',
          exitActive: 'hide-input',
        }}
      >
        <div className={'main__left'}>
          <div className="section-label">
            <p>markdown</p>
            <button type="button" onClick={handleMarkdownClick}>
              <img src={showPreviewIcon} alt="hide preview" />
              <span>hide preview</span>
            </button>
          </div>
          <form>
            <textarea
              value={fileContents}
              onChange={(e) => changeFileContents(e)}
            />
          </form>
        </div>
      </CSSTransition>

      <CSSTransition
        in={showPreview}
        timeout={400}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: '',
          enterActive: 'show-preview',
          exit: '',
          exitActive: 'hide-preview',
        }}
      >
        <div className="main__right">
          <div className="section-label">
            <p>preview</p>
            <button type="button" onClick={handlePreviewClick}>
              <img
                src={!showInput ? hidePreviewIcon : showPreviewIcon}
                alt="hide preview"
              />
              <span>hide preview</span>
            </button>
          </div>
          <div className={'react-markdown-container'}>
            <ReactMarkdown>{fileContents}</ReactMarkdown>
          </div>
        </div>
      </CSSTransition>
    </main>
  );
}

export default Main;
