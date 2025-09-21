import React from 'react'
import styles from './comments.module.css';

import { useQuery } from '@tanstack/react-query';
import { getPostComment } from '../../Api/comments/getComment.api';
import PostComments from '../postComments/postComments';
export default function Comments({postId}) {

const {data,isError,isLoading} = useQuery({
    queryKey:['comments'],
    queryFn:()=>getPostComment(postId)
  })
  return (
    <>
    {data?.comments.slice(0,10).map((comment)=><PostComments comment={comment}></PostComments>)}
     
    </>
  )
}
