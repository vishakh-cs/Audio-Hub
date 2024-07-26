import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import RounderLoader from './Loader/RounderLoader';
import { FaCopy, FaLink } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface Audio {
  url: string;
  title: string;
}

interface UploadedAudioLinkProps {
  updated: boolean;
}

const UploadedAudioLink: React.FC<UploadedAudioLinkProps> = ({ updated }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchAudios = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/user-audios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': session.user.email,
          },
        });

        const data = await res.json();

        if (data.success) {
          setAudios(data.audios);
        } else {
          setError(data.message || 'Failed to fetch audios');
        }
      } catch (error) {
        setError('Failed to fetch audios');
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, [session?.user?.email, updated]);

  const handleCopy = (audioUrl: string, audioTitle: string, index: number) => {
    const localUrl = `${process.env.NEXT_PUBLIC_URl}/preview/${encodeURIComponent(audioUrl)}&title=${encodeURIComponent(audioTitle)}`;
    navigator.clipboard.writeText(localUrl).then(() => {
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">
        Your Uploaded Audio Files
      </h2>
      {loading ? (
        <RounderLoader />
      ) : (
        <>
          {error && <p className="text-red-500 dark:text-red-400 text-center text-lg">{error}</p>}
          {audios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audios.map((audio, index) => (
                <div
                  key={index}
                  className="relative bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 transform transition-transform duration-300 hover:scale-105"
                >
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{audio.title}</p>
                  <audio controls className="w-full mb-4 rounded-lg bg-gray-200 dark:bg-gray-700">
                    <source src={audio.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center ">
                      <div className='flex'>
                      <button
                        type="button"
                        onClick={() => handleCopy(audio.url, audio.title, index)}
                        className="py-2 px-4 flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 transition"
                      >
                        <FaCopy className="size-4 group-hover:rotate-6 transition" />
                        {copiedIndex === index ? (
                          <>
                            <FaLink className="size-4 text-blue-600 rotate-6" />
                            <span className="text-blue-600">Copied</span>
                          </>
                        ) : (
                          <span>Copy</span>
                        )}
                      </button>
                      <input
                        type="text"
                        className="py-2 px-4 block w-2/3 border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-600"
                        value={`${process.env.NEXT_PUBLIC_URl}/preview/${encodeURIComponent(audio.url)}&title=${encodeURIComponent(audio.title)}`}
                        readOnly
                      />
                      </div>
                      <button
                        onClick={() => router.push(`/preview/${encodeURIComponent(audio.url)}&title=${encodeURIComponent(audio.title)}`)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
                      >
                        <FaLink className="mr-2" />
                        <span>Open</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center text-lg">No audio files uploaded yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default UploadedAudioLink;
