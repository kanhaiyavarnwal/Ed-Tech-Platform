// const BASE_URL = "http://localhost:4000/api/v1"
const BASE_URL = process.env.REACT_APP_BASE_URL
// console.log(BASE_URL)

// user end point
export const userEndpoints = {
    SENDOTP_API : BASE_URL + "/user/sentotp",
    SIGNUP_API : BASE_URL + "/user/signup",
    LOGIN_API : BASE_URL + "/user/login",
    RESETPASSTOKEN_API : BASE_URL + "/user/resetPasswordToken",
    RESETPASSWORD_API : BASE_URL + "/user/resetPassword"
}

// profile end point

export const profileEndpoints = {
     GET_USER_DETAILS_API: BASE_URL + "/profile/getAllUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
     GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

/// student end point

export const studentEndpoints = {
  COURSE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API : BASE_URL + "/payment/verifySignature",
  SEND_PAYMENT_SUCCESS_API : BASE_URL + "/payment/sendEmailSuccessFullPayment"
}

// COURSE END POINTS
 
export const courseEndpoints ={
    GET_ALL_COURSES_API : BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",
    
    EDIT_COURSE_API : BASE_URL + "/course/editCourse",
    
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    CREATE_SECTION_API : BASE_URL + "/course/section/createSection",
    CREATE_SUBSECTION_API : BASE_URL + "/course/subSection/createSubSection",
    UPDATE_SECTION_API : BASE_URL + "/course/section/updateSection",
    UPDATE_SUBSECTION_API : BASE_URL + "/course/subSection/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API : BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API : BASE_URL + "/course/section/deleteSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/subSection/deleteSubSection",
    DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",
   GET_FULL_COURSE_DETAILS_API_AUTHENTICATED : BASE_URL + "/course/getFullcourseDetails",
   LECTURE_COMPLETED_API : BASE_URL + "/course/lectureCompleted",
   CREATE_RATING_API : BASE_URL + "/course/createRatingAndReviews",

}

export const categories={
COURSE_CATEGORIES_API : BASE_URL + "/course/getAllCategory",
}
// REST PART IS CREATE REVIEW API

export const catalogData = {
    CATALOG_PAGE_DATA_API : BASE_URL + "/course/categoryPageDetails",
}

export const contactUsEndpoint={
  CONTACT_US_API : BASE_URL + "/contact/contact"
}

export const settingEndpoints = {
    // 

    UPDATE_PROFILE_API : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API : BASE_URL + "/user/changePassword",
    DELETE_ACCOUNT_API : BASE_URL + "/profile/deleteAccount",

}