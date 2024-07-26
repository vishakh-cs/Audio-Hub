import React from 'react';

interface Alertpopup {
  show: boolean;
  onClose: () => void; 
  mesg: string;
}

const AlertPopup: React.FC<Alertpopup> = ({ show, onClose ,mesg }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-xs w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Alert</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{mesg}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;
