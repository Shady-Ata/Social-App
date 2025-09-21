import React from 'react'
import styles from './layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
export default function Layout() {
  return (
    <>
     <Navbar/>
     <Outlet/>
    </>
  )
}
