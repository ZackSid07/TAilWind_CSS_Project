import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import avater from "../../../../assets/Home/homeLeft/avater.gif"
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database"
import { getAuth } from 'firebase/auth'
import moment from 'moment';






const FriendRquest = () => {
  const db = getDatabase();
  const auth = getAuth()
  const [FriendRequestList, setFriendRequestList] = useState([])

  /**
 * todo: fetch data form FriendRequest db 
 */



useEffect(()=>{
  const FriendRequestRef = ref(db, 'FriendRequest/' );
  onValue(FriendRequestRef, (snapshot) => {
    const FriendRequestArr = [];
    const data = snapshot.val();
    // updateStarCount(postElement, data);
    snapshot.forEach((item)=>{
      if(auth.currentUser.uid === item.val().WhoReciveFriendRequestUid)
        FriendRequestArr.push(
      {...item.val() , FriendRequestKey: item.key}
    )
    })
    setFriendRequestList(FriendRequestArr);  
  });
},[])

// console.log(FriendRequestList);
/**
 * todo: handleRejectFriendRequest function implement
 * @param(item) 
 */

const handleRejectFriendRequest = (item)=>{
  const removeFRRef = ref(db, 'FriendRequest/' + item.FriendRequestKey)
  remove(removeFRRef)
  console.log(item);
  
}

/**
 * todo : handleAcceptFriendRequest function implementation
 * @param(item)
 */


const handleAcceptFriendRequest = (item)=>{
  console.log({...item, createdAt:null});
  
  set(push(ref(db , "Friends/")), {
    ...item,
    FriendRequestKey:null,
    createdAt:moment().format("MM DD YYYY, h:mm:ss a"),
  }).then(()=>{
    const removeFRRef = ref(db, 'FriendRequest/' + item.FriendRequestKey)
  remove(removeFRRef)
  })
  
}


  return (

          <div className='self-end mb-[12px]'>
    <div className='flex flex-col gap-y-6 justify-end self-end'>

   <div className=' h-[347px] w-[527px] rounded-2xl shadow-2xl'>
    <div className='flex justify-between items-center px-5 py-3'>
      <h1 className='text-black text-xl font-semibold font-popping relative'>
        Friend Request
        <span class="absolute -top-3 -right-10 flex h-10 w-10">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full  h-10 w-10 bg-sky-200 flex justify-center items-center">{FriendRequestList?.length}</span>
        </span>
        </h1>
      <span className='text-Auth_maun_color text-2xl cursor-pointer'>
      <BsThreeDotsVertical />
      </span>
    </div>
    <div className=' h-[84%] w-full px-5  overflow-y-scroll rounded-2xl divide-y-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-gray-300'>
      {FriendRequestList.map((item)=>(
         <div className='flex mt-6 gap-x-3 items-center' key={item.FriendRequestKey}>
         <div className='h-[60px] w-[60px] rounded-full shadow-2xl '>
             <picture>
               <img src={item.WhoSendFriendRequestProfile_picture || avater} alt={avater} />
             </picture>
           </div>
           <div className='basis-[40%]  flex flex-col justify-center items-start ml-3'>
             <h2 className='heading capitalize'>{item.WhoSendFriendRequestName }</h2>
             <p className='subHeading'>{item.WhoSendFriendRequestEmail}</p>
           </div>
           <div className='flex'>
           <button className='button rounded-[9px] px-3 py-2 ml-4 flex items-center' onClick={()=> handleAcceptFriendRequest(item)}>Accept</button>
           <button className=' text-white  bg-gradient-to-r from-orange-500 to-red-600  font-popping rounded-[9px] px-4 py-2 ml-4 flex items-center' onClick={()=>handleRejectFriendRequest(item)}>Reject</button>
           
           </div>
         </div>
      ))}
   
    
    </div>
   </div>
   </div>
   </div>
  
  )
}

export default FriendRquest