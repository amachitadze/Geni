import React from 'react';

const CreateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const ImportIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);


interface InitialViewProps {
    onStartCreating: () => void;
    onImport: () => void;
}

const InitialView: React.FC<InitialViewProps> = ({ onStartCreating, onImport }) => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
                    კეთილი იყოს თქვენი მობრძანება!
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    დაიწყეთ თქვენი ოჯახის ისტორიის შექმნა. აირჩიეთ ერთ-ერთი ქვემოთ მოცემული ვარიანტიდან.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={onStartCreating}
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <CreateIcon className="w-6 h-6 mr-2" />
                        ხის შექმნის დაწყება
                    </button>
                    <button 
                        onClick={onImport}
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <ImportIcon className="w-6 h-6 mr-2" />
                        მონაცემების იმპორტი
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InitialView;
