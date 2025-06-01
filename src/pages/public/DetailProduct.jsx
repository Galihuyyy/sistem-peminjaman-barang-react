import React, { useState, useEffect } from 'react'
import { data, useParams } from 'react-router-dom'
import Navbar from '../../components/fragments/Navbar'
import { config } from '../../config'
import axios from 'axios'
import { getToken } from '../../utils/getToken'
import Carousel from '../../components/Layout/Carousel'
import { toast, ToastContainer } from 'react-toastify'

export const DetailProduct = () => {
    const id = useParams().id
    const apiUrl = config.API_URL
    const token = getToken()

    const [dataAlat, setDataAlat] = useState([])
    const [alatImages, setAlatImages] = useState([])
    const [peminjaman, setPeminjaman] = useState([{
        peminjam : {
            profile : {}
        },
        ulasan: [
            {
                created_at: '',
                rating: 0,
                komentar: '',
            }
        ]
    }])

    const [dataCart, setDataCart] = useState({
        'alat_id' : id,
        'jumlah' : 1
    })

    

    const getDetailAlat = () => {
        axios.get(`${apiUrl}/home/alat/${id}`, {
            headers : {
                Authorization : `Bearer ${token}`
            } 
        })
        .then(res => {
            console.log(res.data.data)
            setPeminjaman(res.data.data.peminjaman)
            setDataAlat(res.data.data.alat)
            setAlatImages(res.data.data.alat.foto_alat)
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    const addCart = () => {
        const toastAddKeranjangId = toast.loading("Menambahkan ke keranjang...");

        axios.post(`${apiUrl}/peminjaman`, dataCart , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then (res => {
            console.log(res.data);
            toast.update(toastAddKeranjangId, {
                type : 'success',
                render : res.data?.message || 'Berhasil ditambahkan ke keranjang!',
                isLoading : false,
                hideProgressBar : false,
                autoClose : true,
                closeButton : true
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    const pinjamLangsung = () => {
        const toastPinjamLangsungId = toast.loading("Meminjam...");
        axios.post(`${apiUrl}/peminjaman/transaksi/add`, dataCart , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then (res => {
            console.log(res.data);
            toast.update(toastPinjamLangsungId, {
                type : 'success',
                render : res.data?.message || 'Berhasil melakukan peminjaman!',
                isLoading : false,
                hideProgressBar : false,
                autoClose : true,
                closeButton : true
            })

            setTimeout(function() {
                window.location.href = '/transaksi-pending'
            }, 1000);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const rating = (rating) => {
        const star = []
        let i = 0
        let tempRating = rating

        while (tempRating >= 1 && i < 5) {
            star.push('bi-star-fill')
            tempRating -= 1
            i++
        }

        if (tempRating >= 0.25 && tempRating < 0.75 && i < 5) {
            star.push('bi-star-half')
            i++
        }

        while (i < 5) {
            star.push('bi-star')
            i++
        }

        return star
    }


    useEffect(() => {
        getDetailAlat()
    }, [])
    
  return (
    <div className='pb-20'>
        <Navbar/>
        <div className="w-11/12 sm:w-9/12 pt-28 mx-auto font-[poppins] text-neutral-800 pb-20">
            <ToastContainer
                position='top-center'
                theme='colored'
            />
            <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => {window.location.href = "/"}}>
                <i className="bi bi-arrow-left text-2xl mb-3"></i>
                <p className='text-xl'>Kembali</p>
            </div>
            <div className="rounded w-full shadow-sm border py-12 max-sm:py-2 px-2 sm:px-12 grid grid-cols-1 sm:grid-cols-2">
                <div className="max-w-md rounded border py-4 bg-neutral-400">
                    <Carousel>
                        {alatImages.map((item, i) => (
                            <img key={i} className='w-full object-contain' src={item} />
                        ))}
                    </Carousel>
                </div>
                <div>
                    <h2>{dataAlat.name}</h2>
                    <div className="flex mb-3">
                        {[1,2,3,4,5].map(i => (
                            <i key={i} className="bi bi-star-fill text-yellow-400 text-xs md:text-sm"></i>

                        ))}
                    </div>
                    <p>{dataAlat.deskripsi}</p>
                    <div className="w-fit flex items-center border-[1px] border-neutral-700">
                    <button 
                        className='bg-neutral-500 text-neutral-200 px-1'
                        onClick={() => {
                            setDataCart(prev => ({
                                ...prev,
                                jumlah: Math.max(1, Number(prev.jumlah) - 1) 
                            }))
                        }}
                    >
                        <i className="bi bi-dash text-xl"></i>
                    </button>
                    
                    <input 
                        type="number"
                        className='w-10 h-full text-center'
                        value={dataCart.jumlah}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setDataCart({...dataCart, jumlah: Math.min(dataAlat.stok, val)})
                        }}
                    />
                    
                    <button 
                        className='bg-neutral-500 text-neutral-200 px-1'
                        onClick={() => {
                            setDataCart(prev => ({
                                ...prev,
                                jumlah: Math.min(dataAlat.stok,Number(prev.jumlah) + 1)
                            }))
                        }}
                    >
                        <i className="bi bi-plus text-xl"></i>
                    </button>
                </div>
                    <p className='mt-3'>terpinjam {peminjaman.length} kali</p>

                </div>
                
            </div>
            <div className='flex flex-col w-full border shadow-sm mt-4 rounded'>
                {peminjaman.map((item, i) => (
                    <div key={i} className="ulasan w-full py-3 px-4 border">
                        <div className="flex gap-x-4 items-center mb-2">
                            <p className='mb-0 text-xs font-bold'>{item.peminjam.profile.name}</p>
                            <p className='mb-0 text-xs'>
                            {item.ulasan?.[0]?.created_at
                                ? new Date(item.ulasan[0].created_at).toLocaleDateString('id-ID')
                                : 'Belum ada ulasan'}
                            </p>

                        </div>
                        <div className="flex text-yellow-500 text-sm">
                            {item.ulasan?.length > 0 && item.ulasan.map((u, j) => (
                                <div key={j}>
                                    <div className="flex text-yellow-500 text-sm">
                                        {rating(u.rating).map((iconClass, i) => (
                                            <i key={i} className={`bi ${iconClass}`}></i>
                                        ))}
                                    </div>
                                    <p className='text-md text-neutral-600'>{u.komentar}</p>
                                </div>
                            ))}

                        </div>
                        <p className='text-md text-neutral-600'>{item.ulasan?.komentar}</p>
                    </div>
                ))}

            </div>
        </div>
        <footer className='fixed-bottom bg-white border shadow-sm w-full flex justify-center py-2'>
            <div className="flex items-center justify-end w-11/12 sm:w-9/12  gap-x-2">
                <button className='py-2 px-3 rounded text-neutral-200 font-semibold bg-indigo-600' onClick={() => {pinjamLangsung()}}>Pinjam Sekarang</button>
            </div>
        </footer>
    </div>
  )
}
