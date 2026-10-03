import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ReactStars from "react-rating-stars-component"
export default function RenderCartCourses() {
    const {cart,removeFromCart} = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
  return (
    <div>
        {
            cart.map((course,id)=>(
                <div>
                    <div>
                        <img src={course.thumbnail} alt="thumbnail " loading='lazy' />
                        <div>
                            {course?.courseName}
                            <p>{course?.category?.name}</p>
                            <div>
                                <span>4.5</span>
                                <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<CiStar />}
                                fullIcon={<FaStar />}/>
                                <span>{course?.ratingAndReviews.length}</span>

                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                        onClick={()=>dispatch( removeFromCart(course?.id))}
                        >
                        <MdDelete />
                        <span>Remove</span>
                        </button>
                        <p>Rs {course?.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
