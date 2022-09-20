import { FC } from 'react';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import Nav from '../../common/components/Nav';
import './style.css';

const Galeria: FC = () => (
  <div className="containerGaleria">
    <Nav />
    <Header />
    <div className="gallery-container">
            <div className="gallery-card">
                <a href="/resources/img/galeria/perro1.png" data-lightbox="roadtrip">
                  <img src="/resources/img/galeria/perro1.png" alt="Imagen" />
                </a>
            </div>
            <div className="gallery-card">
                <a href="/resources/img/galeria/perro2.png" data-lightbox="roadtrip">
                  <img src="/resources/img/galeria/perro2.png" alt="Imagen" />
                </a>
            </div>
            <div className="gallery-card">
                <a href="/resources/img/galeria/perro3.png" data-lightbox="roadtrip">
                  <img src="/resources/img/galeria/perro3.png" alt="Imagen" />
                </a>
            </div>
            <div className="gallery-card">
                <a href="/resources/img/galeria/perro4.png" data-lightbox="roadtrip">
                  <img src="/resources/img/galeria/perro4.png" alt="Imagen" />
                </a>
            </div>
            <div className="gallery-card">
                <a href="/resources/img/galeria/perro5.jpg" data-lightbox="roadtrip">
                  <img src="/resources/img/galeria/perro5.jpg" alt="Imagen" />
                </a>
            </div>
            <div className="gallery-card">
                <a href="/resources/img/galeria/perro6.jpg" data-lightbox="roadtrip">
                  <img src="/resources/img/galeria/perro6.jpg" alt="Imagen" />
                </a>
            </div>
    </div >
    <Footer />
  </div>
);

export default Galeria;
