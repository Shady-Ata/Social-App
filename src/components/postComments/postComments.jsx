import React from 'react'
import styles from './postComments.module.css';
import userImg from '../../assets/man.jpg';

export default function PostComments({comment}) {
  console.log(comment)
   const {commentCreator:{name,photo},content} = comment
  return (
    <>
      <div>
                  <div className="mb-2 flex justify-between gap-3 items-center">
                    <div className="flex items-center">
                      <div className=" avatar">
                        <div className="w-8 h-8 rounded-full ">
                          <img
                            src={photo.includes("undefined")? userImg :photo}
                            alt="Commenter"
                          />
                        </div>
                      </div>
                      <p>{name}</p>
                    </div>
                    <div className="chat-bubble w-[90%] mx-auto">{content}</div>
                  </div>
                </div>
    </>
  )
}
