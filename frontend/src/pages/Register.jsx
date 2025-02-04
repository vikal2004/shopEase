import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const Register = () => {
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:""
    })

    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({
            ...formData,
           [ e.target.name]:e.target.value
        })
    }
    const submithandler=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post("/api/auth/register",formData);
            if(response.status==201 || response.status==200){
                console.log("User registered successfully, navigating to home...");
                navigate("/home");  // Ensure this route exists in your Router
            }else{
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.log( "error while sending request to the backend",error.response?.data);
        }
          
    }
  return (
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900">
                  Create an account
        </h1>
         
         <form onSubmit={submithandler} className="space-y-4 md:space-y-6">
         <div>
            <label for="name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input 
            type="text"  
            name="name" 
            value={formData.name}   
            onChange={handleChange}
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter your name" required="" />
        </div>
         <div>
            <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input 
            type="email"  
            name="email" 
            value={formData.email}  
            onChange={handleChange} 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@email.com" required="" />
        </div>

        <div>
            <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input 
            type="password" 
            name="password" 
            value={formData.password}  
            onChange={handleChange} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
        </div>
        <div>
            <label for="role" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input 
            type="text" 
            name="role" 
            value={formData.role} 
             placeholder="Enter your role" 
             onChange={handleChange} 
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
        </div>

        <div class="flex items-start">      
            <div class="flex items-center h-5"> 
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required="" />
             </div>
            <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline " href="#">Terms and Conditions</a></label>
            </div>
        </div>

        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500">Create an account</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to='/login'>Login here</Link></a>
            </p>

       

         </form>
   
        </div>


      </div>










        </div>
    </section>
  )
}

export default Register