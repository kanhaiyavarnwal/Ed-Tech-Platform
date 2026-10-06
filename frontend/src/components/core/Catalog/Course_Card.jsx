import React from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating'
import { useState,useEffect } from 'react'
import RatingStars from '../../common/RatingStars'

export default function Course_Card({course,Height}) {
 
    const [avgReviewCnt , setAvgReviewCnt] = useState(0)

    useEffect(()=>{
        const cnt = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCnt(cnt)
    },[course])
  return (
    <div className='text-richblack-25'>
    <Link to={`/course/${course._id}`}>
      <div>
        <div>
            <img src={course?.thumbnail} alt="course thumbnail"
             className={`${Height} w-full rounded-xl object-cover`}/>

        </div>
        <div>
            <p>course : {course.courseName}</p>
            <p>{course?.instructor?.firstName}  {course?.instructor?.lastName}</p>
            <div>
                <span>{avgReviewCnt || 0}</span>
                <RatingStars Review_Count = {avgReviewCnt}/>
                <span>{course.ratingAndReviews.length} Rating</span>
            </div>
            <p>Price: {course.price}</p>
        </div>
      </div>
    
    </Link>

    </div>
  )
}
