"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

function Button() {

  const router = useRouter()

  const handleclick =()=>{
       router.push('/upload_audio')
  }

    return (
      <button onClick={handleclick} className="w-[170px] h-[60px] border-[3px] border-[#505dd0] rounded-[45px] bg-white text-[#6b52e6] text-[1.2em] font-[550] transition-all duration-300 hover:bg-[#6573f8] hover:text-white hover:text-[1.5em] cursor-pointer">
        Get Started
      </button>
    );
  }

export default Button;
