

import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import NavbarLinks from "../../data/navbar-links";
import ProfileDropdown from "../core/auth/ProfileDropDown";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { apiConnector } from "../../services/apiconnectors";
import { categories } from "../../services/api";

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        // console.log("category api: ",categories.COURSE_CATEGORIES_API)
        const res = await apiConnector(
          "GET",
          categories.COURSE_CATEGORIES_API
        );
        // console.log("res in navbar: ",res)
        setSubLinks(res.data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-richblack-700 ${
        location.pathname !== "/"
          ? "bg-richblack-800"
          : "bg-richblack-900"
      }`}
    >
      <div className="mx-auto flex h-14 w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}

        <Link to="/">
          <img src={logo} alt="Logo" width={160}  loading="lazy"/>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7 text-richblack-25">
            {NavbarLinks.map((link) => (
              <li key={link.title}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : ""
                    }`}
                  >
                    <p>{link.title}</p>

                    <BsChevronDown />

                    <div
                      className="invisible absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-lg bg-richblack-5 p-3 text-richblack-900 opacity-0 shadow-lg transition-all duration-200
                      group-hover:visible
                      group-hover:opacity-100"
                    >
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : (
                        subLinks
                          .filter((item) => item.courses.length > 0)
                          .map((item) => (
                            <Link
                              key={item._id}
                              to={`/catalog/${item.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block rounded px-3 py-2 hover:bg-richblack-50"
                            >
                              {item.name}
                            </Link>
                          ))
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
            
        {/* Right Side */}

        <div className="flex items-center gap-4">
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart
                className="text-richblack-100"
                size={24}
              />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-50 text-xs text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="hidden gap-3 md:flex">
              <Link to="/login">
                <button className="rounded border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded border border-richblack-700 bg-yellow-50 px-4 py-2 text-black">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
    
          {token && <ProfileDropdown />}

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <AiOutlineClose size={25} color="#AFB2BF" />
            ) : (
              <AiOutlineMenu size={25} color="#AFB2BF" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {mobileMenuOpen && (
        <div className="border-t border-richblack-700 bg-richblack-900 md:hidden">
          <ul className="flex flex-col gap-3 p-5">
            {NavbarLinks.map((link) => (
              <li key={link.title}>
                {link.title === "Catalog" ? (
                  <>
                    <p className="font-semibold text-richblack-50">
                      Catalog
                    </p>

                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {subLinks
                        .filter((item) => item.courses.length > 0)
                        .map((item) => (
                          <Link
                            key={item._id}
                            to={`/catalog/${item.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            onClick={() =>
                              setMobileMenuOpen(false)
                            }
                            className="text-richblack-300"
                          >
                            {item.name}
                          </Link>
                        ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      matchRoute(link.path)
                        ? "text-yellow-50"
                        : "text-richblack-25"
                    }
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}

            {token === null && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className="mt-3 w-full rounded bg-richblack-700 py-2 text-white">
                    Login
                  </button>
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className="mt-2 w-full rounded bg-yellow-50 py-2 text-black">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
