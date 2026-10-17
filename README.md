
# 🎓 EdTech Platform

A full-stack EdTech platform built using the MERN stack that enables students to explore and purchase courses while allowing instructors to create and manage educational content. The platform includes secure authentication, payment integration, media uploads, and role-based dashboards.

---



## 🚀 Features

### 👨‍🎓 Student
- User Registration & Login
- JWT Authentication
- Browse Courses
- Purchase Courses
- Razorpay Payment Integration
- View Enrolled Courses
- Track Learning Progress
- Update Profile

### 👨‍🏫 Instructor
- Create, Update & Delete Courses
- Upload Course Thumbnail
- Add Sections & Subsections
- Upload Videos
- View Instructor Dashboard
- Manage Students

### 🔐 Authentication
- JWT Authentication
- OTP Email Verification
- Password Encryption using bcrypt
- Forgot Password & Reset Password
- Protected Routes
- Role-Based Authorization

### ☁️ Media Management
- Cloudinary Image Upload
- Cloudinary Video Upload
- Optimized Media Storage

### 📊 Dashboard
- Student Dashboard
- Instructor Dashboard
- Profile Management

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Express File Upload

## Cloud Services
- Cloudinary
- Razorpay


```
EdTech/
├── backend/
|   |- src/  
|   ├── controllers/
│   ├── database/
│   ├── mail/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js/
│   ├── constant.js/
│  
│   
│   
│── frontend/  
|      |-src/ 
│      ├── assets   
|      ├── components   
|      ├── data   
|      ├── hooks   
|      ├── pages   
|      ├── reducers   
|      ├── services   
|      ├── slices   
|      ├── utils   
|      ├── app.js   
|      ├── App.test.js
|      ├── index.css
|      ├── index.js

      
└── README.md
```

---

📋 Prerequisites

Install the following before running the project:

Node.js and npm

MongoDB local installation or a MongoDB Atlas account

Cloudinary account

Git

1. Clone the repository
   
   git clone https://github.com/kanhaiyavarnwal/Ed-Tech-Platform

   cd Ed-Tech-Platform

2. Install backend dependencies

## Backend Setup

    cd backend
    npm install

    Create `.env`

    ```env
    PORT=

    MONGODB_URL=your_mongodb_url

    JWT_SECRET=your_secret

    MAIL_HOST=
    MAIL_USER=
    MAIL_PASS=

    CLOUD_NAME=
    API_KEY=
    API_SECRET=

    RAZORPAY_KEY=
    RAZORPAY_SECRET=

  Run Backend

   npm run dev

   If the dev script is not configured, check package.json and use the 
   appropriate start command.
    
   The backend will typically run at:

     http://localhost:4000


---

## Frontend Setup

      Open another terminal:

      cd frontend


      npm install

      Create the frontend .env

      REACT_APP_BASE_URL=http://localhost:4000

      REACT_APP_RAZORPAY_SECRET=

      REACT_APP_RAZORPAY_KEY=

      REACT_APP_RAZORPAY_SECRET=


      npm run dev


# API Modules

- Authentication
- Course
- Category
- Profile
- Payment
- Contact
- Rating & Review

---

# Security

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Access Control
- Secure API Validation

# Future Improvements

- Live Classes
- Chat System
- Certificate Generation
- Quiz Module
- AI Recommendation System
- Course Wishlist
- Admin Dashboard

🎯 Learning Outcomes

 This project demonstrates practical experience with:

 Full-stack MERN application development.

 REST API design and frontend-backend integration.

 Authentication and authorization.

 MongoDB data modeling.

 File uploads and third-party service integration.

 Debugging, version control,

 👨‍💻 Author

Kanhaiya Varnwal
GitHub : https://github.com/kanhaiyavarnwal


Portofolio: https://varnwalkanhaiya.netlify.app/

