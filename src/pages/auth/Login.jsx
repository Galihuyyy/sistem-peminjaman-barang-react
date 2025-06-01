import React, { useEffect, useState } from 'react'
import Input from '../../components/elements/Input'
import Button from '../../components/elements/Button'
import Select from '../../components/elements/Select'
import axios from 'axios'
import registerImg from '../../assets/images/bgRegister.png'
import loginImg from '../../assets/images/bgLogin.png'
import AuthForm from '../../components/Layout/AuthForm'
import { toast, ToastContainer } from 'react-toastify'
import { data } from 'react-router-dom'

const Login = () => {

    const [currentPage, setCurrentPage] = useState('Login')
    const [currentRegisterPage, setCurrentRegisterPage] = useState('register-first')

    const [dataKelas, setDataKelas] = useState([])
    const [dataJurusan, setDataJurusan] = useState([])


    const [dataLogin, setDataLogin]= useState({
        credentials : '',
        password : '',
        rememberMe : false
    })

    const [dataRegister, setDataRegister] = useState({
        username : '',
        email : '',
        password : '',
        name : '',
        kelas_id : '',
        jurusan_id : '',
        no_telp : '+62',
    })

    const [samePassword, setSamePassword] = useState(true)

    const [alert, setAlert] = useState({
        success : '',
        error : ''
    })
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/kelas')
        .then(res => {
            setDataKelas(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get('http://127.0.0.1:8000/api/jurusan')
        .then(res => {
            setDataJurusan(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const handleLogin = () => {
    const toastId = toast.loading("Proses Login...");

    axios.post('http://127.0.0.1:8000/api/auth/login', {
        credentials: dataLogin.credentials,
        password: dataLogin.password
    }, {
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    })
    .then(res => {
        toast.update(toastId, {
            type : 'success',
            render : res.data?.message || 'Login Berhasil!',
            isLoading : false,
            hideProgressBar : false,
            autoClose : true,
            closeButton : true
        })

        const token = (res.data.token);
        const role = (res.data.role);
        const dataUser = (res.data.data);

        
        if (dataLogin.rememberMe) {
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
            localStorage.setItem('user', JSON.stringify(dataUser))
        } else {
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('role', role)
            sessionStorage.setItem('user', JSON.stringify(dataUser))
        }

        setTimeout(function() {
            window.location.href = "/"
        }, 2000);
    })
    .catch(err => {
        toast.update(toastId, {
            type : 'error',
            render : err.response?.data?.message || 'Login Gagal!',
            isLoading : false,
            hideProgressBar : false,
            autoClose : true,
            closeButton : true
        })
    });
};



    const handleChange = (e) => {
        const value = e.target.value;

        if (/^\+?\d*$/.test(value)) {
            setDataRegister({...dataRegister, no_telp:value})
        }
    };

    const confirmPassword = (e) => {
        const confirm_password = e.target.value

        if (confirm_password === dataRegister.password) {
            setSamePassword(true)
        } else {
            setSamePassword(false)
        }
    }

    


    
  return (
    <div className='w-full min-h-screen bg-indigo-100 flex items-center justify-center'>
        <ToastContainer 
            position='top-center'
            theme='colored'
        />
        {currentPage =='Login' && 
        <AuthForm title="Login" slogan="Input your credentials here!" image={loginImg}>
            <Input name="credentials" style="mb-5 mt-14" onChange={(e) => {setDataLogin({...dataLogin, credentials : e.target.value})}}>Username/Email</Input>
            <Input name="password" type="password" style="mb-3" onChange={(e) => {setDataLogin({...dataLogin, password : e.target.value})}}>Password</Input>
            <div className="w-full px-3 flex justify-between text-sm my-3">
                <div className='flex items-center'>
                    <input type="checkbox" name="rememberMe" id="rememberMe" checked={dataLogin.rememberMe} onChange={(e) => {setDataLogin({...dataLogin, rememberMe : e.target.checked})}} />
                    <label htmlFor='rememberMe' className="font-medium text-neutral-500">remember me!</label>
                </div>
            </div>
            <Button variant="primary rounded-pill mb-3" onClick={() => {handleLogin()}}>Login</Button>
            <p className='text-xs text-neutral-500'>
                Belum punya akun ya?
                <span className='ml-3 text-blue-500 cursor-pointer' onClick={() => {setCurrentPage('Register')}}>Register disini!</span>
            </p>
        </AuthForm>
        }
        {currentPage == 'Register' &&
            <>
                {currentRegisterPage == "register-first" &&
                    <AuthForm title="Register" slogan="Please fill in all the input to register." image={registerImg}>
                        <Input name="credentials" style="mb-5 mt-14" value={dataRegister.username} onChange={(e) => {setDataRegister({...dataRegister, username:e.target.value})}}>Username</Input>
                        <Input name="email" style="mb-5" value={dataRegister.email} onChange={(e) => {setDataRegister({...dataRegister, email:e.target.value})}}>Email</Input>
                        <Input name="password" style="mb-5" value={dataRegister.password} onChange={(e) => {setDataRegister({...dataRegister, password:e.target.value})}}>Password</Input>
                        <div className='w-full mb-3'>
                            <Input name="confirm_password" style="" onChange={(e) => {confirmPassword(e)}}>Confirm Password</Input>
                            {!!!samePassword && 
                                <p className="text-danger text-xs pl-4 m-0">Password tidak sama!</p>
                            }

                        </div>
                        <div className=" mb-3 w-full">
                            <Button type="button" variant="primary h-10 rounded-pill" onClick={() => {setCurrentRegisterPage('register-next')}}><span>Selanjutnya</span> <i className="bi bi-caret-right-fill my-auto"></i></Button>
                        </div>
                        <p className='text-center text-xs text-neutral-500'>Kamu udah punya akun ya? <span className='text-blue-600 font-medium cursor-pointer' onClick={() => {setCurrentPage('Login')}}>login yuk!</span></p>
                    </AuthForm>
                }
                {currentRegisterPage == "register-next" &&
                    <AuthForm title="Set up your profile" slogan="create your profile so we can get to know you more easily" image={registerImg}>
                        <Input name="name" style="mb-5 mt-10" value={dataRegister.name} onChange={(e) => {setDataRegister({...dataRegister, name:e.target.value})}}>Name</Input>
                        <Select title="Kelas" style="rounded-pill w-full mx-auto ps-3" onChange={(e) => {setDataRegister({...dataRegister, kelas_id:e.target.value})}}>
                            <option value="">Pilih kelas</option>
                            {dataKelas.map((item,i) => (
                                <option value={item.id} key={i}>{item.name}</option>
                            ))}
                        </Select>
                        <Select title="Jurusan" style="rounded-pill w-full mx-auto ps-3"  onChange={(e) => {setDataRegister({...dataRegister, jurusan_id:e.target.value})}}>
                            <option value="">Pilih jurusan</option>
                            {dataJurusan.map((item,i) => (
                                <option value={item.id} key={i}>{item.name}</option>
                            ))}
                        </Select>
                        <Input name="no_telp" style="mb-4" value={dataRegister.no_telp} onChange={(e) => handleChange(e)}>No Telepon</Input>
                        <div className="mt-2 mb-3 w-full flex gap-2">
                            <Button type="submit" variant="secondary h-10" onClick={() => {setCurrentRegisterPage('register-first')}}><span>Back</span></Button>
                            <Button type="submit" variant="primary h-10" onClick={() => {setCurrentRegisterPage('register-next')}}><span>Submit</span></Button>
                        </div>
                        <p className='text-center text-xs text-neutral-500'>Kamu udah punya akun ya? <span className='text-blue-600 font-medium cursor-pointer' onClick={() => {setCurrentPage('Login')}}>login yuk!</span></p>
                    </AuthForm>
                }


            </>
        }


    </div>
  )
}

export default Login
