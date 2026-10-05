import { FooterLink2 } from "../../data/footer-links";

import logo from "../../assets/Logo/Logo-Full-Light.png";

import {FaGoogle, FaYoutube, FaFacebook, FaTwitter} from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-richblack-800 text-richblack-25 mt-10">
      <div className="w-11/12 max-w-maxContent mx-auto py-14">

        {/* Main Footer */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 border-b border-richblack-700 pb-10">

          {/* Left Side */}
          <div className="flex flex-col md:flex-row w-full lg:w-1/2 gap-10">

            {/* Company */}
            <div className="flex flex-col gap-3 w-full md:w-1/3">
              <img
                src={logo}
                alt="logo"
                className="w-40 object-contain" loading="lazy"
              />

              <h3 className="font-semibold text-richblack-5">
                Company
              </h3>

              <div className="flex flex-col gap-2 text-richblack-300">
                <p>About</p>
                <p>Careers</p>
                <p>Affiliates</p>
              </div>

              <div className="flex gap-4 text-xl mt-3">
                <FaGoogle />
                <FaYoutube />
                <FaFacebook />
                <FaTwitter />
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-3 w-full md:w-1/3">
              <h3 className="font-semibold text-richblack-5"> 
                Resources
              </h3>

              <div className="flex flex-col gap-2 text-richblack-300">
                <p>Articles</p>
                <p>Blog</p>
                <p>Cheat Sheets</p>
                <p>Code Challenges</p>
                <p>Docs</p>
                <p>Projects</p>
                <p>Videos</p>
                <p>Workspaces</p>
              </div>
            </div>

            {/* Plans */}
            <div className="flex flex-col gap-3 w-full md:w-1/3">
              <h3 className="font-semibold text-richblack-5">
                Plans
              </h3>

              <div className="flex flex-col gap-2 text-richblack-300">
                <p>Paid Membership</p>
                <p>For Students</p>
                <p>Business Solutions</p>
              </div>

              <h3 className="font-semibold mt-5 text-richblack-5">
                Community
              </h3>

              <div className="flex flex-col gap-2 text-richblack-300">
                <p>Forums</p>
                <p>Chapters</p>
                <p>Events</p>
              </div>
            </div>
          </div>
          <p className="border border-richblack-700"></p>

          {/* Right Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full lg:w-1/2">

            {FooterLink2.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-richblack-5 mb-3">
                  {
                  
                  section.title
                  
                  }



                </h3>

                <div className="flex flex-col gap-2">
                  {section.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.link}
                      className="text-richblack-300 hover:text-yellow-50 transition-all duration-200"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-sm text-richblack-400 gap-4">

          <div className="flex gap-5">
            <p>Privacy Policy</p>
            <p>|</p>
            <p>Cookie Policy</p>
            <p>|</p>
            <p>Terms</p>
          </div>

          <p>Made with ❤️ by StudyNotion © 2026</p>

        </div>
      </div>
    </footer>
  );
}