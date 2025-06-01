import React, { useEffect, useState } from 'react'
import AdminPage from '../../components/Layout/AdminPage'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import axios from 'axios'

function Peminjaman() {

    const token = getToken()
    const apiUrl = config.API_URL

    const [dataPeminjaman, setDataPeminjaman] = useState([{
        peminjaman : {
            peminjam : {
                profile : {}
            }
        }
    }])

    const getPeminjaman = () => {
        axios.get(`${apiUrl}/transaksi/get`, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            console.log(res.data.data)
            setDataPeminjaman(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const accept = (trxid) => {

        let id = ''
        if (!trxid) {
            
            id = prompt("masukkan trx id")
            
            if (!id) {
                return
            }
        } else {
            id = trxid
        }

        axios.put(`${apiUrl}/admin/transaksi/konfirmasi/${id}`, {}, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    const kembalikan = (trxid) => {
        let id = ''
        if (!trxid) {
            
            id = prompt("masukkan trx id")
            
            if (!id) {
                return
            }
        } else {
            id = trxid
        }

        axios.put(`${apiUrl}/admin/transaksi/kembali/${id}`, {}, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    const hapusTrx = (id) => {

        const yakin = confirm(`yakin ingin hapus transaksi id ${id} ? `)

        if (!yakin) {
            return
        }
        
        axios.delete(`${apiUrl}/admin/transaksi/delete/${id}`, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        getPeminjaman()
    }, [])
    
  return (
    <AdminPage>
        <div className="pt-4">
            <p className="text-xl font-semibold text-neutral-600">Manajemen Peminjaman</p>
            <button className="btn btn-sm btn-primary" onClick={() => {accept()}}><i className="bi bi-check"></i> Setujui Peminjaman</button>
            <button className="btn btn-sm btn-primary ms-3" onClick={() => {kembalikan()}}><i className="bi bi-check"></i> Peminjaman Dikembalikan</button>
            <div className="w-auto overflow-x-auto mt-4">
                <table className="min-w-[600px] w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase">
                    <tr>
                        <th className="px-4 py-2 border">Trx Id</th>
                        <th className="px-4 py-2 border">Peminjam</th>
                        <th className="px-4 py-2 border">Email Peminjam</th>
                        <th className="px-4 py-2 border">No Telepon</th>
                        <th className="px-4 py-2 border">Gender</th>
                        <th className="px-4 py-2 border">Alat Dipinjam</th>
                        <th className="px-4 py-2 border">Jumlah</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {dataPeminjaman.map((item,i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{item.id}</td>
                                <td className="px-4 py-2 border">{item.peminjaman?.peminjam?.profile.name}</td>
                                <td className="px-4 py-2 border">{item.peminjaman?.peminjam?.email}</td>
                                <td className="px-4 py-2 border">{item.peminjaman?.peminjam?.profile.no_telp}</td>
                                <td className="px-4 py-2 border">{item.peminjaman?.peminjam?.profile.gender}</td>
                                <td className="px-4 py-2 border">{item.peminjaman?.alat?.name}</td>
                                <td className="px-4 py-2 border">{item.peminjaman?.jumlah}</td>
                                <td className="px-4 py-2 border">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                        item.status === 'biru' || item.status === 'pending' ? 'text-yellow-700 bg-yellow-200' :
                                        item.status === 'dikembalikan' ? 'text-green-700 bg-green-200' :
                                        item.status === 'ditolak' ? 'text-red-700 bg-red-200' : 'text-blue-700 bg-blue-200'
                                        }`}>
                                        {item.status}
                                    </span>

                                </td>

                                <td className="px-4 py-2 border">
                                <div className="flex items-center gap-x-2">
                                    {item.status === 'pending' ? (
                                        <button onClick={() => {accept(item.id)}} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
                                            <i className="bi bi-check"></i>
                                        </button>
                                        ) : item.status === 'dipinjam' ? (
                                        <button onClick={() => {kembalikan(item.id)}} className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
                                            <i className="bi bi-box-arrow-up"></i>
                                        </button>
                                        ) : null}


                                    <button onClick={() => {hapusTrx(item.id)}} className="btn btn-sm btn-danger">
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

export default Peminjaman