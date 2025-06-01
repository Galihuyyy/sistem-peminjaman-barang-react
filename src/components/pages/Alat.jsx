import React, { useEffect, useState } from 'react'
import Navbar from '../../components/fragments/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import { toast, ToastContainer } from 'react-toastify'
import AdminPage from '../Layout/AdminPage'

function FormUpdate() {
  const { id } = useParams()
  const token = getToken()
  const apiUrl = config.API_URL

  const [dataAlatTersedia, setDataAlatTersedia] = useState([])
  const [dataAlatTidakTersedia, setDataAlatTidakTersedia] = useState([])

  function getDataAlat () {
    axios.get(`${apiUrl}/home/alat`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setDataAlatTidakTersedia(res.data.data.alat_tidak_tersedia)
        setDataAlatTersedia(res.data.data.alat_tersedia)
      })
      .catch((err) => {
        toast.error('Gagal mengambil data alat!')
        console.error(err)
      })
  }

  function deleteAlat (id) {

    const yakin = confirm("anda yakin ingin menghapus alat ini?")
    if (!yakin) {
      return
    }
    
    axios.delete(`${apiUrl}/home/alat/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getDataAlat()
  }, [])

  return (
    <AdminPage>
        <div className="pt-4">
            <p className="text-xl font-semibold text-neutral-600">Manajemen Alat</p>
            <button className="btn btn-sm btn-primary" onClick={() => {window.location.href = '/tambah/alat'}}><i className="bi bi-plus"></i> Tambah Alat</button>
            <div className="w-auto overflow-x-auto mt-4">
                <table className="min-w-[600px] w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase">
                    <tr>
                        <th className="px-4 py-2 border">No</th>
                        <th className="px-4 py-2 border">Foto Alat</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Deskripsi</th>
                        <th className="px-4 py-2 border">Stok</th>
                        <th className="px-4 py-2 border">Keterangan</th>
                        <th className="px-4 py-2 border">Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...dataAlatTersedia, ...dataAlatTidakTersedia].map((item, i) => (
                      <tr key={i} className={`hover:bg-gray-50 ${item.stok < 1 ? "bg-red-200 hover:bg-red-300" : ""}`}>
                          <td className="px-4 py-2 border">{i + 1}</td>
                          <td className="px-4 py-2 border">
                              <img src={item.foto_alat[0].foto} className="max-w-22" />
                          </td>
                          <td className="px-4 py-2 border">{item.name}</td>
                          <td className="px-4 py-2 border">{item.deskripsi}</td>
                          <td className="px-4 py-2 border">{item.stok}</td>
                          <td className="px-4 py-2 border">{item.keterangan}</td>
                          <td className="px-4 py-2 border">
                              <div className="flex items-center gap-x-2">
                                  <button onClick={() => {window.location.href = `/alat/${item.id}`}} className="btn btn-sm btn-success">
                                      <i className="bi bi-pencil"></i>
                                  </button>
                                  <button onClick={() => {deleteAlat(item.id)}} className="btn btn-sm btn-danger">
                                      <i className="bi bi-trash"></i>
                                  </button>
                              </div>
                          </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
            </div>

        </div>
    </AdminPage>
  )
}

export default FormUpdate
