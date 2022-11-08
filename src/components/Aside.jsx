import { fileIcon, logo } from '../assets';
import { allFiles } from '../contents/data';
import { useGlobalContext } from '../context/context';
import { ThemeButton } from '../components';

import '../styles/Aside.css';

function Aside() {
  const { showAside } = useGlobalContext();

  const handleFileClick = (e) => {
    const allFiles = document.querySelectorAll('.aside__file');
    allFiles.forEach((file) => {
      file.setAttribute('aria-selected', 'false');
    });
    e.target.setAttribute('aria-selected', 'true');
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
          <button className="orange-btn">+ New Document</button>
          <ul
            className="aside__file-info-container"
            role="list"
            aria-label="your current files"
          >
            {allFiles.map((file) => {
              const { id, name, createdAt, content } = file;

              return (
                <li
                  key={id}
                  className="aside__file"
                  aria-label={`${name} `}
                  aria-selected="false"
                  onClick={handleFileClick}
                >
                  <div className="file_icon-container">
                    <img src={fileIcon} alt="" aria-hidden="true" />
                  </div>
                  <div className="">
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
