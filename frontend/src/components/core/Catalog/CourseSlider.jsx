
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import CourseCard from "./CourseCard"
import "swiper/css";
import "swiper/css/pagination";




export default function CourseSlider({ Courses }) {
    console.log("courses",Courses)
  return (
    <>
      {Courses?.length > 0 ? (
        <Swiper
         modules={[Autoplay, Pagination]}
  slidesPerView={1}
  spaceBetween={25}
  loop={true}
  autoplay={{
    delay: 1500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  pagination={{
    clickable: true,
  }}
  breakpoints={{
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
         
                    
  className="max-h-[30rem]"
        >
          {Courses.map((course) => (
            <SwiperSlide key={course._id}>
              <CourseCard
                course={course}
                Height="h-[250px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5 text-center">
          No Course Found
        </p>
      )}
    </>
  );
}