import { Link } from 'react-router-dom';

export const MainPage = () => (
  <nav>
    <ul>
      <li>
        <Link to="/login">Login Page</Link>
      </li>
      <li>
        <Link to="/pageNotExist">Page 404</Link>
      </li>
    </ul>
  </nav>
);
