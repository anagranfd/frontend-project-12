import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login';
import { Page404 } from './Components/Page404';
import { MainPage } from './Components/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
