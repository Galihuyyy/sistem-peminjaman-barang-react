import React, { useEffect, useState } from 'react'
import Navbar from '../../components/fragments/Navbar'
import { ProductList } from '../../components/pages/ProductList'
import Alat from '../../components/pages/Alat'

export const Home = () => {

  const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))
  const role = localStorage.getItem('role') || sessionStorage.getItem('role')


  
  return (
    <div className='font-[poppins] bg-neutral-100'>
        <Navbar/>
        
        {role == "siswa" &&
          <ProductList/>
        }
        
        {role == "admin" && 
          <Alat/>
        }
    </div>
  )
}
