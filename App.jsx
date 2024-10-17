// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App
