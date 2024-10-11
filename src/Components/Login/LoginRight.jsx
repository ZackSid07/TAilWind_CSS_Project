import React from 'react'
import login from "../../assets/Login/login.gif"

const LoginRight = () => {
  return (
    <div className='h-screen w-[40%] flex justify-center items-center  bg-blue-100 '>
      <picture>
        <img src={login} alt={login} />
      </picture>
    </div>
  )
}

export default LoginRight