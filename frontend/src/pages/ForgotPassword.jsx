import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authApi';
 function  ForgotPassword () {
   const [emailSent , setEmailSent] = useState(false)
   const [email,setEmail] = useState("");
    const {loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

const handleOnSubmit = (e)=>{
     e.preventDefault();
     dispatch(getPasswordResetToken(email,setEmailSent))

}


return (
  <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
    {loading ? (
      <div className="text-white text-xl font-semibold">Loading...</div>
    ) : (
      <div className="w-full max-w-md bg-richblack-800 rounded-xl p-6 sm:p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-richblack-5 mb-4">
          {!emailSent ? "Reset your password" : "Check your email"}
        </h1>

        <p className="text-richblack-300 text-sm sm:text-base mb-6">
          {!emailSent
            ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
            : `We have sent the reset email to ${email}`}
        </p>

        <form onSubmit={handleOnSubmit} className="space-y-5">
          {!emailSent && (
            <label className="block">
              <p className="text-richblack-25 mb-2 text-sm">
                Email Address <span className="text-pink-300">*</span>
              </p>

              <input
                type="email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg bg-richblack-700 border border-richblack-600 text-richblack-5 px-4 py-3 outline-none focus:border-yellow-50"
              />
            </label>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-50 text-richblack-900 font-semibold py-3 hover:bg-yellow-100 transition-all duration-200"
          >
            {!emailSent ? "Reset Password" : "Resend Email"}
          </button>
        </form>

        <div className="mt-6">
          <Link
            to="/login"
            className="text-yellow-50 font-medium hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    )}
  </div>
);



}

export default ForgotPassword



