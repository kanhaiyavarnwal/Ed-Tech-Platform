// import { RiEditBoxLine } from "react-icons/ri"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { formattedDate } from "../../../utils/dateFormatter"
// import IconBtn from "../../common/IconBtn"

// export default function MyProfile() {
//   const { user } = useSelector((state) => state.profile)
//   const navigate = useNavigate()

//   return (
//     <>
//       <h1 className="mb-14 text-3xl font-medium text-richblack-5">
//         My Profile
//       </h1>
//       <div className="flex   md:flex-row items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <div className="flex items-center gap-x-4">
//           <img
//             src={user?.image}
//             alt={`profile-${user?.firstName}`}
//             className="aspect-square w-[78px] rounded-full object-cover" 
//           />
//           <div className="space-y-1">
//             <p className="text-lg font-semibold text-richblack-5">
//               {user?.firstName + " " + user?.lastName}
//             </p>
//             <p className="text-sm text-richblack-300">{user?.email}</p>
//           </div>
//         </div>
//         <IconBtn
//           text="Edit"
//           onclick={() => {
//             navigate("/dashboard/settings")
//           }}
//         >
//           <RiEditBoxLine />
//         </IconBtn>
//       </div>
//       <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <div className="flex w-full items-center justify-between">
//           <p className="text-lg font-semibold text-richblack-5">About</p>
//           <IconBtn
//             text="Edit"
//             onclick={() => {
//               navigate("/dashboard/settings")
//             }}
//           >
//             <RiEditBoxLine />
//           </IconBtn>
//         </div>
//         <p
//           className={`${
//             user?.additionalDetails?.about
//               ? "text-richblack-5"
//               : "text-richblack-400"
//           } text-sm font-medium`}
//         >
//           {user?.additionalDetails?.about ?? "Write Something About Yourself"}
//         </p>
//       </div>
//       <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
//         <div className="flex w-full items-center justify-between">
//           <p className="text-lg font-semibold text-richblack-5">
//             Personal Details
//           </p>
//           <IconBtn
//             text="Edit"
//             onclick={() => {
//               navigate("/dashboard/settings")
//             }}
//           >
//             <RiEditBoxLine />
//           </IconBtn>
//         </div>
//         <div className="flex max-w-[500px] justify-between">
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">First Name</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.firstName}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Email</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.email}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Gender</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.additionalDetails?.gender ?? "Add Gender"}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-col gap-y-5">
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Last Name</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.lastName}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
//               </p>
//             </div>
//             <div>
//               <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
//               <p className="text-sm font-medium text-richblack-5">
//                 {formattedDate(user?.additionalDetails?.dateOfBirth) ??
//                   "Add Date Of Birth"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }










import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../../utils/dateFormatter";
import IconBtn from "../../common/IconBtn";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-6">
      {/* Heading */}
      <h1 className="mb-8 text-2xl md:text-3xl font-semibold text-richblack-5">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 rounded-lg border border-richblack-700 bg-richblack-800 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="h-20 w-20 rounded-full object-cover"
          />

          <div>
            <p className="text-xl font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-sm text-richblack-300 break-all">
              {user?.email}
            </p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* About Section */}
      <div className="mt-8 rounded-lg border border-richblack-700 bg-richblack-800 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg font-semibold text-richblack-5">About</p>

          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`mt-6 text-sm leading-6 ${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          }`}
        >
          {user?.additionalDetails?.about ??
            "Write Something About Yourself"}
        </p>
      </div>

      {/* Personal Details */}
      <div className="mt-8 rounded-lg border border-richblack-700 bg-richblack-800 p-5 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>

          <IconBtn
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm text-richblack-400">
                First Name
              </p>
              <p className="text-richblack-5 font-medium">
                {user?.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-400">
                Email
              </p>
              <p className="text-richblack-5 font-medium break-all">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-400">
                Gender
              </p>
              <p className="text-richblack-5 font-medium">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-sm text-richblack-400">
                Last Name
              </p>
              <p className="text-richblack-5 font-medium">
                {user?.lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-400">
                Phone Number
              </p>
              <p className="text-richblack-5 font-medium">
                {user?.additionalDetails?.contactNumber ??
                  "Add Contact Number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-400">
                Date Of Birth
              </p>
              <p className="text-richblack-5 font-medium">
                {user?.additionalDetails?.dateOfBirth
                  ? formattedDate(user.additionalDetails.dateOfBirth)
                  : "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}