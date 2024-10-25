import React, { useState, useRef, useEffect  } from 'react'
import Search from '../Search/Search.jsx'
import { FcSearch } from 'react-icons/fc'
import { BsThreeDotsVertical } from 'react-icons/bs'
import avater from "../../../../assets/Home/HomeRight/Cat.gif"
import Cropper from "react-cropper";
import Modal from 'react-modal';
import "cropperjs/dist/cropper.css";
import { ErrorToast, SuccessToast } from '../../../../../Utils/ToastMessage/Toast.js'
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { data } from 'autoprefixer'
import { getDatabase, ref as dbref, set, push, onValue } from "firebase/database";
import { getAuth } from 'firebase/auth' 
import moment from 'moment';


const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }


const GroupList = () => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [allgroupList , setallgroupList] = useState([]);
  const [allgroupRequestList , setallgroupRequestList] = useState([]);
  const [groupInputValue , setgroupInputValue] = useState({
    groupName:"",
    GrouptagName:"", 
  })


  //fetch group info
  useEffect(()=>{
    const starCountRef = dbref(db, 'groups/'); 
    onValue(starCountRef, (snapshot) => {
    const groupbalnkarr = []
    snapshot.forEach((item)=>{
      if(item.val().whoCreatedGroupuid !== auth.currentUser.uid ){
        groupbalnkarr.push({...item.val() , groupKey: item.key});
      }
      
    })
    setallgroupList(groupbalnkarr);
    });
  },[])

  // console.log(allgroupList);



    //fetch groupRequest info
  useEffect(() => {
    const starCountRef = dbref(db, "groupRequest/");
    onValue(starCountRef, (snapshot) => {
      const groupRequestblankarr = [];
      snapshot.forEach((item) => {
        groupRequestblankarr.push(
          item.val().groupKey + item.val().whoJoinGroupUid,
        );
      });
      setallgroupRequestList(groupRequestblankarr);
    });
  }, []);

    // console.log(allgroupRequestList);
    

  
  const [loading , setloading] = useState(false)
  const storage = getStorage();
  const db = getDatabase();
  const auth = getAuth();


  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  //cropper all state
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef(null);

  //crop onchange function implement

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      SuccessToast("Crop Done" , "top-center");
   
    }
  };

//onGroupchangehandler function implement
const onGroupchangehandler = (event) => {
  const { id, value } = event.target;
  setgroupInputValue({
    ...groupInputValue,
    [id]: value,
  });
};


/**
 * todo: handleGroup function implement
 */

const handleGroup = ()=>{
  const {grouptagName , groupName} = groupInputValue;
  if(!cropData || !grouptagName || !groupName){
    return ErrorToast(`Must Fillup the grouptagName or the groupName or Cropping Image`, "top-center");
  }
  setloading(true)
  const storageRef = ref(storage, `GroupImage/image${uuidv4() }`);
  uploadString(storageRef,cropData , 'data_url')
  .then((snapshot) => {
    
    setCropData("");
     
  }).then(()=>{
    return getDownloadURL(storageRef);
  }).then((groupDownloadUrl)=>{
    set(push(dbref(db, 'groups/')), {
      whoCreatedGroupuid: auth.currentUser.uid,
      whoCreatedGroupName: auth.currentUser.displayName,
      whoCreatedGroupProfile_picture: auth.currentUser.photoURL,
      whoCreatedGroupEmail: auth.currentUser.email,
      groupName: groupInputValue.groupName,
      GroupTagName: groupInputValue.GrouptagName,
      groupPhoto: groupDownloadUrl,
      createdAt:moment().format("MM DD YYYY, h:mm:ss a"),
    });
    
  }).catch((error)=>{
    setloading(false)
    ErrorToast(`Error form Create Group$`, "top-center")
  })
  
  
  .finally(()=>{
    setgroupInputValue({
      groupName:"",
      GrouptagName:""
    
    });
    setCropData(""); 
    setImage("");
    setloading(false);
    closeModal();
  })
}

/**
 * todo:handlejoinGroup function implementation
 * @param(item) 
 */

const handlejoinGroup = (item = {})=>{
  set(push(dbref(db, 'groupRequest/')), 
  {...item, whoJoinGroupUid : auth.currentUser.uid ,
    whoJoinGroupName : auth.currentUser.displayName,
    whoJoinGroupEmail : auth.currentUser.email,
    whoJoinGroupProfile_picture : auth.currentUser.photoURL,
    createdAt : moment().format("MM DD YYYY, h:mm:ss a"),

   
  });

  
}


  return (
    <>
   <div className='flex flex-col gap-y-6'>
   <div className='w-[427px] '>
     <div className='relative'>
      <span className='absolute top-[15px] left-[20px] text-2xl '>
      <FcSearch />
      </span>
      <Search className='border-[1px] border-gray-400 rounded-full w-[427px] py-3 px-14 shadow-xl '/>
      <span className='absolute top-[15px] right-[20px] text-Auth_maun_color text-2xl cursor-pointer'>
      <BsThreeDotsVertical />
      </span>
     </div>
    </div>
   <div className=' h-[356px] w-[527px] rounded-2xl shadow-2xl'>
    <div className='flex justify-between items-center px-5 py-1'>
      <h1 className='text-black text-xl font-semibold font-popping relative'>
      Group List
        <span class="absolute -top-3 -right-10 flex h-10 w-10">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full  h-10 w-10 bg-sky-200 flex justify-center items-center">{allgroupList?.length}</span>
        </span>
        </h1>
      <span className='text-Auth_maun_color text-lg cursor-pointer'>
      <button className='button rounded-[9px] px-3 py-2 ml-4 flex items-center'onClick={openModal}>Create Group</button>
      </span>
    </div>
    <div className={allgroupList?.length > 0 ? ' h-[84%] w-full px-5  overflow-y-scroll rounded-2xl divide-y-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-gray-300' : "flex items-center justify-center h-full"}>
      {allgroupList?.length > 0 ? (allgroupList?.map((item)=>(
         <div className='flex mt-6 gap-x-3 items-center' key={item.groupKey}>
         <div className='h-[80px] w-[80px] rounded-full shadow-2xl'>
             <picture>
               <img src={item?item.groupName :  avater} alt={item?item.groupName :  avater} className=' h-[50px]' />
             </picture>
           </div>
           <div className='basis-[75%]  flex flex-col justify-center items-start ml-3'>
             <h2 className='heading'>{item? item.groupName : "Friends Reunion"}</h2>
             <p className='subHeading'>{item? item.GroupTagName : "Hi Guys, Wassup!"}</p>
           </div>
           <div>
            {allgroupRequestList?.includes(item.groupKey + auth.currentUser.uid)?(<span className='text-Auth_maun_color text-lg cursor-pointer'>
                <button className='button rounded-[9px] px-5 py-2 ml-4 flex items-center' >Request Pending</button>
            </span>) : (<span className='text-Auth_maun_color text-lg cursor-pointer'>
                <button className='button rounded-[9px] px-5 py-2 ml-4 flex items-center' onClick={()=>handlejoinGroup(item)}>Join</button>
            </span>)}
           
           </div>
         </div>
      ))) : (<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert">
        <span class="font-medium">Danger alert!</span> No Group Creat a New Group
      </div>)}
    
    </div>
  
   </div>
   <div>
   <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
 
        <button className='w-10 h-10 rounded-full bg-red-600 text-white' onClick={closeModal}>close</button>
        <h1 className='capitalize'>Group Information</h1>
        <form on onSubmit={(e)=>e.preventDefault()}>
          <label htmlFor="groupName">{" "}GroupName <span className='text-red-500'>*</span></label>
          <input
           type='text' 
           className='w-full bg-gray-300 border-2 border-red-200 py-2 px-2 rounded-md'
            id='groupName'
            name='groupName'
            value={groupInputValue.groupName} 
            onChange={onGroupchangehandler}
          />

              <label htmlFor="grouptagName">
                grouptagName <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-xl border-2 border-red-100 bg-gray-200 px-2 py-2"
                type="text"
                id="grouptagName"
                name="grouptagName"
                value={groupInputValue.grouptagName}
                onChange={onGroupchangehandler}
              />

          {/* Cropper Body */}
        <div>
          <div className='my-10'>
            <input type="file" onChange={onChange} />
            <button className=''>Use default img</button>
            
          </div>
          <div className="flex w-[1200px] justify-between">
          <div className='h-[250px] w-[400px]'>
          <Cropper
              ref={cropperRef}
              style={{ height: "100%" }}
              zoomTo={0.3}
              initialAspectRatio={1.1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
          </div>
            {/* Preview */}
            <div className=" bg-red-500 h-[250px] w-[350px] relative">
              <h1 className='absolute -top-[63px] px-5 py-3 rounded-xl text-white bg-red-600'>Preview</h1>
              <div className="img-preview overflow-hidden h-[250px] z-10 preview_box"/>
            </div>
           {/* Preview */}

            {/* Cropper Div */}

            <div className=" bg-blue-500 h-[250px] w-[350px] relative">
              <h1 className='absolute -top-7'>
                
                <button style={{ float: "right" }} onClick={getCropData} className='absolute -top-[33px] px-5 py-3 rounded-xl text-white bg-blue-500 text-nowrap'>
                  Crop Image
                </button>
              </h1>
              <img
              className='CropImage'
               src={cropData} alt="cropped" />
          </div>
           {/* Cropper Div */}
        </div>  
          
        </div>
          {/* Cropper Body */}

          {loading ? (<button className='w-full py-3 bg-blue-600 mt-10 text-white text-base rounded-xl'
           >Loading........</button>) : (<button className='w-full py-3 bg-blue-600 mt-10 text-white text-base rounded-xl'
            onClick={handleGroup}
            >Create Groups</button>)}

          
        </form>
      </Modal>
    </div>
   </div>

    </>

  );
};

export default GroupList