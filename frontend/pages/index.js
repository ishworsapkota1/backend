"use client";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    // window.location.reload();
  },[]);
  return <h1>HELLO</h1>;
}
