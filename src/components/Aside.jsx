import { fileIcon, logo } from '../assets';
import { useGlobalContext } from '../context/context';
import { ThemeButton } from '../components';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import moment from 'moment';

import '../styles/Aside.css';

function Aside() {
  const { showAside, files, setIndex, index } = useGlobalContext();
  const filesCollectionRef = collection(db, 'files');

  const addNewFile = async () => {
    const date = new Date();
    const formattedDate = moment(date).format('D MMMM YYYY');

    await addDoc(filesCollectionRef, {
      name: 'untitled.md',
      createdAt: formattedDate,
      contents: '',
    });
  };

  const handleFileClick = (e, id) => {
    const allFiles = document.querySelectorAll('.aside__file');
    allFiles.forEach((file) => {
      file.setAttribute('aria-selected', 'false');
    });
    e.target.setAttribute('aria-selected', 'true');

    const currentFile = files.find((file) => file.id === id);
    const currentFileIndex = files.indexOf(currentFile);
    setIndex(currentFileIndex);
  };

  return (
    <aside className={`${showAside ? 'show-aside' : 'hide-aside'}`}>
      <div
        className={`aside___container ${
          showAside ? 'show-contents' : 'hide-contents'
        }`}
      >
        <div className="">
          <div className="aside__logo-container">
            <img src={logo} alt="logo" aria-label="logo" />
          </div>
          <h2>My Documents</h2>
          <button className="orange-btn" onClick={addNewFile}>
            + New Document
          </button>
          <ul
            className="aside__file-info-container"
            role="list"
            aria-label="your current files"
          >
            {files.map((file) => {
              const { id, name, createdAt } = file;

              return (
                <li
                  key={id}
                  className="aside__file"
                  aria-label={`${name} `}
                  aria-selected="false"
                  onClick={(e, id_) => handleFileClick(e, id)}
                >
                  <div className="file_icon-container">
                    <img src={fileIcon} alt="" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="created-at">{createdAt}</p>
                    <p className="aside__current-file">{name}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="theme-toggle-container">
          <ThemeButton />
        </div>
      </div>
    </aside>
  );
}

export default Aside;
