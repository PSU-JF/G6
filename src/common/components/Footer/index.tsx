import { Button, Input } from '@mui/material';
import { FC } from 'react';
import Iframe from 'react-iframe';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import MapIcon from '@mui/icons-material/Map';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import './style.css';

const Footer: FC = () => (
  <footer className="bg-dark">
    <div className="main-content">
      <div className="left">
        <div className="content">
          <h2>DONDE NOS ENCONTRAMOS</h2>
          <br />
          <Iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31800.901220026557!2d-74.04224919149371!3d4.920813777916725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e40776312d8c353%3A0x308b2cd7eafd3454!2sCajic%C3%A1%2C%20Cundinamarca!5e0!3m2!1ses!2sco!4v1624419810824!5m2!1ses!2sco"
            width="430"
            height="220"
            loading="lazy"
            url=""
          />
          <div className="social">
            <a
              href="https://www.facebook.com/DANIIELA.daniiela"
              target="_blank"
              rel="noreferrer">
              <FacebookRoundedIcon className="iconsSocial" />
            </a>
            <a
              href="https://www.instagram.com/bullsfrench.blackandyellow/"
              target="_blank"
              rel="noreferrer">
              <InstagramIcon className="iconsSocial" />
            </a>
          </div>
        </div>
      </div>
      <div className="center box">
        <h2 className="cont">CONTACTOS</h2>
        <div className="content">
          <div className="place">
            <MapIcon />
            <span className="text">Cajica, Cundinamarca Colombia</span>
          </div>
          <div className="mobile">
            <PhoneAndroidIcon />
            <span className="text">+57 311 4509782</span>
          </div>
          <div className="email">
            <EmailIcon />
            <span className="text">danielalozano.DFL@gmail.com </span>
          </div>
        </div>
      </div>
      <div className="right box">
        <h2>CONTACTANOS</h2>
        <div className="content">
          <form action="#">
            <div className="NyA">
              <div className="text">Nombre y Apellido *</div>
              <Input type="text" required />
            </div>
            <div className="email">
              <div className="text">Email *</div>
              <Input type="email" required />
            </div>
            <div className="msg">
              <div className="text">Mensaje *</div>
              <textarea cols={25} rows={2} required></textarea>
            </div>
            <div className="btn">
              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="bottom">
      <span>
        <CopyrightRoundedIcon />
      </span>
      <span className="credit">
        {' '}
        2022 Todos los Derechos Reservados | <a href="."> Cristhian Fabra</a>
      </span>
    </div>
  </footer>
);

export default Footer;
