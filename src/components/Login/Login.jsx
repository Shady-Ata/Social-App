import React, { useContext } from 'react'
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { tokenContext } from '../../context/tokenContext';

export default function Login() {

  let {setToken}=useContext(tokenContext)
  let navigate = useNavigate()
  // yup - zod 
  let schema = z.object({
    email:z.string().email("email is not valid").nonempty("email is required"),
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"password is not valid").nonempty("password is required"),
  })

  let {register,handleSubmit,
    setError,
    formState:{errors,isSubmitting},
  } = useForm({
    resolver:zodResolver(schema)
  });



 async function onSubmit(values){
    try{
    let  {data} =  await axios.post('https://linked-posts.routemisr.com/users/signin',values)
     if(data.message == "success"){
          // save token to tokencontext
      // save token to localstorage
        setToken(data.token)
      localStorage.setItem('token',data.token)
      navigate('/')
     }
    }catch(error){
         setError('root',{message:error.response.data.error})
    }
  }

  return (
    <div className='w-[60%] mx-auto shadow-lg rounded p-10 my-10'>
      <h1 className='text-sky-700 text-3xl  font-semibold mb-3'>Login Now</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="email" placeholder="type your email...." className="input input-neutral w-full mb-3" />
         {errors.email ? <p className='text-red-500 mb-2'>{errors.email.message}</p>:null}
        <input {...register("password")} type="password" placeholder="type your password...." className="input input-neutral w-full mb-3" />
         {errors.password ? <p className='text-red-500 mb-2'>{errors.password.message}</p>:null}
       


        {errors.root && <p className='text-red-500 mb-2'>{errors.root.message}</p>}

        <button type="submit" className='bg-sky-700 text-white px-6 py-3 rounded-lg mt-3 hover:bg-sky-800 cursor-pointer'>
          {isSubmitting ? "loading..." :"SignIn"}
        </button>
      </form>
    </div>
  )
}
