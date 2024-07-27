"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AudioPreviewProps {
  params: {
    audio: string;
    title: string;
  };
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ params }) => {
  const router = useRouter();
  const { audio, title } = params;

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);

  useEffect(() => {
    if (audio) {
      console.log("Encoded audio URL received:", audio);
      const decoded_Url = decodeURIComponent(audio);
      const audioUrl = decoded_Url.split('&')[0];
      console.log('Audio URL:', audioUrl);
      setAudioUrl(audioUrl);

      // Extract the audio name from the URL
      const decodedUrl = decodeURIComponent(audio);
      const urlParams = new URLSearchParams(decodedUrl);
      const audioName = urlParams.get('title');
      console.log('Audio Name:', audioName);
      setAudioName(audioName);
    }
  }, [audio]);

  useEffect(() => {
    console.log("Updated audioUrl state:", audioUrl);
  }, [audioUrl]);

  if (!audioUrl) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Audio Preview
      </h1>
      {audioName && (
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          Now Playing: {audioName}
        </h2>
      )}
      <div className="relative w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-4">
        <div className="absolute top-0 left-0 w-full bg-gray-800 dark:bg-gray-800 h-8 flex items-center px-4 rounded-t-lg">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="pt-10 pb-4 px-4 flex flex-col  justify-start">
          <h4 className="dark:text-gray-50 text-gray-900">
            {/* <span>&lt; </span><span className='text-blue-400 font-sans'>H4</span><span>&gt;</span> */}
            <span className="text-blue-700">const</span><span className="text-blue-400"> audio </span><span className='dark:text-white'>=</span>
            <span className="text-purple-600 dark:text-purple-300">&#123;</span> <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className='text-blue-500'>audioName:</span>
            <span>"</span>
            <span className="text-orange-500">{audioName}</span>
            <span>"</span><br />
            <span className="text-purple-600 dark:text-purple-300">&#125;</span>
          </h4>
          <div className="flex flex-col justify-center items-center bg-white w-full h-auto rounded-lg overflow-hidden shadow-xl mt-4">
            <div className="w-full flex justify-start items-start pl-4 pt-2 pb-2">
              <span className="text-lg font-semibold text-gray-800">Now playing</span>
            </div>
            <div className="flex justify-center items-center w-full bg-gray-100 py-2">
              <audio controls className="w-full shadow-inner">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

          </div>

        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => router.back()}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AudioPreview;
