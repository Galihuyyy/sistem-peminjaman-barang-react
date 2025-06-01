import React, { useEffect, useState } from 'react'
import Navbar from '../../components/fragments/Navbar'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import axios from 'axios'

export const Receipt = () => {
    const token = getToken()
    const apiUrl = config.API_URL

    const [trxPending, setTrxPending] = useState({})
    const [peminjaman, setPeminjaman] = useState({
        alat : ''
    })

    const [dataPeminjaman, setDataPeminjaman] = useState([{
        peminjaman : {
            peminjam : {
                profile : {}
            }
        }
    }])

    const getPeminjaman = () => {
        axios.get(`${apiUrl}/transaksi`, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            console.log(res.data.data)
            setDataPeminjaman(res.data.data)
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

    const getUser = () => {
        axios.get(`${apiUrl}/user`, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            setPeminjaman(res.data.transaksi_pending?.peminjaman);
            setTrxPending(res.data.transaksi_pending);
            console.log(res.data.transaksi_pending);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUser()
        getPeminjaman()
    }, [])
    
  return (
    <div className="pb-20 px-4 pt-28">
        <Navbar/>
        {
            !!trxPending &&
                <main className='mx-auto p-4 rounded border shadow w-11/12 sm:w-1/2 text-neutral-700'>
                    <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => {window.location.href = "/"}}>
                        <i className="bi bi-arrow-left text-2xl mb-3"></i>
                        <p className='text-xl'>Kembali</p>
                    </div>
                    {!!!trxPending && 
                        <p className='text-neutral-600'>404 : Anda tidak memiliki pesanan pending</p>
                    }
                    {!!trxPending &&
                        <>
                            <h3 className='text-neutral-500 pb-3 mb-3'>Detail Transaksi</h3>
                            <h2 className='text-end sm:pe-3 border-b border-indigo-600 pb-3' style={{color:'#4f39f6'}}>Trx ID : {trxPending.id}</h2>
                            <div className=' pb-3'>
                                <p className={`${trxPending.status == 'pending' ? 'bg-amber-400 text-amber-700' : ''} w-fit py-1 px-3 mb-0 rounded-pill text-sm font-semibold`}>{trxPending.status}</p>
                                <h1 className='text-neutral-600 mb-0'>{peminjaman.alat.name}</h1>
                                <p className="mb-0">{peminjaman.jumlah} Barang</p>
                            </div>
                            <div className='border-b border-indigo-600 pb-3 text-neutral-600 text-sm pt-3'>
                                <p className='w-1/2'>Hai! Peminjaman kamu masih nunggu konfirmasi nih. Yuk, segera ke lab buat validasi dan lanjutin prosesnya yaa!</p>
                            </div>
                            <button onClick={() => {hapusTrx(trxPending.id)}} className='w-full bg-red-600 rounded text-white border-[1px] border-black mt-3 py-1'>Batalkan</button>
                        </>
                    }

                </main>
        }

        {!!!trxPending &&
        <>
            <p onClick={() => {window.location.href = '/'}} className="cursor-pointer text-xl font-semibold text-neutral-600"><i className="bi bi-caret-left"></i> Riwayat Peminjaman</p>

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

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </>
        }

    </div>
  )
}
