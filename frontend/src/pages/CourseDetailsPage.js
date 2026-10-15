






import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  LoaderCircle,
  PlayCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { fetchCourseDetails } from "../services/operations/courseDetails";
import { buyCourse } from "../services/studentFeatureApi";

// Reusable information item
function CourseStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80">
        <Icon size={19} className="text-blue-400" />
      </div>

      <div>
        <p className="text-sm font-semibold text-white">{value}</p>
        <p className="mt-0.5 text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}

// Reusable section heading
function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

// Reusable curriculum accordion
function CurriculumSection({
  section,
  index,
  expanded,
  onToggle,
}) {
  const lectures = section.subSection || [];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-800/70 sm:px-5"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-blue-300">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-sm font-semibold text-white sm:text-base">
              {section.sectionName ||
                section.title ||
                `Section ${index + 1}`}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {lectures.length}{" "}
              {lectures.length === 1 ? "lecture" : "lectures"}
            </p>
          </div>
        </div>

        <ChevronDown
          size={19}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="border-t border-slate-800">
          {lectures.length ? (
            lectures.map((lecture, lectureIndex) => (
              <div
                key={lecture._id || lectureIndex}
                className="flex items-start gap-3 border-b border-slate-800/70 px-5 py-4 last:border-b-0"
              >
                <PlayCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-slate-500"
                />

                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-medium text-slate-200">
                    {lecture.title ||
                      lecture.subSectionName ||
                      `Lecture ${lectureIndex + 1}`}
                  </p>

                  {lecture.description && (
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {lecture.description}
                    </p>
                  )}

                  {lecture.timeDuration && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 size={13} />
                      {lecture.timeDuration}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="px-5 py-4 text-sm text-slate-500">
              No lectures in this section yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [course, setCourse] = useState(null);
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({ 0: true });

  useEffect(() => {
    let active = true;

    async function getCourse() {
      try {
        setLoading(true);
        setError("");

        const response = await fetchCourseDetails(courseId);
//  console.log("res in view cousre : ",response)
//  console.log("res in view cousre with data: ",response.success)
        if (
          !response?.success
         
        ) {
          throw new Error(
            response?.message || "Unable to load course details."
          );
        }

        if (!active) return;

        setCourse(response.data.courseDetails);
        setDuration(response.data.totalDuration || "");
        setExpanded({ 0: true });
      } catch (err) {
        if (active) {
          setError(
            err.message || "Something went wrong while loading the course."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (courseId) {
      getCourse();
    } else {
      setError("Course ID is missing.");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [courseId]);

  const sections = course?.courseContent || [];

  const lectureCount = useMemo(
    () =>
      sections.reduce(
        (total, section) =>
          total + (section.subSection || []).length,
        0
      ),
    [sections]
  );

  const instructor = course?.instructor || {};

  const instructorName =
    [instructor.firstName, instructor.lastName]
      .filter(Boolean)
      .join(" ") ||
    instructor.name ||
    "Course Instructor";

  const outcomes = useMemo(() => {
    const value = course?.whatYouWillLearn;

    if (!value) return [];

    if (Array.isArray(value)) return value;

    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }, [course?.whatYouWillLearn]);

  const price = Number(course?.price ?? 0);

  const categoryName =
    typeof course?.category === "object"
      ? course.category?.name ||
        course.category?.categoryName ||
        ""
      : "";

  const handleBuyNow = async () => {
    if (buying) return;

    if (!token || !user) {
      navigate("/login");
      return;
    }

    try {
      setBuying(true);

      await buyCourse(
        token,
        user,
        [courseId],
        navigate,
        dispatch
      );
    } catch (err) {
      console.error("Course purchase failed:", err);
    } finally {
      setBuying(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d19] px-4 text-white">
        <div className="text-center">
          <LoaderCircle
            size={34}
            className="mx-auto animate-spin text-blue-400"
          />
          <p className="mt-4 text-sm text-slate-400">
            Preparing your course details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d19] px-5 text-white">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <BookOpen
            size={36}
            className="mx-auto text-blue-400"
          />

          <h2 className="mt-5 text-xl font-bold">
            Unable to load course
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error || "This course could not be found."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d19] text-white">
      {/* Minimal navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#080d19]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back to courses</span>
          </button>

          <span className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <ShieldCheck size={16} className="text-emerald-400" />
            Secure checkout
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Main hero */}
        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {categoryName && (
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300">
                  {categoryName}
                </span>
              )}

              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
                {course.status === "Published"
                  ? "Published course"
                  : course.status || "Online course"}
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {course.courseName}
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {course.courseDescription}
            </p>

            {/* Course stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:grid-cols-3 sm:p-5">
              <CourseStat
                icon={BookOpen}
                label="Course sections"
                value={sections.length}
              />

              <CourseStat
                icon={PlayCircle}
                label="Video lectures"
                value={lectureCount}
              />

              <CourseStat
                icon={Clock3}
                label="Total duration"
                value={duration || "Self-paced"}
              />
            </div>

            {/* Instructor profile */}
            <div className="mt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Meet your instructor
              </p>

              <div className="flex items-center gap-4">
                {instructor.image ? (
                  <img
                    src={instructor.image}
                    alt={instructorName}
                    className="h-14 w-14 rounded-full border border-slate-700 object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                    <GraduationCap
                      size={25}
                      className="text-blue-400"
                    />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-white">
                    {instructorName}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Course instructor
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {course.tag?.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {course.tag.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Purchase card */}
          <aside className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20 lg:sticky lg:top-24">
            <div className="relative overflow-hidden bg-slate-800">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center">
                  <GraduationCap
                    size={64}
                    className="text-blue-400"
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                Course investment
              </p>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-white">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-slate-500">
                  INR
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Access the course through your account after successful purchase.
              </p>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={buying}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {buying ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Processing purchase...
                  </>
                ) : (
                  <>
                    Buy Now
                    <ArrowLeft
                      size={17}
                      className="rotate-180"
                    />
                  </>
                )}
              </button>

              <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-400">
                <ShieldCheck
                  size={16}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                Your purchase is processed through the configured payment flow.
              </div>

              <div className="my-5 border-t border-slate-800" />

              <h3 className="text-sm font-semibold text-white">
                What's included
              </h3>

              <ul className="mt-4 space-y-3">
                {[
                  `${lectureCount} video lectures`,
                  `${sections.length} curriculum sections`,
                  "Learn at your own pace",
                  "Course learning outcomes",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <Check
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {/* Learning outcomes */}
        {outcomes.length > 0 && (
          <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:mt-16 sm:p-8">
            <SectionHeading
              eyebrow="Learning outcomes"
              title="What you'll learn"
              description="Explore the key skills and concepts covered in this course."
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/70 p-4"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-400"
                    />
                  </div>

                  <p className="text-sm leading-6 text-slate-300">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Requirements */}
        {course.instructions?.length > 0 && (
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-8">
            <SectionHeading
              eyebrow="Before you begin"
              title="Requirements"
              description="Things to know before starting this course."
            />

            <ul className="space-y-4">
              {course.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-400"
                  />
                  {instruction}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Curriculum */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:mt-10 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Course content"
              title="Explore the curriculum"
              description="Review the sections and lectures included in the course."
            />

            <div className="mb-6 flex shrink-0 items-center gap-2 self-start rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400 sm:self-auto">
              <BookOpen size={15} className="text-blue-400" />
              {sections.length} sections · {lectureCount} lectures
            </div>
          </div>

          {sections.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-800 px-5 py-10 text-center">
              <BookOpen
                size={28}
                className="mx-auto text-slate-500"
              />
              <p className="mt-3 text-sm text-slate-400">
                Curriculum will be available here once published.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sections.map((section, index) => (
                <CurriculumSection
                  key={section._id || index}
                  section={section}
                  index={index}
                  expanded={Boolean(expanded[index])}
                  onToggle={() =>
                    setExpanded((previous) => ({
                      ...previous,
                      [index]: !previous[index],
                    }))
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* Tags and course metadata */}
        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Sparkles size={20} className="text-blue-400" />
            </div>

            <div>
              <h2 className="font-bold">Course overview</h2>
              <p className="mt-1 text-xs text-slate-400">
                A quick summary of your learning experience.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs text-slate-500">Instructor</p>
              <p className="mt-1 text-sm font-medium text-slate-200">
                {instructorName}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Course format</p>
              <p className="mt-1 text-sm font-medium text-slate-200">
                Online learning
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Course status</p>
              <p className="mt-1 text-sm font-medium text-slate-200">
                {course.status || "Not specified"}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left">
          <p className="text-sm font-semibold text-slate-300">
            Your learning journey starts here.
          </p>
          <p className="text-xs text-slate-500">
            Course information provided by the instructor.
          </p>
        </div>
      </footer>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ArrowLeft,
//   BookOpen,
//   CheckCircle2,
//   ChevronDown,
//   ChevronRight,
//   Clock,
//   GraduationCap,
//   LoaderCircle,
//   PlayCircle,
//   ShieldCheck,
// } from "lucide-react";

// import { fetchCourseDetails } from "../services/operations/courseDetails";
// import { buyCourse } from "../services/studentFeatureApi";

// export default function CourseDetails() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);

//   const [course, setCourse] = useState(null);
//   const [duration, setDuration] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [buying, setBuying] = useState(false);
//   const [error, setError] = useState("");
//   const [expanded, setExpanded] = useState({ 0: true });

//   useEffect(() => {
//     let active = true;

//     async function getCourse() {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetchCourseDetails(courseId);

//         if (!response?.success || !response?.data?.courseDetails) {
//           throw new Error(
//             response?.message || "Unable to fetch course details."
//           );
//         }

//         if (!active) return;

//         setCourse(response.data.courseDetails);
//         setDuration(response.data.totalDuration || "");
//       } catch (err) {
//         if (active) {
//           setError(err.message || "Something went wrong.");
//         }
//       } finally {
//         if (active) setLoading(false);
//       }
//     }

//     if (courseId) {
//       getCourse();
//     } else {
//       setError("Course ID is missing.");
//       setLoading(false);
//     }

//     return () => {
//       active = false;
//     };
//   }, [courseId]);

//   const sections = course?.courseContent || [];

//   const lectures = sections.flatMap(
//     (section) => section.subSection || []
//   );

//   const instructor = course?.instructor || {};

//   const instructorName =
//     [instructor.firstName, instructor.lastName]
//       .filter(Boolean)
//       .join(" ") || instructor.name || "Course Instructor";

//   const outcomes = course?.whatYouWillLearn
//     ? course.whatYouWillLearn
//         .split("\n")
//         .map((item) => item.trim())
//         .filter(Boolean)
//     : [];

//   const price = Number(course?.price || 0);

//   const handleBuyNow = async () => {
//     if (!token || !user) {
//       navigate("/login");
//       return;
//     }

//     if (buying) return;

//     try {
//       setBuying(true);

//       await buyCourse(
//         token,
//         user,
//         [courseId],
//         navigate,
//         dispatch
//       );
//     } catch (err) {
//       console.error("Purchase failed:", err.message);
//     } finally {
//       setBuying(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
//         <LoaderCircle className="mr-3 animate-spin" size={28} />
//         Loading course details...
//       </div>
//     );
//   }

//   if (error || !course) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-5 text-center text-white">
//         <h2 className="text-2xl font-bold">
//           Course not found
//         </h2>
//         <p className="mt-3 text-slate-400">
//           {error || "This course is unavailable."}
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="mt-5 rounded-lg bg-blue-600 px-5 py-3"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* Navigation */}
//       <header className="border-b border-slate-800">
//         <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5">
//           <button
//             onClick={() => navigate(-1)}
//             className="rounded-xl border border-slate-700 p-2 hover:bg-slate-800"
//             aria-label="Go back"
//           >
//             <ArrowLeft size={20} />
//           </button>

//           <div>
//             <p className="text-xs text-blue-400">My Learning</p>
//             <h1 className="font-semibold">Course Details</h1>
//           </div>
//         </div>
//       </header>

//       <main className="mx-auto max-w-7xl px-5 py-8 sm:py-12">
//         {/* Course title and purchase card */}
//         <section className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
//           <div>
//             <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
//               {course.status || "Online Course"}
//             </span>

//             <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
//               {course.courseName}
//             </h2>

//             <p className="mt-5 text-base leading-8 text-slate-400">
//               {course.courseDescription}
//             </p>

//             <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-300">
//               <span className="flex items-center gap-2">
//                 <BookOpen size={18} className="text-blue-400" />
//                 {sections.length} sections
//               </span>

//               <span className="flex items-center gap-2">
//                 <PlayCircle size={18} className="text-blue-400" />
//                 {lectures.length} lectures
//               </span>

//               <span className="flex items-center gap-2">
//                 <Clock size={18} className="text-blue-400" />
//                 {duration || "Self-paced"}
//               </span>
//             </div>

//             {/* Instructor */}
//             <div className="mt-8 flex items-center gap-4">
//               {instructor.image ? (
//                 <img
//                   src={instructor.image}
//                   alt={instructorName}
//                   className="h-14 w-14 rounded-full border border-slate-700 object-cover"
//                 />
//               ) : (
//                 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800">
//                   <GraduationCap size={26} className="text-blue-400" />
//                 </div>
//               )}

//               <div>
//                 <p className="text-xs text-slate-500">
//                   Instructor
//                 </p>
//                 <p className="mt-1 font-semibold">
//                   {instructorName}
//                 </p>
//               </div>
//             </div>

//             {/* Tags */}
//             {course.tag?.length > 0 && (
//               <div className="mt-7 flex flex-wrap gap-2">
//                 {course.tag.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Buy Now card */}
//           <aside className="h-fit overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl lg:sticky lg:top-6">
//             {course.thumbnail ? (
//               <img
//                 src={course.thumbnail}
//                 alt={course.courseName}
//                 className="aspect-video w-full object-cover"
//               />
//             ) : (
//               <div className="flex aspect-video items-center justify-center bg-slate-800">
//                 <GraduationCap size={60} className="text-blue-400" />
//               </div>
//             )}

//             <div className="p-6">
//               <p className="text-sm text-slate-400">Course price</p>

//               <h3 className="mt-2 text-4xl font-extrabold">
//                 ₹{price.toLocaleString("en-IN")}
//               </h3>

//               <button
//                 onClick={handleBuyNow}
//                 disabled={buying}
//                 className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-bold transition hover:bg-blue-500 disabled:opacity-60"
//               >
//                 {buying ? (
//                   <>
//                     <LoaderCircle size={20} className="animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   "Buy Now"
//                 )}
//               </button>

//               <div className="mt-6 space-y-4 border-t border-slate-800 pt-5">
//                 <p className="flex items-center gap-3 text-sm text-slate-300">
//                   <PlayCircle size={18} className="text-blue-400" />
//                   {lectures.length} video lectures
//                 </p>

//                 <p className="flex items-center gap-3 text-sm text-slate-300">
//                   <Clock size={18} className="text-blue-400" />
//                   {duration || "Learn at your own pace"}
//                 </p>

//                 <p className="flex items-center gap-3 text-sm text-slate-300">
//                   <ShieldCheck size={18} className="text-blue-400" />
//                   Secure checkout
//                 </p>

//                 <p className="flex items-center gap-3 text-sm text-slate-300">
//                   <CheckCircle2 size={18} className="text-blue-400" />
//                   Course curriculum included
//                 </p>
//               </div>
//             </div>
//           </aside>
//         </section>

//         {/* Learning outcomes */}
//         {outcomes.length > 0 && (
//           <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
//             <h2 className="text-2xl font-bold">
//               What you will learn
//             </h2>

//             <div className="mt-6 grid gap-4 sm:grid-cols-2">
//               {outcomes.map((outcome, index) => (
//                 <p
//                   key={index}
//                   className="flex items-start gap-3 text-sm leading-6 text-slate-300"
//                 >
//                   <CheckCircle2
//                     size={19}
//                     className="mt-0.5 shrink-0 text-emerald-400"
//                   />
//                   {outcome}
//                 </p>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Instructions */}
//         {course.instructions?.length > 0 && (
//           <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
//             <h2 className="text-2xl font-bold">Requirements</h2>

//             <ul className="mt-5 space-y-3">
//               {course.instructions.map((instruction, index) => (
//                 <li
//                   key={index}
//                   className="flex gap-3 text-sm leading-6 text-slate-300"
//                 >
//                   <CheckCircle2
//                     size={18}
//                     className="mt-0.5 shrink-0 text-blue-400"
//                   />
//                   {instruction}
//                 </li>
//               ))}
//             </ul>
//           </section>
//         )}

//         {/* Curriculum */}
//         <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
//           <h2 className="text-2xl font-bold">
//             Course curriculum
//           </h2>

//           <p className="mt-2 text-sm text-slate-400">
//             {sections.length} sections · {lectures.length} lectures
//           </p>

//           <div className="mt-6 space-y-3">
//             {sections.length === 0 ? (
//               <p className="text-sm text-slate-400">
//                 Curriculum is not available yet.
//               </p>
//             ) : (
//               sections.map((section, index) => {
//                 const subsection = section.subSection || [];
//                 const isOpen = Boolean(expanded[index]);

//                 return (
//                   <div
//                     key={section._id || index}
//                     className="overflow-hidden rounded-xl border border-slate-800"
//                   >
//                     <button
//                       onClick={() =>
//                         setExpanded((previous) => ({
//                           ...previous,
//                           [index]: !previous[index],
//                         }))
//                       }
//                       className="flex w-full items-center justify-between gap-4 bg-slate-800/60 p-4 text-left hover:bg-slate-800"
//                     >
//                       <div>
//                         <p className="font-semibold">
//                           {section.sectionName ||
//                             `Section ${index + 1}`}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           {subsection.length} lectures
//                         </p>
//                       </div>

//                       {isOpen ? (
//                         <ChevronDown size={20} />
//                       ) : (
//                         <ChevronRight size={20} />
//                       )}
//                     </button>

//                     {isOpen && (
//                       <div className="divide-y divide-slate-800">
//                         {subsection.map((lecture, lectureIndex) => (
//                           <div
//                             key={lecture._id || lectureIndex}
//                             className="flex items-start gap-3 p-4"
//                           >
//                             <PlayCircle
//                               size={18}
//                               className="mt-0.5 shrink-0 text-blue-400"
//                             />

//                             <div>
//                               <p className="text-sm font-medium text-slate-200">
//                                 {lecture.title ||
//                                   lecture.subSectionName ||
//                                   `Lecture ${lectureIndex + 1}`}
//                               </p>

//                               {lecture.description && (
//                                 <p className="mt-1 text-xs leading-5 text-slate-400">
//                                   {lecture.description}
//                                 </p>
//                               )}

//                               <p className="mt-2 text-xs text-slate-500">
//                                 {lecture.timeDuration || "Video lesson"}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </section>
//       </main>

//       <footer className="mt-12 border-t border-slate-800 px-5 py-6 text-center text-sm text-slate-500">
//         Start learning and build your skills.
//       </footer>
//     </div>
//   );
// }






// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   BookOpen,
//   CheckCircle2,
//   ChevronDown,
//   ChevronRight,
//   Clock3,
//   Menu,
//   PlayCircle,
//   X,
// } from "lucide-react";

// import { fetchCourseDetails } from "../services/operations/courseDetails";
// import {
//   setCourseSectionData,
//   setEntireCourseData,
//   setTotalNoOfLectures,
//   updateCompletedLectures,
// } from "../slices/viewCourseSlice";

// const getLectureId = (lecture) =>
//   String(lecture?._id || lecture?.id || "");

// const getVideoUrl = (lecture) =>
//   lecture?.videoUrl ||
//   lecture?.videoURL ||
//   lecture?.video ||
//   lecture?.contentUrl ||
//   "";

// export default function ViewCourseDetails() {
//   const { courseId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {
//     courseSectionData = [],
//     courseEntireData,
//     completedLectures = [],
//     totalNoOfLectures = 0,
//   } = useSelector((state) => state.viewCourse);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeLecture, setActiveLecture] = useState(null);
//   const [expandedSections, setExpandedSections] = useState({});
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Fetch course details
//   useEffect(() => {
//     let isActive = true;

//     const loadCourse = async () => {
//       setLoading(true);
//       setError("");
//       setActiveLecture(null);

//       try {
//         const response = await fetchCourseDetails(courseId);

//         if (!isActive) return;

//         // fetchCourseDetails returns Axios response.data:
//         // { success, data: { totalDuration, courseDetails }, message }

//         if (!response?.success || !response?.data?.courseDetails) {
//           throw new Error(
//             response?.message || "Unable to fetch course details."
//           );
//         }

//         const { courseDetails, totalDuration } = response.data;
//         const sections = courseDetails.courseContent || [];

//         dispatch(
//           setEntireCourseData({
//             ...courseDetails,
//             totalDuration,
//           })
//         );

//         dispatch(setCourseSectionData(sections));

//         const lectureCount = sections.reduce(
//           (total, section) =>
//             total + (section.subSection || []).length,
//           0
//         );

//         dispatch(setTotalNoOfLectures(lectureCount));

//         setExpandedSections(
//           Object.fromEntries(
//             sections.map((_, index) => [index, index === 0])
//           )
//         );

//         setActiveLecture(sections[0]?.subSection?.[0] || null);
//       } catch (err) {
//         if (isActive) {
//           setError(err.message || "Something went wrong.");
//         }
//       } finally {
//         if (isActive) {
//           setLoading(false);
//         }
//       }
//     };

//     if (courseId) {
//       loadCourse();
//     } else {
//       setError("Course ID is missing.");
//       setLoading(false);
//     }

//     return () => {
//       isActive = false;
//     };
//   }, [courseId, dispatch]);

//   // Flatten all section lectures into one array
//   const lectures = useMemo(
//     () =>
//       courseSectionData.flatMap(
//         (section) => section.subSection || []
//       ),
//     [courseSectionData]
//   );

//   const completedCount = completedLectures.length;

//   const progress = totalNoOfLectures
//     ? Math.min(
//         100,
//         Math.round((completedCount / totalNoOfLectures) * 100)
//       )
//     : 0;

//   const activeLectureId = getLectureId(activeLecture);
//   const activeVideoUrl = getVideoUrl(activeLecture);

//   const isCompleted = completedLectures.some(
//     (id) => String(id) === activeLectureId
//   );

//   const courseTitle =
//     courseEntireData?.courseName ||
//     courseEntireData?.title ||
//     "My Learning";

//   const selectLecture = (lecture) => {
//     setActiveLecture(lecture);
//   };

//   const toggleSection = (index) => {
//     setExpandedSections((previous) => ({
//       ...previous,
//       [index]: !previous[index],
//     }));
//   };

//   // Mark the selected lecture complete in Redux
//   const markLectureComplete = () => {
//     if (!activeLectureId || isCompleted) return;

//     dispatch(updateCompletedLectures(activeLectureId));
//   };

//   // Automatically select the next lecture
//   const goToNextLecture = () => {
//     const currentIndex = lectures.findIndex(
//       (lecture) =>
//         getLectureId(lecture) === activeLectureId
//     );

//     if (currentIndex < 0 || currentIndex >= lectures.length - 1) {
//       return;
//     }

//     const nextLecture = lectures[currentIndex + 1];

//     const sectionIndex = courseSectionData.findIndex(
//       (section) =>
//         (section.subSection || []).some(
//           (lecture) =>
//             getLectureId(lecture) === getLectureId(nextLecture)
//         )
//     );

//     setExpandedSections((previous) => ({
//       ...previous,
//       [sectionIndex]: true,
//     }));

//     setActiveLecture(nextLecture);
//   };

//   // Loading screen
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
//         <div className="text-center">
//           <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
//           <p className="text-slate-300">Loading your course...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error screen
//   if (error) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
//         <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
//           <h2 className="text-xl font-bold">
//             Unable to load course
//           </h2>

//           <p className="mt-3 text-sm text-slate-400">
//             {error}
//           </p>

//           <button
//             onClick={() => navigate(-1)}
//             className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* Header */}
//       <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
//         <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
//           <div className="flex min-w-0 items-center gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               aria-label="Go back"
//               className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800"
//             >
//               <ArrowLeft size={19} />
//             </button>

//             <div className="min-w-0">
//               <h1 className="truncate text-sm font-semibold sm:text-base">
//                 {courseTitle}
//               </h1>

//               <p className="mt-1 text-xs text-slate-400">
//                 {completedCount} of {totalNoOfLectures} lectures completed
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setSidebarOpen((previous) => !previous)}
//             aria-label="Toggle course curriculum"
//             className="rounded-xl border border-slate-700 p-2.5 hover:bg-slate-800"
//           >
//             {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
//           </button>
//         </div>

//         <div className="h-1 bg-slate-800">
//           <div
//             className="h-full bg-blue-500 transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </header>

//       <div className="mx-auto flex max-w-[1600px]">
//         {/* Main content */}
//         <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:py-8">
//           <div className="mx-auto max-w-5xl">
//             {/* Video player */}
//             <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
//               {activeVideoUrl ? (
//                 <video
//                   key={activeLectureId || activeVideoUrl}
//                   src={activeVideoUrl}
//                   controls
//                   controlsList="nodownload"
//                   className="aspect-video w-full bg-black"
//                   onEnded={markLectureComplete}
//                 >
//                   Your browser does not support video playback.
//                 </video>
//               ) : (
//                 <div className="flex aspect-video flex-col items-center justify-center px-5 text-center">
//                   <PlayCircle
//                     size={58}
//                     className="text-blue-400"
//                   />

//                   <h2 className="mt-4 text-lg font-semibold">
//                     Video not available
//                   </h2>

//                   <p className="mt-2 max-w-md text-sm text-slate-400">
//                     No video URL was found for this lecture.
//                     Check the video field in your subsection schema.
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Lecture information */}
//             <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-7">
//               <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
//                 <div className="min-w-0">
//                   <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
//                     Current lecture
//                   </p>

//                   <h2 className="mt-2 break-words text-xl font-bold sm:text-2xl">
//                     {activeLecture?.title ||
//                       activeLecture?.subSectionName ||
//                       "Select a lecture"}
//                   </h2>

//                   <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-400">
//                     <span className="flex items-center gap-2">
//                       <BookOpen size={16} />
//                       {totalNoOfLectures} lectures
//                     </span>

//                     <span className="flex items-center gap-2">
//                       <Clock3 size={16} />
//                       {activeLecture?.timeDuration ||
//                         "Duration unavailable"}
//                     </span>
//                   </div>
//                 </div>

//                 {activeLecture && (
//                   <button
//                     onClick={markLectureComplete}
//                     disabled={isCompleted}
//                     className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
//                       isCompleted
//                         ? "cursor-default bg-emerald-500/10 text-emerald-400"
//                         : "bg-blue-600 text-white hover:bg-blue-500"
//                     }`}
//                   >
//                     <CheckCircle2 size={18} />
//                     {isCompleted ? "Completed" : "Mark complete"}
//                   </button>
//                 )}
//               </div>

//               {activeLecture?.description && (
//                 <div className="mt-6 border-t border-slate-800 pt-5">
//                   <h3 className="font-semibold">
//                     About this lecture
//                   </h3>

//                   <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-400">
//                     {activeLecture.description}
//                   </p>
//                 </div>
//               )}

//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={goToNextLecture}
//                   disabled={
//                     !activeLecture ||
//                     lectures.findIndex(
//                       (lecture) =>
//                         getLectureId(lecture) === activeLectureId
//                     ) >= lectures.length - 1
//                   }
//                   className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   Next lecture
//                   <ChevronRight
//                     className="ml-2 inline"
//                     size={17}
//                   />
//                 </button>
//               </div>
//             </section>
//           </div>
//         </main>

//         {/* Curriculum sidebar */}
//         {sidebarOpen && (
//           <aside className="fixed inset-0 top-[73px] z-20 overflow-y-auto border-l border-slate-800 bg-slate-950 lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:w-[360px] lg:shrink-0">
//             <div className="border-b border-slate-800 p-5">
//               <h2 className="text-lg font-bold">
//                 Course content
//               </h2>

//               <p className="mt-1 text-sm text-slate-400">
//                 {courseSectionData.length} sections · {totalNoOfLectures} lectures
//               </p>

//               <div className="mt-4 flex items-center justify-between text-sm">
//                 <span className="text-slate-400">
//                   Your progress
//                 </span>

//                 <span className="font-semibold text-blue-400">
//                   {progress}%
//                 </span>
//               </div>

//               <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
//                 <div
//                   className="h-full rounded-full bg-blue-500 transition-all"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             </div>

//             {courseSectionData.length === 0 ? (
//               <p className="p-6 text-sm text-slate-400">
//                 No course sections found.
//               </p>
//             ) : (
//               <div className="divide-y divide-slate-800">
//                 {courseSectionData.map((section, sectionIndex) => {
//                   const sectionLectures = section.subSection || [];

//                   const sectionCompleted = sectionLectures.filter(
//                     (lecture) =>
//                       completedLectures.some(
//                         (id) => String(id) === getLectureId(lecture)
//                       )
//                   ).length;

//                   const expanded = Boolean(
//                     expandedSections[sectionIndex]
//                   );

//                   return (
//                     <div key={section._id || sectionIndex}>
//                       <button
//                         onClick={() => toggleSection(sectionIndex)}
//                         className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-slate-900"
//                       >
//                         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
//                           {expanded ? (
//                             <ChevronDown size={18} />
//                           ) : (
//                             <ChevronRight size={18} />
//                           )}
//                         </span>

//                         <span className="min-w-0 flex-1">
//                           <span className="block break-words text-sm font-semibold">
//                             {section.sectionName ||
//                               section.title ||
//                               `Section ${sectionIndex + 1}`}
//                           </span>

//                           <span className="mt-1 block text-xs text-slate-400">
//                             {sectionCompleted}/{sectionLectures.length} completed
//                           </span>
//                         </span>
//                       </button>

//                       {expanded && (
//                         <div className="pb-2">
//                           {sectionLectures.map((lecture, lectureIndex) => {
//                             const lectureId = getLectureId(lecture);

//                             const selected =
//                               lectureId === activeLectureId;

//                             const completed = completedLectures.some(
//                               (id) => String(id) === lectureId
//                             );

//                             return (
//                               <button
//                                 key={lectureId || lectureIndex}
//                                 onClick={() => selectLecture(lecture)}
//                                 className={`flex w-full items-start gap-3 border-l-2 px-5 py-3 pl-7 text-left transition ${
//                                   selected
//                                     ? "border-blue-500 bg-blue-500/10"
//                                     : "border-transparent hover:bg-slate-900"
//                                 }`}
//                               >
//                                 <span className="mt-0.5 shrink-0">
//                                   {completed ? (
//                                     <CheckCircle2
//                                       size={18}
//                                       className="text-emerald-400"
//                                     />
//                                   ) : (
//                                     <PlayCircle
//                                       size={18}
//                                       className={
//                                         selected
//                                           ? "text-blue-400"
//                                           : "text-slate-500"
//                                       }
//                                     />
//                                   )}
//                                 </span>

//                                 <span className="min-w-0 flex-1">
//                                   <span
//                                     className={`block break-words text-sm ${
//                                       selected
//                                         ? "font-semibold text-blue-300"
//                                         : "text-slate-300"
//                                     }`}
//                                   >
//                                     {lecture.title ||
//                                       lecture.subSectionName ||
//                                       `Lecture ${lectureIndex + 1}`}
//                                   </span>

//                                   <span className="mt-1 block text-xs text-slate-500">
//                                     {lecture.timeDuration ||
//                                       "Video lesson"}
//                                   </span>
//                                 </span>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </aside>
//         )}
//       </div>
//     </div>
//   );
// }




// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import { buyCourse } from '../services/studentFeatureApi'

// export default function CourseDetails() {
//  const {user } = useSelector((state)=>state.profile)
//  const {token} = useSelector((state)=>state.auth)
//  const dispatch = useDispatch()
//  const navigate = useNavigate()
//  const {courseId} = useParams()


//  const handleBuyCourse = () =>{
   
//     if(token){
//         console.log("token: ",token)
//         console.log("user: ",user)
//         console.log("courseid: ",courseId)
   
//      const res =    buyCourse(token,user,[courseId],navigate,dispatch)
//      console.log("res in buy course: ",res)
//     }
//  }
     
//   return (
//     <div className='flex'>
//         <button className='bg-yellow-200 p-6'
//         onClick={handleBuyCourse}
//         >Buy Now</button>
//     </div>
//   )
// }




