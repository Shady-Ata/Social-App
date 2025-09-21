import React, { useContext, useState } from 'react'
import styles from './home.module.css';
import axios from 'axios';
import { getAllPosts } from '../../Api/allPosts.api';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import PostItem from '../PostItem/PostItem';
import Comments from '../comments/comments';
import AddPost from '../AddPost/AddPost';
import {Helmet} from "react-helmet";
import AddComment from '../addComment/addComment';


export default function Home() {

  const [showComments, setShowComments] = useState(false);

let {data,isLoading,isError,error} = useQuery({
    queryKey:["getPosts"],
    queryFn:getAllPosts,
    select:(data)=> data?.posts
})



if(isLoading){
  return  <Loader></Loader>
}

if(isError){
  return <h1 className='text-red-900'>{error.message}</h1>
}

 return (
  <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
  {<AddPost/>}
  {
     data.map((post)=>{
      return   <div key={post?._id} className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
          <PostItem post={post} key={post?._id}/>
      <div className="flex gap-3 text-sm text-gray-500">
        <button className="btn btn-ghost btn-sm">👍 Like</button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setShowComments(!showComments)}
        >
          💬 Comment
        </button>
        <button className="btn btn-ghost btn-sm">↪️ Share</button>
      </div>

     {/* Toggle Comments Section */}
      {showComments && (
        <div className="mt-4">
          {/* Existing Comments */}
         
         <Comments postId={post?._id}/>


        <div>
                  <div className="mb-2 flex justify-between gap-3 items-center">
                    <div className="">
                      <div className=" avatar">
                        <div className="w-8 h-8 rounded-full ">
                          <img
                            src=""
                            alt="Commenter"
                          />
                        </div>
                      </div>
                      <p>name </p>
                    </div>
                    <div className="chat-bubble w-full">comment.content</div>
                  </div>
                </div>
        </div>
      )}
              <AddComment postId={post?._id}/>  

    </div>
     })
  }
  </>
  
  );
}
