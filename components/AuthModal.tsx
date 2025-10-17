import React from 'react';

// Make sure Netlify Identity is available on the window object
declare const netlifyIdentity: any;

const AuthModal: React.FC = () => {
    
    const handleLogin = () => {
        netlifyIdentity.open('login');
    };

    const handleSignup = () => {
        netlifyIdentity.open('signup');
    };

    return (
        <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-300 dark:border-gray-700 text-center">
                <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                    კეთილი იყოს თქვენი მობრძანება
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    გააგრძელეთ თქვენი გენეალოგიური ხის შექმნა. შედით სისტემაში ან შექმენით ახალი ანგარიში.
                </p>
                <div className="space-y-4">
                    <button 
                        onClick={handleLogin}
                        className="w-full px-4 py-3 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold"
                    >
                        შესვლა
                    </button>
                     <button 
                        onClick={handleSignup}
                        className="w-full px-4 py-3 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 font-semibold transition-colors"
                    >
                        რეგისტრაცია
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
