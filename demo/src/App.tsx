import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppBar from './componnets/AppBar';
import AnimationPage from './componnets/AnimationPage';
import BackToTop from './componnets/BackToTop';
import { AnimatePresence } from "framer-motion";

import Demo from './pages/Demo';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Changelog from './pages/Changelog';
import { RevealEffectConfig } from './RevealEffect';
import { useDrawerContext, DrawerStateContext } from './componnets/Drawer';
import RevealEffectConfigDocs from './pages/Docs/RevealEffectConfigDocs';
import TypesDocs from './pages/Docs/TypesDocs';
import RevealEffectDocs from './pages/Docs/RevealEffectDocs';
import UseRevealEffectDocs from './pages/Docs/UseRevealEffectDocs';
import GetStarted from './pages/Docs/GetStarted';

const App = () => {
  const location = useLocation();

  const DrawerStates = useDrawerContext();

  return (
    <RevealEffectConfig>
      <DrawerStateContext.Provider value={DrawerStates}>
        <AppBar />
        <BackToTop />
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            {ChildrenRoute({ routes })}
          </Routes>
        </AnimatePresence>
      </DrawerStateContext.Provider>
    </RevealEffectConfig>
  )
};

interface RoutePathItem {
  index?: false | undefined;
  path: string;
  element?: JSX.Element;
  children?: RouteItem[];
  hasAnimation?: boolean;
}
interface RouteIndexItem {
  index: true;
  element: JSX.Element;
  children?: RouteItem[];
  hasAnimation?: boolean;
}
type RouteItem = RoutePathItem | RouteIndexItem;
interface ChildrenRouteProps {
  routes: RouteItem[],
}
const ChildrenRoute = ({ routes }: ChildrenRouteProps) => {
  return routes.map((item, idx) => {
    const element = item.hasAnimation ? <AnimationPage>{item.element}</AnimationPage> : item.element;
    const children = item.children?.length ? ChildrenRoute({routes: item.children}) : null;
    return item?.index ?
      <Route index element={element} key={idx}></Route> :
      <Route path={item.path} element={element} key={idx}>{children}</Route>
  })
}

const routes: RouteItem[] = [{
  index: true,
  element: <Home />
}, {
  path: "/docs",
  element: <Docs/>,
  children: [{
    index: true,
    element: <Navigate to='/docs/getstarted' replace />
  }, {
    path: "/docs/types",
    element: <TypesDocs />
  }, {
    path: "/docs/reveal-effect-config",
    element: <RevealEffectConfigDocs />
  }, {
    path: "/docs/reveal-effect",
    element: <RevealEffectDocs />
  }, {
    path: "/docs/useRevealEffect",
    element: <UseRevealEffectDocs />
  }, {
    path: "/docs/getstarted",
    element: <GetStarted />
  }]
}, {
  path: "/demo",
  element: <Demo />
}, {
  path: "/changelog",
  element: <Changelog />
}]

export default App;
