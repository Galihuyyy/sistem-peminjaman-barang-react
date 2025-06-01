import React, { Children, useState } from 'react'
import Navbar from '../fragments/Navbar'
import { Link, NavLink } from 'react-router-dom'

function AdminPage(props) {
    const {children} = props
    const [sidebarOpen, setSidebarOpen] = useState(false)

    sidebarOpen ? "oke" : "ha"
  return (
    <div className='font-[poppins] bg-neutral-100'>
        <Navbar/>
        <div className="relative w-full flex items-center gap-x-2 pt-20 mx-auto text-neutral-800">
            <div className={`sidebar fixed top-20 ${sidebarOpen == true ? "max-sm:left-0" : "max-sm:-left-48"}  transition-all duration-200 ease-in-out border shadow-sm w-52 h-[calc(100vh-5rem)] bg-white rounded-r-md rounded-b-md`}>
                <ul className='ps-3 h-fit flex flex-col py-5 gap-y-5 items-start  '>
                    <li className='h-auto'><NavLink to="/" className={({ isActive }) => `pe-28 ps-2 rounded py-2 !no-underline ${ isActive ? "bg-indigo-500 text-white" : "bg-white !text-gray-600"}`} > Alat </NavLink> </li>
                    <li className='h-auto'><NavLink to="/admin" className={({ isActive }) => `pe-28 ps-2 rounded py-2 !no-underline ${ isActive ? "bg-indigo-500 text-white" : "bg-white !text-gray-600"}`} > Admin </NavLink> </li>
                    <li className='h-auto'><NavLink to="/peminjaman" className={({ isActive }) => `pe-6 ps-2 rounded py-2 !no-underline ${ isActive ? "bg-indigo-500 text-white" : "bg-white !text-gray-600"}`} > Peminjaman </NavLink> </li>
                </ul>
                <div onClick={() => {setSidebarOpen(!!!sidebarOpen)}} className="p-2 absolute sm:hidden rounded-pill top-3 left-[90%] bg-indigo-600">
                    <i className={`bi bi-caret-${sidebarOpen ? "left" : "right"} text-white`}></i>
                </div>
            </div>
            <main className='ps-12 sm:ps-56 max-w-full'>
                {children}
            </main>
        </div>
    </div>
  )
}

export default AdminPage