import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { APP_ROUTES } from './consts';
import { Home } from './pages/Home';
import { Tables } from './pages/tables/Tables';


function App() {
  return (
    <>
      <Routes>
        <Route path={APP_ROUTES.HOME.PATH} element={<Tables/>}>
        </Route>
        <Route path={APP_ROUTES.HALLS.PATH} element={<Tables/>}>
        </Route>
        <Route path={APP_ROUTES.HALLS.DETAILS.PATH} element={<Tables/>}>
        </Route>
      </Routes>
    </>
  );
}

export default App;
