import { dark, light } from '../assets';
import { useGlobalContext } from '../context/context';
import '../styles/ThemeButton.css';

const ThemeButton = () => {
  const { preferrersLightMode, setPreferrersLightMode } = useGlobalContext();

  const toggleDarkMode = () => {
    setPreferrersLightMode((oldTheme) => !oldTheme);
  };

  return (
    <div className="theme-toggle-container">
      <div>
        <img src={dark} className="theme-icon" />
      </div>
      <div>
        <label className="switch">
          <input
            type="checkbox"
            checked={preferrersLightMode}
            onChange={toggleDarkMode}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div>
        <img src={light} className="theme-icon" />
      </div>
    </div>
  );
};

export default ThemeButton;
