import React, { useEffect, useState } from 'react'
import avater from "../../../assets/Home/homeLeft/avater.gif"
import Home from "../../../assets/Home/homeLeft/Home.gif"
import Chat from "../../../assets/Home/homeLeft/Chat.gif"
import Logout from "../../../assets/Home/homeLeft/Logout.png"
import Notification from "../../../assets/Home/homeLeft/Notification.gif"
import Settings from "../../../assets/Home/homeLeft/Settings.gif"
import { Link, useLocation } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";


const HomeLeft = () => {
  const location = useLocation();
  const auth = getAuth();
  const db = getDatabase();
  const [user , setuser] = useState({});
  const uploader = Uploader({
    apiKey: "free" // Get production API keys from Bytescale
  });
  const options = { multi: false , mime: "image/*" };
  /**
   * todo : fetch data from user db
   */
  

  useEffect(()=>{
    const getUserData =  ()=> {
      const starCountRef = ref(db, 'users/');
      onValue(starCountRef, (snapshot) => {
        snapshot.forEach((item)=>{
          if(auth.currentUser.uid === item.val().userUid){
            setuser({...item.val(), userKey: item.key})
          }
          
        }) 
      });
    
    }
    getUserData(); 

  },[])


  // console.log(auth.currentUser.email);

  return (
    <div className='flex-col items-center gap-y-8 w-[210px] bg-gradient-to-r from-sky-500 to-indigo-500 h-[94vh] rounded-2xl flex'>
       <div className='w-28 h-28  rounded-full shadow-2xl bg-white mt-6 relative cursor-pointer'>
       <picture>
            <img src={user ? user.UserphotoUrl:avater} alt={avater} className='h-full w-full object-cover p-3 rounded-full'/>
        </picture>
        <UploadButton uploader={uploader}
                options={options}
                onComplete={(files)=>
                  update(ref(db, "users/" + user.userKey) ,{
                    UserphotoUrl:files[0].fileUrl,
                  }).then(()=>{
                    updateProfile(auth.currentUser,{
                      photoURL:files[0].fileUrl,
                    })
                  })
                  }
                  >
          {({onClick}) =>
            <button onClick={onClick}>
              <IoCloudUploadOutline className="absolute text-2xl text-black left-[39%] top-[42%]" />
            </button>
          }
        </UploadButton>
       
       </div>
       <h1 className='text-white font-customNunito font-bold text-2xl capitalize'>
       {user? user.UserName : "Name Missing"}
       {/* {auth.currentUser.displayName? auth.currentUser.displayName :  */}
        </h1>
       <div>
        <ul className='flex flex-col items-center gap-y-10'>
          <li className={`relative flex ${location.pathname === "/" && "justify-center rounded-l-lg w-[156px] py-1 bg-white after:absolute after:top-[0px] after:right-[-10px] after:w-[16px] after:h-full after:bg-red-500 after:rounded-l-lg cursor-pointer"  } `}>
            <Link to={"/"}>
            <img src={Home} alt={Home} className='w-16 h-full object-cover mix-blend-multiply' />
            </Link>
          </li>
          <li className={`relative flex w-14 py-4 cursor-pointer ${location.pathname === "/chat" && "justify-center rounded-l-lg w-[166px] py-1 bg-white after:absolute after:top-[0px] after:right-[-10px] after:w-[16px] after:h-full after:bg-red-500 after:rounded-l-lg cursor-pointer"  } `}>
            <Link to={"/chat"}>
            <img src={Chat} alt={Chat} className='w-full h-full object-cover mix-blend-multiply' />
            </Link>
            
          </li>
          <li className={`relative flex w-14 py-4 cursor-pointer ${location.pathname === "/settings" && "justify-center rounded-l-lg w-[166px] py-1 bg-white after:absolute after:top-[0px] after:right-[-10px] after:w-[16px] after:h-full after:bg-red-500 after:rounded-l-lg cursor-pointer"  } `}>
            <Link to={"/settings"}><img src={Settings} alt={Settings} className='w-full h-full object-cover mix-blend-multiply' /></Link>
          </li>
          <li className={`relative flex w-14 py-[1px] cursor-pointer ${location.pathname === "/notification" && "justify-center rounded-l-lg w-[166px] py-1 bg-white after:absolute after:top-[0px] after:right-[-10px] after:w-[16px] after:h-full after:bg-red-500 after:rounded-l-lg cursor-pointer"  } `}>
            <Link to={"/notification"}><img src={Notification} alt={Notification} className='w-full h-full object-cover mix-blend-multiply' /></Link>
          </li>
      
        </ul>
       </div>

       <div className='mt-10 cursor-pointer'>
        <picture>
          <img src={Logout} alt={Logout} />
        </picture>
       </div>
    </div>
  )
}

export default HomeLeft