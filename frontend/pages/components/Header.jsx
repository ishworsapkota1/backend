"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineLogin } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { isauthenticated, logout } from "../api/userApi";
import { useRouter } from "next/navigation";
const Header = () => {
  let [user, setUser] = useState();
  // let { user } = localStorage.getItem("jwt")
  //   ? JSON.parse(localStorage.getItem("jwt")).user
  //   : {};
  // doubts

  useEffect(() => {
    async function getUser() {
      user = localStorage.getItem("jwt")
        ? await JSON.parse(localStorage.getItem("jwt"))?.user
        : false;
      return user;
    }
  }, []);

  let router = useRouter();
  const handleLogout = () => {
    logout()
      .then((data) => {
        if (data.msg) {
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="grid md:grid-cols-4 md:w-[80%] bg-slate-400 mx-auto text-white">
        <div className="col-span-1">
          <h1 className="text-3xl text-center py-2">
            <Link href={"/"}>sapwor store</Link>
          </h1>
        </div>
        <div className="col-span-2 flex py-2 px-4">
          <input
            type="search"
            className="w-full rounded-s-md text-black px-4 outline-none"
          />
          <button className="bg-orange-600 text-white rounded-s-none">
            Search
          </button>
        </div>
        <div className="col-span-1 flex justify-evenly py-2 text-3xl">
          <Link href={"/login"}>
            <HiOutlineLogin />
          </Link>
          <Link href={"/register"}>
            <FaUserPlus />
          </Link>
          <Link href={"/cart"}>
            <IoCart />
          </Link>
        </div>
      </div>
      <ul className="list-none md:flex justify-evenly py-2 md:w-[80%] mx-auto bg-slate-100">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/products"}>Products</Link>
        </li>{" "}
        <li>
          <Link href={"/services"}>Services</Link>
        </li>{" "}
        <li>
          <Link href={"/faqs"}>FAQS</Link>
        </li>{" "}
        <li>
          <Link href={"/contact"}>Contact</Link>
        </li>{" "}
      </ul>
    </>
  );
};

export default Header;
