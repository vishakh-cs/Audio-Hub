import React from 'react';
import Marquee from 'react-fast-marquee';

function MarqueeSection() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col space-y-4">
            <Marquee direction='left' speed={40} gradient={false}>
              <span className="text-lg font-semibold">
                Welcome to Audio Hub – Your premier platform for uploading and sharing audio. Discover a wide range of audio content and connect with a community of enthusiasts. Upload, share, and enjoy audio like never before!
              </span>
            </Marquee>
        </div>
      </div>
    </div>
  );
}

export default MarqueeSection;
