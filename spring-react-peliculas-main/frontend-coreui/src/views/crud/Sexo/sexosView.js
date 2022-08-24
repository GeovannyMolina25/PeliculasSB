/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8080/backend/sexos/'

export default function sexosView() {
  const [data, setData] = useState([])

  var range = 0

  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const [inputText, setInputText] = useState('')

  const [sexoSeleccionado, setSexoSeleccionado] = useState({
    nombre: '',
  })

  const seleccionarSexo = (sexo) => {
    setSexoSeleccionado(sexo)
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSexoSeleccionado((prevState) => ({
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
    sexoSeleccionado.id = 0
    sexoSeleccionado.nombre = ''
    listarGet()
  }
  const agregarPost = async () => {
    sexoSeleccionado.id = 0
    await axios.post(URL, sexoSeleccionado).then((response) => {
      setData(data.concat(response.data))
    })
    reset()
  }

  const editarPut = async () => {
    await axios.put(URL + sexoSeleccionado.id, sexoSeleccionado).then((response) => {
      listarGet()
    })
    reset()
  }

  const borrarDelete = async () => {
    await axios.delete(URL + sexoSeleccionado.id).then((response) => {
      setData(data.filter((sexo) => sexo.id !== sexoSeleccionado.id))
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
                      <h4>Lista de Sexos </h4>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="inputText"
                        name="inputText"
                        className="form-control"
                        placeholder="Buscar Sexos"
                        onChange={inputHandler}
                      />
                    </div>
                    <button
                      className="btn btn-sm btn-info"
                      data-toggle="modal"
                      data-target="#createDataModal"
                    >
                      <CIcon icon={cilPlus} /> Crear Sexo
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                      <thead className="thead">
                        <tr>
                          <td>Id</td>
                          <th>Nombre</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter((sexo) => {
                            var sexoFilter
                            if (inputText === '') {
                              sexoFilter = sexo
                            } else if (sexo.nombre.toLowerCase().includes(inputText)) {
                              sexoFilter = sexo
                            }
                            return sexoFilter
                          })
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((sexo) => (
                            <tr key={sexo.id}>
                              <td>{sexo.id}</td>
                              <td>{sexo.nombre}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#updateDataModal"
                                  onClick={() => seleccionarSexo(sexo)}
                                >
                                  <CIcon icon={cilPencil} /> Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  data-toggle="modal"
                                  data-target="#deleteDataModal"
                                  onClick={() => seleccionarSexo(sexo)}
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
                Crear Sexo
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={sexoSeleccionado.nombre}
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
                Editar Sexo
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={sexoSeleccionado.nombre}
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
                Eliminar Sexo
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Realmente desea eliminar el Sexo: {sexoSeleccionado.nombre} ?</h4>
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
