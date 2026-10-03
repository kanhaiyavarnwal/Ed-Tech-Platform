import { profileEndpoints } from "../api";
import {setLoading} from "../../slices/profileSlice"
import {logOut} from "./authApi"
import { apiConnector } from "../apiconnectors";
import {toast} from "react-hot-toast"
import {setUser} from "../../slices/profileSlice"


const {
     GET_USER_DETAILS_API,
     GET_USER_ENROLLED_COURSES_API,
     GET_INSTRUCTOR_DATA_API
} = profileEndpoints


export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("get user details api res: ", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (err) {
      dispatch(logOut(navigate))
      console.log("get userdetails api err: ", err.message)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
  
}



export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
// console.log("enrolled api 48: ",GET_USER_ENROLLED_COURSES_API)
// console.log("enroled course token : ",token)
  let result = []
  try {
    // console.log("before try")
    const response = await apiConnector(
      "GET",
       GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
        // console.log("mid try")
    console.log("get userenrolled course response: ",response.data.data);
    //  console.log("after try")
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (err) {
    console.log("get user enrolled course api error: ", err)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("get instructaor data api response: ", response);
    result = response?.data?.courses

  }
  catch(err) {
    console.log("get instructaor data api response err: ", err.message);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}