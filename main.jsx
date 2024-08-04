import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Route,RouterProvider,createBrowserRouter,createRoutesFromElements, } from "react-router-dom"
import Layout from './Layout'
import './index.css'
import Home from './components/Home/Home'
import About from './components/About/About'
import User from './components/User/User'
import Login from './components/SignIn/SignIn'
import Signup from './components/SignUp/SignUp'
import DoctorCheckForm from './components/DoctorCheckForm/DoctorCheckForm'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/signup" element ={<DoctorCheckForm/>}/>
      <Route path="/login" element ={<Login/>}/>
     <Route path="" element ={<Home/>}/>
     <Route path="/about" element={<About/>}/>
     <Route path="user" element={<User />}>
     <Route path=":id" element={<User />}/></Route>
    
      </Route>
    
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
  <RouterProvider router={router}></RouterProvider>
   
    
  </React.StrictMode>
)
