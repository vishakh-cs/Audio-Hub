// import React from 'react';
// import { CldUploadWidget } from 'next-cloudinary';
// import { UploadWidgetOptions } from 'next-cloudinary';

// interface CldUploadWidgetProps {
//   onUpload: (result: any) => void;
// }

// const CldUploadWidget: React.FC<CldUploadWidgetProps> = ({ onUpload }) => {
//   const uploadOptions: UploadWidgetOptions = {
//     cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
//     resourceType: 'audio', // Restrict to audio files
//   };

//   return (
//     <CldUploadWidget
//       cloudName={uploadOptions.cloudName}
//       uploadPreset={uploadOptions.uploadPreset}
//       resourceType={uploadOptions.resourceType}
//       onUpload={onUpload}
//     >
//       {({ open }) => (
//         <button
//           onClick={open}
//           className="flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
//         >
//           <div className="text-gray-400 dark:text-gray-500 text-6xl mb-2">📤</div>
//           <span className="text-gray-500 dark:text-gray-400">Drag & drop your audio file here</span>
//           <span className="text-gray-400 dark:text-gray-500">or</span>
//           <span className="text-blue-500 dark:text-blue-400 underline">browse</span>
//         </button>
//       )}
//     </CldUploadWidget>
//   );
// };

// export default CldUploadWidget;
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
