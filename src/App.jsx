import React from 'react'
import Registration from './pages/Registration/Registration'
import Login from './pages/Login/Login';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,

} from "react-router-dom";
import Home from './pages/Home/Home';
import RootLayout from './Components/RootLayout/RootLayout';

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element: <h1>this is home page</h1>,
//     errorElement: "not found in home",
//   },
//   {
//     path: "/about-us",
//     element: <h1>this is about us page</h1>,
    
//   },
//   {
//     path:"/registration",
//     element:<Registration/>,
//     errorElement:"not found",
    
//   }
// ]);

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
      <Route path='/registration' element={<Registration/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route path='/chat' element={"<Chat/>"}></Route>
      <Route path='/settings' element={"<Settings/>"}></Route>
      <Route path='/notification' element={"<Notification/>"}></Route>
      
      </Route>  
  </Route>

));


const App = () => {
  return (

    <div>
      <ToastContainer/>
      <RouterProvider router={router}/> 

    </div>
    
    
     
    
 
  
  )
}

export default App