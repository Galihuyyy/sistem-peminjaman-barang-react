import React from 'react'
import Navbar from '../../components/fragments/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import { toast, ToastContainer } from 'react-toastify'

function Form() {
    const fitur = useParams().record
    const token = getToken()
    const apiUrl = config.API_URL

    const [formData, setFormData] = useState({
    name: '',
    deskripsi: '',
    stok: '',
    keterangan: '',
    foto_produk: []
    })

    function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))
    }

    function handleFileChange(e) {
    setFormData(prev => ({
        ...prev,
        foto_produk: e.target.files
    }))
    }

    function handleSubmit(e) {

        e.preventDefault()
        const toastId = toast.loading("Menambahkan Alat...");
        
        const data = new FormData()
        data.append('name', formData.name)
        data.append('deskripsi', formData.deskripsi)
        data.append('stok', formData.stok)
        data.append('keterangan', formData.keterangan)
        for (let i = 0; i < formData.foto_produk.length; i++) {
            data.append('foto_produk[]', formData.foto_produk[i]); 
        }


        axios.post(`${apiUrl}/home/alat`, data, {headers :{Authorization : `Bearer ${token}`}})
        .then(res => {
            toast.update(toastId, {
                type : 'success',
                render : res.data?.message || 'Berhasil Ditambahkan!',
                isLoading : false,
                hideProgressBar : false,
                autoClose : true,
                closeOnClick : true,
                closeButton : true
            })
            setTimeout(function() {
                window.location.reload()
            }, 1000);
        })
        .catch(err => {
            toast.update(toastId, {
                type : 'error',
                render : err.response.data?.message || 'Gagal Ditambahkan!',
                isLoading : false,
                hideProgressBar : false,
                autoClose : true,
                closeButton : true
            })
        })
    }
  return (
    
    <div className="sm:pt-28">
        <ToastContainer 
            position='top-center'
            theme='colored'
        />
        <Navbar/>
        <div className="w-full max-w-xl mx-auto p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4"><i onClick={() => {window.location.href = "/"}} className="bi bi-caret-left cursor-pointer"></i> Tambahkan {fitur}</h2>
        <form className="space-y-4" encType='multiple' onSubmit={(e) => {handleSubmit(e)}}>
            {/* Nama Alat */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Alat</label>
            <input
                type="text"
                value={formData.name}
                name='name'
                onChange={(e) => {handleChange(e)}}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Masukkan nama alat"
            />
            </div>

            {/* Deskripsi */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
                rows={4}
                name='deskripsi'
                value={formData.deskripsi}
                onChange={(e) => {handleChange(e)}}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tulis deskripsi alat"
            ></textarea>
            </div>

            {/* Stok */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
            <input
                type="number"
                name='stok'
                value={formData.stok}
                onChange={(e) => {handleChange(e)}}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Jumlah stok"
            />
            </div>

            {/* Keterangan */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
            <select value={formData.keterangan} name='keterangan' onChange={(e) => {handleChange(e)}} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Pilih status</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Aman">Aman</option>
                <option value="Rusak">Rusak</option>
            </select>

            {/* foto_alat */}
            <div className='mt-4'>
                <label htmlFor="foto_alat" className="block text-sm font-medium text-gray-700 mb-1">
                    Foto Alat
                </label>
                <input
                    type="file"
                    name="foto_produk"
                    multiple
                    id="foto_produk"
                    onChange={(e) => {handleFileChange(e)}}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100
                    focus:outline-none"
                />
            </div>

            </div>

            {/* Submit */}
            <div className="text-right">
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
                Simpan
            </button>
            </div>
        </form>
        </div>
    </div>

  )
}

export default Form
