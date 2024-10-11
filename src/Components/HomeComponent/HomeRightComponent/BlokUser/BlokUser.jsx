import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database"
import avater from "../../../../assets/Home/homeLeft/avater.gif"
import { getAuth } from 'firebase/auth'
import moment from 'moment'

const BlokUser = () => {
  const db = getDatabase();
  const auth = getAuth()
  const [BlockList, setBlockList] = useState([])


    /**
 * todo: fetch data form blockedUser db 
 */



useEffect(()=>{
  const FriendRequestRef = ref(db, 'blockedUser/' );
  onValue(FriendRequestRef, (snapshot) => {
    const FriendRequestArr = [];
    const data = snapshot.val();
    // updateStarCount(postElement, data);
    snapshot.forEach((item)=>{
      if(true)
        FriendRequestArr.push(
      {...item.val() , BlockKey: item.key}
    )
    })
    setBlockList(FriendRequestArr);  
  });
},[])



console.log(BlockList);

/**
 * todo: unblockUser function implement
 */


const unblockUser = (item = {}) => {
  let blankobj = {};
  for (let key of Object.keys(item)) {
    if (key === "BlockKey" || key === "createdAt") {
      continue;
    }
    Object.assign(blankobj, { [key]: item[key] });
  }
  console.log(blankobj);
  

}




  return (
    <div className='self-end mb-[12px]'>
    <div className='flex flex-col gap-y-6 justify-end self-end'>

   <div className=' h-[347px] w-[527px] rounded-2xl shadow-2xl'>
    <div className='flex justify-between items-center px-5 py-3'>
    <h1 className='text-black text-xl font-semibold font-popping relative'>
        Block User
        <span class="absolute -top-3 -right-10 flex h-10 w-10">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full  h-10 w-10 bg-sky-200 flex justify-center items-center">{BlockList?.length}</span>
        </span>
        </h1>
      <span className='text-Auth_maun_color text-2xl cursor-pointer'>
      <BsThreeDotsVertical />
      </span>
    </div>
    <div className=' h-[84%] w-full px-5  overflow-y-scroll rounded-2xl divide-y-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-gray-300'>
      {BlockList?.map((item)=>(
         <div className='flex mt-6 gap-x-3 items-center'>
         <div className='h-[60px] w-[60px] rounded-full shadow-2xl '>
             <picture>
               <img src={item.WhoSendFriendRequestProfile_picture? item.WhoSendFriendRequestProfile_picture : avater} alt={avater} />
             </picture>
           </div>
           <div className='basis-[65%]  flex flex-col justify-center items-start ml-3'>
             <h2 className='heading'>{item.WhoSendFriendRequestName}</h2>
             <p className='subHeading'>Hi Guys, Wassup!</p>
           </div>
           <div>
           <button className='button rounded-[9px] px-6 py-2 ml-4 flex items-center' onClick={()=>unblockUser(item)}>Unblock</button>
           </div>
         </div>
      ))}
   
    
    </div>
   </div>
   </div>
   </div>
  )
}

export default BlokUser