import { Route, Routes, useLocation } from 'react-router-dom';
import AppBar from './componnets/AppBar';
import { AnimatePresence, motion } from "framer-motion";

import Demo from './pages/Demo';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Changelog from './pages/Changelog';
import AnimationPage from './componnets/AnimationPage';

const App = () => {
  const location = useLocation();

  return (
    <>
      <AppBar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>AnimationPage
        {routes.map(item => {
          const element = <AnimationPage>{item.element}</AnimationPage>;
          return item.index ?
            <Route index element={element} /> :
            <Route path={item.path} element={element} />
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
