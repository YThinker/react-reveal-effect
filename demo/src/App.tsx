import { Route, Routes, useLocation } from 'react-router-dom';
import AppBar from './componnets/AppBar';
import AnimationPage from './componnets/AnimationPage';
import BackToTop from './componnets/BackToTop';
import { AnimatePresence } from "framer-motion";

import Demo from './pages/Demo';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Changelog from './pages/Changelog';

const App = () => {
  const location = useLocation();

  return (
    <>
      <AppBar />
      <BackToTop />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>AnimationPage
        {routes.map((item, idx) => {
          const element = <AnimationPage>{item.element}</AnimationPage>;
          return item.index ?
            <Route index element={element} key={idx}/> :
            <Route path={item.path} element={element} key={idx}/>
        })}
        </Routes>
      </AnimatePresence>
    </>
  )
};

const routes = [{
  index: true,
  element: <Home />
}, {
  path: "/docs",
  element: <Docs />
}, {
  path: "/demo",
  element: <Demo />
}, {
  path: "/changelog",
  element: <Changelog />
}]

export default App;
