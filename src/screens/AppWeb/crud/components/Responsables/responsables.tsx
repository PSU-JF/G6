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

const Responsables: FC = () => {
  // 1. Hooks
  const [nombre, setNombre] = useState('');
  const [telCel, setTelCel] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [responsables, setResponsables] = useState<any>([]);
  const [edicion, setEdicion] = useState(false);
  const [edicionId, setEdicionId] = useState('');

  // 2. Funcion Agregar
  const agregar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!nombre.trim() || !telCel.trim() || !correo.trim() || !direccion.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Faltan los datos: ${!nombre.trim()
          ? '- Nombre' : ''} ${!telCel.trim()
          ? '- Tel/Cel' : ''}  ${!correo.trim()
          ? '- Correo' : ''} ${!direccion.trim()
          ? '- Direccion' : ''}`,
      });
      return;
    }
    try {
      const data = await addDoc(collection(db, 'responsable'), {
        nom_res: nombre,
        telCel_res: telCel,
        correo_res: correo,
        dire_res: direccion,
      });
      setResponsables([
        ...responsables,
        {
          nom_res: nombre,
          telCel_res: telCel,
          correo_res: correo,
          dire_res: direccion,
          ...data,
        },
      ]);
    } catch (error) {
    //   console.log(error);
    }
    setNombre('');
    setTelCel('');
    setCorreo('');
    setDireccion('');
  };

  // 3. Funcion Mostrar Datos
  const getDatos = async () => {
    const data = await getDocs(collection(db, 'responsable'));
    //   console.log(data.docs);
    const arrayData = data.docs.map((docData) => ({
      id: docData.id,
      ...docData.data(),
    }));
    //   console.log(arrayData);
    setResponsables(arrayData);
  };
  useEffect(() => {
    getDatos();
  }, []);

  // 4. Funcion Eliminar
  const eliminar = async (id: string) => {
    await deleteDoc(doc(db, 'responsable', id));
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
    setNombre(item.nom_res);
    setTelCel(item.telCel_res);
    setCorreo(item.correo_res);
    setDireccion(item.dire_res);
    setEdicionId(item.id);
  };

  // 6. Funcion Editar
  const editar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'responsable', edicionId), {
        nom_res: nombre,
        telCel_res: telCel,
        correo_res: correo,
        dire_res: direccion,
      });
      const arrayEditar = responsables.map((item: any) => (
        item.id === edicionId ? {
          id: item.id,
          nom_res: nombre,
          telCel_res: telCel,
          correo_res: correo,
          dire_res: direccion,
        } : item
      ));
      setResponsables(arrayEditar);
      setEdicion(false);
      setNombre('');
      setTelCel('');
      setCorreo('');
      setDireccion('');
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
      <h1 className="text-center mt-3">CONTROL DE RESPONSABLES</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tel/Cel</th>
                <th>Correo</th>
                <th>Direccion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {responsables.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.nom_res}</td>
                  <td>{item.telCel_res}</td>
                  <td>{item.correo_res}</td>
                  <td>{item.dire_res}</td>
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
            <TextField id="outlined-basic" label="Nombre del Responsable" variant="outlined"
              className="form-control mb-2"
              placeholder="Nombre del Responsable"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              autoFocus
            />
            <TextField id="outlined-basic" label="Tel/Cel del Responsable" variant="outlined"
              className="form-control mb-2"
              placeholder="Tel/Cel del Responsable"
              onChange={(e) => setTelCel(e.target.value)}
              value={telCel}
            />
            <TextField id="outlined-basic" label="Correo del Responsable" variant="outlined"
              type="email"
              className="form-control mb-2"
              placeholder="Correo del Responsable"
              onChange={(e) => setCorreo(e.target.value)}
              value={correo}
            />
            <TextField id="outlined-basic" label="Direccion del Responsable" variant="outlined"
              className="form-control mb-2"
              placeholder="Direccion del Responsable"
              onChange={(e) => setDireccion(e.target.value)}
              value={direccion}
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

export default Responsables;
