import Aside from './components/Aside';
import { Main, Navbar, DeleteModal } from './components';
import { useGlobalContext } from './context/context';

import './App.css';

function app() {
  const { showAside, showModal } = useGlobalContext();

  return (
    <>
      <div className="main-container">
        <div className={`aside__container `}>
          <Aside />
        </div>
        <div
          className={`main__main-right ${
            showAside ? 'translate-main-in' : 'translate-main-out'
          }`}
        >
          <Navbar />
          <Main />
          {showModal && <DeleteModal />}
        </div>
      </div>
    </>
  );
}

export default app;
