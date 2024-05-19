import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-4  md:p-8 lg:p-10 bg-slate-200 mt-96">
      <div className="mx-auto max-w-screen-xl text-center">
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Open-source library of over 400+ web components and interactive
          elements built for better web.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <Link href={"/"} className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link href={"/"} className="mr-4 hover:underline md:mr-6">
              Premium
            </Link>
          </li>
          <li>
            <Link href={"/"} className="mr-4 hover:underline md:mr-6 ">
              Campaigns
            </Link>
          </li>
          <li>
            <Link href={"/"} className="mr-4 hover:underline md:mr-6">
              Blog
            </Link>
          </li>
          <li>
            <Link href={"/"} className="mr-4 hover:underline md:mr-6">
              Affiliate Program
            </Link>
          </li>
          <li>
            <Link href={"/"} className="mr-4 hover:underline md:mr-6">
              FAQs
            </Link>
          </li>
          <li>
            <Link href={"/"} className="mr-4 hover:underline md:mr-6">
              Contact
            </Link>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2021-2022{" "}
          <Link href={"/"} className="hover:underline">
            Flowbite™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
