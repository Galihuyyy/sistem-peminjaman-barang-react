import React, { useEffect, useState } from 'react'
import Navbar from '../../components/fragments/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import { toast, ToastContainer } from 'react-toastify'

function FormUpdate() {
  const { id } = useParams()
  const token = getToken()
  const apiUrl = config.API_URL

  const [formData, setFormData] = useState({
    name : '',
    deskripsi : '',
    stok : '',
    keterangan : '',
  })


  function getDetailAlat () {
    axios
      .get(`${apiUrl}/home/alat/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const alat = res.data.data.alat
        setFormData({
          name : alat.name,
          deskripsi : alat.deskripsi,
          stok : alat.stok,
          keterangan : alat.keterangan,
        });
      })
      .catch((err) => {
        toast.error('Gagal mengambil data alat!')
        console.error(err)
      })
  }
  
  useEffect(() => {
    getDetailAlat()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleFileChange(e) {
    setFormData((prev) => ({
      ...prev,
      foto_produk: e.target.files
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const toastId = toast.loading('Menyimpan Perubahan...')

    const data = new FormData()
    data.append('name', formData.name)
    data.append('deskripsi', formData.deskripsi)
    data.append('stok', formData.stok)
    data.append('keterangan', formData.keterangan)
    if (formData.foto_produk && formData.foto_produk.length > 0) {
      for (let i = 0; i < formData.foto_produk.length; i++) {
        data.append('foto_produk[]', formData.foto_produk[i])
      }
    }

    axios
      .post(`${apiUrl}/home/alat/${id}?_method=PUT`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        toast.update(toastId, {
          type: 'success',
          render: res.data?.message || 'Berhasil Diperbarui!',
          isLoading: false,
          autoClose: true,
          closeButton: true
        })
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      })
      .catch((err) => {
        toast.update(toastId, {
          type: 'error',
          render: err.response?.data?.message || 'Gagal Diperbarui!',
          isLoading: false,
          autoClose: true,
          closeButton: true
        })
      })
  }

  return (
    <div className="sm:pt-28">
      <ToastContainer position="top-center" theme="colored" />
      <Navbar />
      <div className="w-full max-w-xl mx-auto p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          <i
            onClick={() => {
              window.location.href = '/'
            }}
            className="bi bi-caret-left cursor-pointer"
          ></i>{' '}
          Edit Alat
        </h2>
        <form
          className="space-y-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {/* Nama Alat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Alat
            </label>
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={(e) => {handleChange(e)}}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Masukkan nama alat"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              rows={4}
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tulis deskripsi alat"
              required
            ></textarea>
          </div>

          {/* Stok */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stok
            </label>
            <input
              type="number"
              name="stok"
              value={formData.stok}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Jumlah stok"
              required
            />
          </div>

          {/* Keterangan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keterangan
            </label>
            <select
              value={formData.keterangan}
              name="keterangan"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Pilih status</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Aman">Aman</option>
              <option value="Rusak">Rusak</option>
            </select>
          </div>

          {/* Foto */}
          <div>
            <label
              htmlFor="foto_produk"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Ulang Foto (opsional)
            </label>
            <input
              type="file"
              name="foto_produk"
              multiple
              id="foto_produk"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormUpdate
