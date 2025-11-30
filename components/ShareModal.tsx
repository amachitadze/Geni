import React, { useState } from 'react';
import { encryptData, bufferToBase64 } from '../utils/crypto';
import { People } from '../types';

declare const pako: any;

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    people: People;
    rootIdStack: string[];
  };
}

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.186 2.25 2.25 0 00-3.933 2.186z" />
    </svg>
);
const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
);


const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data }) => {
  const [password, setPassword] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [serviceUsed, setServiceUsed] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const removeImages = (originalData: any) => {
      const newData = JSON.parse(JSON.stringify(originalData));
      if (newData.people) {
          Object.keys(newData.people).forEach(key => {
              if (newData.people[key].imageUrl) {
                  delete newData.people[key].imageUrl;
              }
          });
      }
      return newData;
  };

  const handleGenerateLink = async () => {
    if (!password) {
      setError('გთხოვთ, ჯერ შექმენით პაროლი.');
      return;
    }
    setIsLoading(true);
    setError('');
    setShareUrl('');
    setServiceUsed('');

    try {
      // 1. Prepare Full Data (with images)
      const fullJsonString = JSON.stringify(data);
      const fullCompressed = pako.deflate(fullJsonString);
      const fullCompressedBase64 = bufferToBase64(fullCompressed.buffer);
      const fullEncryptedData = await encryptData(fullCompressedBase64, password);

      // --- ATTEMPT 1: File.io (via Vercel Rewrite) ---
      try {
          console.log("Attempting File.io...");
          const formData = new FormData();
          const blob = new Blob([fullEncryptedData], { type: 'text/plain' });
          formData.append('file', blob, 'tree.data');
          formData.append('expires', '2w');
          formData.append('maxDownloads', '1');

          // Fallback logic for localhost vs production
          const fileIoEndpoint = window.location.hostname === 'localhost' 
            ? 'https://corsproxy.io/?https://file.io' 
            : '/api/share';

          const response = await fetch(fileIoEndpoint, {
              method: 'POST',
              body: formData,
          });

          if (response.ok) {
              const result = await response.json();
              if (result.success && result.key) {
                  const url = `${window.location.origin}${window.location.pathname}?fileKey=${result.key}`;
                  setShareUrl(url);
                  setServiceUsed('File.io (სრული)');
                  setIsLoading(false);
                  return; // Success! Exit function.
              }
          }
          console.warn("File.io response was not successful", response.status);
      } catch (e) {
          console.warn("File.io upload failed, trying fallback...", e);
      }

      // --- ATTEMPT 2: JsonBlob (Fallback - No Images) ---
      console.log("Attempting JsonBlob fallback...");
      const liteData = removeImages(data);
      const liteJsonString = JSON.stringify(liteData);
      const liteCompressed = pako.deflate(liteJsonString);
      const liteCompressedBase64 = bufferToBase64(liteCompressed.buffer);
      const liteEncryptedData = await encryptData(liteCompressedBase64, password);

      // Fallback logic for localhost vs production
      const jsonBlobEndpoint = window.location.hostname === 'localhost'
        ? 'https://corsproxy.io/?https://jsonblob.com/api/jsonBlob'
        : '/api/jsonblob';

      const response = await fetch(jsonBlobEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({ data: liteEncryptedData }), // Wrap in object
      });

      if (response.ok) {
          // JsonBlob usually returns location in header
          const locationHeader = response.headers.get('Location');
          let blobId = '';
          
          if (locationHeader) {
              blobId = locationHeader.split('/').pop() || '';
          }
          
          // Fallback if Location header is missing (sometimes happens with CORS proxies)
          // Try to parse body if possible (rare for jsonblob but worth a shot)
          if (!blobId) {
             try {
                 const jsonRes = await response.json();
                 // If the proxy returns the location or id
                 // This part is tricky with pure jsonblob API as it returns 201 + Header
                 // But let's assume if we are here, we might need a manual ID extraction if proxy returns headers in body
             } catch(e) {}
          }

          // If we still don't have an ID and we used corsproxy, we might be stuck.
          // However, Vercel rewrite should preserve headers.
          
          if (locationHeader || blobId) {
             if (!blobId && locationHeader) blobId = locationHeader.split('/').pop() || '';
             
             if (blobId) {
                const url = `${window.location.origin}${window.location.pathname}?blobId=${blobId}`;
                setShareUrl(url);
                setServiceUsed('JsonBlob (მსუბუქი - სურათების გარეშე)');
                setIsLoading(false);
                return;
             }
          }
      }
      
      throw new Error('ყველა სერვისი მიუწვდომელია.');

    } catch (e: any) {
      console.error("Link generation failed", e);
      setError(`ბმულის გენერაცია ვერ მოხერხდა. შეამოწმეთ ინტერნეტ კავშირი.`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-300 dark:border-gray-700 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <header className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">ხის გაზიარება</h2>
          <button onClick={onClose} className="p-2 -mt-2 -mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="დახურვა">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <p className="text-gray-600 dark:text-gray-400 mb-4">შექმენით დაშიფრული ბმული და პაროლი, რომ გაუზიაროთ თქვენი გენეალოგიური ხე სხვებს.</p>
        
        <div className="p-3 mb-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>ყურადღება:</strong> ეს ბმული არის <strong>ერთჯერადი</strong>. მიმღების მიერ გახსნისთანავე ფაილი წაიშლება სერვერიდან (File.io-ს შემთხვევაში).
            </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">1. პაროლის შექმნა</label>
            <div className="flex gap-2">
              <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="შეიყვანეთ ან შექმენით პაროლი" className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white" />
              <button onClick={generatePassword} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors text-sm">შექმნა</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">2. ბმულის გენერირება</label>
            <button onClick={handleGenerateLink} disabled={isLoading || !password} className="w-full px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 dark:disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-white">
                {isLoading ? 'იტვირთება...' : <><ShareIcon className="w-5 h-5"/> ბმულის შექმნა</>}
            </button>
            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-2">{error}</p>}
          </div>

          {shareUrl && (
            <div className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                {serviceUsed && (
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                        გამოყენებული სერვისი: <span className="font-semibold">{serviceUsed}</span>
                    </p>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">გასაზიარებელი ბმული</label>
                    <div className="flex gap-2">
                        <input type="text" readOnly value={shareUrl} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 text-sm" />
                        <button onClick={() => copyToClipboard(shareUrl)} title="ბმულის კოპირება" className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors"><CopyIcon className="w-5 h-5"/></button>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">პაროლი</label>
                    <div className="flex gap-2">
                        <input type="text" readOnly value={password} className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300" />
                        <button onClick={() => copyToClipboard(password)} title="პაროლის კოპირება" className="p-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100 transition-colors"><CopyIcon className="w-5 h-5"/></button>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;