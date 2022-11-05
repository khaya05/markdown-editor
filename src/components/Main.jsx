import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useGlobalContext } from '../context/context';
import '../styles/Main.css'

function Main() {
  const { markdownInput, setMarkdownInput } = useGlobalContext();
  return (
    <main>
      <div className="main__left">
        <div className="section-label">
          <p></p>
          <img src="" alt="" />
        </div>
        <form>
          <textarea
            value={markdownInput}
            onChange={(e) => setMarkdownInput(e.target.value)}
          />
        </form>
      </div>
      <div className="main__right">
        <div className="section-label"></div>
        <ReactMarkdown>{markdownInput}</ReactMarkdown>
      </div>
    </main>
  );
}

export default Main;
