import React from 'react'
import styles from './profile.module.css';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '../../Api/posts/userPosts.api';
import Loader from '../Loader/Loader';
import PostItem from '../PostItem/PostItem';
import { useState } from 'react';
import Comments from '../comments/comments';
import AddPost from '../AddPost/AddPost';
import { Helmet } from 'react-helmet';
import AddComment from '../addComment/addComment';


export default function Profile() {
  const  {id} = useParams()
 const [showComments, setShowComments] = useState(false);
const {data,isError,isLoading,error} = useQuery({
    queryKey:['profile'],
    queryFn:()=>getUserPosts(id)
    })
    if(isLoading){
      return <Loader/>
    }


    if(isError){
      return <h1>{error.message}</h1>
    }

  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
            </Helmet>
    {<AddPost/>}
      {
      data?.posts.map((post)=>{
        return  <div  key={post?._id} className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
        
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
         
         {post?.comments.map((comment)=><Comments comment={comment}/>)}


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

        <AddComment postId={post?._id}/>
        </div>
      )}
    </div>
      })
    }
    </>
  
  
  )
}
