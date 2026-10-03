import toast from "react-hot-toast";
import { userEndpoints } from "../api"
import { apiConnector } from "../apiconnectors"
import {resetCart} from "../../slices/cartSlice"
import {setLoading,setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORD_API,
    RESETPASSTOKEN_API
       
} = userEndpoints;



export function sendOtp(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SENDOTP_API,{
                email,
                checkUserPresent:true,
            })
          console.log("response in otp: ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("otp send successfully"||response?.data?.message)
            navigate("/verify-email")
           

        }catch(err){
            console.log("send otp api err in the operation -> ",err.message)
            toast.error(err.message)
        }
        dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    
    navigate
){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
       const response = await apiConnector("POST", SIGNUP_API,{
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        
       })
     
     

       if(!response.data.success){
        throw new Error(response.data.message)
       }

       toast.success("signUp successfully" || response?.data?.message)

       navigate("/login")

        }catch(err){
        console.log("Sign up api err-:> :",err.message)
        toast.error("signUp failed"|| err.response?.data?.message)
        navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        
        try{
            const response = await apiConnector("POST", LOGIN_API,{
                email,password,
            })
         
            
            if(! response.data.success){
                throw new Error( response.data.message)
            }
          
            toast.success( response?.data?.message)
            dispatch(setToken(response.data.data.token))
            const {user,token} = response.data.data;
            
            const userImage =  user?.image
            ? user.image :
             `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`
            
            dispatch(setUser({...await user, image: userImage}))
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.setItem("user",JSON.stringify( user))
   
            navigate("/dashboard/my-profile")
        }catch(err){
            console.log("login api err-> : ",err.message )
            toast.error(err.response?.data?.message ||  "Login failed")
        }
         dispatch(setLoading(false))
    toast.dismiss(toastId)
    }
}

export function logOut(navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
         localStorage.removeItem("token")
         localStorage.removeItem("user")
         toast.success("Logged Out")
         navigate("/")
    }
}




export function getPasswordResetToken (email,setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true))
       
        try{
            const response = await apiConnector("POST", RESETPASSTOKEN_API,{email})
           

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset email sent");
            setEmailSent(true);
        }
        catch(err){
            console.log("Reset password token error",err)
            toast.error("email not send")

        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password,confirmPassword,token){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        console.log("reset password token api: ",RESETPASSWORD_API)
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API,{
                password,confirmPassword,token
            })
            console.log("reset password response : ",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("password has been reset successfully")

        }catch(err){
            console.log("error in reset password token error; ",err.message)
            toast.error("unable to reset password")
        }
        dispatch(setLoading(false));
    }
}