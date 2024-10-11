import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import {isEmailValid  , PasswordValidation} from"../../../Utils/Validation/validation.js"
import { ColorRing } from 'react-loader-spinner';
import { FaEye , FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ErrorToast, SuccessToast } from '../../../Utils/ToastMessage/Toast.js';
import { getDatabase, push, ref, set } from "firebase/database";
import moment from 'moment';
import { Link, useNavigate } from "react-router-dom";

const LoginLeft = () => {
  const auth = getAuth();
  const db = getDatabase(); 
  const navigate = useNavigate();
  const[loading , setloding] = useState(false);
  const[Eye,setEye] = useState("false");
const [logingInput , setloginInput] = useState({
    email:"",
    password:"",
  })

  /**
   * todo: handleing error
   * @param({})
   */

  const[loginError , setloginEroor]= useState({
    emailError:"",
    passwordEroor:"",
  })



  /**
   * todo : takes a input from email and password field
   * @param ({event})
   */
  const handleEvent = (event)=>{
    
    const { id , value} = event.target;
    setloginInput({
      ...logingInput,
      [id]:value,
    })

    console.log("id:", id , "value:", value );
  }


  /**
   * todo : handleEye function implementation
   * @param({}) // this mean that there is no parameters
   */

  const hanleEye =() =>{
    setEye(!Eye);
  }



  /**
   * todo: handle fnction implementation
   * @param({})
   */
  console.log(logingInput);
  

  const handleSignin=()=>{
   
    // alert("dhbjhdbv");
    const {email , password } = logingInput;
    if(!email || !isEmailValid(email)){
      setloginEroor({
      ...loginError,
      emailError:"email missing or invalid email",
      })

    }
   
    else if(!password || !PasswordValidation(password) ){
      setloginEroor({
        ...loginError,
        passwordEroor:"Password missing || Your password must contain Minimum 8 characters, At least one uppercase character, At least one lowercase character, At least one digit, At least one special character",
      })
  

    }
    else{
      setloding(true);
      setloginEroor({
        ...loginError,
        emailError:"",
        passwordEroor:"",
      })
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in 
        // const user = userCredential.user;
        // ...
        SuccessToast(`Login Successful`)
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code; 
      ErrorToast(`${errorCode}`, "top-center");
      
      })
    .finally(()=>{
      setloding(false)
        setloginEroor({...loginError, emailError:"", passwordEroor:"",})
        setloginInput({
          email:"",
          password:"",

        })
      })
    }

    }


    /**
     * todo: handleLoginWithGoogle function implement
     */

    const handleLoginWithGoogle=()=>{
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
     return user;
    
    

  }).then((user)=>{
    const{photoUrl, email, displayName, localId}= user.reloadUserInfo;
     console.log(photoUrl, email, displayName, localId);
    const UseRef = ref(db, "users/" );   //<= "+ auth.currentUser.uid" this is for the unique id  
    set(push(UseRef), {//we use push function for the unique id 
      userUid : localId,
      UserEmail : email,
      UserName : displayName,
      UserphotoUrl:photoUrl? photoUrl: "",
      createdAt : moment().format("MM DD YYYY, h:mm:ss a"),

    })
    .then(()=>{
      navigate("/")
    });
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    ErrorToast(`$(errorCode)`);
   
  });

    }

  

  return (
    <div className='h-screen w-[60%] bg-blue-100'>
      
        <div className='flex flex-col justify-center items-center h-full'>
        <div className=' flex-col justify-center items-center'>
        <div className='flex flex-col gap-y-10'>
            <h1 className='font-bold text-[49px] font-customNuito  text-Auth_maun_color'>Login to your account!</h1>
          <div className='flex cursor-pointer justify-center items-center gap-x-3 w-[40%] py-4 border-[1px] border-gray-500 rounded-xl ' onClick={handleLoginWithGoogle}>
            <span>
            <FcGoogle />
            </span>
            <button>Login with Google</button>
          </div>
         </div>
        <div className='mt-10'>
        
          
           <form action="#" method='post' onSubmit={(e)=> e.preventDefault}>
                <div className='flex flex-col justify-start items-stretch gap-y-5'>
                <div>
            <fieldset className='border-2 border-[rgba(17,23,93,0.5)] py-3 px-5 rounded-lg'>
              <legend className='px-3 text-sm font-semibold text-Auth_maun_color font-customNuito'>
              Email Address
              </legend>
              <input type="text" 
              name='Email'
               id='email'
                placeholder='@gmail.com'
                 className='w-full placeholder:text-green-300'
                 onChange={handleEvent}/>
            </fieldset>
            <span className='text-red-500 mt-1 block'>{loginError.emailError&& loginError.emailError}</span>
                </div>

                <div>
            <fieldset className='border-2 border-[rgba(17,23,93,0.5)] py-3 px-5 rounded-lg'>
              <legend className='px-3 text-sm font-semibold text-Auth_maun_color font-customNuito'>
              Password
              </legend>
           <div className='flex justify-between items-center'>
           <input  type={Eye ? "text" : "password"}  
              name='Password'
               id='password'
                placeholder='********'
                 className='w-full placeholder:text-green-300'
                 onChange={handleEvent}/>
                 <span onClick={hanleEye}>
              {Eye ? ( <FaEye className='cursor-pointer text-2xl'/>) : (<FaEyeSlash className='cursor-pointer text-2xl'/>)}
             </span>
           </div>
            </fieldset>
            <span className='text-red-500 mt-1 block'>{loginError.passwordEroor && loginError.passwordEroor}</span>
                </div>


                


                </div>
        </form>
        </div>
        <button onClick={handleSignin} className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-5 mt-8 rounded-[86.003px] text-xl text-[#FFFFFF] font-customNuito font-semibold cursor-pointer'>
        {  loading ?(
              <span className='flex justify-center'><ColorRing
              height="30"
              width="80"
              color="#FFF"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              /></span>):( "Sign In")}
       </button>
         <p className='font-sm font-normal text-Auth_maun_color mt-6 flex justify-center text-xl items-center'>
         Don’t have an account ?  <span className='text-[#EA6C00] hover:underline mx-2'><Link to={"/registration"}> Sign up</Link></span>
        </p>
      </div>
        </div>
    
           
    </div>
  )
}

export default LoginLeft