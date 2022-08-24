/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8080/backend/actores/'
const URLSEXO = 'http://localhost:8080/backend/sexos/'

export default function actoresView() {
  const [data, setData] = useState([])
  const [sexos, setSexos] = useState([])

  var range = 0

  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const [inputText, setInputText] = useState('')

  const [actorSeleccionado, setActorSeleccionado] = useState({
    nombre: '',
    sex_id: 0,
  })

  const seleccionarActor = (actor) => {
    setActorSeleccionado(actor)
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setActorSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const listarSexos = async () => {
    await axios.get(URLSEXO).then((response) => {
      setSexos(response.data)
    })
  }

  const listarGet = async () => {
    await axios.get(URL).then((response) => {
      setData(response.data)
    })
  }
  function reset() {
    actorSeleccionado.id = 0
    actorSeleccionado.nombre = ''
    actorSeleccionado.sex_id = 0
    listarGet()
  }
  const agregarPost = async () => {
    actorSeleccionado.id = 0
    await axios.post(URL, actorSeleccionado).then((response) => {
      setData(data.concat(response.data))
    })
    reset()
  }

  const editarPut = async () => {
    await axios.put(URL + actorSeleccionado.id, actorSeleccionado).then((response) => {
      listarGet()
    })
    reset()
  }

  const borrarDelete = async () => {
    await axios.delete(URL + actorSeleccionado.id).then((response) => {
      setData(data.filter((actor) => actor.id !== actorSeleccionado.id))
    })
    reset()
    setPage(0)
  }

  useEffect(() => {
    listarSexos()
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
                      <h4>Lista de Actores </h4>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="inputText"
                        name="inputText"
                        className="form-control"
                        placeholder="Buscar Actores"
                        onChange={inputHandler}
                      />
                    </div>
                    <button
                      className="btn btn-sm btn-info"
                      data-toggle="modal"
                      data-target="#createDataModal"
                    >
                      <CIcon icon={cilPlus} /> Crear Actor
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
                          <th>Sexo</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter((actor) => {
                            var actorFilter
                            if (inputText === '') {
                              actorFilter = actor
                            } else if (actor.nombre.toLowerCase().includes(inputText)) {
                              actorFilter = actor
                            }
                            return actorFilter
                          })
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((actor) => (
                            <tr key={actor.id}>
                              <td>{actor.id}</td>
                              <td>{actor.nombre}</td>
                              <td>{sexos[actor.sex_id - 1].nombre}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#updateDataModal"
                                  onClick={() => seleccionarActor(actor)}
                                >
                                  <CIcon icon={cilPencil} /> Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  data-toggle="modal"
                                  data-target="#deleteDataModal"
                                  onClick={() => seleccionarActor(actor)}
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
                Crear Actor
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
                    value={actorSeleccionado.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sex_id" />
                  <select
                    className="form-control"
                    id="sex_id"
                    name="sex_id"
                    onChange={handleChange}
                    value={actorSeleccionado.sex_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {sexos.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>
                        {sexo.nombre}
                      </option>
                    ))}
                  </select>
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
                Editar Actor
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
                    value={actorSeleccionado.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sex_id" />
                  <select
                    className="form-control"
                    id="sex_id"
                    name="sex_id"
                    onChange={handleChange}
                    value={actorSeleccionado.sex_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {sexos.map((sexo) => (
                      <option key={sexo.id} value={sexo.id}>
                        {sexo.nombre}
                      </option>
                    ))}
                  </select>
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
                Eliminar Actor
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Realmente desea eliminar el Actor: {actorSeleccionado.nombre} ?</h4>
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
