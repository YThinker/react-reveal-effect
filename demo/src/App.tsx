import { useMemo, useRef, useState } from 'react';
import { RevealEffect, useRevealEffect } from './components/RevealEffect';

import logo from './img/logo.svg';
import downArrow from "./img/down-arrow.svg";
import './App.css';

const App = () => {

  const logoContainerRef = useRef<HTMLDivElement|null>(null);
  const hrRef = useRef<HTMLHRElement|null>(null);
  const refArray = useMemo(() => {
    return [logoContainerRef.current, hrRef.current].filter(item => Boolean(item))
  }, [hrRef.current, logoContainerRef.current]);
  useRevealEffect(
    {borderSelector: refArray as HTMLElement[]},
    {borderGradientSize: 200}
  );


  return (
    <>
      <header className="page-head">
        <div ref={logoContainerRef} className='logo-container'>
          <img src={logo} className="logo" alt="logo" />
        </div>
        <h1 className="page-head-title">
          React Reveal Effect
        </h1>
        <p className="description">
          Reveal Effect of Fluent Design for React
        </p>
        <img className="down-arrow" src={downArrow} alt="↓" />
      </header>
      <hr ref={hrRef} className="hr"/>
      <Main />
    </>
  );
}

const Main = () => {
  return (
    <div className="main">
      <RevealEffect config={{
        parcel: "parcel",
        borderWidth: "1px",
        borderRadius: "16px",
        clickEffect: true
      }}>
        <button>Button 1</button>
      </RevealEffect>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
  );
}

export default App;
