import { studentEndpoints } from "./api";
import {apiConnector} from "./apiconnectors"
import {toast} from "react-hot-toast"
import rzLogo from "../assets/Logo/rzp_logo.png"
import {setPaymentLoading} from "../slices/courseSlice"
import {resetCart} from "../slices/cartSlice"

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_API
} = studentEndpoints


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}




export async function buyCourse(token,user, courses,  navigate, dispatch) {
    
    const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
  console.log("payment api: ",COURSE_PAYMENT_API)
        //initiate the order
        console.log("token in operations: ",token)
        console.log("courses: ",courses)
        console.log("user: ",user)
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`,
                                })
          console.log("api orderRespone : ",orderResponse)
        if(!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("print payment order response api : ", orderResponse);
        //options
        // console.log("rozarpaysecret :", process.env.REACT_APP_RAZORPAY_KEY )
        const options = {
             key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            image:rzLogo,
            prefill: {
                name:`${user.firstName}`,
                email:user.email
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        console.log("options: ",options)
        //miss hogya tha 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(err) {
        console.log("payment api err: ", err.message);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_API, { 
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(err) {
        console.log("payment success api err: ", err.message);
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, you are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(err) {
        console.log("payment verify api err: ", err.message);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}

//  studentEnrolled