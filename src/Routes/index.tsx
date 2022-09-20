import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Clientes from '../screens/AppWeb/crud/components/Clientes/clientes';
import Crias from '../screens/AppWeb/crud/components/Crias/crias';
import Padrones from '../screens/AppWeb/crud/components/Padron/padrones';
import Proveedores from '../screens/AppWeb/crud/components/Proveedores/proveedores';
import Responsables from '../screens/AppWeb/crud/components/Responsables/responsables';
import Ventas from '../screens/AppWeb/crud/components/Ventas/ventas';
import Sidebar from '../screens/AppWeb/crud/dashboard';
import Login from '../screens/AppWeb/login';
import Contactanos from '../screens/Contactanos';
import Galeria from '../screens/Galeria';
import Inicio from '../screens/Inicio';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Galeria" element={<Galeria />} />
      <Route path="/Contactanos" element={<Contactanos />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Main" element={<Sidebar />} />
      <Route path="/Crud/Crias" element={<Crias />} />
      <Route path="/Crud/Proveedores" element={<Proveedores />} />
      <Route path="/Crud/Padrones" element={<Padrones />} />
      <Route path="/Crud/Clientes" element={<Clientes />} />
      <Route path="/Crud/Responsables" element={<Responsables />} />
      <Route path="/Crud/Ventas" element={<Ventas />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
