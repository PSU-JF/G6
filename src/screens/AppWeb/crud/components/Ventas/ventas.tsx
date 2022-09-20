import { TextField } from '@mui/material';
import {
  addDoc, collection, deleteDoc, doc, getDocs, updateDoc,
} from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { db } from '../../../../../utils/firebase';
import Sidebar from '../../dashboard';

const MySwal = withReactContent(Swal);

const Ventas: FC = () => {
  // 1. Hooks
  const [nomCria, setNomCria] = useState('');
  const [nomCli, setNomCli] = useState('');
  const [nomRes, setNomRes] = useState('');
  const [ventas, setVentas] = useState<any>([]);
  const [edicion, setEdicion] = useState(false);
  const [edicionId, setEdicionId] = useState('');

  // 2. Funcion Agregar
  const agregar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!nomCria.trim() || !nomCli.trim() || !nomRes.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Faltan los datos: ${!nomCria.trim()
          ? '- Nombre Cria' : ''} ${!nomCli.trim()
          ? '- Nombre Cliente' : ''}  ${!nomRes.trim()
          ? '- Nombre Responsable' : ''}`,
      });
      return;
    }
    try {
      const data = await addDoc(collection(db, 'venta'), {
        nom_cria: nomCria,
        nom_cli: nomCli,
        nom_res: nomRes,
      });
      setVentas([
        ...ventas,
        {
          nom_cria: nomCria,
          nom_cli: nomCli,
          nom_res: nomRes,
          ...data,
        },
      ]);
    } catch (error) {
    //   console.log(error);
    }
    setNomCria('');
    setNomCli('');
    setNomRes('');
  };

  // 3. Funcion Mostrar Datos
  const getDatos = async () => {
    const data = await getDocs(collection(db, 'venta'));
    //   console.log(data.docs);
    const arrayData = data.docs.map((docData) => ({
      id: docData.id,
      ...docData.data(),
    }));
    //   console.log(arrayData);
    setVentas(arrayData);
  };
  useEffect(() => {
    getDatos();
  }, []);

  // 4. Funcion Eliminar
  const eliminar = async (id: string) => {
    await deleteDoc(doc(db, 'venta', id));
    getDatos();
  };
  const confirmDelete = (id: string) => {
    MySwal.fire({
      title: 'Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        eliminar(id);
        Swal.fire(
          'Eliminado!',
          'Su dato ha sido eliminado con éxito.',
          'success',
        );
      }
    });
  };

  // 5. Boton Editar
  const activarEdicion = (item: any) => {
    setEdicion(true);
    setNomCria(item.nom_cria);
    setNomCli(item.nom_cli);
    setNomRes(item.nom_res);
    setEdicionId(item.id);
  };

  // 6. Funcion Editar
  const editar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'venta', edicionId), {
        nom_cria: nomCria,
        nom_cli: nomCli,
        nom_res: nomRes,
      });
      const arrayEditar = ventas.map((item: any) => (
        item.id === edicionId ? {
          id: item.id,
          nom_cria: nomCria,
          nom_cli: nomCli,
          nom_res: nomRes,
        } : item
      ));
      setVentas(arrayEditar);
      setEdicion(false);
      setNomCria('');
      setNomCli('');
      setNomRes('');
      setEdicionId('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="headerProveedores bg-dark"></div>
      <Sidebar />
      <div className="container">
      <h1 className="text-center mt-3">VENTAS</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Nombre Cria</th>
                <th>Nombre Cliente</th>
                <th>Nombre Responsable</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.nom_cria}</td>
                  <td>{item.nom_cli}</td>
                  <td>{item.nom_res}</td>
                  <td>
                    <Button
                      className="btn btn-warning btn-small float-right"
                      onClick={() => activarEdicion(item)}
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn btn-danger btn-small float-rigth mx-2"
                      onClick={() => confirmDelete(item.id)}
                    >
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-4">
          <h4 className="text-center"><b>{edicion ? 'Editar' : 'Agregar'}</b></h4>
          <form onSubmit={edicion ? editar : agregar}>
            <TextField id="outlined-basic" label="Nombre de la Cria" variant="outlined"
              className="form-control mb-2"
              placeholder="Nombre de la Cria"
              onChange={(e) => setNomCria(e.target.value)}
              value={nomCria}
              autoFocus
            />
            <TextField id="outlined-basic" label="Nombre del Cliente" variant="outlined"
              className="form-control mb-2"
              placeholder="Nombre del Cliente"
              onChange={(e) => setNomCli(e.target.value)}
              value={nomCli}
            />
            <TextField id="outlined-basic" label="Nombre del Responsable" variant="outlined"
              className="form-control mb-2"
              placeholder="Nombre del Responsable"
              onChange={(e) => setNomRes(e.target.value)}
              value={nomRes}
            />
            <Button className={edicion
              ? 'btn btn-warning btn-block'
              : 'btn btn-dark btn-block'}
            >
              {edicion ? 'Editar' : 'Agregar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Ventas;
