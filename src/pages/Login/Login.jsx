import React from 'react'
import LoginLeft from '../../Components/Login/LoginLeft.jsx'
import LoginRight from '../../Components/Login/LoginRight.jsx'

const Login = () => {
  return (
    <div className='flex items-center'>
        <LoginLeft/>
        <LoginRight/>
    </div>
  )
}

export default Login