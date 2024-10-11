import React from 'react'
import RegistrationLeft from '../../Components/Registration/RegistrationLeft.jsx'
import RegistrationReght from '../../Components/Registration/RegistrationReght.jsx'
const Registration = () => {
  return (
    <div className='flex items-center'>
        <RegistrationLeft/>
        <RegistrationReght/>
    </div>
  )
}

export default Registration