import React from 'react'

import actoresView from './views/crud/Actor/actoresView'
import actorPeliculaPeliculasView from './views/crud/ActorPelicula/actorPeliculasView'
import alquileresView from './views/crud/Alquiler/alquileresView'
import directoresView from './views/crud/Director/directoresView'
import formatosView from './views/crud/Formato/formatosView'
import generosView from './views/crud/Genero/generosView'
import peliculasView from './views/crud/Pelicula/peliculasView'
import sexosView from './views/crud/Sexo/sexosView'
import sociosView from './views/crud/Socio/sociosView'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // ------------------------------------------------------------------------------------------------------------------------------ CRUDS
  { path: '/actores', name: 'Crud Actores', element: actoresView },
  { path: '/sexos', name: 'Crud Sexos', element: sexosView },
  { path: '/socios', name: 'Crud Socios', element: sociosView },
  { path: '/formatos', name: 'Crud Formatos', element: formatosView },
  { path: '/generos', name: 'Crud Generos', element: generosView },
  { path: '/directores', name: 'Crud Directores', element: directoresView },
  { path: '/papeles', name: 'Crud Papeles', element: actorPeliculaPeliculasView },
  { path: '/peliculas', name: 'Crud Peliculas', element: peliculasView },
  { path: '/alquileres', name: 'Crud Alquileres', element: alquileresView },
  // ----------------------------------------------------------------------------------------------------------------------------- !CRUDS
]

export default routes
