import React from 'react'

const states=[
    {
        count:"5K" , label:"Active Students"
    },
    {
        count:"10+" , label:"Mentors"
    },
    {
        count:"200+" , label:"Courses"
    },
    {
        count:"50+" , label:"Awards"
    },
];
export default function Stats() {
  return (
    // <section className='bg-richblack-700 h-[150px]'>
    //     <div className='w-11/12 flex justify-center items-center text-center mx-auto'>
    //         <div className='flex gap-x-8 items-center justify-evenly'>
    //             {
    //                 states.map((data,index)=>(
    //                     <div className='flex flex-col'>
    //                         <h1>{data.count}</h1>
    //                         <h2>{data.label}</h2>
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //     </div>
    // </section>
      <div className="bg-richblack-700">
      {/* Stats */}
      <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {states.map((data, index) => {
            return (
              <div className="flex flex-col py-10" key={index}>
                <h1 className="text-[30px] font-bold text-richblack-5">
                  {data.count}
                </h1>
                <h2 className="font-semibold text-[16px] text-richblack-500">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
