import { FC } from 'react';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';
import Nav from '../../common/components/Nav';
import './style.css';

const Contactanos: FC = () => (
  <div className="contactanosContainer">
    <Nav />
    <Header />
    <div className="containerContactanos">
      <form action="POST" className="form">
        <div className="form-header">
          <h1 className="form-title">
            <span>Contactanos</span>
          </h1>
        </div>
        <label htmlFor="nombre" className="form-label">
          Nombre:
          <input
            type="text"
            id="nombre"
            className="form-input"
            placeholder="Escriba su Nombre"
          />
        </label>
        <label htmlFor="apellido" className="form-label">
          Apellido:
          <input
            type="text"
            id="apellido"
            className="form-input"
            placeholder="Escriba su Apellido"
          />
        </label>
        <label htmlFor="email" className="form-label">
          Correo Electronico:
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Escriba su Correo Electronico"
          />
        </label>
        <label htmlFor="mensaje" className="form-label">
          Mensaje:
          <textarea
            id="mensaje"
            className="form-textarea"
            placeholder="Escriba su Mensaje"
          />
        </label>

        <input type="submit" className="btn-submit" value="Enviar" />
      </form>
    </div>
    <Footer />
  </div>
);

export default Contactanos;
