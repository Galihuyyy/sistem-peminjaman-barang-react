import React from 'react'
import PropTypes from 'prop-types'

import logo from '../../assets/images/logo.png'
import loginImg from '../../assets/images/bgLogin.png'



const AuthForm = props => {

    const {title, slogan, children, image = {loginImg}} = props
    
  return (
    <div className="login-container border border-neutral-500 shadow-lg max-w-3xl bg-indigo-50 p-3 flex gap-3 rounded-2xl">
        <div className="w-full sm:w-1/2 font-[poppins] px-6">
            <form action="" className='flex items-center flex-col'>
                <img src={logo} width="120" className='mb-3' />
                <h2 className='text-indigo-500'>{title}</h2>
                <p className='text-sm text-neutral-500 text-center'>{slogan}</p>
                {children}
            </form>
        </div>
        <div className="sm:w-1/2 hidden sm:block">
            <img src={image} className='rounded-2xl' />
        </div>
    </div>
  )
}

AuthForm.propTypes = {
    title : PropTypes.string.isRequired,
    slogan : PropTypes.string.isRequired
}

export default AuthForm