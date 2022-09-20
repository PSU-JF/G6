import { FC } from 'react';
import './style.css';

const Nav: FC = () => (
  <nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid navigation">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a
            className="nav-link active text-white"
            aria-current="page"
            href="/">
            Inicio
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active text-white"
            aria-current="page"
            href="./Galeria">
            Galeria
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active text-white"
            aria-current="page"
            href="./Contactanos">
            Contactanos
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active text-white"
            aria-current="page"
            href="./Login">
            Iniciar Sesion
          </a>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        <span className="text-white subtitle">BLACK AND YELLOW</span>
        <img
          src="/resources/img/header/logo.png"
          width="50px"
          height="50px"
          alt="logo"
        />
      </div>
    </div>
  </nav>
);

export default Nav;
