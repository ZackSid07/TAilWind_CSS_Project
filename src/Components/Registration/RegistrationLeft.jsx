import React , {useState} from 'react'
import { FaEye , FaEyeSlash } from "react-icons/fa";
import {isEmailValid , userNameValidator , PasswordValidation} from"../../../Utils/Validation/validation.js";
import { getAuth, createUserWithEmailAndPassword ,updateProfile , sendEmailVerification} from "firebase/auth";
import {SuccessToast , ErrorToast, InfoToast} from "../../../Utils/ToastMessage/Toast.js"
import { Circles } from 'react-loader-spinner'
import { getDatabase, push, ref, set } from "firebase/database";
import moment from 'moment';
import { Link, Navigate } from "react-router-dom";



const RegistrationLeft = () => {
  const auth = getAuth();
  const db = getDatabase(); 
  const[Eye,setEye] = useState("false");
  const[Email,setEmail] = useState("");
  const[FullName,setFullName] = useState("");
  const[Password,setPassword] = useState("");

  //Error State of the upper
  const[EmailError,setEmailError] = useState("");
  const[FullNameError,setFullNameError] = useState("");
  const[PasswordError,setPasswordError] = useState("");

  //for loading
  const[loading , setloding] = useState(false);

  

  /**
   * todo : handleEye function implementation
   * @param({}) // this mean that there is no parameters
   */

  const hanleEye =() =>{
    setEye(!Eye);
  }

  //handle Email
  const handleEmail = (event)=>{
    setEmail(event.target.value);
  };

  // const handleFulName =(event)=>{
  //   setFullName(event.target.value);
  // }

  /**
   * 
   * todo : handleSignUp function implement
   * @param({}) // this mean that there is no parameters
   */

  const handleSignUp =()=>{
    if(!Email || !isEmailValid(Email)){
      setEmailError("Email missing or invalid email");
    }
    else if(!FullName || !userNameValidator(FullName)){
      setEmailError("");
      setFullNameError("Full name missing or full name must be 5 - 20 characters");
    }
    else if(!Password || !PasswordValidation(Password))
    {
      setFullNameError("");
      setPasswordError("Password missing || Your password must contain Minimum 8 characters, At least one uppercase character, At least one lowercase character, At least one digit, At least one special character");
    }
    else{
  
      setloding(true);
      createUserWithEmailAndPassword(auth, Email, Password)
      .then((userinfo)=>{
        
        SuccessToast(`${FullName} Registration Successfull`);
        setloding(false);
          
        // console.log(userinfo);
        
      }).then(()=>{
        updateProfile(auth.currentUser,{
          displayName:FullName,
        })
      })
      .then(()=>{
        sendEmailVerification(auth.currentUser).then(()=>{
          InfoToast(`${auth.currentUser.displayName} Please check your Mail`)
          Navigate("/Login")
        });
      })
      .then(()=>{                         
        const UseRef = ref(db, "users/" );   //<= "+ auth.currentUser.uid" this is for the unique id  
        set(push(UseRef), {//we use push function for the unique id 
          userUid : auth.currentUser.uid,
          UserEmail : auth.currentUser.email,
          UserName : FullName,
          UserphotoUrl:"",
          createdAt : moment().format("MM DD YYYY, h:mm:ss a"),

        });
      })
      .catch((err)=>{
        setloding(false);
        ErrorToast(`${err.code}` , "top-right" , 7000);
        // console.log(err);
        
      })
      .finally(()=>{
        setEmail("");
        setFullName("");
        setPassword("");
        setPasswordError("");
        setEmailError("");
        setFullNameError("");
        setloding(false);
      })


    }

  }



  // console.log(PasswordValidation());
  // console.log(auth.currentUser.email);
  //eykhane joto gula user loging koreche ami "console.log(auth.currentUser)" eti use korle peye jabo
  // console.log(moment().format("MM DD YYYY, h:mm:ss a"));
  
  
  
  
  
  
  return (
    <div className='w-[60%] h-screen '>
      <div className='flex justify-center h-full items-center'>
        <div className=' flex flex-col gap-y-8'>
        <div>
       <h1 className='font-bold text-[49px] font-customNuito  text-Auth_maun_color'>Get started with easily register</h1>
       <p className='font-customNuito font-normal text-[20.64px] text-[rgba(0,0,0,0.3)] '>Free register and you can enjoy it</p>
       </div>
       <div className='flex'>
        <form action="#" method='post' className='basis-[70%]' onSubmit={(e)=>e.preventDefault()}>
            <div className='flex flex-col items-stretch justify-start gap-y-8'>
            <div>
            <fieldset className='border-2 border-[rgba(17,23,93,0.5)] py-3 px-5 rounded-lg'>
              <legend className='px-3 text-sm font-semibold text-Auth_maun_color font-customNuito'>
              Email Address
              </legend>
              <input type="text" name='Email' id='email' placeholder='@gmail.com'value={Email} className='w-full placeholder:text-green-300' onChange={handleEmail}/>
            </fieldset>
            <span className='text-red-500 mt-1 block'>{EmailError}</span>
          </div>




          <div>
            <fieldset className='border-2 border-[rgba(17,23,93,0.5)] py-3 px-5 rounded-lg'>
              <legend className='px-3 text-sm font-semibold text-Auth_maun_color font-customNuito'>
              Full name
              </legend>
              <input type="text" value={FullName} name='Fullname' id='Fullname' placeholder='Abdullah Al Galib' className='w-full placeholder:text-green-300' onChange={(e) => setFullName(e.target.value)}/>
            </fieldset>
            <span className='text-red-500 mt-1 block'>{FullNameError}</span>
          </div>

          <div>
            <fieldset className='border-2 border-[rgba(17,23,93,0.5)] py-3 px-5 rounded-lg'>
              <legend className='px-3 text-sm font-semibold text-Auth_maun_color font-customNuito'>
              Password
              </legend>
             <div className='flex justify-between items-center'>
             <input type={Eye ? "text" : "password"} value={Password} name='password' id='password' placeholder='*******' className='w-full' onChange={(e) => setPassword(e.target.value)}/>
             <span onClick={hanleEye}>
              {Eye ? ( <FaEye className='cursor-pointer text-2xl'/>) : (<FaEyeSlash className='cursor-pointer text-2xl'/>)}
             </span>
             </div>
            </fieldset>
            <span className='text-red-500 mt-1 block'>{PasswordError}</span>
          </div>
         
          </div>
       
            <button className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-5 mt-8 rounded-[86.003px] text-xl text-[#FFFFFF] font-customNuito font-semibold cursor-pointer' onClick={handleSignUp}>
              {loading ?(
              <span className='flex justify-center'><Circles
              height="30"
              width="80"
              color="#FFF"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              /></span>):( "Sign up")}</button>
            <p className='font-sm font-normal text-Auth_maun_color mt-6 flex justify-center text-xl items-center'>
              Already  have an account ?  <span className='text-[#EA6C00] hover:underline mx-2'><Link to={"/login"}>Sign In</Link>
              </span>
            </p>
      
        </form>
       </div>

  
      
       

       
       
        </div>
      </div>
    </div>
  )
}

export default RegistrationLeft