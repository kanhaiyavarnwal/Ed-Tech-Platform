import { categories, courseEndpoints } from "../api";

import {toast} from "react-hot-toast"
import { apiConnector } from "../apiconnectors";
import { updateCompletedLectures } from "../../slices/viewCourseSlice"

const {
     CREATE_COURSE_API,
    //  COURSE_CATEGORIES_API ,
     EDIT_COURSE_API,
     COURSE_DETAILS_API ,
     GET_ALL_INSTRUCTOR_COURSES_API,
     DELETE_COURSE_API,
     GET_FULL_COURSE_DETAILS_API_AUTHENTICATED,
     LECTURE_COMPLETED_API,
     CREATE_RATING_API,
     GET_ALL_COURSES_API,
     CREATE_SECTION_API ,
     CREATE_SUBSECTION_API,
     UPDATE_SECTION_API ,
     UPDATE_SUBSECTION_API,
     DELETE_SECTION_API,
     DELETE_SUBSECTION_API,


} = courseEndpoints


export const getAllCourses = async () =>{
    const toastId = toast.loading("Loading...")
    let result = []
    try{
     const response = await apiConnector("GET",GET_ALL_COURSES_API)
     
     if(!response?.data?.success){
        throw new Error("could not fetch all courses")
     }
      result = response?.data?.data

    }catch(err){
     console.log("get all course api error: ",err.message)
     toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result;
}

export const fetchCourseDetails = async(courseId)=>{
   console.log("course id ",courseId)
   console.log("course details api: ",COURSE_DETAILS_API)
      const toastId = toast.loading("Loading...")
       let result = null

       try{
        const response = await apiConnector("GET", COURSE_DETAILS_API,{
            courseId,
        })
        console.log("course details api res: ",response)

        if (!response.data.success) {
         throw new Error(response.data.message)
       }
       result = response.data

       }catch(err){
        console.log("course details api error : ",err.message)
        //  result = err.response.data
       }
        toast.dismiss(toastId)
        return result
}

// fetch course category
export const fetchCourseCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", categories.COURSE_CATEGORIES_API )
    console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("COURSE_CATEGORY_API API ERROR............", error)
    toast.error(error.message)
  }
  return result
}


export const addCourseDetails = async(data,token)=>{

  // console.log("data in course api : ",data)

    let result = null
     const toastId = toast.loading("Loading...")

     try{
        const response = await apiConnector("POST", CREATE_COURSE_API,data,{
               "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
        })

    // console.log("response of add course : ",response)

     if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details")
    }
        toast.success("Course Details Added Successfully")
       result = response?.data?.data


     }catch(err){
      console.log("create course api err: ",err.message)
      toast.error(err.message)
      result = err.message
     }
     toast.dismiss(toastId)
     return result
}


// export const addCourseDetails = async (data, token) => {
//   console.log("FormData:");

//   // Print FormData
//   for (const [key, value] of data.entries()) {
//     console.log(key, value);
//   }

//   let result = null;
//   const toastId = toast.loading("Loading...");
//   console.log("create course api : ",CREATE_COURSE_API)
//   try {
//     const response = await apiConnector(
//       "POST",
//       CREATE_COURSE_API,
//       data,
//       {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       }
//     );

//     console.log("Create Course Response:", response);

//     if (!response?.data?.success) {
//       throw new Error(response?.data?.message || "Could Not Add Course");
//     }

//     toast.success("Course Details Added Successfully");
//     result = response.data.data;
//   } catch (err) {
//     console.log("Create Course Error:", err.message);
//     toast.error(err.response?.data?.message || err.message);
//   } finally {
//     toast.dismiss(toastId);
//   }

//   return result; // <-- Don't forget this
// };

export const editCourseDetails = async( data,token)=>{
    let result = null
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    // console.log("edit course api response: ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details")
    }
    toast.success("Course Details Updated Successfully")
    result = response?.data?.data
}catch(err){
  console.log("edit course api err: ",err.message)
  toast.error(err.message)
}
 toast.dismiss(toastId)
  return result

}

export const createSection = async(data , token)=>{
     let result = null
    //  console.log("data print in courseDetails : ",data)
    //  console.log("tokren in section : ",token)
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("crete section api :  ", response)
    // console.log("crete section api data:  ", response.data)
    // console.log("crete section api data:  ", response.data.data.courseContent)
    // console.log("crete section api course content  length:  ", response.data.data.courseContent.length)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.data
  } catch (err) {
    console.log("create section api err:  ", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)

  return result
}

export const createSubSection = async(data,token)=>{
    let result = null
  const toastId = toast.loading("Loading...")
  try {
    // console.log("subsection data",data)
    // console.log("subsection api", CREATE_SUBSECTION_API)
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("create subsectionapi: ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data?.data
  } catch (err) {
    console.log("create subsection api err", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSection = async(data,token)=>{
     let result = null
  const toastId = toast.loading("Loading...")
  try {
    console.log("update section data:",data)
    console.log("update section api : ",  UPDATE_SECTION_API )
    const response = await apiConnector("PUT",  UPDATE_SECTION_API , data, {
      Authorization: `Bearer ${token}`,
      
    })
    console.log("update section api response:   ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.data
  } catch (err) {
    console.log("update section err", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result
}

export const updateSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("update subSection response:  ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture")
    }
    toast.success("Lecture Updated")
    result = response?.data?.data
  } catch (err) {
    console.log("update subsection response  err:  ", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result
}


export const deleteSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("delete section apiresponse : ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section")
    }
    toast.success("Course Section Deleted")
    result = response?.data?.data
  } catch (err) {
    console.log("deleted section err :  ", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result
}


export const deleteSubSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("delete subsection api response:  ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    result = response?.data?.data
  } catch (err) {
    console.log("deleted subsection err: ", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchInstructorCourses = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("is instructor course api response: ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses")
    }
    result = response?.data?.data
  } catch (err) {
    console.log("instructor courses err: ", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return result
}


export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  // console.log("delete api data: ",data)
  // console.log("delete api token: ",token)
  try {
  // console.log("delete api route: ",  DELETE_COURSE_API)
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("delete course api response: ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (err) {
    console.log("deleted course api err: ", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
}

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true));
    console.log("clorseId: ",courseId)
    console.log("token: ",token)
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_API_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("course fulldetails response api : ", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.data
  } catch (err) {
    console.log("course fulldetails api err: ", err.message)
    result = err.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

export const markLectureAsComplete = async (data, token) => {
  let result = null
  console.log("mark complete data", data)
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETED_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log(
      "merk lecture completed api res: ",
      response
    )

    if (!response.data.message) {
      throw new Error(response.data.error)
    }
    toast.success("Lecture Completed")
    result = true
  } catch (err) {
    console.log("mark lecture completed err : ", err)
    toast.error(err.message)
    result = false
  }
  toast.dismiss(toastId)
  return result
}

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("create rating api response : ", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
    success = true
  } catch (err) {
    success = false
    console.log("create rating api err: ", err.message)
    toast.error(err.message)
  }
  toast.dismiss(toastId)
  return success
}
