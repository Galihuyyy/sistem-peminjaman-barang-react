import React, { useEffect, useState } from 'react'
import AdminPage from '../../components/Layout/AdminPage'
import axios from 'axios'
import { config } from '../../config'
import { getToken } from '../../utils/getToken'

function Admin() {

    const token = getToken()
    const apiUrl = config.API_URL
    
    const [dataAdmin, setDataAdmin] = useState([])
    function getAdmin () {
        axios.get(`${apiUrl}/home/admin`, {headers : {Authorization : `Bearer ${token}`}})
        .then (res => {
            console.log(res.data.data[0]);
            setDataAdmin(res.data.data);
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }

    function deleteAdmin (id) {

        const yakin = confirm("yakin ingin menghapus admin ini?")

        if (!yakin) {
            return
        }
        
        axios.delete(`${apiUrl}/home/admin/${id}`, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            console.log(res.data);
            window.location.reload()
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    useEffect(() => {
        getAdmin()
    }, [])
    
  return (
    <AdminPage>
        <div className="pt-4">
            <p className="text-xl font-semibold text-neutral-600">Manajemen Admin</p>
            <button className="btn btn-sm btn-primary" onClick={() => {window.location.href = "/admin/add"}}><i className="bi bi-plus"></i> Tambah Admin</button>
            <div className="w-auto overflow-x-auto mt-4">
                <table className="min-w-[600px] w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 uppercase">
                    <tr>
                        <th className="px-4 py-2 border">No</th>
                        <th className="px-4 py-2 border">Usename</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Gender</th>
                        <th className="px-4 py-2 border">No Telepon</th>
                        <th className="px-4 py-2 border">Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {dataAdmin.map((item,i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{i + 1}</td>
                                <td className="px-4 py-2 border">{item.username}</td>
                                <td className="px-4 py-2 border">{item.email}</td>
                                <td className="px-4 py-2 border">
                                    {item.profile.name}
                                </td>
                                <td className="px-4 py-2 border">{item.profile.gender}</td>
                                <td className="px-4 py-2 border">{item.profile.no_telp}</td>
                                <td className="px-4 py-2 border">
                                <div className="flex items-center gap-x-2">
                                    <button onClick={() => {}} className="btn btn-sm btn-success">
                                    <i className="bi bi-pencil" onClick={() => {window.location.href = `/admin/update/${item.id}`}}></i>
                                    </button>
                                    <button onClick={() => {deleteAdmin(item.id)}} className="btn btn-sm btn-danger">
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

export default Admin