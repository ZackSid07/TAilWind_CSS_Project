import { Bounce, toast } from 'react-toastify';

const SuccessToast = (message = "Something is happening" , position = "top-right" , dealy = 4000)=>{
    toast.success(message, {
        position: position,
        autoClose: dealy,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });    
}

const ErrorToast = (message = "Something is Error" , position = "top-right" , dealy = 4000)=>{
    toast.error(message, {
        position: position,
        autoClose: dealy,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });    
}

const InfoToast = (message = "Something is info" , position = "top-center" , dealy = 4000)=>{
    toast.info(message, {
        position: position,
        autoClose: dealy,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });    
}

export{SuccessToast , ErrorToast, InfoToast};