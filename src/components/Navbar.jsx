import {
  barsIcon,
  closeIcon,
  deleteIcon,
  fileIcon,
  logo,
  saveIcon,
} from '../assets';
import { useGlobalContext } from '../context/context';
import '../styles/Navbar.css';

function Navbar() {
  const { showAside, isEditing, setIsEditing, setShowAside, setShowModal } =
    useGlobalContext();

  const handleChange = () => {};

  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <nav>
      <div
        className="nav__menu-btn-container"
        onClick={() => setShowAside((oldState) => !oldState)}
      >
        <img
          src={showAside ? closeIcon : barsIcon}
          alt="menu button"
          aria-label="show aside button"
          aria-selected="false"
        />
      </div>

      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" aria-label="logo" />
      </div>

      <div className="nav__file-info">
        <div className="nav__file-info-left">
          <div className="nav__file-container">
            <img src={fileIcon} alt="" aria-hidden="true" />
          </div>

          <div className="nav__document-info-container">
            <label
              htmlFor="nav__file-name"
              className={`${isEditing ? 'show-label' : ''}`}
            >
              Document name
            </label>
            <input
              type="text"
              id="nav__file-name"
              onFocus={() => setIsEditing(true)}
              onBlur={() => setIsEditing(false)}
              value="Welcome.md"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="nav__file-info-right">
          <div className="nav__delete-file-container">
            <img
              src={deleteIcon}
              alt="delete-file"
              aria-label="delete curren open file"
              onClick={handleDelete}
            />
          </div>

          <div className="nav__save-file-container">
            <button aria-label="save file" className="orange-btn">
              <img src={saveIcon} alt="" aria-hidden="true" />
              <span>save document</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
