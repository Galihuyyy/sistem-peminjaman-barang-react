import axios, { getAdapter } from 'axios'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/fragments/Navbar'

function FormUpdateAdmin() {

    const id = useParams().id
    const token = getToken()
    const apiUrl = config.API_URL
    
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    gender: '',
    no_telp: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function getDetailAdmin () {
    axios.get(`${apiUrl}/home/admin/${id}`, {headers : {Authorization : `Bearer ${token}`}})
    .then(res => {
        console.log(res.data)
        setFormData({
            username : res.data.username,
            email : res.data.email,
            name : res.data.profile.name,
            gender : res.data.profile.gender,
            no_telp : res.data.profile.no_telp
        })
    })
    .catch(err => {
        console.log(err)
    })
  }

  useEffect(() => {
    getDetailAdmin()
  }, [])

  function updateAdmin () {
    axios.put(`${apiUrl}/home/admin/${id}`, formData, {
        headers : {Authorization : `Bearer ${token}`}
    })
    .then(res => {
        window.location.href = "/admin"
    })
    .catch(err => {
        console.log(err.response.data);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirm_password) {
      return setError('Password dan Konfirmasi Password tidak sama!')
    }

    setError('')
    console.log('Data terkirim:', formData)

    updateAdmin()
  }

  return (
    <div className="pt-20">
        <Navbar/>
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h2 className="text-2xl font-semibold mb-4 cursor-pointer" onClick={() => {window.location.href = '/admin'}}><i className="bi bi-caret-left"></i> Update Admin </h2>

        {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="username">Username</label>
            <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
            />

            <label htmlFor="email">Email</label>
            <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
            />

            <label htmlFor="name">Name</label>
            <input
            type="text"
            name="name"
            id='name'
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
            />


            <label htmlFor="gender">Gender</label>
            <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
            >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="pria">pria</option>
            <option value="wanita">wanita</option>
            </select>

            <label htmlFor="no_telp">No Telepon</label>
            <input
            type="text"
            name="no_telp"
            id="no_telp"
            placeholder="Nomor Telepon"
            value={formData.no_telp}
            onChange={handleChange}
            className="mb-3 w-full border px-3 py-2 rounded"
            required
            />

            <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
            Simpan
            </button>
        </form>
        </div>
    </div>

  )
}

export default FormUpdateAdmin
