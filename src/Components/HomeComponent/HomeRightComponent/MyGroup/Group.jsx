import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import avater from "../../../../assets/Home/HomeRight/Mancoat.gif"
import { getDatabase, ref, onValue } from "firebase/database";
import moment from 'moment';

const  Group = () => {
  const db = getDatabase();
  const [allgroupList , setallgroupList] = useState({});

  useEffect(()=>{
    const starCountRef = ref(db, 'groups/'); 
    onValue(starCountRef, (snapshot) => {
    const groupbalnkarr = []
    snapshot.forEach((item)=>{
      groupbalnkarr.push({...item.val() , groupKey: item.key});
    })
    setallgroupList(groupbalnkarr);
    });
  },[])

  console.log(allgroupList);
  
  return (
    <div className='self-end mb-[12px]'>
    <div className='flex flex-col gap-y-6 justify-end self-end'>

   <div className=' h-[347px] w-[527px] rounded-2xl shadow-2xl'>
    <div className='flex justify-between items-center px-5 py-3'>
      <h1 className='text-black text-xl font-semibold font-popping'>Group</h1>
      <span className='text-Auth_maun_color text-2xl cursor-pointer'>
      <BsThreeDotsVertical />
      </span>
    </div>
    <div className=' h-[84%] w-full px-5  overflow-y-scroll rounded-2xl divide-y-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-gray-300'>
      {[allgroupList]?.map((item)=>(
         <div className='flex mt-6 gap-x-3 items-center' key={item.groupKey}>
         <div className='h-[50px] w-[50px] rounded-full shadow-2xl '>
             <picture>
               <img src={item?item.groupName :  avater} alt={item?item.groupName :  avater} className=' h-[50px]' />
             </picture>
           </div>
           <div className='basis-[65%]  flex flex-col justify-center items-start ml-3'>
             <h2 className='heading'>{item? item.groupName : "Friends Reunion"}</h2>
             <p className='subHeading'>{item? item.grouptagName : "Hi Guys, Wassup!"}</p>
           </div>
           <div>
             <span className='subHeading'>{moment(item.createdAt).toNow()}</span>
           </div>
         </div>
      ))}
   
    
    </div>
   </div>
   </div>
   </div>
  )
}

export default Group