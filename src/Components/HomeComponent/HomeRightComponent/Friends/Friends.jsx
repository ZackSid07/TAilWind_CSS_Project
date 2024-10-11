import React, { useEffect, useState } from 'react'
import Search from '../Search/Search.jsx'
import { FcSearch } from 'react-icons/fc'
import { BsThreeDotsVertical } from 'react-icons/bs'
import avater from "../../../../assets/Home/homeLeft/avater.gif"
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database"
import { getAuth } from 'firebase/auth'
import moment from 'moment';

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth()
  const [FriendtList, setFriendList] = useState([])

  useEffect(()=>{
    const FriendRef = ref(db, 'Friends/' );
    onValue(FriendRef, (snapshot) => {
      const FriendtArr = [];
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      snapshot.forEach((item)=>{
        if(auth.currentUser.uid === item.val(). WhoReciveFriendRequestUid
        )
          FriendtArr.push(
        {
          // createdAt:item.val().createdAt,
          // WhoReciveFriendRequestUid: item.val().WhoReciveFriendRequestUid,
          // WhoReciveFriendRequestUserEmail: item.val().WhoReciveFriendRequestUserEmail,
          // WhoReciveFriendRequestUserKey: item.val().WhoReciveFriendRequestUserKey,
          // WhoReciveFriendRequestUserName: item.val().WhoReciveFriendRequestUserName,
          // WhoReciveFriendRequestUserphotoUrl: item.val().WhoReciveFriendRequestUserphotoUrl,
          // WhoSendFriendRequestEmail:item.val().WhoSendFriendRequestEmail,
          // WhoSendFriendRequestName: item.val().WhoSendFriendRequestName,
          // WhoSendFriendRequestProfile_picture: item.val().WhoSendFriendRequestProfile_picture,
          // WhoSendFriendRequestUid: item.val().WhoSendFriendRequestUid,
          ...item.val(), friendKey: item.key

        }
      )
      })
      setFriendList(FriendtArr);  
    });
  },[])
  // console.log(FriendtList);
  
  /**
   * todo : handleBlock function implement
   */

  const handleBlock = (item ={})=>{
    console.log(item);
    const blockUserRef = ref(db ,"blockedUser/");
    set(push(blockUserRef), item).then(()=>{
      const removeFriends = ref(db, 'Friends/' + item.friendKey)
      remove(removeFriends)
    })
    
  }


  return (
   <div className='self-end mb-[12px]'>
    <div className='flex flex-col gap-y-6 justify-end self-end'>

   <div className=' h-[347px] w-[527px] rounded-2xl shadow-2xl'>
    <div className='flex justify-between items-center px-5 py-3'>
    <h1 className='text-black text-xl font-semibold font-popping relative'>
        Friends
        <span class="absolute -top-3 -right-10 flex h-10 w-10">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full  h-10 w-10 bg-sky-200 flex justify-center items-center">{FriendtList?.length}</span>
        </span>
        </h1>
      <span className='text-Auth_maun_color text-2xl cursor-pointer'>
      <BsThreeDotsVertical />
      </span>
    </div>
    <div className=' h-[84%] w-full px-5  overflow-y-scroll rounded-2xl divide-y-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-gray-300'>
      {FriendtList?.map((user,index)=>(
         <div className='flex mt-6 gap-x-3 items-center'>
         <div className='h-[60px] w-[60px] rounded-full shadow-2xl '>
             <picture>
               <img src={user.WhoSendFriendRequestProfile_picture?user.WhoSendFriendRequestProfile_picture:avater} alt={avater} />
             </picture>
           </div>
           <div className='basis-[65%]  flex flex-col justify-center items-start ml-3'>
             <h2 className='heading capitalize'>{user.WhoSendFriendRequestName}</h2>
             <p className='subHeading'>{moment(user.createdAt).toNow()}</p>
           </div>
           <div>
           <button className=' text-white  bg-gradient-to-r from-orange-500 to-red-600  font-popping rounded-[9px] px-4 py-2 ml-4 flex items-center' onClick={()=>handleBlock(user)} >Block</button>
           </div>
         </div>
      ))}
   
    
    </div>
   </div>
   </div>
   </div>
  )
}

export default Friends