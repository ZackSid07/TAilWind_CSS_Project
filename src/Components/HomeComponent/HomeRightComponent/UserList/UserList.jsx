import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import avater from "../../../../assets/Home/homeLeft/avater.gif"
import { getDatabase, ref, onValue , set, push } from "firebase/database"
import { getAuth } from 'firebase/auth'
import moment from 'moment';

const UserList = () => {
  

  const db = getDatabase();
  const auth = getAuth()
  const [userList, setuserList] = useState([])
  const [FriendRequestList, setFriendRequestList] = useState([])
  useEffect(()=>{
    const UserRef = ref(db, 'users/' );
    onValue(UserRef, (snapshot) => {
      const userBlankArr = [];
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      snapshot.forEach((item)=>{
        if(auth.currentUser.uid !== item.val().userUid)
        userBlankArr.push({
          ...item.val(),
          userKey: item.key,
        }) 
      })
      setuserList(userBlankArr);  
    });
  },[])

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
        if(true)
          FriendRequestArr.push(
        item.val().WhoSendFriendRequestUid + item.val().WhoReciveFriendRequestUid
      )
      })
      setFriendRequestList(FriendRequestArr);  
    });
  },[])

  // console.log(FriendRequestList);
  

  // console.log(userList);

  /**
   * todo: handleFriendRequest function implement
   */
  const handleFriendRequest = (item) => {

    
    
    set(push(ref(db, 'FriendRequest/') ), {
      WhoSendFriendRequestName: auth.currentUser.displayName,
      WhoSendFriendRequestUid: auth.currentUser.uid,
      WhoSendFriendRequestEmail: auth.currentUser.email,
      WhoSendFriendRequestProfile_picture: auth.currentUser.photoURL? auth.currentUser.photoURL: null,
      WhoReciveFriendRequestUid: item.userUid,
      WhoReciveFriendRequestUserName: item.UserName,
      WhoReciveFriendRequestUserEmail: item.UserEmail,
      WhoReciveFriendRequestUserphotoUrl: item.UserphotoUrl,
      WhoReciveFriendRequestUserKey: item.userKey,
      createdAt : moment().format("MM DD YYYY, h:mm:ss a"),
    });
    
  }
  
  return (

    <div className='self-end mb-[12px]'>
    <div className='flex flex-col gap-y-6 justify-end self-end'>

   <div className=' h-[347px] w-[527px] rounded-2xl shadow-2xl'>
    <div className='flex justify-between items-center px-5 py-3'>
      <h1 className='text-black text-xl font-semibold font-popping relative'>
      User List
        <span class="absolute -top-3 -right-10 flex h-10 w-10">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative rounded-full  h-10 w-10 bg-sky-200 flex justify-center items-center">{userList?.length}</span>
        </span>
        </h1>
      <span className='text-Auth_maun_color text-2xl cursor-pointer'>
      <BsThreeDotsVertical />
      </span>
    </div>
    <div className=' h-[84%] w-full px-5  overflow-y-scroll rounded-2xl divide-y-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-gray-300'>
      {userList?.map((item)=>(
         <div className='flex mt-6 gap-x-3 items-center' key={item.userUid}>
         <div className='h-[60px] w-[60px] rounded-full shadow-2xl '>
             <picture>
               <img src={item.UserphotoUrl || avater} alt={item.UserphotoUrl} />
             </picture>
           </div>
           <div className='basis-[65%]  flex flex-col justify-center items-start ml-3'>
             <h2 className='heading'>{item.UserName}</h2>
             <p className='subHeading'>{item.UserEmail}</p>
           </div>
           <div>
           {
            FriendRequestList.includes(
              auth.currentUser.uid + item.userUid ||
                item.userUid + auth.currentUser.uid,
            )?
            (
              <button className="button ml-4 rounded-lg px-7 py-2">
                -
              </button>
            )  : (
            <button
                    className="button ml-4 rounded-lg px-7 py-2"
                    onClick={() => handleFriendRequest(item)}
                  >
                    +
                  </button>)}
           
           </div>
         </div>
      ))}
   
    
    </div>
   </div>
   </div>
   </div>
  
  
  )
}

export default UserList