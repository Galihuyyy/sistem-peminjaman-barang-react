import axios from 'axios'
import React, { useState } from 'react'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'

function FormCreateAdmin() {

    const token = getToken()
    const apiUrl = config.API_URL
    
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '',
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

  function tambahAdmin () {
    axios.post(`${apiUrl}/home/admin`, formData, {
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

    tambahAdmin()
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Tambah Admin </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Nama Lengkap"
          value={formData.name}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Pilih Jenis Kelamin</option>
          <option value="pria">pria</option>
          <option value="wanita">wanita</option>
        </select>

        <input
          type="text"
          name="no_telp"
          placeholder="Nomor Telepon"
          value={formData.no_telp}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="mb-3 w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Konfirmasi Password"
          value={formData.confirm_password}
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
  )
}

export default FormCreateAdmin
