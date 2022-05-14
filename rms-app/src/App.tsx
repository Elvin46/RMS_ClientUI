import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { APP_ROUTES } from './consts';
import { Home } from './pages/Home';


function App() {
  return (
    <>
      <Routes>
        <Route path={APP_ROUTES.HOME.PATH} element={<Home/>}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
