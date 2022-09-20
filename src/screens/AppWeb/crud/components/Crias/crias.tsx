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

const Crias: FC = () => {
  // 1. Hooks
  const [nombre, setNombre] = useState('');
  const [nomPa, setNomPa] = useState('');
  const [genero, setGenero] = useState('');
  const [fechaNa, setFechaNa] = useState('');
  const [fechaVac, setFechaVac] = useState('');
  const [fechaDesp, setFechaDesp] = useState('');
  const [peso, setPeso] = useState('');
  const [crias, setCrias] = useState<any>([]);
  const [edicion, setEdicion] = useState(false);
  const [edicionId, setEdicionId] = useState('');

  // 2. Funcion Agregar
  const agregar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!nombre.trim() || !nomPa.trim() || !genero.trim() || !fechaNa.trim() || !fechaVac.trim() || !fechaDesp.trim() || !peso.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Faltan los datos: ${!nombre.trim()
          ? '- Nombre Cria' : ''} ${!nomPa.trim()
          ? '- Nombre Proveedor' : ''}  ${!genero.trim()
          ? '- Genero' : ''} ${!fechaNa.trim()
          ? '- Fecha de Nacimiento' : ''} ${!fechaVac.trim()
          ? '- Fecha de Vacunacion' : ''} ${!fechaDesp.trim()
          ? '- Fecha de Desparacitacion' : ''} ${!peso.trim()
          ? '- Peso' : ''}`,
      });
      return;
    }
    try {
      const data = await addDoc(collection(db, 'cria'), {
        nom_cria: nombre,
        nom_pa: nomPa,
        genero_cria: genero,
        fechaNa_cria: fechaNa,
        fechaVac_cria: fechaVac,
        fechaDesp_cria: fechaDesp,
        peso_cria: peso,
      });
      setCrias([
        ...crias,
        {
          nom_cria: nombre,
          nom_pa: nomPa,
          genero_cria: genero,
          fechaNa_cria: fechaNa,
          fechaVac_cria: fechaVac,
          fechaDesp_cria: fechaDesp,
          peso_cria: peso,
          ...data,
        },
      ]);
    } catch (error) {
    //   console.log(error);
    }
    setNombre('');
    setNomPa('');
    setGenero('');
    setFechaNa('');
    setFechaVac('');
    setFechaDesp('');
    setPeso('');
  };

  // 3. Funcion Mostrar Datos
  const getDatos = async () => {
    const data = await getDocs(collection(db, 'cria'));
    //   console.log(data.docs);
    const arrayData = data.docs.map((docData) => ({
      id: docData.id,
      ...docData.data(),
    }));
    //   console.log(arrayData);
    setCrias(arrayData);
  };
  useEffect(() => {
    getDatos();
  }, []);

  // 4. Funcion Eliminar
  const eliminar = async (id: string) => {
    await deleteDoc(doc(db, 'cria', id));
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
    setNombre(item.nom_cria);
    setNomPa(item.nom_pa);
    setGenero(item.genero_cria);
    setFechaNa(item.fechaNa_cria);
    setFechaVac(item.fechaVac_cria);
    setFechaDesp(item.fechaDesp_cria);
    setPeso(item.peso_cria);
    setEdicionId(item.id);
  };

  // 6. Funcion Editar
  const editar = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'cria', edicionId), {
        nom_cria: nombre,
        nom_pa: nomPa,
        genero_cria: genero,
        fechaNa_cria: fechaNa,
        fechaVac_cria: fechaVac,
        fechaDesp_cria: fechaDesp,
        peso_cria: peso,
      });
      const arrayEditar = crias.map((item: any) => (
        item.id === edicionId ? {
          id: item.id,
          nom_cria: nombre,
          nom_pa: nomPa,
          genero_cria: genero,
          fechaNa_cria: fechaNa,
          fechaVac_cria: fechaVac,
          fechaDesp_cria: fechaDesp,
          peso_cria: peso,
        } : item
      ));
      setCrias(arrayEditar);
      setEdicion(false);
      setNombre('');
      setNomPa('');
      setGenero('');
      setFechaNa('');
      setFechaVac('');
      setFechaDesp('');
      setPeso('');
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
      <h1 className="text-center mt-3">GESTION DE CRIAS</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Nombre Padron</th>
                <th>Genero</th>
                <th>Fecha Na.</th>
                <th>Fecha Vac.</th>
                <th>Fecha Desp.</th>
                <th>Peso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {crias.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.nom_cria}</td>
                  <td>{item.nom_pa}</td>
                  <td>{item.genero_cria}</td>
                  <td>{item.fechaNa_cria}</td>
                  <td>{item.fechaVac_cria}</td>
                  <td>{item.fechaDesp_cria}</td>
                  <td>{item.peso_cria}</td>
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
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              autoFocus
            />
            <TextField id="outlined-basic" label="Nombre del Padron" variant="outlined"
              className="form-control mb-2"
              placeholder="Nombre del Padron"
              onChange={(e) => setNomPa(e.target.value)}
              value={nomPa}
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
            <TextField id="outlined-basic" label="Peso de la Cria" variant="outlined"
              className="form-control mb-2"
              placeholder="Peso de la Cria"
              onChange={(e) => setPeso(e.target.value)}
              value={peso}
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

export default Crias;
