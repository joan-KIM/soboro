import React, { Suspense } from 'react';
import './App.css';
import {RecoilRoot} from 'recoil';
import Auth from './Auth';
import Store from './Store';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <header className="App-header">
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Store />
          </Suspense>
        </header>
      </div>
    </RecoilRoot>
  );
}

export default App;
