import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'CRUD',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Actores Crud',
        to: '/actores',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Sexos Crud',
        to: '/sexos',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Socios Crud',
        to: '/socios',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Formatos Crud',
        to: '/formatos',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Generos Crud',
        to: '/generos',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Directores Crud',
        to: '/directores',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Papeles Crud',
        to: '/papeles',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Peliculas Crud',
        to: '/peliculas',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Alquieres Crud',
        to: '/alquileres',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
