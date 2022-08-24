/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8080/backend/socios/'

export default function sociosView() {
  const [data, setData] = useState([])

  var range = 0

  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const [inputText, setInputText] = useState('')

  const [socioSeleccionado, setSocioSeleccionado] = useState({
    cedula: '',
    nombre: '',
    direccion: '',
    telefono: '',
    correo: '',
  })

  const seleccionarSocio = (socio) => {
    setSocioSeleccionado(socio)
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSocioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const listarGet = async () => {
    await axios.get(URL).then((response) => {
      setData(response.data)
    })
  }

  function reset() {
    socioSeleccionado.id = 0
    socioSeleccionado.cedula = ''
    socioSeleccionado.nombre = ''
    socioSeleccionado.direccion = ''
    socioSeleccionado.telefono = ''
    socioSeleccionado.correo = ''
    listarGet()
  }

  const agregarPost = async () => {
    socioSeleccionado.id = 0
    await axios.post(URL, socioSeleccionado).then((response) => {
      setData(data.concat(response.data))
    })
    reset()
  }

  const editarPut = async () => {
    await axios.put(URL + socioSeleccionado.id, socioSeleccionado).then((response) => {
      listarGet()
    })
    reset()
  }

  const borrarDelete = async () => {
    await axios.delete(URL + socioSeleccionado.id).then((response) => {
      setData(data.filter((socio) => socio.id !== socioSeleccionado.id))
    })
    reset()
    setPage(0)
  }

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
                      <h4>Lista de Socios </h4>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="inputText"
                        name="inputText"
                        className="form-control"
                        placeholder="Buscar Socios"
                        onChange={inputHandler}
                      />
                    </div>
                    <button
                      className="btn btn-sm btn-info"
                      data-toggle="modal"
                      data-target="#createDataModal"
                    >
                      <CIcon icon={cilPlus} /> Crear Socio
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                      <thead className="thead">
                        <tr>
                          <td>Id</td>
                          <td>Cedula</td>
                          <th>Nombre</th>
                          <th>Direccion</th>
                          <th>Telefono</th>
                          <th>Correo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter((socio) => {
                            var socioFilter
                            if (inputText === '') {
                              socioFilter = socio
                            } else if (socio.nombre.toLowerCase().includes(inputText)) {
                              socioFilter = socio
                            }
                            return socioFilter
                          })
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((socio) => (
                            <tr key={socio.id}>
                              <td>{socio.id}</td>
                              <td>{socio.cedula}</td>
                              <td>{socio.nombre}</td>
                              <td>{socio.direccion}</td>
                              <td>{socio.telefono}</td>
                              <td>{socio.correo}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#updateDataModal"
                                  onClick={() => seleccionarSocio(socio)}
                                >
                                  <CIcon icon={cilPencil} /> Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  data-toggle="modal"
                                  data-target="#deleteDataModal"
                                  onClick={() => seleccionarSocio(socio)}
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
                Crear Socio
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="cedula" />
                  <input
                    type="text"
                    className="form-control"
                    id="cedula"
                    name="cedula"
                    placeholder="Cedula"
                    value={socioSeleccionado.cedula}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={socioSeleccionado.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion" />
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    placeholder="Direccion"
                    value={socioSeleccionado.direccion}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono" />
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    placeholder="Telefono"
                    value={socioSeleccionado.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="correo" />
                  <input
                    type="text"
                    className="form-control"
                    id="correo"
                    name="correo"
                    placeholder="Correo"
                    value={socioSeleccionado.correo}
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
                Editar Socio
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="cedula" />
                  <input
                    type="text"
                    className="form-control"
                    id="cedula"
                    name="cedula"
                    placeholder="Cedula"
                    value={socioSeleccionado.cedula}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={socioSeleccionado.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion" />
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    placeholder="Direccion"
                    value={socioSeleccionado.direccion}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono" />
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    placeholder="Telefono"
                    value={socioSeleccionado.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="correo" />
                  <input
                    type="text"
                    className="form-control"
                    id="correo"
                    name="correo"
                    placeholder="Correo"
                    value={socioSeleccionado.correo}
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
                Eliminar Socio
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Realmente desea eliminar el Socio: {socioSeleccionado.nombre} ?</h4>
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
