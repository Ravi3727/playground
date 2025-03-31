import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/homePageSections/Footer'
import JoinComm from './components/homePageSections/JoinComm'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Outlet />
    

      
    </>
  )
}

export default Layout
