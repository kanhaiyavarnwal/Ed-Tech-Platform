
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
│   ├── controllers/
│   ├── database/
│   ├── mail/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js/
│   ├── connstant.js/
│   ├── index.js
│   
│── src/  
      ├── assets   
      ├── components   
      ├── data   
      ├── hooks   
      ├── pages   
      ├── reducers   
      ├── services   
      ├── slices   
      ├── utils   
      ├── app.js   
└── README.md
```

---

## Backend Setup

```bash
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

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

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