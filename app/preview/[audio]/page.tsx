"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AudioPreview = ({ params }) => {

  const router = useRouter();
  const { audio, title } = params;
  console.log(title);
  console.log("audio",audio);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);

  useEffect(() => {
    if (audio) {
      console.log("Encoded audio URL received:", audio);
      const decoded_Url = decodeURIComponent(audio);
      const audioUrl = decoded_Url.split('&')[0];
      console.log('Audio URL:', audioUrl);
      setAudioUrl(audioUrl)

      // Extract the audio name from the URL
      const decodedUrl = decodeURIComponent(audio);
      const urlParams = new URLSearchParams(decodedUrl);
      const audioName = urlParams.get('title');
      console.log('Audio Name:', audioName);
      setAudioName(audioName)
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
      <audio controls className="w-full max-w-2xl rounded-lg shadow-lg bg-gray-200 dark:bg-gray-700">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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
