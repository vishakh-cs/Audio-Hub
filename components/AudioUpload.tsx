"use client";
import React, { useRef, useState } from 'react';
import UploadedAudioLink from './UploadedAudioLink';
import { useSession } from 'next-auth/react';
import AlertPopup from './Alertpopup';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const AudioUpload: React.FC = () => {

  const router = useRouter()
  const { data: session, status } = useSession()
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const uploadedAudioLinkRef = useRef<HTMLDivElement | null>(null);
  const [alert, setAlert] = useState<boolean>(false)
  const [updated, setUpdated ]= useState<boolean>(false)
  const [message, setMessage] = useState("")

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAudioFile(file);
      setFilename(file.name); // Initially set filename to original name
    }
  };

  // Function to rename the File object
  const renameFile = (originalFile: File, newName: string): File => {
    return new File([originalFile], newName, { type: originalFile.type });
  };

  const handleUpload = async () => {
    if (status === 'unauthenticated') {
      setAlert(true);
      setMessage('Please login to upload');
      return;
    }

    if (audioFile) {
      setLoading(true);

      // Rename the file object if necessary
      let fileToUpload = audioFile;
      if (audioFile.name !== filename) {
        fileToUpload = renameFile(audioFile, filename);
      }

      try {
        const formData = new FormData();
        formData.set('file', fileToUpload); // Use renamed file if applicable
        if (session?.user?.email) {
          formData.set('email', session.user.email);
        } else {
          console.error('User email is not available');
          setMessage('Failed to upload audio: User email missing');
          setAlert(true);
          setLoading(false);
          return;
        }

        const res = await fetch('/api/uploads', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          const responseData = await res.json();
          setMessage('File uploaded successfully');
          console.log('Server response:', responseData);
          setAlert(true);
          setUpdated(true)
          // Scroll to UploadedAudioLink component after upload
          if (uploadedAudioLinkRef.current) {
            uploadedAudioLinkRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          console.error('Upload response error:', await res.text());
          setMessage('Failed to upload audio');
          setAlert(true);
        }
      } catch (error) {
        setMessage('Failed to upload audio');
        setAlert(true);
        console.error("Upload error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setAlert(true);
      setMessage('Please select an audio file');
    }
  };

  const closeAlert = () => setAlert(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white p-4 bg-white dark:bg-gray-900">
      {alert && <AlertPopup show={alert} onClose={closeAlert} mesg={message} />}
      <h1 className="text-4xl font-extrabold mb-6">Upload Your Audio</h1>
      <p className="mb-4 max-w-lg text-center">
        Welcome to Audio Hub! Here, you can upload your audio files and share them with your friends or a wider audience. Simply drag and drop your audio file below, or browse to select a file from your device.
      </p>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md text-gray-800 dark:text-gray-300">
        <div className="flex flex-col items-center">
          <label
            htmlFor="audio-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
          >
            {loading ? (
              <div className="flex items-center justify-center h-screen">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
              </div>
            ) : (
              <>
                <input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioChange}
                  className="hidden"
                />
                <button
                  onClick={() => document.getElementById('audio-upload')?.click()}
                  className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                >
                  <div className="text-gray-400 dark:text-gray-500 text-6xl mb-2">📤</div>
                  <span className="text-gray-500 dark:text-gray-400">Drag & drop your audio file here</span>
                  <span className="text-gray-400 dark:text-gray-500">or</span>
                  <span className="text-blue-500 dark:text-blue-400 underline">browse</span>
                </button>
              </>
            )}
          </label>
        </div>
        {audioFile && (
          <div className="mt-4 text-center ">
            <input type='text' className="text-black dark:text-gray-100 font-medium bg-gray-300 dark:bg-gray-800 rounded-lg h-10 md:w-[200px]" onChange={(e)=>setFilename(e.target.value)} value={`  ${filename}`}/><span>✍️</span>
          </div>
        )}
        <button
          onClick={handleUpload}
          className="mt-6 w-full py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-200 transform hover:scale-105"
        >
          Upload
        </button>
      </div>
      <div className="mt-8 max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-2">How It Works</h2>
        <p className="mb-4">
          Once you upload an audio file, our system will process it and generate a unique link that you can share with others. You can also add a description and tags to make your audio more discoverable.
        </p>
        <h2 className="text-2xl font-bold mb-2">Supported Formats</h2>
        <p>
          We support all popular audio formats including MP3, WAV, and AAC. Ensure your file size does not exceed 100MB for a seamless upload experience.
        </p>
      </div>
      <div ref={uploadedAudioLinkRef} className='w-screen'>
        <UploadedAudioLink updated={updated} />
      </div>
    </div>
  );
};

export default AudioUpload;