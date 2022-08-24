/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8080/backend/alquilers/'

const URLSOCIOS = 'http://localhost:8080/backend/socios/'
const URLPELICULAS = 'http://localhost:8080/backend/peliculas/'

export default function alquileresView() {
  const [data, setData] = useState([])
  const [socios, setSocios] = useState([])
  const [peliculas, setPeliculas] = useState([])

  var range = 0

  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const [inputText, setInputText] = useState('')

  const [alquilerSeleccionado, setAlquilerSeleccionado] = useState({
    soc_id: 0,
    pel_id: 0,
    for_id: 0,
    desde: '',
    hasta: '',
    valor: 0,
    entrega: '',
  })

  const seleccionarAlquiler = (alquiler) => {
    setAlquilerSeleccionado(alquiler)
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAlquilerSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const listarGet = async () => {
    await axios.get(URL).then((response) => {
      setData(response.data)
    })
  }

  const listarSocios = async () => {
    await axios.get(URLSOCIOS).then((response) => {
      setSocios(response.data)
    })
  }

  const listarPeliculas = async () => {
    await axios.get(URLPELICULAS).then((response) => {
      setPeliculas(response.data)
    })
  }

  function reset() {
    alquilerSeleccionado.soc_id = 0
    alquilerSeleccionado.pel_id = 0
    alquilerSeleccionado.for_id = 0
    alquilerSeleccionado.desde = ''
    alquilerSeleccionado.hasta = ''
    alquilerSeleccionado.valor = 0
    alquilerSeleccionado.entrega = ''
    listarGet()
  }

  const agregarPost = async () => {
    alquilerSeleccionado.id = 0
    await axios.post(URL, alquilerSeleccionado).then((response) => {
      setData(data.concat(response.data))
    })
    reset()
  }

  const editarPut = async () => {
    await axios.put(URL + alquilerSeleccionado.id, alquilerSeleccionado).then((response) => {
      listarGet()
    })
    reset()
  }

  const borrarDelete = async () => {
    await axios.delete(URL + alquilerSeleccionado.id).then((response) => {
      setData(data.filter((alquiler) => alquiler.id !== alquilerSeleccionado.id))
    })
    reset()
    setPage(0)
  }

  useEffect(() => {
    listarPeliculas()
    listarSocios()
  }, [])

  useEffect(() => {
    listarGet()
  }, [inputText])

  range = Math.ceil(data.length / rowsPerPage)

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div className="float-left">
                      <h4>Lista de Alquilers </h4>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="inputText"
                        name="inputText"
                        className="form-control"
                        placeholder="Buscar Alquilers"
                        onChange={inputHandler}
                      />
                    </div>
                    <button
                      className="btn btn-sm btn-info"
                      data-toggle="modal"
                      data-target="#createDataModal"
                    >
                      <CIcon icon={cilPlus} /> Crear Papel
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                      <thead className="thead">
                        <tr>
                          <td>Id</td>
                          <th>Socio</th>
                          <th>Pelicula</th>
                          <th>Desde</th>
                          <th>Hasta</th>
                          <th>Valor</th>
                          <th>Entrega</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter((alquiler) => {
                            var alquilerFilter
                            if (inputText === '') {
                              alquilerFilter = alquiler
                            } else if (alquiler.papel.toLowerCase().includes(inputText)) {
                              alquilerFilter = alquiler
                            }
                            return alquilerFilter
                          })
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((alquiler) => (
                            <tr key={alquiler.id}>
                              <td>{alquiler.id}</td>
                              <td>
                                {socios
                                  .filter((socio) => {
                                    var filter
                                    if (socio.id === alquiler.soc_id) {
                                      filter = socio
                                    }
                                    return filter
                                  })
                                  .map((socio) => {
                                    return socio.nombre
                                  })}
                              </td>
                              <td>
                                {peliculas
                                  .filter((pelicula) => {
                                    var filter
                                    if (pelicula.id === alquiler.pel_id) {
                                      filter = pelicula
                                    }
                                    return filter
                                  })
                                  .map((pelicula) => {
                                    return pelicula.nombre
                                  })}
                              </td>
                              <td>{alquiler.desde}</td>
                              <td>{alquiler.hasta}</td>
                              <td>{alquiler.valor}</td>
                              <td>{alquiler.entrega}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#updateDataModal"
                                  onClick={() => seleccionarAlquiler(alquiler)}
                                >
                                  <CIcon icon={cilPencil} /> Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  data-toggle="modal"
                                  data-target="#deleteDataModal"
                                  onClick={() => seleccionarAlquiler(alquiler)}
                                >
                                  <CIcon icon={cilTrash} /> Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <nav>
                      <ul className="pagination">
                        <li className="page-item">
                          <button
                            className="page-link"
                            href="#"
                            onClick={() => {
                              page === 0 ? setPage(0) : setPage(page - 1)
                            }}
                          >
                            Anterior
                          </button>
                        </li>
                        <li className="page-item">
                          <button
                            className="page-link"
                            href="#"
                            onClick={() => {
                              page < range - 1 ? setPage(page + 1) : setPage(page)
                            }}
                          >
                            Siguiente
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL CREAR ----------------------------------------------------------------- */}
      <div
        className="modal fade"
        id="createDataModal"
        data-backdrop="static"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="createDataModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createDataModalLabel">
                Crear Alquiler
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="soc_id" />
                  <select
                    className="form-control"
                    id="soc_id"
                    name="soc_id"
                    onChange={handleChange}
                    value={alquilerSeleccionado.soc_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {socios.map((socio) => (
                      <option key={socio.id} value={socio.id}>
                        {socio.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="pel_id" />
                  <select
                    className="form-control"
                    id="pel_id"
                    name="pel_id"
                    onChange={handleChange}
                    value={alquilerSeleccionado.pel_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {peliculas.map((pelicula) => (
                      <option key={pelicula.id} value={pelicula.id}>
                        {pelicula.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="desde" />
                  <input
                    type="desde"
                    className="form-control"
                    id="desde"
                    name="desde"
                    placeholder="desde"
                    value={alquilerSeleccionado.desde}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hasta" />
                  <input
                    type="hasta"
                    className="form-control"
                    id="hasta"
                    name="hasta"
                    placeholder="hasta"
                    value={alquilerSeleccionado.hasta}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="valor" />
                  <input
                    type="number"
                    className="form-control"
                    id="valor"
                    name="valor"
                    placeholder="valor"
                    value={alquilerSeleccionado.valor}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="entrega" />
                  <input
                    type="entrega"
                    className="form-control"
                    id="entrega"
                    name="entrega"
                    placeholder="entrega"
                    value={alquilerSeleccionado.entrega}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary close-modal "
                data-dismiss="modal"
                onClick={() => agregarPost()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL ACTUALIZAR */}
      <div
        className="modal fade"
        id="updateDataModal"
        data-backdrop="static"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="updateDataModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateDataModalLabel">
                Editar Alquiler
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="soc_id" />
                  <select
                    className="form-control"
                    id="soc_id"
                    name="soc_id"
                    onChange={handleChange}
                    value={alquilerSeleccionado.soc_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {socios.map((socio) => (
                      <option key={socio.id} value={socio.id}>
                        {socio.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="pel_id" />
                  <select
                    className="form-control"
                    id="pel_id"
                    name="pel_id"
                    onChange={handleChange}
                    value={alquilerSeleccionado.pel_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {peliculas.map((pelicula) => (
                      <option key={pelicula.id} value={pelicula.id}>
                        {pelicula.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="desde" />
                  <input
                    type="desde"
                    className="form-control"
                    id="desde"
                    name="desde"
                    placeholder="desde"
                    value={alquilerSeleccionado.desde}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hasta" />
                  <input
                    type="hasta"
                    className="form-control"
                    id="hasta"
                    name="hasta"
                    placeholder="hasta"
                    value={alquilerSeleccionado.hasta}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="valor" />
                  <input
                    type="number"
                    className="form-control"
                    id="valor"
                    name="valor"
                    placeholder="valor"
                    value={alquilerSeleccionado.valor}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="entrega" />
                  <input
                    type="entrega"
                    className="form-control"
                    id="entrega"
                    name="entrega"
                    placeholder="entrega"
                    value={alquilerSeleccionado.entrega}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary close-modal"
                data-dismiss="modal"
                onClick={() => editarPut()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL ELIMINAR */}
      <div
        className="modal fade"
        id="deleteDataModal"
        data-backdrop="static"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="deleteDataModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteDataModalLabel">
                Eliminar Papel
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Realmente desea eliminar el Alquiler ?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">
                No
              </button>
              <button
                type="button"
                className="btn btn-primary close-modal"
                data-dismiss="modal"
                onClick={() => borrarDelete()}
              >
                Si
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
