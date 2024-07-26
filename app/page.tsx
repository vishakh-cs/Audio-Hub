"use client"
import Button from '@/components/Button';
import Loader from '@/components/Loader/Loader';
import Meteors from '@/components/magicui/Meteors';
import MarqueeSection from '@/components/MarqueSection';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { FaUpload, FaShareAlt, FaHeadphones, FaPlay, FaUsers } from 'react-icons/fa';
import BoxReveal from "@/components/magicui/box-reveal";

function Page() {
  const { status } = useSession();
   if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className='flex flex-col relative w-screen  justify-center overflow-hidden '>
      <MarqueeSection />
      <Meteors number={15} />
      <div className='w-full h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex flex-col md:flex-row'>
        <div className='flex-1 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900'>
          <div className='py-6'>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <Button />
            </BoxReveal>
          </div>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <h1 className='text-5xl text-center font-extrabold text-gray-900 dark:text-gray-50 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            Welcome to Audio Hub
          </h1>
          </BoxReveal>
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <p className='text-xl text-gray-800 dark:text-gray-300 mb-8 text-center max-w-md'>
            Audio Hub is a cutting-edge audio sharing platform where users can effortlessly upload, share, and explore audio content. Whether you're a musician, podcaster, or just a music enthusiast, Audio Hub provides a seamless experience to connect with friends or share your favorite audio with the world.
          </p>
          </BoxReveal>
        </div>

        {/* Features Section */}
        <div className='flex-1 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl flex flex-col justify-center'>
          <h2 className='text-3xl font-semibold text-gray-900 dark:text-gray-50 mb-6'>Features:</h2>
          <ul className='space-y-6'>
            <li className='flex items-center space-x-4'>
              <FaUpload className='text-blue-500' size={30} />
              <span className='text-lg font-medium text-gray-700 dark:text-gray-300'>
                Upload audio files quickly and easily.
              </span>
            </li>
            <li className='flex items-center space-x-4'>
              <FaShareAlt className='text-green-500' size={30} />
              <span className='text-lg font-medium text-gray-700 dark:text-gray-300'>
                Share audio with friends, family, or the public.
              </span>
            </li>
            <li className='flex items-center space-x-4'>
              <FaHeadphones className='text-purple-500' size={30} />
              <span className='text-lg font-medium text-gray-700 dark:text-gray-300'>
                Discover and listen to a wide range of audio content.
              </span>
            </li>
            <li className='flex items-center space-x-4'>
              <FaPlay className='text-red-500' size={30} />
              <span className='text-lg font-medium text-gray-700 dark:text-gray-300'>
                Personalize your audio collection and create playlists.
              </span>
            </li>
            <li className='flex items-center space-x-4'>
              <FaUsers className='text-orange-500' size={30} />
              <span className='text-lg font-medium text-gray-700 dark:text-gray-300'>
                Engage with a community of audio enthusiasts.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page;
