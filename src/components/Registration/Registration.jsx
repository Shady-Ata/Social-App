import React from 'react'
import styles from './registration.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  let navigate = useNavigate()
  // yup - zod 
  let schema = z.object({
    name:z.string().min(3,"name must be at least 3 characters").nonempty("name is required"),
    email:z.string().email("email is not valid").nonempty("email is required"),
    password:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"password is not valid").nonempty("password is required"),
    rePassword:z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"confirm password is not valid").nonempty("confirm password is required"),
    dateOfBirth:z.string().nonempty("date of Birth is required"),
    gender:z.enum(["female","male"])
  }).refine((data)=>data.password == data.rePassword,{
    message:"password not match",
    path:["rePassword"]
  })

  let {register,handleSubmit,
    setError,
    formState:{errors,isSubmitting},
  } = useForm({
    resolver:zodResolver(schema)
  });

 async function onSubmit(values){
    try{
    let  {data} =  await axios.post('https://linked-posts.routemisr.com/users/signup',values)
     if(data.message == "success"){
      // login
      navigate('/login')
     }
    }catch(error){
         setError('root',{message:error.response.data.error})
    }
  }

  return (
    <div className='w-[60%] mx-auto shadow-lg rounded p-10 my-10'>
      <h1 className='text-sky-700 text-3xl  font-semibold'>Register Now</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} type="text" placeholder="type your name...." className="input input-neutral w-full my-3" />
         {errors.name && (<p className='text-red-500 mb-2'>{errors.name.message}</p>)}
        <input {...register("email")} type="email" placeholder="type your email...." className="input input-neutral w-full mb-3" />
         {errors.email ? <p className='text-red-500 mb-2'>{errors.email.message}</p>:null}
        <input {...register("password")} type="password" placeholder="type your password...." className="input input-neutral w-full mb-3" />
         {errors.password ? <p className='text-red-500 mb-2'>{errors.password.message}</p>:null}
        <input {...register("rePassword")} type="password" placeholder="confirm password...." className="input input-neutral w-full mb-3" />
         {errors.rePassword ? <p className='text-red-500 mb-2'>{errors.rePassword.message}</p>:null}
        <input {...register("dateOfBirth")} type="date"  className="input input-neutral w-full mb-3" />
        {errors.dateOfBirth ? <p className='text-red-500 mb-2'>{errors.dateOfBirth.message}</p>:null}
        <div>
          <input {...register("gender")} type="radio" id="male" value="male" name="gender" className="radio radio-primary"  />
          <label htmlFor="male " className='mx-2'>Male</label>
          <input {...register("gender")} type="radio" id="female" value="female" name="gender" className="radio radio-primary" />
          <label htmlFor="female" className='mx-2'>Female</label>
        {errors.gender ? <p className='text-red-500 mb-2'>{errors.gender.message}</p>:null}
        </div>


        {errors.root && <p className='text-red-500 mb-2'>{errors.root.message}</p>}

        <button type="submit" className='bg-sky-700 text-white px-6 py-3 rounded-lg mt-3 hover:bg-sky-800 cursor-pointer'>
          {isSubmitting ? "loading..." :"SignUp"}
        </button>
      </form>
    </div>
  )
}

// 
