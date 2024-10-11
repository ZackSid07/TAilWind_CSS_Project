import React from 'react'
import Registrationimg from '../../assets/Registration/Registration.gif';

const RegistrationReght = () => {
  return (
    <div className='w-[40%] h-screen'>
      <picture>
        <img src={Registrationimg} alt={Registrationimg} className='mt-16' />
      </picture>
    </div>
  )
}

export default RegistrationReght