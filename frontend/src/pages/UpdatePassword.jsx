import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/operations/authApi"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  console.log("location",location.pathname.split("/").at(-1))
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  // return (
  //   <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
  //     {loading ? (
  //       <div className="spinner">loading...</div>
  //     ) : (
  //       <div className="max-w-[500px] p-4 lg:p-8">
  //         <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
  //           Choose new password
  //         </h1>
  //         <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
  //           Almost done. Enter your new password and youre all set.
  //         </p>
  //         <form onSubmit={handleOnSubmit}>
  //           <label className="relative">
  //             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
  //               New Password <sup className="text-pink-200">*</sup>
  //             </p>
  //             <input
  //               required
  //               type={showPassword ? "text" : "password"}
  //               name="password"
  //               value={password}
  //               onChange={handleOnChange}
  //               placeholder="Enter Password"
  //               className="form-style w-full !pr-10"
  //             />
  //             <span
  //               onClick={() => setShowPassword((prev) => !prev)}
  //               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
  //             >
  //               {showPassword ? (
  //                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
  //               ) : (
  //                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
  //               )}
  //             </span>
  //           </label>
  //           <label className="relative mt-3 block">
  //             <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
  //               Confirm New Password <sup className="text-pink-200">*</sup>
  //             </p>
  //             <input
  //               required
  //               type={showConfirmPassword ? "text" : "password"}
  //               name="confirmPassword"
  //               value={confirmPassword}
  //               onChange={handleOnChange}
  //               placeholder="Confirm Password"
  //               className="form-style w-full !pr-10"
  //             />
  //             <span
  //               onClick={() => setShowConfirmPassword((prev) => !prev)}
  //               className="absolute right-3 top-[38px] z-[10] cursor-pointer"
  //             >
  //               {showConfirmPassword ? (
  //                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
  //               ) : (
  //                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
  //               )}
  //             </span>
  //           </label>

  //           <button
  //             type="submit"
  //             className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
  //           >
  //             Reset Password
  //           </button>
  //         </form>
  //         <div className="mt-6 flex items-center justify-between">
  //           <Link to="/login">
  //             <p className="flex items-center gap-x-2 text-richblack-5">
  //               <BiArrowBack /> Back To Login
  //             </p>
  //           </Link>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // )



  return (
  <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
    {loading ? (
      <div className="text-white text-xl font-semibold">Loading...</div>
    ) : (
      <div className="w-full max-w-md bg-richblack-800 rounded-xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-richblack-5">
          Choose New Password
        </h1>

        <p className="mt-3 text-sm sm:text-base text-richblack-300">
          Almost done. Enter your new password and you're all set.
        </p>

        <form onSubmit={handleOnSubmit} className="mt-8 space-y-5">
          {/* Password */}
          <label className="relative block">
            <p className="mb-2 text-sm text-richblack-25">
              New Password <span className="text-pink-300">*</span>
            </p>

            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 pr-12 text-richblack-5 outline-none focus:border-yellow-50"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-[43px] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-richblack-300"
                  size={22}
                />
              ) : (
                <AiOutlineEye
                  className="text-richblack-300"
                  size={22}
                />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative block">
            <p className="mb-2 text-sm text-richblack-25">
              Confirm Password <span className="text-pink-300">*</span>
            </p>

            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 pr-12 text-richblack-5 outline-none focus:border-yellow-50"
            />

            <span
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="absolute right-4 top-[43px] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  className="text-richblack-300"
                  size={22}
                />
              ) : (
                <AiOutlineEye
                  className="text-richblack-300"
                  size={22}
                />
              )}
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-50 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:bg-yellow-100"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-yellow-50 hover:underline"
          >
            <BiArrowBack />
            Back to Login
          </Link>
        </div>
      </div>
    )}
  </div>
);
}

export default UpdatePassword