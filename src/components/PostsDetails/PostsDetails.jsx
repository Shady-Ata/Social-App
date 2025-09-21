import React, { useState } from 'react'
import styles from './postsDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSinglePosts } from '../../Api/singlePost.api';
import Loader from '../Loader/Loader';
import PostItem from '../PostItem/PostItem';
import Comments from '../comments/comments';
import AddComment from '../addComment/addComment';

export default function PostsDetails() {
  const [showComments, setShowComments] = useState(false);
  
  let {id} =useParams()
 
let  {data,isError,isLoading,error}=  useQuery({
    queryKey:["singlePost",id],
    queryFn:()=>getSinglePosts(id)
  })


  if(isLoading){
    return <Loader></Loader>
  }


  if(isError){
    return <h1 className='text-red-700'>{error.name}</h1>
  }

  return (
    <div className="card bg-base-100 shadow-md p-4 max-w-xl mx-auto my-6">
    <PostItem post={data?.post} key={data?.post?._id}/>
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
             
             {data?.post?.comments.map((comment)=><Comments comment={comment}/>)}
    
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
    
           <AddComment postId={data?.post?._id}/>
              
            </div>
          )}
    </div>
  )
}
