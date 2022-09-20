import { FC } from 'react';
import './style.css';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Sidebar: FC = () => (
    <label htmlFor="btn">
        <input type="checkbox" className="button" id="btn"/>
        <div className="toggle">
            <span className="top_line common"></span>
            <span className="middle_line common"></span>
            <span className="bottom_line common"></span>
        </div>
        <div className="slide bg-dark text-warning">
            <h3 className="titleSidebar text-center">Black and Yellow</h3>
            <hr className="linesSubtitles"/>
            <ul className="contentSidebar">
                <div className="gestionCrias">
                    <li>
                        <a href="./Crias">
                            <HomeIcon />
                            Gestion de Crias
                        </a>
                    </li>
                </div>
                <hr className="linesSubtitles"/>
                <div className="manejoProveedores">
                    <p className="subtitleProveedores">
                        Manejo de Proveedores
                    </p>
                    <li>
                        <a href="./Proveedores">
                            <InventoryIcon />
                            Proveedores
                        </a>
                    </li>
                    <li>
                        <a href="./Padrones">
                            <PetsIcon />
                            Compras Gerencia
                        </a>
                    </li>
                </div>
                <div className="manejoCompras">
                    <p className="subtitleProveedores">Manejo de Compras</p>
                    <li>
                        <a href="./Clientes">
                            <PeopleAltIcon />
                            Control de Clientes
                        </a>
                    </li>
                    <li>
                        <a href="./Responsables">
                            <VolunteerActivismIcon />
                            Control de Responsables
                        </a>
                    </li>
                    <li>
                        <a href="./Ventas">
                            <ShoppingCartIcon />
                            Ventas
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    </label>
);

export default Sidebar;
