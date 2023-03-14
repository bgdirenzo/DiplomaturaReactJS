import logo from './logo.svg';
import './App.css';

import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';

import contactoPage from './pages/contactoPage';
import homePage from './pages/homePage';
import nosotrosPage from './pages/nosotrosPage';
import novedadesPage from './pages/novedadesPage';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<homePage />} />
          <Route path="nosotros" element={<nosotrosPage />} />
          <Route path="novedades" element={<novedadesPage />} />
          <Route path="contacto" element={<contactoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
