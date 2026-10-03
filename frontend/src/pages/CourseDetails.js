import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/studentFeatureApi'

export default function CourseDetails() {
 const {user } = useSelector((state)=>state.profile)
 const {token} = useSelector((state)=>state.auth)
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const {courseId} = useParams()


 const handleBuyCourse = () =>{
   
    if(token){
        console.log("token: ",token)
        console.log("user: ",user)
        console.log("courseid: ",courseId)
   
     const res =    buyCourse(token,user,[courseId],navigate,dispatch)
     console.log("res in buy course: ",res)
    }
 }
     
  return (
    <div className='flex'>
        <button className='bg-yellow-200 p-6'
        onClick={handleBuyCourse}
        >Buy Now</button>
    </div>
  )
}



