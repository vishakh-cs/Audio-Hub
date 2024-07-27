"use client";
import { signIn } from 'next-auth/react'
import React, { useEffect } from 'react';
import { useSession } from "next-auth/react"
import Router, { useRouter } from 'next/navigation';


function Page() {

    const router = useRouter()
    const { data: session, status } = useSession()
    console.log(session,status);
    useEffect(()=>{
        if(status=="authenticated"){
            router.push('/')
        }
    },[status])

    return (
        <main className="w-full h-screen flex">
            <div className="relative flex-1 hidden items-center justify-center bg-gray-900 lg:flex">
                <div className="relative z-10 w-full max-w-lg p-8">
                    <div className="flex flex-shrink-0 items-center justify-center mb-8">
                        <svg
                            width="150"
                            height="40"
                            viewBox="0 0 200 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g>
                                <path
                                    d="M20 30 C20 20, 30 10, 40 10 C50 10, 60 20, 60 30"
                                    stroke="#4F46E5"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <rect
                                    x="15"
                                    y="30"
                                    width="10"
                                    height="20"
                                    fill="#4F46E5"
                                />
                                <rect
                                    x="55"
                                    y="30"
                                    width="10"
                                    height="20"
                                    fill="#4F46E5"
                                />
                            </g>
                            <text
                                x="80"
                                y="35"
                                fill="#4F46E5"
                                fontFamily="Arial, sans-serif"
                                fontSize="24"
                                fontWeight="bold"
                            >
                                Audio Hub
                            </text>
                        </svg>
                    </div>
                    <div className="space-y-4 text-center">
                        <h3 className="text-white text-4xl font-extrabold">Start Uploading Your Audio Quickly</h3>
                        <p className="text-gray-300 text-lg">
                            Create an account and get access to all features 
                        </p>
                    </div>
                </div>
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
                        filter: "blur(118px)"
                    }}
                />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
                </div>
                <button onClick={()=>signIn('google')}
                    className="flex justify-center items-center bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white border border-blue-600 rounded-lg shadow-lg px-6 py-3 text-sm font-medium hover:bg-gradient-to-l transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <svg className="h-6 w-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
                        <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05"></path>
                        <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335"></path>
                        <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" fill="#34A853"></path>
                        <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4"></path>
                    </svg>
                    <span className="font-medium">Continue with Google</span>
                </button>
            </div>
        </main>
    );
}

export default Page;
