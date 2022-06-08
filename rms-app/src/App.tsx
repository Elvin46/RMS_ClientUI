import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { APP_ROUTES } from './consts';
import { Order } from './pages/order/Order';
import { Home } from './pages/Pin/Home';
import { Tables } from './pages/tables/Tables';
import { ProtectedRoutes } from './ProtectedRoutes';


function App() {
  return (
    <>
      <Routes>
        <Route path={APP_ROUTES.HOME.PATH} element={<Home/>}>
        </Route>
        <Route element={<ProtectedRoutes/>}>
          <Route path={APP_ROUTES.HALLS.PATH} element={<Tables/>}>
          </Route>
          <Route path={APP_ROUTES.HALLS.DETAILS.PATH} element={<Tables/>}>
          </Route>
          <Route path={APP_ROUTES.ORDER.PATH} element={<Order/>}>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
