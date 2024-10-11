import React, { useState, useRef  } from 'react'
import Search from '../Search/Search.jsx'
import { FcSearch } from 'react-icons/fc'
import { BsThreeDotsVertical } from 'react-icons/bs'
import avater from "../../../../assets/Home/HomeRight/Cat.gif"
import Cropper from "react-cropper";
import Modal from 'react-modal';
import "cropperjs/dist/cropper.css";
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
    }
  };

  console.log(cropData);
  







  

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
      <h1 className='text-black text-xl font-semibold font-popping'>Group List</h1>
      <span className='text-Auth_maun_color text-lg cursor-pointer'>
      <button className='button rounded-[9px] px-3 py-2 ml-4 flex items-center'onClick={openModal}>Create Group</button>
      </span>
    </div>
    <div className=' h-[84%] w-full px-5  overflow-y-scroll rounded-2xl divide-y-2 scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-gray-300'>
      {[...new Array(10)].map((_,index)=>(
         <div className='flex mt-6 gap-x-3 items-center'>
         <div className='h-[60px] w-[60px] rounded-full shadow-2xl '>
             <picture>
               <img src={avater} alt={avater} />
             </picture>
           </div>
           <div className='basis-[70%]  flex flex-col justify-center items-start ml-3'>
             <h2 className='heading'>Friends Reunion</h2>
             <p className='subHeading'>Hi Guys, Wassup!</p>
           </div>
           <div>
             <button className='button rounded-[9px] px-4 py-2 ml-4 flex items-center'>Join</button>
           </div>
         </div>
      ))}
    
    
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
          <input type='text' className='w-full bg-gray-300 border-2 border-red-200 py-2 px-2 rounded-md' id='groupName' name='groupName' value={""} />

          <label htmlFor="GrouptagName">{" "}GrouptagName <span className='text-red-500'>*</span></label>
          <input type='text' className='w-full bg-gray-300 border-2 border-red-200 py-2 px-2 rounded-md' id='GrouptagName' name='GrouptagName' value={""} />

          {/* Cropper Body */}
        <div>
          <div style={{ width: "100%" }}>
            <input type="file" onChange={onChange} />
            <button className='-mx-7'>Use default img</button>
            
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
              <h1 className='absolute -top-7 left-5'>Preview</h1>
              <div className="img-preview overflow-hidden h-[250px] z-10 preview_box"/>
            </div>
           {/* Preview */}

            {/* Cropper Div */}

            <div className=" bg-blue-500 h-[250px] w-[350px] relative">
              <h1 className='absolute -top-7'>
                
                <button style={{ float: "right" }} onClick={getCropData} className='bg-red-500'>
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


          <button className=''>Create Groups</button>
          
        </form>
      </Modal>
    </div>
   </div>

    </>

  );
};

export default GroupList