import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {

  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}






// import * as Icons from "react-icons/vsc";
// import { useDispatch } from "react-redux";
// import { NavLink, matchPath, useLocation } from "react-router-dom";

// import { resetCourseState } from "../../../slices/courseSlice";

// export default function SidebarLink({
//   link,
//   iconName,
//   onClick,
// }) {
//   const Icon = Icons[iconName];

//   const location = useLocation();
//   const dispatch = useDispatch();

//   const matchRoute = (route) => {
//     return matchPath(
//       {
//         path: route,
//       },
//       location.pathname
//     );
//   };

//   const isActive = matchRoute(link.path);

//   return (
//     <NavLink
//       to={link.path}
//       onClick={() => {
//         dispatch(resetCourseState());

//         if (onClick) {
//           onClick();
//         }
//       }}
//       className={`
//         group
//         relative
//         flex
//         items-center
//         gap-3
//         px-5
//         py-3
//         md:px-8
//         rounded-r-lg
//         text-sm
//         md:text-base
//         font-medium
//         transition-all
//         duration-300

//         ${
//           isActive
//             ? "bg-yellow-800 text-yellow-50"
//             : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5"
//         }
//       `}
//     >
//       {/* Active Indicator */}

//       <span
//         className={`
//           absolute
//           left-0
//           top-0
//           h-full
//           w-1
//           rounded-r-full
//           bg-yellow-50
//           transition-all
//           duration-300
//           ${
//             isActive
//               ? "opacity-100"
//               : "opacity-0 group-hover:opacity-50"
//           }
//         `}
//       />

//       {/* Icon */}

//       <Icon
//         className={`
//           text-xl
//           transition-transform
//           duration-300
//           ${
//             isActive
//               ? "scale-110"
//               : "group-hover:scale-110"
//           }
//         `}
//       />

//       {/* Text */}

//       <span>{link.name}</span>
//     </NavLink>
//   );
// }