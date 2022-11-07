import React from 'react';
import ReactMarkdown from 'react-markdown';
import { hidePreviewIcon, showPreviewIcon } from '../assets';
import { useGlobalContext } from '../context/context';
import '../styles/Main.css';

function Main() {
  const {
    markdownInput,
    setMarkdownInput,
    showPreview,
    setShowPreview,
    showInput,
    setShowInput,
    screenWidth,
  } = useGlobalContext();
  const markdownClasses = [
    'main__left',
    `${showPreview ? 'hide-input' : 'show-input'}`,
  ];
  const previewClasses = [
    'react-markdown-container',
    `${showPreview ? 'show-preview' : 'hide-preview'}`,
  ];

  console.log(screenWidth);

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

  console.log(showPreview);

  return (
    <main>
      {showInput && (
        <div className={markdownClasses.join(' ')}>
          <div className="section-label">
            <p>markdown</p>
            <button type="button" onClick={handleMarkdownClick}>
              <img src={showPreviewIcon} alt="hide preview" />
              <span>hide preview</span>
            </button>
          </div>
          <form>
            <textarea
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
            />
          </form>
        </div>
      )}

      {showPreview && (
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
          <div className={previewClasses.join(' ')}>
            <ReactMarkdown>{markdownInput}</ReactMarkdown>
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;
