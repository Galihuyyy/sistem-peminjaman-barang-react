import logo from '../../../src/assets/images/logo.png'
import icon from '../../../src/assets/images/icon.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../../utils/getToken'
import { config } from '../../config'
import { toast, ToastContainer } from 'react-toastify'

const Navbar = () => {

    const token = getToken()
    const apiUrl = config.API_URL
    const role = localStorage.getItem('role') || sessionStorage.getItem('role')
    const profil = document.getElementById('profil');
    const [profileHover, setProfileHover] = useState(false)
    const [logoutOn, setLogoutOn] = useState(false)

    const users = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"))


    const [trxPending, setTrxPending] = useState({})


    const getUser = () => {
        axios.get(`${apiUrl}/user`, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            setTrxPending(res.data.transaksi_pending);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const logout = () => {
        const toastLogoutId = toast.loading("Melakukan logout...");
    
        axios.post(`${apiUrl}/auth/logout`, {}, {headers : {Authorization : `Bearer ${token}`}})
        .then(res => {
            localStorage.clear();
            sessionStorage.clear(); 
            toast.update(toastLogoutId, {
                type : 'success',
                render : res.data?.message || 'Berhasil logout!',
                isLoading : false,
                hideProgressBar : false,
                autoClose : true,
                closeButton : true
            })
            setTimeout(function() {
                window.location.reload()
            }, 1000);
        })
        .catch(err => {console.log(err);})
    }

    
    useEffect(() => {
        getUser()
    }, [])
    
    return (
        <>
        <ToastContainer
            position='top-center'
            theme='colored'
        />
        <div className=' fixed-top max-md:px-4 md:px-24 bg-white font-[poppins] w-full h-16 md:h-20 shadow-md border-b border-b-neutral-200 flex items-center justify-between'>
            <div className="logo">
                <img src={logo} className='w-24 max-sm:hidden md:w-32 h-auto' alt="" />
                <img src={icon} className='w-10 min-sm:hidden md:w-32 h-auto' alt="" />

            </div>

            <ul className=" mb-0 flex items-center gap-3 md:gap-6" style={{padding:0}}>
                <li className='relative cursor-pointer' onClick={() => {window.location.href = `${role != 'admin' ? '/transaksi-pending' : '/peminjaman'}`}}>
                    <i className="bi bi-receipt text-xl md:text-2xl"></i>
                    {role != "admin" && trxPending &&
                        <div className='absolute top-0 left-3 bg-warning text-white text-[10px] md:text-xs rounded-pill text-center px-1'><i className="bi bi-exclamation text-xs"></i></div>
                        
                    }
                </li>
                <li id='profil' onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} className='relative bg-indigo-500 w-8 h-8 md:w-10 md:h-10 rounded-full grid place-items-center font-medium text-lg md:text-2xl text-white border-2 border-indigo-600 duration-300 hover:border-indigo-900 cursor-pointer'>{users.profile.name.charAt(0)}
                    <div onClick={() => {setLogoutOn(true)}} className={`absolute top-[100%] ${profileHover == false ? "hidden" : ""} bg-white rounded border px-2 py-1 shadow-sm flex items-center justify-center gap-x-2`}>
                        <i className="bi bi-box-arrow-right text-red-800"></i>
                        <p className="text-lg text-danger mb-0">Logout</p>
                    </div>
                </li>
            </ul>

            <div className={`${logoutOn == true ? "" : "hidden"} absolute top-0 left-0 bg-[rgba(0,0,0,.4)] w-full h-screen flex items-center justify-center`}>
                <div className=" px-6 py-5 bg-white rounded border">
                    <p className="mb-0 text-xl text-neutral-700">Kamu yakin mau log out?</p>
                    <div className="flex items-center justify-around mt-3">
                        <button className="btn btn-outline-secondary" onClick={() => {setLogoutOn(false)}}>Engga</button>
                        <button className="btn btn-outline-danger" onClick={() => {logout()}}>Yakin ko</button>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}


export default Navbar