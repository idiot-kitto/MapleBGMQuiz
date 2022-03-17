import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Main } from './pages';
import { GlobalStyle, Background } from './components';
import AlertModal from 'components/common/alertmodal';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Background />
      <AlertModal />
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
