/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const URL = 'http://localhost:8080/backend/peliculas/'

const URLGENEROS = 'http://localhost:8080/backend/generos/'
const URLDIRECTORES = 'http://localhost:8080/backend/directores/'
const URLFORMATOS = 'http://localhost:8080/backend/formatos/'

export default function peliculasView() {
  const [data, setData] = useState([])
  const [generos, setGeneros] = useState([])
  const [directores, setDirectores] = useState([])
  const [formatos, setFormatos] = useState([])

  var range = 0

  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const [inputText, setInputText] = useState('')

  const [peliculaSeleccionado, setPeliculaSeleccionado] = useState({
    gen_id: 0,
    dir_id: 0,
    for_id: 0,
    nombre: '',
    costo: 0,
    estreno: '',
  })

  const seleccionarPelicula = (pelicula) => {
    setPeliculaSeleccionado(pelicula)
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPeliculaSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const listarGet = async () => {
    await axios.get(URL).then((response) => {
      setData(response.data)
    })
  }

  const listarGeneros = async () => {
    await axios.get(URLGENEROS).then((response) => {
      setGeneros(response.data)
    })
  }

  const listarDirectores = async () => {
    await axios.get(URLDIRECTORES).then((response) => {
      setDirectores(response.data)
    })
  }

  const listarFormatos = async () => {
    await axios.get(URLFORMATOS).then((response) => {
      setFormatos(response.data)
    })
  }

  function reset() {
    peliculaSeleccionado.id = 0
    peliculaSeleccionado.gen_id = 0
    peliculaSeleccionado.dir_id = 0
    peliculaSeleccionado.for_id = 0
    peliculaSeleccionado.nombre = ''
    peliculaSeleccionado.costo = 0
    peliculaSeleccionado.estreno = ''
    listarGet()
  }

  const agregarPost = async () => {
    peliculaSeleccionado.id = 0
    await axios.post(URL, peliculaSeleccionado).then((response) => {
      setData(data.concat(response.data))
    })
    reset()
  }

  const editarPut = async () => {
    await axios.put(URL + peliculaSeleccionado.id, peliculaSeleccionado).then((response) => {
      listarGet()
    })
    reset()
  }

  const borrarDelete = async () => {
    await axios.delete(URL + peliculaSeleccionado.id).then((response) => {
      setData(data.filter((pelicula) => pelicula.id !== peliculaSeleccionado.id))
    })
    reset()
    setPage(0)
  }

  useEffect(() => {
    listarDirectores()
    listarFormatos()
    listarGeneros()
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
                      <h4>Lista de Peliculas </h4>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="inputText"
                        name="inputText"
                        className="form-control"
                        placeholder="Buscar Peliculas"
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
                          <th>Genero</th>
                          <th>Director</th>
                          <th>Formato</th>
                          <th>Nombre</th>
                          <th>Costo</th>
                          <th>Estreno</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data
                          .filter((pelicula) => {
                            var peliculaFilter
                            if (inputText === '') {
                              peliculaFilter = pelicula
                            } else if (pelicula.papel.toLowerCase().includes(inputText)) {
                              peliculaFilter = pelicula
                            }
                            return peliculaFilter
                          })
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((pelicula) => (
                            <tr key={pelicula.id}>
                              <td>{pelicula.id}</td>
                              <td>
                                {generos
                                  .filter((genero) => {
                                    var filter
                                    if (genero.id === pelicula.gen_id) {
                                      filter = genero
                                    }
                                    return filter
                                  })
                                  .map((genero) => {
                                    return genero.nombre
                                  })}
                              </td>
                              <td>
                                {directores
                                  .filter((director) => {
                                    var filter
                                    if (director.id === pelicula.dir_id) {
                                      filter = director
                                    }
                                    return filter
                                  })
                                  .map((director) => {
                                    return director.nombre
                                  })}
                              </td>
                              <td>
                                {formatos
                                  .filter((formato) => {
                                    var filter
                                    if (formato.id === pelicula.for_id) {
                                      filter = formato
                                    }
                                    return filter
                                  })
                                  .map((formato) => {
                                    return formato.nombre
                                  })}
                              </td>
                              <td>{pelicula.nombre}</td>
                              <td>{pelicula.costo}</td>
                              <td>{pelicula.estreno}</td>
                              <td className="d-flex justify-content-around">
                                <button
                                  className="btn btn-info btn-sm"
                                  data-toggle="modal"
                                  data-target="#updateDataModal"
                                  onClick={() => seleccionarPelicula(pelicula)}
                                >
                                  <CIcon icon={cilPencil} /> Editar
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  data-toggle="modal"
                                  data-target="#deleteDataModal"
                                  onClick={() => seleccionarPelicula(pelicula)}
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
                Crear Pelicula
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="gen_id" />
                  <select
                    className="form-control"
                    id="gen_id"
                    name="gen_id"
                    onChange={handleChange}
                    value={peliculaSeleccionado.gen_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {generos.map((genero) => (
                      <option key={genero.id} value={genero.id}>
                        {genero.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dir_id" />
                  <select
                    className="form-control"
                    id="dir_id"
                    name="dir_id"
                    onChange={handleChange}
                    value={peliculaSeleccionado.dir_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {directores.map((director) => (
                      <option key={director.id} value={director.id}>
                        {director.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="for_id" />
                  <select
                    className="form-control"
                    id="for_id"
                    name="for_id"
                    onChange={handleChange}
                    value={peliculaSeleccionado.for_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {formatos.map((formato) => (
                      <option key={formato.id} value={formato.id}>
                        {formato.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="nombre"
                    value={peliculaSeleccionado.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="costo" />
                  <input
                    type="number"
                    className="form-control"
                    id="costo"
                    name="costo"
                    placeholder="costo"
                    value={peliculaSeleccionado.costo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="estreno" />
                  <input
                    type="date"
                    className="form-control"
                    id="estreno"
                    name="estreno"
                    placeholder="estreno"
                    value={peliculaSeleccionado.estreno}
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
                Editar Pelicula
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="gen_id" />
                  <select
                    className="form-control"
                    id="gen_id"
                    name="gen_id"
                    onChange={handleChange}
                    value={peliculaSeleccionado.gen_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {generos.map((genero) => (
                      <option key={genero.id} value={genero.id}>
                        {genero.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dir_id" />
                  <select
                    className="form-control"
                    id="dir_id"
                    name="dir_id"
                    onChange={handleChange}
                    value={peliculaSeleccionado.dir_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {directores.map((director) => (
                      <option key={director.id} value={director.id}>
                        {director.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="for_id" />
                  <select
                    className="form-control"
                    id="for_id"
                    name="for_id"
                    onChange={handleChange}
                    value={peliculaSeleccionado.for_id}
                  >
                    <option value={0}>-Seleccione-</option>
                    {formatos.map((formato) => (
                      <option key={formato.id} value={formato.id}>
                        {formato.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="nombre" />
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="nombre"
                    value={peliculaSeleccionado.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="costo" />
                  <input
                    type="number"
                    className="form-control"
                    id="costo"
                    name="costo"
                    placeholder="costo"
                    value={peliculaSeleccionado.costo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="estreno" />
                  <input
                    type="date"
                    className="form-control"
                    id="estreno"
                    name="estreno"
                    placeholder="estreno"
                    value={peliculaSeleccionado.estreno}
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
              <h4>Realmente desea eliminar la Pelicula: {peliculaSeleccionado.nombre} ?</h4>
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
