import { settingEndpoints } from "./api";
import { apiConnector } from "./apiconnectors";
import {toast} from "react-hot-toast"
import {setUser} from "../slices/profileSlice"
import { logOut } from "./operations/authApi";

const {
    UPDATE_PROFILE_API ,
     CHANGE_PASSWORD_API,
     DELETE_ACCOUNT_API
} = settingEndpoints

export function updateProfile(token, formData,navigate) {
  return async (dispatch) => {
    // console.log("token in the updateProfi: ",token)
    // console.log("formDasta in the updateProfi: ",formData)

    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("update profile api response: ", response.data)
     
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const {updatedUser} = response.data.data
      console.log("updated User: ",updatedUser)
      const userImage = updatedUser.image? updatedUser.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${updatedUser.firstName} ${updatedUser.lastName}`
      dispatch(
        setUser({ ...updatedUser, image: userImage })
      )
      toast.success("Profile Updated Successfully")
      navigate("//dashboard/my-profile")
    } catch (err) {
      console.log("update profile api err: ", err.message)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}
export async function changePassword(token,navigate, formData) {
  const toastId = toast.loading("Loading...")
  console.log("token in setting api: ",token)
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("change password ai response: ", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
    navigate("/dashboard/my-profile")
  } catch (err) {
    console.log("change password api err: ", err.message)
    toast.error( err.response.data.message||"could not change your password")
  }
  toast.dismiss(toastId)
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    console.log("delete api : ",DELETE_ACCOUNT_API)
    console.log("delete api user token : ",token)
    
    try {
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("delete account api res: ", response?.data?.message)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully" || response?.data?.message)
     await dispatch(logOut(navigate));
    } catch (err) {
      console.log("delete account api err: ", err.message)
      toast.error(err.response?.data?.message||err.message)
    }
    toast.dismiss(toastId)
  }
}