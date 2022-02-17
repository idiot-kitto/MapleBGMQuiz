import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Main } from './pages';
import { GlobalStyle, Background } from './components';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Background />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
