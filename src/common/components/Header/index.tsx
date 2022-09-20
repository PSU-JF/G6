import { FC } from 'react';
import './style.css';

const Header: FC = () => (
  <main className="main">
    <header className="perro">
      <div className="left">
        <a href="/">
          <img
            src="/resources/img/header/logo.png"
            alt=""
            width="250px"
            height="250px"
          />
        </a>
        <h1 className="titulo">BLACK AND YELLOW</h1>
        <h2 className="contactanos">
          CONTACTANOS:
          <br />
          <ul>
            <li className="social">
              <a
                href="https://www.facebook.com/DANIIELA.daniiela"
                target="_blank"
                rel="noreferrer">
                <img
                  src="/resources/img/header/facebook.png"
                  alt=""
                  width="90px"
                  height="90px"
                />
              </a>
            </li>
            <li className="social">
              <a
                href="https://www.instagram.com/bullsfrench.blackandyellow/"
                target="_blank"
                rel="noreferrer">
                <img
                  src="/resources/img/header/instagram.png"
                  alt=""
                  width="90px"
                  height="110px"
                />
              </a>
            </li>
          </ul>
        </h2>
        <br />
      </div>
    </header>
  </main>
);

export default Header;
