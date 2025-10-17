import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthModal: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            // onAuthStateChanged in App.tsx will handle the rest
        } catch (err: any) {
            switch (err.code) {
                case 'auth/user-not-found':
                    setError('მომხმარებელი ამ იმეილით არ მოიძებნა.');
                    break;
                case 'auth/wrong-password':
                    setError('პაროლი არასწორია.');
                    break;
                case 'auth/email-already-in-use':
                    setError('ეს იმეილი უკვე გამოყენებულია.');
                    break;
                 case 'auth/weak-password':
                    setError('პაროლი სუსტია. უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს.');
                    break;
                default:
                    setError('ავტორიზაციის შეცდომა. სცადეთ მოგვიანებით.');
                    console.error(err);
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-300 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                    {isLogin ? 'ავტორიზაცია' : 'რეგისტრაცია'}
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    {isLogin ? 'შედით თქვენს ანგარიშში' : 'შექმენით ახალი ანგარიში'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">ელ. ფოსტა</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                            required 
                            autoFocus 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">პაროლი</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-md bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 dark:disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors text-white font-semibold"
                    >
                        {isLoading ? 'იტვირთება...' : (isLogin ? 'შესვლა' : 'რეგისტრაცია')}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                        {isLogin ? 'არ გაქვთ ანგარიში? რეგისტრაცია' : 'უკვე გაქვთ ანგარიში? შესვლა'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;