import { Main, Navbar, DeleteModal } from './components';
import Aside from './components/Aside';
import { useGlobalContext } from './context/context';

function app() {
  const { showAside, showModal } = useGlobalContext();
  return (
    <>
      <div className="main-container">
        <div className="aside__container">{showAside && <Aside />}</div>
        <div
          className={`main__main-right ${showAside ? 'translate-main' : ''}`}
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
