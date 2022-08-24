/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8080/backend/actorpeliculas/'
const URLACTORES = 'http://localhost:8080/backend/actores/'
const URLPELICULAS = 'http://localhost:8080/backend/peliculas/'

export default function actorPeliculaPeliculasView() {
  const [data, setData] = useState([])
  const [actores, setActores] = useState([])
  const [peliculas, setPeliculas] = useState([])

  var range = 0

  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const [inputText, setInputText] = useState('')

  const [actorPeliculaSeleccionado, setActorPeliculaSeleccionado] = useState({
    act_id: 0,
    pel_id: 0,
    papel: '',
  })

  const seleccionarActorPelicula = (actorPelicula) => {
    setActorPeliculaSeleccionado(actorPelicula)
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setActorPeliculaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const listarGet = async () => {
    await axios.get(URL).then((response) => {
      setData(response.data)
    })
  }

  const listarActores = async () => {
    await axios.get(URLACTORES).then((response) => {
      setActores(response.data)
    })
  }

  const listarPeliculas = async () => {
    await axios.get(URLPELICULAS).then((response) => {
      setPeliculas(response.data)
    })
  }

  function reset() {
    actorPeliculaSeleccionado.id = 0
    actorPeliculaSeleccionado.act_id = 0
    actorPeliculaSeleccionado.pel_id = 0
    actorPeliculaSeleccionado.papel = ''
    listarGet()
  }

  const agregarPost = async () => {
    actorPeliculaSeleccionado.id = 0
    await axios.post(URL, actorPeliculaSeleccionado).then((response) => {
      setData(data.concat(response.data))
    })
    reset()
  }

  const editarPut = async () => {
    await axios
      .put(URL + actorPeliculaSeleccionado.id, actorPeliculaSeleccionado)
      .then((response) => {
        listarGet()
      })
    reset()
  }

  const borrarDelete = async () => {
    await axios.delete(URL + actorPeliculaSeleccionado.id).then((response) => {
      setData(data.filter((actorPelicula) => actorPelicula.id !== actorPeliculaSeleccionado.id))
    })
    reset()
    setPage(0)
  }

  useEffect(() => {
    listarPeliculas()
    listarActores()
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
                      <h4>Lista de Papeles </h4>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="inputText"
                        name="inputText"
                        className="form-control"
                        placeholder="Buscar Papeles"
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
                          <th>Actor</th>
                          <th>Pelicula</th>
                          <th>Papel</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter((actorPelicula) => {
                            var actorPeliculaFilter
                            if (inputText === '') {
                              actorPeliculaFilter = actorPelicula
                            } else if (actorPelicula.papel.toLowerCase().includes(inputText)) {
                              actorPeliculaFilter = actorPelicula
                            }
                            return actorPeliculaFilter
                          })
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((actorPelicula) => (
                            <tr key={actorPelicula.id}>
                              <td>{actorPelicula.id}</td>
                              <td>
                                {actores
                                  .filter((actor) => {
                                    var filter
                                    if (actor.id === actorPelicula.act_id) {
                                      filter = actor
                                    }
                                    return filter
                                  })
                                  .map((actor) => {
                                    return actor.nombre
                                  })}
                              </td>
                              <td>
                                {peliculas
                                  .filter((pelicula) => {
                                    var filter
                                    if (pelicula.id === actorPelicula.pel_id) {
                                      filter = pelicula
                                    }
                                    return filter
                                  })
                                  .map((pelicula) => {
                                    return pelicula.nombre
                                  })}
                              </td>
                              <td>{actorPelicula.papel}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#updateDataModal"
                                  onClick={() => seleccionarActorPelicula(actorPelicula)}
                                >
                                  <CIcon icon={cilPencil} /> Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  data-toggle="modal"
                                  data-target="#deleteDataModal"
                                  onClick={() => seleccionarActorPelicula(actorPelicula)}
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
                Crear ActorPelicula
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="act_id" />
                  <select
                    className="form-control"
                    id="act_id"
                    name="act_id"
                    onChange={handleChange}
                    value={actorPeliculaSeleccionado.act_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {actores.map((actor) => (
                      <option key={actor.id} value={actor.id}>
                        {actor.nombre}
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
                    value={actorPeliculaSeleccionado.pel_id}
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
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="papel"
                    name="papel"
                    placeholder="Papel"
                    value={actorPeliculaSeleccionado.papel}
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
                Editar ActorPelicula
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="act_id" />
                  <select
                    className="form-control"
                    id="act_id"
                    name="act_id"
                    onChange={handleChange}
                    value={actorPeliculaSeleccionado.act_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {actores.map((actor) => (
                      <option key={actor.id} value={actor.id}>
                        {actor.nombre}
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
                    value={actorPeliculaSeleccionado.pel_id}
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
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="papel"
                    name="papel"
                    placeholder="Papel"
                    value={actorPeliculaSeleccionado.papel}
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
              <h4>Realmente desea eliminar el Papel ?</h4>
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
