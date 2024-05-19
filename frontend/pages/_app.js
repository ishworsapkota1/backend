"use client";
import "@/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import AdminSidebar from "./components/admin/AdminSiderbar";

export default function App({ Component, pageProps }) {
  let [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    getUser().then((user) => {
      if (user.role == 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    async function getUser() {
      return localStorage.getItem("jwt")
        ? await JSON.parse(localStorage.getItem("jwt")).user
        : false;
    }
  }, []);
  return (
    <>
      {isAdmin ? (
        <div className="flex">
          <div className="w-1/4">
            <AdminSidebar />
          </div>
          <div className="w-3/4">
            <Component {...pageProps} />
          </div>
          {/* <Footer /> */}
        </div>
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </>
      )}
    </>
  );
}
