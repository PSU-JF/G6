import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material';
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

const Padrones: FC = () => {
  // 1. Hooks
  const [nombre, setNombre] = useState('');
  const [nomPro, setNomPro] = useState('');
  const [genero, setGenero] = useState('');
  const [fechaNa, setFechaNa] = useState('');
  const [fechaVac, setFechaVac] = useState('');
  const [fechaDesp, setFechaDesp] = useState('');
  const [padrones, setPadrones] = useState<any>([]);
  const [edicion, setEdicion] = useState(false);
  const [edicionId, setEdicionId] = useState('');

  // 2. Funcion Agregar
  const agregar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!nombre.trim() || !nomPro.trim() || !genero.trim() || !fechaNa.trim() || !fechaVac.trim() || !fechaDesp.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Faltan los datos: ${!nombre.trim()
          ? '- Nombre Padron' : ''} ${!nomPro.trim()
          ? '- Nombre Proveedor' : ''}  ${!genero.trim()
          ? '- Genero' : ''} ${!fechaNa.trim()
          ? '- Fecha de Nacimiento' : ''} ${!fechaVac.trim()
          ? '- Fecha de Vacunacion' : ''} ${!fechaDesp.trim()
          ? '- Fecha de Desparacitacion' : ''}`,
      });
      return;
    }
    try {
      const data = await addDoc(collection(db, 'padron'), {
        nom_pa: nombre,
        nom_pro: nomPro,
        genero_pa: genero,
        fechaNa_pa: fechaNa,
        fechaVac_pa: fechaVac,
        fechaDesp_pa: fechaDesp,
      });
      setPadrones([
        ...padrones,
        {
          nom_pa: nombre,
          nom_pro: nomPro,
          genero_pa: genero,
          fechaNa_pa: fechaNa,
          fechaVac_pa: fechaVac,
          fechaDesp_pa: fechaDesp,
          ...data,
        },
      ]);
    } catch (error) {
    //   console.log(error);
    }
    setNombre('');
    setNomPro('');
    setGenero('');
    setFechaNa('');
    setFechaVac('');
    setFechaDesp('');
  };

  // 3. Funcion Mostrar Datos
  const getDatos = async () => {
    const data = await getDocs(collection(db, 'padron'));
    //   console.log(data.docs);
    const arrayData = data.docs.map((docData) => ({
      id: docData.id,
      ...docData.data(),
    }));
    //   console.log(arrayData);
    setPadrones(arrayData);
  };
  useEffect(() => {
    getDatos();
  }, []);

  // 4. Funcion Eliminar
  const eliminar = async (id: string) => {
    await deleteDoc(doc(db, 'padron', id));
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
    setNombre(item.nom_pa);
    setNomPro(item.nom_pro);
    setGenero(item.genero_pa);
    setFechaNa(item.fechaNa_pa);
    setFechaVac(item.fechaVac_pa);
    setFechaDesp(item.fechaDesp_pa);
    setEdicionId(item.id);
  };

  // 6. Funcion Editar
  const editar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'padron', edicionId), {
        nom_pa: nombre,
        nom_pro: nomPro,
        genero_pa: genero,
        fechaNa_pa: fechaNa,
        fechaVac_pa: fechaVac,
        fechaDesp_pa: fechaDesp,
      });
      const arrayEditar = padrones.map((item: any) => (
        item.id === edicionId ? {
          id: item.id,
          nom_pa: nombre,
          nom_pro: nomPro,
          genero_pa: genero,
          fechaNa_pa: fechaNa,
          fechaVac_pa: fechaVac,
          fechaDesp_pa: fechaDesp,
        } : item
      ));
      setPadrones(arrayEditar);
      setEdicion(false);
      setNombre('');
      setNomPro('');
      setGenero('');
      setFechaNa('');
      setFechaVac('');
      setFechaDesp('');
      setEdicionId('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setGenero(event.target.value);
  };

  return (
    <>
      <div className="headerProveedores bg-dark"></div>
      <Sidebar />
      <div className="container">
      <h1 className="text-center mt-3">COMPRAS GERENCIA</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nombre Proveedor</th>
                <th>Genero</th>
                <th>Fecha Na.</th>
                <th>Fecha Vac.</th>
                <th>Fecha Desp.</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {padrones.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.nom_pa}</td>
                  <td>{item.nom_pro}</td>
                  <td>{item.genero_pa}</td>
                  <td>{item.fechaNa_pa}</td>
                  <td>{item.fechaVac_pa}</td>
                  <td>{item.fechaDesp_pa}</td>
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
            <TextField id="outlined-basic" label="Nombre del Padron" variant="outlined"
              className="form-control mb-2"
              placeholder="Nombre del Padron"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              autoFocus
            />
            <TextField id="outlined-basic" label="Nombre del Proveedor" variant="outlined"
              className="form-control mb-2"
              placeholder="Nombre del Proveedor"
              onChange={(e) => setNomPro(e.target.value)}
              value={nomPro}
            />
            <FormControl variant="outlined" sx={{ minWidth: '100%' }}>
            <InputLabel id="demo-simple-select-filled-label">Genero</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                placeholder="Genero"
                id="demo-simple-select-filled"
                value={genero}
                onChange={handleChange}
                label="Genero"
                className="mb-2"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Macho">Macho</MenuItem>
                <MenuItem value="Hembra">Hembra</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Fecha de Nacimiento"
              type="date"
              sx={{ width: '100%' }}
              InputLabelProps={{
                shrink: true,
              }}
              className="form-control mb-2"
              onChange={(e) => setFechaNa(e.target.value)}
              value={fechaNa}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Fecha de Vacunacion"
              type="date"
              sx={{ width: '100%' }}
              InputLabelProps={{
                shrink: true,
              }}
              className="form-control mb-2"
              onChange={(e) => setFechaVac(e.target.value)}
              value={fechaVac}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Fecha de Desparacitacion"
              type="date"
              sx={{ width: '100%' }}
              InputLabelProps={{
                shrink: true,
              }}
              className="form-control mb-2"
              onChange={(e) => setFechaDesp(e.target.value)}
              value={fechaDesp}
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

export default Padrones;
