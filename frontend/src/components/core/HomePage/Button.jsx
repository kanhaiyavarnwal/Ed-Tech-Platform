import React from 'react'
import {Link} from "react-router-dom"
export default function Button({children,active,Linkto}) {
  return (
    <Link to={Linkto}>
        <div className={`px-6 font-bold py-3 text-center text-[13px] rounded-md
           ${active ?" bg-yellow-50 text-black ":"bg-richblack-800"} hover:scale-95 transition-all duration-200
            
            `}>
            {children}
        </div>
    </Link>
    
  )
}
